import PDFDocument from "pdfkit";
import fs from "fs";
import { PassThrough } from "stream";
import { Response } from "express";

interface PDFReportGeneratorProps {
  data: Array<any>;
  columnWidths: Array<number>;
  headers: Array<{ headerName: string; textAlign: string }>;
  keys: Array<string>;
  title: string;
  PAGE_WIDTH: number;
  PAGE_HEIGHT: number;
  MARGIN: { top: number; right: number; bottom: number; left: number };
  BASE_FONT_SIZE: number;
  TITLE_FONT_SIZE: number;
  MIN_ROW_HEIGHT: number;
  boldedRows: Array<number>;
  spanMap: Map<any, any>;
  borderedColumns: Array<any>;
  beforeDraw: (doc: any) => void | null;
  beforePerPageDraw: (
    pdfReportGenerator: any,
    doc: PDFKit.PDFDocument
  ) => void | null;
  drawPageNumber: (
    doc: PDFKit.PDFDocument,
    currentPage: number,
    totalPages: number,
    pdfReportGenerator: any
  ) => void;
}
class PDFReportGenerator {
  public data: Array<any> = [];
  public columnWidths: Array<number> = [];
  public headers: Array<{ headerName: string; textAlign: string }> = [];
  public keys: Array<string> = [];
  public title: string = "";
  public PAGE_WIDTH: number = 8.5;
  public PAGE_HEIGHT: number = 11;
  public MARGIN = { top: 20, right: 10, bottom: 80, left: 10 };
  public BASE_FONT_SIZE: number = 10;
  public TITLE_FONT_SIZE: number = 16;
  public MIN_ROW_HEIGHT: number = 20;
  public boldedRows: Array<number> = [];
  public spanMap = new Map();
  public borderedColumns: Array<any>;
  public beforeDraw = (doc: any) => {};
  public beforePerPageDraw = (
    pdfReportGenerator: any,
    doc: PDFKit.PDFDocument
  ) => {};
  public drawPageNumber = (
    doc: PDFKit.PDFDocument,
    currentPage: number,
    totalPages: number,
    pdfReportGenerator: any
  ) => {};
  public scaledColumns: any = [];
  public scaledFontSize: number = 0;
  public scaledRowHeight: number = 0;

  constructor(props: PDFReportGeneratorProps) {
    this.data = props.data;
    this.columnWidths = props.columnWidths;
    this.headers = props.headers;
    this.keys = props.keys;
    this.title = props.title;

    this.PAGE_WIDTH = props.PAGE_WIDTH;
    this.PAGE_HEIGHT = props.PAGE_HEIGHT;
    this.MARGIN = props.MARGIN;
    this.BASE_FONT_SIZE = 12;
    this.TITLE_FONT_SIZE = 16;
    this.MIN_ROW_HEIGHT = 20;

    this.boldedRows = [];
    this.spanMap = new Map();
    this.borderedColumns = [];
    this.beforeDraw = props.beforeDraw;
    this.beforePerPageDraw = props.beforePerPageDraw;
    this.drawPageNumber = props.drawPageNumber;
  }

  boldRow(rowIndex: number) {
    this.boldedRows.push(rowIndex);
  }

  SpanRow(
    rowIndex: number,
    columnIndex: number,
    spanLength: number,
    key: string = "",
    textAlign: string = "left"
  ) {
    this.spanMap.set(rowIndex, { columnIndex, spanLength, key, textAlign });
  }
  // Function to define custom borders for a specific row and columns
  borderColumnInRow(rowIndex: number, columnDetails: any, borderSides: any) {
    this.borderedColumns.push({ rowIndex, columnDetails, borderSides });
  }

  calculateScaling() {
    const contentWidth = this.columnWidths.reduce(
      (acc, width) => acc + width,
      0
    );
    const availableWidth = this.PAGE_WIDTH - 2 * this.MARGIN.left;
    const scaleFactor = Math.min(1, availableWidth / contentWidth);

    this.scaledColumns = this.columnWidths.map((width) => width * scaleFactor);
    this.scaledFontSize = this.BASE_FONT_SIZE * scaleFactor;
    this.scaledRowHeight = this.BASE_FONT_SIZE * 1.2 * scaleFactor;
  }

  calculateRowHeight(doc: PDFKit.PDFDocument, row: any) {
    let maxHeight = this.MIN_ROW_HEIGHT;
    this.keys.forEach((key, colIndex) => {
      const colWidth = this.columnWidths[colIndex] || 50;
      const cellValue = row[key];
      const cellHeight = doc.heightOfString(cellValue?.toString() || "", {
        width: colWidth - 10,
      });
      maxHeight = Math.max(maxHeight, cellHeight + 10);
    });
    return maxHeight;
  }

  drawTitleAndHeader(doc: PDFKit.PDFDocument, startY: number) {
    let currentY = startY + 25;
    const titleLines = this.title.split("\n");

    doc
      .fontSize(this.TITLE_FONT_SIZE - 3)
      .font("Helvetica-Bold")
      .fillColor("black");

    titleLines.forEach((line) => {
      doc.text(line, this.MARGIN.left, currentY, {
        align: "left",
        width: this.PAGE_WIDTH - 2 * this.MARGIN.left,
      });
      currentY +=
        doc.heightOfString(line, {
          width: this.PAGE_WIDTH - 2 * this.MARGIN.left,
          align: "left",
        }) + 5;
    });

    const headerStartY = currentY + 20;
    let maxHeaderHeight = this.scaledRowHeight;

    doc.fontSize(this.scaledFontSize + 2);
    this.headers.forEach((header, colIndex) => {
      const colWidth = this.scaledColumns[colIndex] || 50;
      const textHeight = doc.heightOfString(header.headerName, {
        width: colWidth - 10,
      });
      maxHeaderHeight = Math.max(maxHeaderHeight, textHeight + 10);
    });

    let startX = this.MARGIN.left;
    this.headers.forEach((header, colIndex) => {
      const colWidth = this.scaledColumns[colIndex] || 50;
      doc.text(header.headerName, startX + 5, headerStartY + 5, {
        width: colWidth - 10,
        align: header.textAlign as
          | "left"
          | "center"
          | "justify"
          | "right"
          | undefined,
      });

      doc
        .moveTo(startX, headerStartY + maxHeaderHeight - 2)
        .lineTo(startX + colWidth, headerStartY + maxHeaderHeight - 2)
        .stroke();

      startX += colWidth;
    });

    return headerStartY + maxHeaderHeight;
  }

  getTitleAndHeaderHeight(doc: PDFKit.PDFDocument, startY: number) {
    let currentY = startY + 25;
    const titleLines = this.title.split("\n");

    doc
      .fontSize(this.TITLE_FONT_SIZE - 3)
      .font("Helvetica-Bold")
      .fillColor("black");

    titleLines.forEach((line) => {
      currentY +=
        doc.heightOfString(line, {
          width: this.PAGE_WIDTH - 2 * this.MARGIN.left,
          align: "left",
        }) + 5;
    });

    const headerStartY = currentY + 20;
    let maxHeaderHeight = this.scaledRowHeight;
    doc.fontSize(this.scaledFontSize + 2);
    this.headers.forEach((header, colIndex) => {
      const colWidth = this.scaledColumns[colIndex] || 50;
      const textHeight = doc.heightOfString(header.headerName, {
        width: colWidth - 10,
      });
      maxHeaderHeight = Math.max(maxHeaderHeight, textHeight + 10);
    });

    let startX = this.MARGIN.left;
    this.headers.forEach((header, colIndex) => {
      startX += this.scaledColumns[colIndex] || 50;;
    });
    return headerStartY + maxHeaderHeight;
  }

  drawRow(doc: PDFKit.PDFDocument, row: any, rowIndex: number, startY: number) {
    const isBold = this.boldedRows.includes(rowIndex);

    // Apply bold font if necessary
    if (isBold) {
      doc.font("Helvetica-Bold");
    } else {
      doc.font("Helvetica");
    }

    let startX = this.MARGIN.left;

    // Check if the current row has a span
    const spanInfo = this.spanMap.get(rowIndex);
    const {
      columnIndex,
      spanLength,
      key: SpanKey,
      textAlign: SpanTextAlign,
    } = spanInfo || {};

    this.keys.forEach((key, colIndex) => {
      // Skip columns that fall within a span range (except the starting column)
      if (
        spanInfo &&
        colIndex > columnIndex &&
        colIndex < columnIndex + spanLength
      ) {
        return;
      }

      // Calculate the column width (spanned width if applicable)
      const colSpan = spanInfo && colIndex === columnIndex ? spanLength : 1;
      const colWidth = this.columnWidths
        .slice(colIndex, colIndex + colSpan)
        .reduce((sum, width) => sum + width, 0);

      let cellValue = "";
      let textHeader = "" as
        | "left"
        | "center"
        | "justify"
        | "right"
        | undefined;
      if (spanInfo && colIndex === columnIndex && SpanKey !== "") {
        textHeader = SpanTextAlign;
        cellValue = row[SpanKey];
      } else {
        textHeader = this.headers[colIndex].textAlign as
          | "left"
          | "center"
          | "justify"
          | "right"
          | undefined;
        cellValue = row[key];
      }

      // Draw the cell with the corresponding value
      doc.text(cellValue?.toString() || "", startX + 5, startY + 5, {
        width: colWidth - 10,
        align: textHeader,
      });

      // Check if borders need to be applied for this column
      const borderDetails = this.borderedColumns.find(
        (b: any) =>
          b.rowIndex === rowIndex &&
          b.columnDetails.some((c: any) => c.column === colIndex)
      );
      if (borderDetails) {
        const { borderSides } = borderDetails;

        // Draw borders for the cell
        if (borderSides.top) {
          doc
            .moveTo(startX, startY)
            .lineTo(startX + colWidth, startY)
            .stroke();
        }
        if (borderSides.bottom) {
          doc
            .moveTo(startX, startY + this.scaledRowHeight)
            .lineTo(startX + colWidth, startY + this.scaledRowHeight)
            .stroke();
        }
        if (borderSides.left) {
          doc
            .moveTo(startX, startY)
            .lineTo(startX, startY + this.scaledRowHeight)
            .stroke();
        }
        if (borderSides.right) {
          doc
            .moveTo(startX + colWidth, startY)
            .lineTo(startX + colWidth, startY + this.scaledRowHeight)
            .stroke();
        }
      }

      // Move to the next column (or skip spanned columns)
      startX += colWidth;
    });
  }
  getDrawRowHeight(doc: PDFKit.PDFDocument,rowIndex: number) {
    const isBold = this.boldedRows.includes(rowIndex);

    // Apply bold font if necessary
    if (isBold) {
      doc.font("Helvetica-Bold");
    } else {
      doc.font("Helvetica");
    }
    let startX = this.MARGIN.left;
    // Check if the current row has a span
    const spanInfo = this.spanMap.get(rowIndex);
    const {
      columnIndex,
      spanLength,
    } = spanInfo || {};

    this.keys.forEach((key, colIndex) => {
    

      // Calculate the column width (spanned width if applicable)
      const colSpan = spanInfo && colIndex === columnIndex ? spanLength : 1;
      const colWidth = this.columnWidths
        .slice(colIndex, colIndex + colSpan)
        .reduce((sum, width) => sum + width, 0);

      // Move to the next column (or skip spanned columns)
      startX += colWidth;
    });
  }
  getTotalPage(data: any, doc: any, startY: any) {
    let currentPage = 1;
    data.forEach((row: any, rowIndex: any) => {
      const rowHeight = this.calculateRowHeight(doc, row);
      if (
        startY + rowHeight + this.scaledRowHeight >
        this.PAGE_HEIGHT - this.MARGIN.bottom
      ) {
        // if (this.beforePerPageDraw) {
        //   this.beforePerPageDraw(this, doc);
        // }
        //  this.drawPageNumber(doc, currentPage, totalPages, this);
        // doc.addPage();
        currentPage += 1;
        startY = this.getTitleAndHeaderHeight(doc, this.MARGIN.top / 2);
      }
      startY += rowHeight;
    });

    return currentPage;
  }

  generatePDF(res: Response) {
    const outputFilePath = "manok.pdf";
    const doc = new PDFDocument({
      size: [this.PAGE_WIDTH, this.PAGE_HEIGHT],
      margin: 0,
    });

    const writeStream = fs.createWriteStream(outputFilePath);
    doc.pipe(writeStream);

    this.calculateScaling();

    let _startY = this.MARGIN.top + 60;
    _startY = this.getTitleAndHeaderHeight(doc, this.MARGIN.top / 2);
    const totalPages = this.getTotalPage(this.data, doc, _startY) ;

    let startY = this.MARGIN.top + 60;
    let currentPage = 1;
    startY = this.drawTitleAndHeader(doc, this.MARGIN.top / 2);

    if (this.beforeDraw) {
      this.beforeDraw(this);
    }

    this.data.forEach((row: any, rowIndex: any) => {
      const rowHeight = this.calculateRowHeight(doc, row);
      if (
        startY + rowHeight + this.scaledRowHeight >
        this.PAGE_HEIGHT - this.MARGIN.bottom
      ) {
        if (this.beforePerPageDraw) {
          this.beforePerPageDraw(this, doc);
        }
        this.drawPageNumber(doc, currentPage, totalPages, this);
        doc.addPage();
        currentPage += 1;
        startY = this.drawTitleAndHeader(doc, this.MARGIN.top / 2);
      }
      this.drawRow(doc, row, rowIndex, startY);
      startY += rowHeight;
    });

    if (this.beforePerPageDraw) {
      this.beforePerPageDraw(this, doc);
    }
    this.drawPageNumber(doc, currentPage, totalPages, this);
    doc.end();
    writeStream.on("finish", (e: any) => {
      console.log(`PDF created successfully at: ${outputFilePath}`);
      const readStream = fs.createReadStream(outputFilePath);
      readStream.pipe(res);

      readStream.on("end", () => {
        fs.unlink(outputFilePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log(`File ${outputFilePath} deleted successfully.`);
          }
        });
      });
    });
  }
}

export default PDFReportGenerator;
