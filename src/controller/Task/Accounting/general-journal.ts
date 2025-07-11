import express, { Request, response } from "express";
import {
  getTransactionAccount,
  getPolicyIdClientIdRefId,
  getChartOfAccount,
  GenerateGeneralJournalID,
  addJournalVoucher,
  addJournalFromJournalVoucher,
  updateGeneralJournalID,
  searchGeneralJournal,
  getSelectedSearchGeneralJournal,
  deleteGeneralJournal,
  deleteJournalFromGeneralJournal,
  voidGeneralJournal,
  insertVoidGeneralJournal,
  voidJournalFromGeneralJournal,
  insertVoidJournalFromGeneralJournal,
  doRPTTransaction,
  doRPTTransactionLastRow,
  doMonthlyProduction,
  findeGeneralJournal,
} from "../../../model/Task/Accounting/general-journal.model";
import { getMonth, getYear, endOfMonth, format } from "date-fns";
import saveUserLogs from "../../../lib/save_user_logs";
import { saveUserLogsCode } from "../../../lib/saveUserlogsCode";
import { VerifyToken } from "../../Authentication";
import { defaultFormat } from "../../../lib/defaultDateFormat";
import PDFReportGenerator from "../../../lib/pdf-generator";
import {
  formatNumber,
  getSum,
} from "../../Reports/Production/production-report";
const GeneralJournal = express.Router();

/// new

GeneralJournal.post(
  "/general-journal/search-general-journal",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully get get general journal id",
        success: true,
        data: await searchGeneralJournal(req.body.search, req),
      });
    } catch (error: any) {
      console.log(error.message);

      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        data: [],
      });
    }
  }
);
GeneralJournal.post("/general-journal/get-chart-account", async (req, res) => {
  try {
    res.send({
      message: "Successfully get chart account",
      success: true,
      data: await getChartOfAccount(req.body.search, req),
    });
  } catch (error: any) {
    console.log(error.message);

    res.send({
      data: [],
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
    });
  }
});
GeneralJournal.post(
  "/general-journal/get-transaction-account",
  async (req, res) => {
    try {
      console.log("qweqweeeee");
      res.send({
        message: "Successfully get transaction account",
        success: true,
        data: await getTransactionAccount(req.body.search as string, req),
      });
    } catch (error: any) {
      console.log(error.message);

      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        data: [],
      });
    }
  }
);
GeneralJournal.post("/general-journal/print", async (req, res) => {
  try {
    const PAGE_WIDTH = 635;
    const PAGE_HEIGHT = 792;
    const newData = req.body.generalJournal;
    console.log(req.body);
    newData.push({
      code: "",
      acctName: "",
      IDNo: "",
      ClientName: "TOTAL : ",
      debit: formatNumber(getSum(newData, "debit")),
      credit: formatNumber(getSum(newData, "credit")),
    });

    newData.push({
      code: "EXPLANATION",
      acctName: "",
      IDNo: "",
      ClientName: "",
      debit: "",
      credit: "",
    });
    newData.push({
      code: `${req.body.JVExp}`,
      acctName: "",
      IDNo: "",
      ClientName: "",
      debit: "",
      credit: "",
    });

    newData.push({
      code: `

    ____________________                   ____________________                   ____________________
        Prepared By                                       Checked By                                      Approved By
      `,
      acctName: "",
      IDNo: "",
      ClientName: "",
      debit: "",
      credit: "",
    });
    const props: any = {
      data: newData,
      columnWidths: [50, 100, 90, 130, 85, 85],
      headers: [
        { headerName: "ACCT #", textAlign: "left" },
        { headerName: "ACCOUNT TITLE", textAlign: "left" },
        { headerName: "ID NO.", textAlign: "left" },
        { headerName: "IDENTITY", textAlign: "left" },
        { headerName: "DEBIT", textAlign: "right" },
        { headerName: "CREDIT", textAlign: "right" },
      ],
      keys: ["code", "acctName", "IDNo", "ClientName", "debit", "credit"],
      title: "",
      setRowFontSize: 9,
      BASE_FONT_SIZE: 8,
      PAGE_WIDTH,
      PAGE_HEIGHT,
      // addMarginInFirstPage: 40,
      MARGIN: { top: 70, right: 40, bottom: 30, left: 40 },
      addHeaderBorderBottom: true,
      beforeDraw: (
        pdfReportGenerator: PDFReportGenerator,
        doc: PDFKit.PDFDocument
      ) => {
        pdfReportGenerator.borderColumnInRow(
          newData.length - 4,
          [
            { column: 0, key: "code" },
            { column: 1, key: "acctName" },
            { column: 2, key: "IDNo" },
            { column: 3, key: "ClientName" },
            { column: 4, key: "debit" },
            { column: 5, key: "credit" },
          ],
          {
            top: true,
            bottom: false,
            left: false,
            right: false,
          }
        );
        pdfReportGenerator.borderColumnInRow(
          newData.length - 3,
          [
            { column: 0, key: "code" },
            { column: 1, key: "acctName" },
            { column: 2, key: "IDNo" },
            { column: 3, key: "ClientName" },
            { column: 4, key: "debit" },
            { column: 5, key: "credit" },
          ],
          {
            top: true,
            bottom: false,
            left: false,
            right: false,
          }
        );
        pdfReportGenerator.borderColumnInRow(
          newData.length - 2,
          [
            { column: 0, key: "code" },
            { column: 1, key: "acctName" },
            { column: 2, key: "IDNo" },
            { column: 3, key: "ClientName" },
            { column: 4, key: "debit" },
            { column: 5, key: "credit" },
          ],
          {
            top: true,
            bottom: false,
            left: false,
            right: false,
          }
        );

        pdfReportGenerator.setAlignment(newData.length - 4, 3, "center");
        pdfReportGenerator.boldRow(newData.length - 4);

        pdfReportGenerator.SpanRow(newData.length - 3, 0, 6);
        pdfReportGenerator.setAlignment(newData.length - 3, 0, "center");
        pdfReportGenerator.boldRow(newData.length - 3);

        pdfReportGenerator.SpanRow(newData.length - 2, 0, 6);
        pdfReportGenerator.setAlignment(newData.length - 2, 0, "center");
        pdfReportGenerator.boldRow(newData.length - 2);

        pdfReportGenerator.SpanRow(newData.length - 1, 0, 6);
        pdfReportGenerator.setAlignment(newData.length - 1, 0, "center");
        pdfReportGenerator.boldRow(newData.length - 1);
      },
      beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
        //
        // pdfReportGenerator.boldRow(newData.length - 1);

        doc.font("Helvetica-Bold");
        doc.fontSize(14);
        doc.text(req.body.reportTitle, 40, 20, {
          align: "left",
          width: 500,
        });
        doc.fontSize(12);
        doc.text("Journal Voucher", 40, 37, {
          align: "left",
          width: 400,
        });
        doc.fontSize(10);
        doc.text(`JV No. : ${req.body.JVNo}`, PAGE_WIDTH - 155, 50, {
          align: "left",
          width: 130,
        });
        doc.text(
          `Date   : ${format(new Date(req.body.JVDate), "MM/dd/yyyy")}`,
          PAGE_WIDTH - 155,
          65,
          {
            align: "left",
            width: 130,
          }
        );
        doc.fontSize(9);
      },
      drawPageNumber: (
        doc: PDFKit.PDFDocument,
        currentPage: number,
        totalPages: number,
        pdfReportGenerator: any
      ) => {
        doc.font("Helvetica");
        const pageNumberText = `Page ${currentPage}`;
        doc.text(
          pageNumberText,
          PAGE_WIDTH - 160,
          pdfReportGenerator.PAGE_HEIGHT - 35,
          {
            align: "right",
            width: 100,
          }
        );

        doc.text(
          `Printed: ${format(new Date(), "MM/dd/yyyy, hh:mm a")}`,
          -35,
          pdfReportGenerator.PAGE_HEIGHT - 35,
          {
            align: "right",
            width: 200,
          }
        );
      },
    };
    const pdfReportGenerator = new PDFReportGenerator(props);
    return pdfReportGenerator.generatePDF(res);
  } catch (error: any) {
    console.log(error.message);

    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
});
//// old
GeneralJournal.post(
  "/general-journal/add-general-journal",
  async (req, res) => {
    const { userAccess }: any = await VerifyToken(
      req.cookies["up-ac-login"] as string,
      process.env.USER_ACCESS as string
    );
    if (userAccess.includes("ADMIN")) {
      return res.send({
        message: `CAN'T ${
          req.body.hasSelected ? "UPDATE" : "SAVE"
        }, ADMIN IS FOR VIEWING ONLY!`,
        success: false,
      });
    }
    try {
      if (
        req.body.hasSelected &&
        !(await saveUserLogsCode(
          req,
          "edit",
          req.body.refNo,
          "General-Journal"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      const generalJournal = (await findeGeneralJournal(
        req.body.refNo,
        req
      )) as Array<any>;
      if (generalJournal.length > 0 && !req.body.hasSelected) {
        return res.send({
          message: `${req.body.refNo} already exist!`,
          success: false,
        });
      }
      await deleteGeneralJournal(req.body.refNo, req);
      await deleteJournalFromGeneralJournal(req.body.refNo, req);

      req.body.generalJournal.forEach(async (item: any) => {
        await addJournalVoucher(
          {
            Branch_Code: "HO",
            Date_Entry: defaultFormat(new Date(req.body.dateEntry)), // Assuming dtpDate is a valid date
            Source_Type: "GL",
            Source_No: req.body.refNo,
            Explanation: req.body.explanation,
            GL_Acct: item.code,
            cGL_Acct: item.acctName,
            cSub_Acct: "HO",
            cID_No: item.ClientName,
            Debit: parseFloat(item.debit.replace(/,/g, "")),
            Credit: parseFloat(item.credit.replace(/,/g, "")),
            TC: item.TC_Code,
            Remarks: item.remarks,
            Sub_Acct: item.subAcct,
            ID_No: item.IDNo,
            VAT_Type: item.vatType,
            OR_Invoice_No: item.invoice,
            VATItemNo:item.rowIndex
          },
          req
        );
        await addJournalFromJournalVoucher(
          {
            Branch_Code: "HO",
            Date_Entry: defaultFormat(new Date(req.body.dateEntry)), // Assuming dtpDate is a valid date
            Source_Type: "GL",
            Source_No: req.body.refNo,
            Explanation: req.body.explanation,
            GL_Acct: item.code,
            cGL_Acct: item.acctName,
            cSub_Acct: "HO",
            cID_No: item.ClientName,
            Debit: parseFloat(item.debit.replace(/,/g, "")),
            Credit: parseFloat(item.credit.replace(/,/g, "")),
            TC: item.TC_Code,
            Remarks: item.remarks,
            Sub_Acct: item.subAcct,
            ID_No: item.IDNo,
            VAT_Type: item.vatType,
            OR_Invoice_No: item.invoice,
            Source_No_Ref_ID: "",
          },
          req
        );
      });

      if (!req.body.hasSelected) {
        await updateGeneralJournalID(req.body.refNo.split("-")[1], req);
        await saveUserLogs(req, req.body.refNo, "add", "General-Journal");
      }

      res.send({
        message: req.body.hasSelected
          ? `Successfully update ${req.body.refNo}  in general journal`
          : `Successfully add new ${req.body.refNo} in general journal`,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
      });
    }
  }
);
GeneralJournal.post(
  "/general-journal/void-general-journal",
  async (req, res) => {
    console.log(req.body);
    const { userAccess }: any = await VerifyToken(
      req.cookies["up-ac-login"] as string,
      process.env.USER_ACCESS as string
    );
    if (userAccess.includes("ADMIN")) {
      return res.send({
        message: `CAN'T VOID, ADMIN IS FOR VIEWING ONLY!`,
        success: false,
      });
    }

    try {
      if (
        !(await saveUserLogsCode(
          req,
          "void",
          req.body.refNo,
          "General-Journal"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      await voidGeneralJournal(req.body.refNo, req);
      await insertVoidGeneralJournal(req.body.refNo, req.body.dateEntry, req);
      await voidJournalFromGeneralJournal(req.body.refNo, req);
      await insertVoidJournalFromGeneralJournal(
        req.body.refNo,
        req.body.dateEntry,
        req
      );
      await saveUserLogs(req, req.body.refNo, "void", "General-Journal");
      res.send({
        message: `Successfully void ${req.body.refNo} in general journal`,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
      });
    }
  }
);
GeneralJournal.get(
  "/general-journal/get-general-journal-id",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully get get general journal id",
        success: true,
        generateGeneralJournalID: await GenerateGeneralJournalID(req),
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        generateGeneralJournalID: [],
      });
    }
  }
);

GeneralJournal.get("/general-journal/get-chart-account", async (req, res) => {
  const { chartAccountSearch: search } = req.query;
  try {
    res.send({
      message: "Successfully get chart account",
      success: true,
      getChartOfAccount: await getChartOfAccount(search as string, req),
    });
  } catch (error: any) {
    console.log(error.message);

    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
    });
  }
});

GeneralJournal.get(
  "/general-journal/get-policyId-ClientId-RefId",
  async (req, res) => {
    const { policyClientRefIDSearch: search } = req.query;
    try {
      res.send({
        message: "Successfully get policy, client, ref, ID",
        success: true,
        getPolicyIdClientIdRefId: await getPolicyIdClientIdRefId(
          search as string,
          req
        ),
      });
    } catch (error: any) {
      console.log(error.message);

      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
      });
    }
  }
);

GeneralJournal.get(
  "/general-journal/get-transaction-account",
  async (req, res) => {
    const { transactionCodeSearch: search } = req.query;
    try {
      res.send({
        message: "Successfully get transaction account",
        success: true,
        getTransactionAccount: await getTransactionAccount(
          search as string,
          req
        ),
      });
    } catch (error: any) {
      console.log(error.message);

      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        getTransactionAccount: [],
      });
    }
  }
);

GeneralJournal.get(
  "/general-journal/search-general-journal",
  async (req, res) => {
    const { searchGeneralJournal: search } = req.query;
    try {
      res.send({
        message: "Successfully get get general journal id",
        success: true,
        searchGeneralJournal: await searchGeneralJournal(search as string, req),
      });
    } catch (error: any) {
      console.log(error.message);

      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        searchGeneralJournal: [],
      });
    }
  }
);

GeneralJournal.post(
  "/general-journal/get-selected-search-general-journal",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully get selected  general journal ",
        success: true,
        getSelectedSearchGeneralJournal: await getSelectedSearchGeneralJournal(
          req.body.Source_No,
          req
        ),
      });
    } catch (error: any) {
      console.log(error.message);

      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        getSelectedSearchGeneralJournal: [],
      });
    }
  }
);

GeneralJournal.post("/general-journal/jobs", async (req, res) => {
  let response = [];

  switch (req.body.jobType) {
    case "":
      response = [];
      break;
    case "0":
      response = [];
      break;
    case "1":
      response = [];
      break;
    case "2":
      response = [];
      break;
    case "3":
      response = [];
      break;
    case "4":
      const { from: fromNilData, to: toNilDate } = RPTComputationDate(
        req.body.jobTransactionDate
      );
      response = await RPTComputation(
        (await doRPTTransaction(
          fromNilData,
          toNilDate,
          "N I L - HN",
          req
        )) as Array<any>,
        req
      );
      break;
    case "5":
      const { from: fromAMIFIN, to: toAMIFIN } = RPTComputationDate(
        req.body.jobTransactionDate
      );
      response = await RPTComputation(
        (await doRPTTransaction(
          fromAMIFIN,
          toAMIFIN,
          "AMIFIN",
          req
        )) as Array<any>,
        req
      );
      break;
    case "6":
      response = [];
      break;
    case "7":
      response = [];
      break;
    case "8":
      response = [];
      break;
    case "9":
      response = await MonthlyProductionComputation(
        req.body.jobTransactionDate,
        "MILESTONE GUARANTEE",
        req
      );
      break;
    case "10":
      response = await MonthlyProductionComputation(
        req.body.jobTransactionDate,
        "LIBERTY INSURANCE CO",
        req
      );
      break;
    case "11":
      response = await MonthlyProductionComputation(
        req.body.jobTransactionDate,
        "FEDERAL PHOENIX",
        req
      );
      break;
    case "12":
     const { from: fromNilAstraData, to: toNilAstraDate } = RPTComputationDate(
        req.body.jobTransactionDate
      );
      response = await RPTComputation(
        (await doRPTTransaction(
          fromNilAstraData,
          toNilAstraDate,
          "N I L - ASTRA",
          req
        )) as Array<any>,
        req
      );
      break;
    default:
      response = [];
  }

  try {
    res.send({
      message: "Successfully get jobs ",
      success: true,
      jobs: response,
    });
  } catch (error: any) {
    console.log(error.message);

    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      jobs: [],
    });
  }
});

async function RPTComputation(jobs: Array<any>, req: Request) {
  let response = [];
  const debit = jobs.reduce((a: number, b: any) => {
    return a + parseFloat(b.credit.replace(/,/g, ""));
  }, 0);

  // insert credit
  const overrideItems = {
    code: "4.02.01",
    acctName: "Accounts Payable",
    debit: "0.0",
    TC_Code: "RPT",
    remarks: "",
    vatType: "",
    invoice: "",
  };
  // insert debit
  const addItem = {
    code: "1.05.01",
    acctName: "Related Party Transaction",
    subAcctName: "",
    ClientName: "",
    debit: debit.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    credit: "0.00",
    TC_Code: "RPT",
    remarks: "",
    vatType: "",
    invoice: "",
    IDNo: "",
    BranchCode: "",
    TempID: (jobs.length + 1).toString().padStart(3, "0"),
    ...((await doRPTTransactionLastRow(req)) as Array<any>)[0],
  };

  response = jobs.map((d: any) => {
    d = {
      ...d,
      ...overrideItems,
    };
    return d;
  });

  if (jobs.length > 0) {
    response.push(addItem);
  }

  return response;
}

function RPTComputationDate(jobTransactionDate: any) {
  const month = getMonth(new Date(jobTransactionDate)) + 1;
  const from = `${
    month.toString().length > 1 ? month : "0" + month
  }-01-${getYear(new Date(jobTransactionDate))}`;
  const to = format(endOfMonth(new Date(jobTransactionDate)), "MM-dd-yyyy");

  return { from, to };
}

async function MonthlyProductionComputation(
  jobTransactionDate: any,
  account: string,
  req: Request
) {
  const id = {
    "MILESTONE GUARANTEE": "UIA-1207-018",
    "LIBERTY INSURANCE CO": "SUP025",
    "FEDERAL PHOENIX": "UIO-1312-002",
  }[account];
  const date = new Date(jobTransactionDate);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const milestone = (await doMonthlyProduction(
    account,
    month,
    year,
    req
  )) as Array<any>;
  const addItem = {
    code: "4.02.01",
    acctName: "Accounts Payable",
    credit: "0.00",
    TC_Code: "",
    remarks: "",
    vatType: "",
    invoice: "",
  };

  if (milestone.length <= 0) return [];

  const milestoneCredit = milestone.reduce((a: number, b: any) => {
    return a + parseFloat(b.debit.toString().replace(/,/g, ""));
  }, 0);

  const milestoneData = milestone.map((item) => {
    item = {
      ...item,
      ...addItem,
    };
    return item;
  });

  milestoneData.push({
    code: "4.02.01",
    acctName: "Accounts Payable",
    subAcctName: "HO",
    ClientName: id,
    debit: "0.00",
    credit: milestoneCredit.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    TC_Code: "",
    remarks: "",
    vatType: "",
    invoice: "",
    TempID: (milestone.length + 1).toString().padStart(3, "0"),
    IDNo: id,
    BranchCode: "",
  });

  return milestoneData;
}

export default GeneralJournal;
