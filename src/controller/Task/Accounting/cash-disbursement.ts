import express from "express";
import {
  AddNewCashDisbursement,
  AddNewJournalFromCashDisbursement,
  GenerateCashDisbursementID,
  DeleteNewCashDisbursement,
  DeleteNewJournalFromCashDisbursement,
  updateCashDisbursementID,
  findCashDisbursement,
  searchCashDisbursement,
  findSearchSelectedCashDisbursement,
  insertVoidJournalFromCashDisbursement,
  insertVoidCashDisbursement,
  getClientFromPayTo,
} from "../../../model/Task/Accounting/cash-disbursement.model";
import saveUserLogs from "../../../lib/save_user_logs";
import { saveUserLogsCode } from "../../../lib/saveUserlogsCode";
import { VerifyToken } from "../../Authentication";
import { __executeQuery } from "../../../model/Task/Production/policy";
import PDFReportGenerator from "../../../lib/pdf-generator";
import { format } from "date-fns";
const CashDisbursement = express.Router();

CashDisbursement.get("/search-payto-clients-name", async (req, res) => {
  try {
    const { searchPdcPolicyIds } = req.query;
    const clientsId = await getClientFromPayTo(
      searchPdcPolicyIds as string,
      req
    );
    res.send({
      clientsId,
      data: clientsId,
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      bondsPolicy: null,
    });
  }
});

CashDisbursement.get("/cash-disbursement/generate-id", async (req, res) => {
  try {
    res.send({
      message: "Successfully get cash disbursement id",
      success: true,
      generatedId: await GenerateCashDisbursementID(req),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      generatedId: [],
    });
  }
});

CashDisbursement.post(
  "/cash-disbursement/add-cash-disbursement",
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
          "Cash-Disbursement"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      const cashDisbursement = (await findCashDisbursement(
        req.body.refNo,
        req
      )) as Array<any>;
      if (cashDisbursement.length > 0 && !req.body.hasSelected) {
        return res.send({
          message: `${req.body.refNo} already exist!`,
          success: true,
        });
      }
      await DeleteNewCashDisbursement(req.body.refNo, req);
      await DeleteNewJournalFromCashDisbursement(req.body.refNo, req);
      req.body.cashDisbursement.forEach(async (item: any, index: number) => {
        await AddNewCashDisbursement(
          {
            Branch_Code: item.BranchCode,
            Date_Entry: req.body.dateEntry,
            Source_Type: "CV",
            Source_No: req.body.refNo,
            Explanation: req.body.explanation,
            Particulars: req.body.particulars,
            Payto: item.Payto,
            Address: item.address,
            GL_Acct: item.code,
            cGL_Acct: item.acctName,
            cSub_Acct: item.subAcctName,
            cID_No: item.ClientName,
            Debit: parseFloat(item.debit.replace(/,/g, "")),
            Credit: parseFloat(item.credit.replace(/,/g, "")),
            Check_No: item.code === "1.01.10" ? item.checkNo : "",
            Check_Date: item.code === "1.01.10" ? item.checkDate : "",
            Remarks: item.remarks,
            Sub_Acct: item.subAcct,
            ID_No: item.IDNo,
            TC: item.TC_Code,
            VAT_Type: item.vatType,
            OR_Invoice_No: item.invoice,
            VATItemNo: parseInt(item.TempID),
          },
          req
        );
        await AddNewJournalFromCashDisbursement(
          {
            Branch_Code: "HO",
            Date_Entry: req.body.dateEntry,
            Source_Type: "CV",
            Source_No: req.body.refNo,
            Explanation: req.body.explanation,
            Particulars: req.body.particulars,
            Payto: item.Payto,
            Address: item.address,
            GL_Acct: item.code,
            cGL_Acct: item.acctName,
            cSub_Acct: item.subAcctName,
            cID_No: item.ClientName,
            Debit: parseFloat(item.debit.replace(/,/g, "")),
            Credit: parseFloat(item.credit.replace(/,/g, "")),
            Check_No: item.code === "1.01.10" ? item.checkNo : "",
            Check_Date: item.code === "1.01.10" ? item.checkDate : "",
            Remarks: item.remarks,
            Sub_Acct: "HO",
            ID_No: item.IDNo,
            TC: item.TC_Code,
            VAT_Type: item.vatType,
            OR_Invoice_No: item.invoice,
            VATItemNo: parseInt(item.TempID),
            Source_No_Ref_ID: "",
          },
          req
        );
      });

      if (!req.body.hasSelected) {
        await updateCashDisbursementID(req.body.refNo.split("-")[1], req);
        await saveUserLogs(req, req.body.refNo, "add", "Cash-Disbursement");
      }

      res.send({
        message: req.body.hasSelected
          ? `Successfully update ${req.body.refNo}  in cash disbursement`
          : `Successfully add new ${req.body.refNo} in cash disbursement`,
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

CashDisbursement.post(
  "/cash-disbursement/void-cash-disbursement",
  async (req, res) => {
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
          "Cash-Disbursement"
        ))
      ) {
        return res.send({ message: "Invalid User Code", success: false });
      }

      await DeleteNewCashDisbursement(req.body.refNo, req);
      await insertVoidJournalFromCashDisbursement(
        req.body.refNo,
        req.body.dateEntry,
        req
      );
      await DeleteNewJournalFromCashDisbursement(req.body.refNo, req);
      await insertVoidCashDisbursement(req.body.refNo, req.body.dateEntry, req);
      await saveUserLogs(req, req.body.refNo, "void", "Cash-Disbursement");
      res.send({
        message: `Successfully void ${req.body.refNo} in cash disbursement`,
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

CashDisbursement.get(
  "/cash-disbursement/search-cash-disbursement",
  async (req, res) => {
    try {
      const { searchCashDisbursement: search } = req.query;
      res.send({
        message: "Successfully get search cash disbursement",
        success: true,
        search: await searchCashDisbursement(search as string, req),
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        search: [],
      });
    }
  }
);

CashDisbursement.post(
  "/cash-disbursement/get-selected-search-cash-disbursement",
  async (req, res) => {
    try {
      const selectedCashDisbursement = await findSearchSelectedCashDisbursement(
        req.body.Source_No,
        req
      );
      res.send({
        message: "Successfully get selected search in cash disbursement",
        success: true,
        selectedCashDisbursement,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        selectedCashDisbursement: [],
        PrintDetails1: [],
        PrintDetails2: [],
      });
    }
  }
);

// CashDisbursement.post('/cash-disbursement/print', async (req, res) => {
//   try {
//     const PrintPayeeDetails = await __executeQuery(`
//       SELECT
//     cGL_Acct AS Account,
//     cSub_Acct AS SubAccount,
//     cID_No AS Identity,
//     Debit,
//     Credit,
//     Source_No AS CvNo,
//     Date_Entry AS DateApproved,
//     Payto AS PayeeName,
//     Particulars,
//     Address,
//     Check_No AS CheckNo,
//     Check_Date AS CheckDate,
//     DebitTotal,
//     CreditTotal
//     FROM
//     Journal AS J
//     INNER JOIN (
//       SELECT
//       Source_No AS CvNo,
//       SUM(Debit) AS DebitTotal,
//       SUM(Debit) AS CreditTotal
//       FROM Journal WHERE
//       LEFT(Explanation,7) <> '-- Void' AND
//       Source_Type = 'CV' AND
//       Source_No = '${req.body.Source_No}' GROUP BY Source_No
//     ) AS T ON J.Source_No = T.CvNo
//     WHERE LEFT(Explanation,7) <> '-- Void' AND
//       Source_Type = 'CV' AND
//       Source_No = '${req.body.Source_No}' AND
//       (Check_No IS NOT NUll AND Check_No <> '')
//     ORDER BY debit Desc, credit
//     `, req)
//     const PrintTable = await __executeQuery(`
//     SELECT
//       cGL_Acct AS Account,
//       cID_No AS Identity,
//       Debit,
//       Credit
//     FROM Journal
//     WHERE LEFT(Explanation,7) <> '-- Void' AND
//     Source_Type = 'CV' AND
//     Source_No = '${req.body.Source_No}'
//     ORDER BY Credit
//     `, req)
//     res.send({
//       message: "Successfully get search cash disbursement",
//       success: true,
//       print: {
//         PrintPayeeDetails,
//         PrintTable
//       },
//     });

//   } catch (error: any) {
//     console.log(error.message);
//     res.send({
//       message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
//       success: false,
//       print: {}
//     });
//   }
// })

// [
//   {
//     Account: 'Cash in Bank',
//     SubAccount: 'Head Office',
//     Identity: 'A4 Copy System Phils Inc.',
//     Debit: 0,
//     Credit: 1000,
//     CvNo: '2501-10602',
//     DateApproved: '2025-01-21',
//     PayeeName: 'ABACUS BOOK AND CARD CORP. ',
//     Particulars: 'sambong',
//     Address: null,
//     CheckNo: '8871233',
//     CheckDate: '2025-01-21',
//     DebitTotal: 1000,
//     CreditTotal: 1000
//   }
// ]
CashDisbursement.post("/cash-disbursement/print", async (req, res) => {
  try {
    const PrintPayeeDetails: any = await __executeQuery(
      `
      SELECT 
    cGL_Acct AS Account,
    cSub_Acct AS SubAccount,
    cID_No AS Identity,
    Debit, 
    Credit, 
    Source_No AS CvNo, 
    Date_Entry AS DateApproved, 
    Payto AS PayeeName,
    Particulars, 
    Address,
    Check_No AS CheckNo,
    Check_Date AS CheckDate,
    DebitTotal,
    CreditTotal 
    FROM 
    Journal AS J 
    INNER JOIN (
      SELECT 
      Source_No AS CvNo,
      SUM(Debit) AS DebitTotal,
      SUM(Debit) AS CreditTotal 
      FROM Journal WHERE
      LEFT(Explanation,7) <> '-- Void' AND 
      Source_Type = 'CV' AND 
      Source_No = '${req.body.Source_No}' GROUP BY Source_No 
    ) AS T ON J.Source_No = T.CvNo 
    WHERE LEFT(Explanation,7) <> '-- Void' AND 
      Source_Type = 'CV' AND 
      Source_No = '${req.body.Source_No}' AND 
      (Check_No IS NOT NUll AND Check_No <> '') 
    ORDER BY debit Desc, credit
    `,
      req
    );
    const PrintTable = await __executeQuery(
      `
    SELECT 
      cGL_Acct AS Account,
      cID_No AS Identity,
      Debit, 
      Credit 
    FROM Journal 
    WHERE LEFT(Explanation,7) <> '-- Void' AND
    Source_Type = 'CV' AND 
    Source_No = '${req.body.Source_No}' 
    ORDER BY Credit
    `,
      req
    );
    let PAGE_WIDTH = 612;
    let PAGE_HEIGHT = 792;
    const props: any = {
      data: PrintTable,
      BASE_FONT_SIZE: 8,
      columnWidths: [100, 300, 100, 100],
      headers: [
        { headerName: "ACCOUNT", width: "200px" },
        { headerName: "IDENTITY", width: "277px" },
        { headerName: "DEBIT", width: "100px" },
        { headerName: "CREDIT", width: "100px" },
      ],
      keys: ["Account", "Identity", "Debit", "Credit"],
      title: "",
      PAGE_WIDTH,
      PAGE_HEIGHT,
      MARGIN: { top: 250, right: 10, bottom: 80, left: 10 },
      beforeDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
        doc.fontSize(16);
        doc.text("UPWARD MANAGEMENT INSURANCE SERVICES", 0, 40, {
          align: "center",
          baseline: "middle",
        });
        doc.fontSize(9);
        doc.text("1197 Edsa Katipunan Quezon City", 0, 58, {
          align: "center",
          baseline: "middle",
        });
        doc.fontSize(8);
        doc.text("Tel 374-0472 / 441-8977-78", 0, 70, {
          align: "center",
          baseline: "middle",
        });

        doc.fontSize(9);
        // first line
        doc.font("Helvetica-Bold");
        doc.text("Pay To. :", 20, 85, {
          align: "left",
        });

        const x = 70;
        const y = 85;

        doc.font("Helvetica-Bold");
        const textWidth = 390;
        const textHeight = doc.currentLineHeight();
        doc.text(PrintPayeeDetails[0].PayeeName, x, y, { align: "left" ,width:400});


        doc.font("Helvetica-Bold");
        doc.text("CV No. :", textWidth + 100, 85, {
          align: "left",
        });

        doc.font("Helvetica-Bold");
        doc.text(PrintPayeeDetails[0].CvNo, textWidth + 100 + 40, 85, {
          align: "left",
        });


        doc.font("Helvetica-Bold");
        doc.text("Address. :", 20, 110, {
          align: "left",
        });

        doc.font("Helvetica-Bold");
        doc.text(PrintPayeeDetails[0].PayeeName, x, 110, { align: "left" ,width:400});


        doc.font("Helvetica-Bold");
        doc.text("Date :", textWidth + 100, 110, {
          align: "left",
        });

        doc.font("Helvetica-Bold");
        doc.text(PrintPayeeDetails[0].CvNo, textWidth + 100 + 40, 110, {
          align: "left",
        });

        doc.moveTo(x, 10) // Starting point
          .lineTo(x, 100)   // Ending point
          .stroke();       

        doc.fontSize(9);
        doc.font("Helvetica-Bold");
      },
      beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
        doc.font("Helvetica");
        doc.text(
          "Prepared : __________________     Checked : __________________      Approved : ___________________",
          30,
          pdfReportGenerator.PAGE_HEIGHT - 70,
          {
            align: "center",
            width: PAGE_WIDTH - 60,
          }
        );
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
          PAGE_WIDTH - 130,
          pdfReportGenerator.PAGE_HEIGHT - 35,
          {
            align: "right",
            width: 100,
          }
        );

        doc.text(
          format(new Date(), "MM/dd/yyyy"),
          -25,
          pdfReportGenerator.PAGE_HEIGHT - 35,
          {
            align: "right",
            width: 100,
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
    });
  }
});

export default CashDisbursement;
