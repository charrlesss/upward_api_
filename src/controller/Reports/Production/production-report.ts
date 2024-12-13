import express from "express";
import {
  format,
  startOfMonth,
  endOfMonth,
  addYears,
  endOfYear,
  startOfYear,
} from "date-fns";
import { exportToExcel } from "./report-to-excel";
import { parseDate, ProductionReport } from "../../../model/db/stored-procedured";
import { PrismaList } from "../../../model/connection";
import PDFReportGenerator from '../../../lib/pdf-generator'

const ProductionReports = express.Router();

const { CustomPrismaClient } = PrismaList();

ProductionReports.post("/get-production-report", async (req, res) => {
  try {
    console.log(req.body);
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

    let dateFrom = "";
    let dateTo = "";
    if (req.body.report === "Daily") {
      dateFrom = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
      dateTo = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
    }
    if (req.body.report === "Monthly") {
      const currentDate = new Date(req.body.dateFrom);
      dateFrom = format(startOfMonth(currentDate), "yyyy-MM-dd");
      dateTo = format(endOfMonth(currentDate), "yyyy-MM-dd");
    }
    if (req.body.report === "Yearly") {
      const currentDate = new Date(req.body.dateFrom);

      dateFrom = format(startOfYear(startOfMonth(currentDate)), "yyyy-MM-dd");
      dateTo = format(
        endOfMonth(
          endOfYear(addYears(currentDate, parseInt(req.body.yearCount)))
        ),
        "yyyy-MM-dd"
      );
    }
    if (req.body.report === "Custom") {
      dateFrom = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
      dateTo = format(new Date(req.body.dateTo), "yyyy-MM-dd");
    }
    const reportString = ProductionReport(
      dateFrom,
      dateTo,
      req.body.account.toUpperCase(),
      req.body.policy,
      req.body.format2 === "All" ? 0 : 1,
      req.body.mortgagee,
      req.body.policyType,
      req.body.sort
    );
    const report: Array<any> = await prisma.$queryRawUnsafe(reportString);
    console.log(reportString);

    res.send({
      success: true,
      message: "Successfully get production report ",
      report,
    });
  } catch (err: any) {
    res.send({ message: "SERVER ERROR", success: false, report: [] });
  }
});

ProductionReports.post("/export-excel-production-report", async (req, res) => {
  exportToExcel({
    req,
    res,
    callback({
      state,
      header,
      rowLengthTextDisplayIndex,
      sheet,
      sendFile,
      letterList,
    }) {
      const signaturesTextDispkayIndex = rowLengthTextDisplayIndex + 3;

      sheet.mergeCells(
        `A${signaturesTextDispkayIndex}:${letterList[header.length - 1]
        }${signaturesTextDispkayIndex}`
      );
      sheet.getCell(`A${signaturesTextDispkayIndex}`).value =
        state.format1 === "Summary"
          ? "                                                Prepared By:"
          : "Prepared By:                                                                                                     Checked By:                                                                                                                     Noted By:";
      sheet.getCell(`A${signaturesTextDispkayIndex}`).style = {
        alignment: {
          horizontal: state.format1 === "Summary" ? "left" : "center",
        },
        font: { bold: true, size: 10.5 },
      };

      sendFile();
    },
    onEachCell({
      rowLengthTextDisplayIndex,
      rowIndex,
      header,
      colIndex,
      cell,
      rowStartedIndex,
    }) {
      const signaturesTextDispkayIndex = rowLengthTextDisplayIndex + 3;
      if (
        rowIndex < signaturesTextDispkayIndex &&
        rowIndex !== rowStartedIndex
      ) {
        if (header[colIndex - 1]?.type === "number") {
          cell.alignment = { horizontal: "right", vertical: "middle" };
        } else {
          cell.alignment = { horizontal: "left", vertical: "middle" };
        }
      }
    },
  });
});

ProductionReports.get("/users", async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
    const data: Array<any> = await prisma.$queryRawUnsafe(`SELECT * FROM  users;`);
    res.send({
      success: true,
      message: "Successfully get production report ",
      data,
    });
  } catch (err: any) {
    res.send({ message: "SERVER ERROR", success: false, report: [] });
  }
});

/// ===============================

ProductionReports.post("/test-new-report", async (req, res) => {
  try {
    const title = req.body.title
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
    let dateFrom = format(parseDate(req.body.FDate), "yyyy-MM-dd");
    let dateTo = format(parseDate(req.body.TDate), "yyyy-MM-dd");
    console.log(title)
    const reportString = ProductionReport(
      dateFrom,
      dateTo,
      req.body.cmbOrder,
      req.body.cmbSubAcct,
      parseInt(req.body.cmbType),
      "",
      req.body.cmbpolicy,
      req.body.cmbSort
    );
    // console.log(reportString)
    const data: Array<any> = await prisma.$queryRawUnsafe(reportString);

    const newData = data.map((itm: any) => {
      itm.InsuredValue = formatNumber(parseFloat(itm.InsuredValue.toString().replace(/,/g, '')))
      itm.TotalPremium = formatNumber(parseFloat(itm.TotalPremium.toString().replace(/,/g, '')))
      itm.TotalPremium = formatNumber(parseFloat(itm.TotalPremium.toString().replace(/,/g, '')))
      itm.DocStamp = formatNumber(parseFloat(itm.DocStamp.toString().replace(/,/g, '')))
      itm.Vat = formatNumber(parseFloat(itm.Vat.toString().replace(/,/g, '')))
      itm.LGovTax = formatNumber(parseFloat(itm.LGovTax.toString().replace(/,/g, '')))
      itm.Misc = formatNumber(parseFloat(itm.Misc.toString().replace(/,/g, '')))
      itm.TotalDue = formatNumber(parseFloat(itm.TotalDue.toString().replace(/,/g, '')))

      return {
        DateIssued: itm.DateIssued,
        AssuredName: itm.AssuredName,
        PolicyNo: itm.PolicyNo,
        CoverNo: itm.CoverNo,
        EffictiveDate: itm.EffictiveDate,
        InsuredValue: itm.InsuredValue,
        Premium: itm.TotalPremium,
        Subtotal: itm.TotalPremium,
        DocStamp: itm.DocStamp,
        Vat: itm.Vat,
        LGovTax: itm.LGovTax,
        Misc: itm.Misc,
        TotalDue: itm.TotalDue,
      }
    })
    newData.push({
      DateIssued: `No. of Records: ${data.length}`,
      AssuredName: "",
      PolicyNo: "",
      CoverNo: "",
      EffictiveDate: "",
      InsuredValue: "",
      Premium: "",
      Subtotal: formatNumber(getSum(newData, 'Subtotal')),
      DocStamp: formatNumber(getSum(newData, 'DocStamp')),
      Vat: formatNumber(getSum(newData, 'Vat')),
      LGovTax: formatNumber(getSum(newData, 'LGovTax')),
      Misc: formatNumber(getSum(newData, 'Misc')),
      TotalDue: formatNumber(getSum(newData, 'TotalDue'))
    })
    const props: any = {
      data: newData,
      columnWidths: [80, 100, 280, 100, 80, 80, 80, 80, 80, 80, 80, 80, 80],
      headers: [
        { headerName: 'DATE ISSUED', textAlign: "left" },
        { headerName: 'POLICY NO', textAlign: "left" },
        { headerName: 'ASSURED NAME', textAlign: "left" },
        { headerName: 'COC NO', textAlign: "left" },
        { headerName: 'EFFECTIVE DATE', textAlign: "left" },
        { headerName: 'TPL COVERAGE', textAlign: "left" },
        { headerName: 'PREMIUM', textAlign: "right" },
        { headerName: 'SUB - TOTAL', textAlign: "right" },
        { headerName: 'DOC. STAMP', textAlign: "right" },
        { headerName: 'EVAT ', textAlign: "right" },
        { headerName: 'LGT', textAlign: "right" },
        { headerName: 'STRADCOM', textAlign: "right" },
        { headerName: 'TOTAL', textAlign: "right" }
      ],
      keys: [
        'DateIssued',
        'PolicyNo',
        'AssuredName',
        'CoverNo',
        'EffictiveDate',
        'InsuredValue',
        'Premium',
        'Subtotal',
        'DocStamp',
        'Vat',
        'LGovTax',
        'Misc',
        'TotalDue'
      ],
      title,
      PAGE_WIDTH: 18.5 * 72,
      PAGE_HEIGHT: 8.5 * 72,
      MARGIN: { top: 20, right: 10, bottom: 80, left: 10 },
      beforeDraw: (pdfReportGenerator: any) => {
        pdfReportGenerator.SpanRow(newData.length - 1, 0, 3);
        pdfReportGenerator.boldRow(newData.length - 1);
        pdfReportGenerator.borderColumnInRow(newData.length - 1, [
          { column: 7, key: 'Subtotal' },
          { column: 8, key: 'DocStamp' },
          { column: 9, key: 'Vat' },
          { column: 10, key: 'LGovTax' },
          { column: 11, key: 'Misc' },
          { column: 12, key: 'TotalDue' }
        ], {
          top: true,
          bottom: false,
          left: false,
          right: false
        });

      },
      beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
        doc.font('Helvetica');
        doc.text("Prepared By:", (((pdfReportGenerator.PAGE_WIDTH / 2) - 100) - 300), pdfReportGenerator.PAGE_HEIGHT - 50, {
          align: 'right',
          width: 100,
        });
        doc.text("Checked By:", (((pdfReportGenerator.PAGE_WIDTH / 2) - 100)), pdfReportGenerator.PAGE_HEIGHT - 50, {
          align: 'right',
          width: 100,
        });
        doc.text("Noted By:", (((pdfReportGenerator.PAGE_WIDTH / 2) - 100) + 300), pdfReportGenerator.PAGE_HEIGHT - 50, {
          align: 'right',
          width: 100,
        });
      },
    }
    const pdfReportGenerator = new PDFReportGenerator(props)
    pdfReportGenerator.generatePDF(res)

  } catch (err: any) {
    console.log(err)
    res.send({ message: "SERVER ERROR", success: false, data: [] });
  }
});

ProductionReports.get('/policy-account', async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

    res.send({
      message: "Data Successfully Get",
      success: true,
      data: await prisma.$queryRawUnsafe(`
        select 'ALL' as Account
        union 
          select Account from policy_account
        `)
    });
  } catch (err: any) {
    console.log(err)
    res.send({ message: "SERVER ERROR", success: false, data: [] });
  }
})

ProductionReports.post("/get-production-report-desk", async (req, res) => {
  try {
    console.log(req.body)
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

    let dateFrom = format(parseDate(req.body.FDate), "yyyy-MM-dd");
    let dateTo = format(parseDate(req.body.TDate), "yyyy-MM-dd");

    const reportString = ProductionReport(
      dateFrom,
      dateTo,
      req.body.cmbOrder,
      req.body.cmbSubAcct,
      parseInt(req.body.cmbType),
      "",
      req.body.cmbpolicy,
      req.body.cmbSort
    );
    // console.log(reportString)
    const data: Array<any> = await prisma.$queryRawUnsafe(reportString);

    res.send({
      success: true,
      message: "Successfully get production report ",
      data,
    });
  } catch (err: any) {
    res.send({ message: "SERVER ERROR", success: false, data: [] });
  }
});


function formatNumber(num: number) {
  return (num || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
function getSum(data: Array<any>, key: string): number {
  if (data.length <= 0) {
    return 0
  }
  return data.reduce((total: number, row: any) => {
    total += parseFloat(row[key].toString().replace(/,/g, ''))
    return total
  }, 0)
}

export default ProductionReports;
