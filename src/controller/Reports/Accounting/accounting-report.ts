import express, { Request, Response } from "express";
import {
  _GeneralLedgerReport,
  AbstractCollections,
  AgingAccountsReport,
  CashDisbursementBook_GJB,
  FinancialStatement,
  FinancialStatementSumm,
  PostDatedCheckRegistered,
} from "../../../model/db/stored-procedured";
import { PrismaList } from "../../../model/connection";
import { __executeQuery } from "../../../model/Task/Production/policy";
import { qry_id_policy_sub, qryJournal } from "../../../model/db/views";
import { format, subDays } from "date-fns";
import PDFReportGenerator from "../../../lib/pdf-generator";
import { formatNumber, getSum } from "../Production/production-report";
import { defaultFormat } from "../../../lib/defaultDateFormat";
import { prisma } from "../../index";
import PDFDocument, { text } from "pdfkit";
import fs from "fs";

const accountingReporting = express.Router();

accountingReporting.post("/report/get-chart-account", async (req, res) => {
  try {
    const qry = `
    SELECT 
            Acct_Code AS Code, Acct_Title AS Title, Short AS Short_Name
        FROM
            Chart_Account
        WHERE
            Inactive = 0
                AND (Acct_Code LIKE '%${req.body.search}%' OR Short LIKE '%${req.body.search}%'
                OR Acct_Title LIKE '%${req.body.search}%')
        ORDER BY Acct_Code
    `;
    res.send({
      message: "Successfully Get Report",
      success: true,
      data: await prisma.$queryRawUnsafe(qry),
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({
      message: err.message,
      success: false,
      data: [],
    });
  }
});
accountingReporting.post("/report/get-list-of-insurance", async (req, res) => {
  try {
    res.send({
      message: "Successfully Get Report",
      success: true,
      data: await prisma.$queryRawUnsafe(
        `select AccountCode from policy_account`
      ),
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({
      message: err.message,
      success: false,
      data: [],
    });
  }
});
accountingReporting.post("/report/sub-account", async (req, res) => {
  try {
    res.send({
      message: "Successfully get Sub Account",
      success: true,
      data: await prisma.$queryRawUnsafe(
        `SELECT Acronym FROM Sub_Account order by Acronym asc`
      ),
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
      data: [],
    });
  }
});
accountingReporting.post("/report/sub-account-search", async (req, res) => {
  try {
    res.send({
      message: "Successfully get Sub Account",
      success: true,
      data: await prisma.$queryRawUnsafe(
        `SELECT Acronym, ShortName FROM Sub_Account where Acronym like '%${req.body.search}%'  order by Acronym asc`
      ),
    });
  } catch (err: any) {
    res.send({
      message: err.message,
      success: false,
      data: [],
    });
  }
});
// Schedule Account
accountingReporting.post(
  "/report/generate-report-schedule-of-account",
  async (req, res) => {
    try {
      ScheduleAccounts(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);
// Subsidiary Ledger
accountingReporting.post(
  "/report/generate-report-subsidiary-ledger",
  async (req, res) => {
    try {
      SubsidiaryLedger(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);
// Trial Balance
accountingReporting.post(
  "/report/generate-report-trial-balance",
  async (req, res) => {
    try {
      TrialBalance(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);
// Income Statement
accountingReporting.post(
  "/report/generate-report-income-statement",
  async (req, res) => {
    try {
      IncomeStatement(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);
// Balance Sheet
accountingReporting.post(
  "/report/generate-report-balance-sheet",
  async (req, res) => {
    try {
      BalanceSheet(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);
// General Ledger
accountingReporting.post(
  "/report/generate-report-general-ledger",
  async (req, res) => {
    try {
      GeneralLedger(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);
// Abstract of Collections
accountingReporting.post(
  "/report/generate-report-abstract-collection",
  async (req, res) => {
    try {
      AbstractCollection(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);
// General Journal Book - GJB
accountingReporting.post(
  "/report/generate-report-general-journal-book-GJB",
  async (req, res) => {
    try {
      GeneralJournalBookGJB(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);
// Post Dated Check Registry
accountingReporting.post(
  "/report/generate-report-post-dated-checks-registry",
  async (req, res) => {
    try {
      PostDatedChecksRegistry(req, res);
    } catch (err: any) {
      res.send({
        message: err.message,
        success: false,
        data: [],
      });
    }
  }
);

async function ScheduleAccounts(req: Request, res: Response) {
  const { IDEntryWithPolicy } = qry_id_policy_sub();
  const id_entry = `
      select a.IDNo, a.Sub_Acct, a.ShortName as _Shortname , a.client_name as ShortName from (${IDEntryWithPolicy}) a
    `;
  const _qryJournal = qryJournal();
  const {
    account,
    report,
    subsi,
    date,
    sort,
    order,
    subsiText,
    insurance,
    title,
  } = req.body;
  const dateFormatted = format(new Date(date), "yyyy-MM-dd");
  let qry = "";
  let imHere = 0;
  if (parseInt(subsi) === 0) {
    imHere = 0;
    if (report === "GL Account (Detailed)") {
      qry = `
        SELECT 
              qryJournal.GL_Acct, 
              qryJournal.Sub_Acct, 
              qryJournal.mSub_Acct,
              Sum(qryJournal.mDebit) AS Debit, 
              Sum(qryJournal.mCredit) AS Credit, 
              IF(SUBSTRING(GL_Acct, 1, 1) <= '3' OR SUBSTRING(GL_Acct, 1, 1) = '7', 
              SUM(qryJournal.mDebit) - SUM(qryJournal.mCredit), 
              SUM(qryJournal.mCredit) - SUM(qryJournal.mDebit)) AS Balance
              From (${_qryJournal}) QryJournal 
              WHERE (((qryJournal.Source_Type) <>'BF' And (qryJournal.Source_Type) <>'BFD' And (qryJournal.Source_Type) <>'BFS') AND ((qryJournal.Date_Entry) <='${dateFormatted}')) 
              GROUP BY qryJournal.GL_Acct, qryJournal.Sub_Acct, qryJournal.mSub_Acct 
              HAVING (qryJournal.GL_Acct='${account.trim()}') ${
        subsiText.toUpperCase() === "ALL"
          ? ""
          : ` AND (qryJournal.Sub_Acct='${subsiText}')) `
      } 
              ORDER BY  ${
                parseInt(sort) === 0
                  ? "qryJournal.mSub_Acct"
                  : "qryJournal.Sub_Acct"
              }  ${parseInt(order) === 0 ? "ASC" : "DESC"}
        `;
    } else {
      qry = `
        SELECT 
              qryJournal.GL_Acct, 
              qryJournal.Sub_Acct, 
              qryJournal.mSub_Acct,
              Sum(qryJournal.mDebit) AS Debit, 
              Sum(qryJournal.mCredit) AS Credit, 
              IF(SUBSTRING(GL_Acct, 1, 1) <= '3' OR SUBSTRING(GL_Acct, 1, 1) = '7', 
              SUM(qryJournal.mDebit) - SUM(qryJournal.mCredit), 
              SUM(qryJournal.mCredit) - SUM(qryJournal.mDebit)) AS Balance
              From (${_qryJournal}) QryJournal 
              WHERE (((qryJournal.Source_Type) <>'BF' And (qryJournal.Source_Type) <>'BFD' And (qryJournal.Source_Type) <>'BFS') AND ((qryJournal.Date_Entry) <='${dateFormatted}')) 
              GROUP BY qryJournal.GL_Acct, qryJournal.Sub_Acct, qryJournal.mSub_Acct 
              ORDER BY  ${
                parseInt(sort) === 0
                  ? "qryJournal.mSub_Acct"
                  : "qryJournal.Sub_Acct"
              }  ${parseInt(order) === 0 ? "ASC" : "DESC"}
        `;
    }
  } else if (parseInt(subsi) === 1) {
    imHere = 1;

    if (subsiText.trim().toUpperCase() !== "ALL") {
      if (report === "GL Account (Detailed)") {
        qry = `
          SELECT * FROM (
             SELECT 
            qryJournal.GL_Acct, qryJournal.ID_No, 
            ifnull(c.Shortname,ifnull(qryJournal.mID,b.Shortname)) as 'mID',
            Sum(qryJournal.mDebit) AS Debit, Sum(qryJournal.mCredit) AS Credit, 
            IF(SUBSTRING(GL_Acct, 1, 1) <= '3' OR SUBSTRING(GL_Acct, 1, 1) = '7', 
                SUM(qryJournal.mDebit) - SUM(qryJournal.mCredit), 
                SUM(qryJournal.mCredit) - SUM(qryJournal.mDebit)) AS Balance
          From (${_qryJournal}) qryJournal 
          left join (${id_entry})  b on b.IDNo = qryJournal.ID_No 
          left join (
          select a.PolicyNo,b.Shortname from Policy a 
          inner join (${id_entry})  b on b.IDNo = a.IDNo) c on c.PolicyNo = qryJournal.ID_No 
          WHERE (((qryJournal.Source_Type)<>'BF' 
          And (qryJournal.Source_Type)<>'BFD' 
          And (qryJournal.Source_Type)<>'BFS') 
          AND 
          ((qryJournal.Date_Entry) <='${dateFormatted}') 
          AND ((qryJournal.ID_No)='${subsiText.trim()}'))  
          GROUP BY qryJournal.GL_Acct, c.shortname,qryJournal.mID,qryJournal.ID_No, b.Shortname 
          HAVING (((qryJournal.GL_Acct)='${account.trim()}')) 
          ) tmp WHERE Balance <> 0 ORDER BY ${
            parseInt(sort) === 0 ? "mID" : "ID_No"
          } ${parseInt(order) === 0 ? "ASC" : "DESC"}
          `;
      } else {
        qry = `
         select * from ( SELECT 
            Left(GL.GL_Acct,1) AS 'Group Header', 
            Left(GL.GL_Acct,4) AS Header,GL.GL_Acct,CA.Short AS 'mShort',
            '' AS 'Sub_Acct',
            ifnull(gl.ID_No,'') AS 'ID_No',
            ifnull(ID.Shortname,'') as 'mID', 
            sum(Debit) as 'Debit',
            sum(Credit) as 'Credit',
            IF(SUBSTRING(GL_Acct, 1, 1) <= '3' OR SUBSTRING(GL_Acct, 1, 1) = '7', 
            SUM(Debit) - SUM(Credit), 
            SUM(Credit) - SUM(Debit)) AS Balance
          FROM Journal GL 
            INNER JOIN Chart_Account CA  ON CA.Acct_Code = GL.GL_Acct 
            LEFT JOIN Sub_Account SUB  ON SUB.Sub_Acct = GL.Sub_Acct 
            LEFT JOIN (${id_entry}) ID  ON ID.IDNo = GL.ID_No 
          WHERE 
          GL.Source_Type NOT IN ('BF','BFD','BFS') AND
           Date_Entry <= '${dateFormatted}' AND 
           GL.GL_Acct ='${account.trim()}' 
          GROUP BY GL_Acct,ca.Short,gl.ID_No,IfNULL(ID.Shortname,'')  ) a
          where Balance <> 0 
          ORDER BY 'Group Header',Header,GL_Acct,${
            parseInt(sort) === 0 ? "mID" : "ID_No"
          } ${parseInt(order) === 0 ? "ASC" : "DESC"}
          `;
      }
    } else {
      if (report.trim() === "GL Account (Detailed)") {
        qry = `
            select * from (
            
            SELECT 
          qryJournal.GL_Acct, 
          qryJournal.ID_No, 
          ifNull(c.Shortname,ifNull(qryJournal.mID,b.Shortname)) as 'mID', 
          Sum(qryJournal.mDebit) AS Debit, 
          Sum(qryJournal.mCredit) AS Credit, 
            IF(SUBSTRING(GL_Acct, 1, 1) <= '3' OR SUBSTRING(GL_Acct, 1, 1) = '7', 
                          SUM(qryJournal.mDebit) - SUM(qryJournal.mCredit), 
                          SUM(qryJournal.mCredit) - SUM(qryJournal.mDebit)) AS Balance 
          FROM (${_qryJournal}) qryJournal 
          left join (${id_entry}) b on b.IDNo = qryJournal.ID_No 
          left join (select a.PolicyNo,b.Shortname from Policy a 
          inner join (${id_entry}) b on b.IDNo = a.IDNo) c on c.PolicyNo = qryJournal.ID_No 
          WHERE (((qryJournal.Source_Type)<>'BF' And (qryJournal.Source_Type)<>'BFD' And (qryJournal.Source_Type)<>'BFS') AND ((qryJournal.Date_Entry) <='${dateFormatted}')) 
          GROUP BY qryJournal.GL_Acct, c.shortname,qryJournal.mID,qryJournal.ID_No, b.Shortname 
          Having (((QryJournal.GL_Acct) = '${account.trim()}')) 
            ) a
             WHERE Balance <> 0 ORDER BY ${
               parseInt(sort) === 0 ? "mID" : "ID_No"
             } ${parseInt(order) === 0 ? "ASC" : "DESC"}
              `;
      } else {
        qry = `
        select * from ( 
        SELECT 
            Left(GL.GL_Acct,1) AS 'Group Header',
            Left(GL.GL_Acct,4) AS Header,
            GL.GL_Acct,CA.Short AS 'mShort',
            '' AS 'Sub_Acct',
            IFNULL(gl.ID_No,'') AS 'ID_No',
            IFNULL(ID.Shortname,'') as 'mID', 
            sum(Debit) as 'Debit',sum(Credit) as 'Credit', 
             IF(SUBSTRING(GL_Acct, 1, 1) <= '3' OR SUBSTRING(GL_Acct, 1, 1) = '7', 
            SUM(Debit) - SUM(Credit), 
            SUM(Credit) - SUM(Debit)) AS Balance
        FROM Journal GL 
        INNER JOIN Chart_Account CA ON CA.Acct_Code = GL.GL_Acct 
        LEFT JOIN Sub_Account SUB ON SUB.Sub_Acct = GL.Sub_Acct 
        LEFT JOIN (${id_entry}) ID ON ID.IDNo = GL.ID_No 
        WHERE GL.Source_Type NOT IN ('BF','BFD','BFS') AND CAST(Date_Entry AS DATE) <= '${dateFormatted}' 
        GROUP BY GL_Acct,ca.Short,gl.ID_No,IFNULL(ID.Shortname,'')  
        ) a
         where Balance <> 0 
        ORDER BY 'Group Header',Header,GL_Acct,${
          parseInt(sort) === 0 ? "mID" : "ID_No"
        } ${parseInt(order) === 0 ? "ASC" : "DESC"}`;
      }
    }
  } else {
    imHere = 2;

    if (insurance.trim() !== "ALL") {
      qry = `
        select * from (
          SELECT 
        qryJournal.GL_Acct, 
        qryJournal.Sub_Acct, 
        qryJournal.ID_No, 
        Account.AccountCode AS mID, 
        SUM(qryJournal.mDebit) AS Debit, 
        SUM(qryJournal.mCredit) AS Credit, 
         IF(SUBSTRING(GL_Acct, 1, 1) <= '3' OR SUBSTRING(GL_Acct, 1, 1) = '7', 
                SUM(qryJournal.mDebit) - SUM(qryJournal.mCredit), 
                SUM(qryJournal.mCredit) - SUM(qryJournal.mDebit)) AS Balance 
        FROM (${_qryJournal}) qryJournal 
        LEFT JOIN Policy ON qryJournal.ID_No = Policy.PolicyNo 
        INNER JOIN Policy_Account Account ON Policy.Account = Account.Account 
        WHERE qryJournal.Date_Entry <='${dateFormatted}' 
        GROUP BY Account.AccountCode, qryJournal.Sub_Acct, qryJournal.GL_Acct, qryJournal.ID_No 
        ) a
         where Balance <> 0 ${
           report === "GL Account (Detailed)"
             ? ` AND a.GL_Acct='${account.trim()}' `
             : ``
         } AND a.mID = '${insurance}'
        `;
    } else {
      qry = `
        select * from (
          SELECT 
        qryJournal.GL_Acct, 
        qryJournal.Sub_Acct, 
        qryJournal.ID_No, 
        Account.AccountCode AS mID, 
        SUM(qryJournal.mDebit) AS Debit, 
        SUM(qryJournal.mCredit) AS Credit, 
         IF(SUBSTRING(GL_Acct, 1, 1) <= '3' OR SUBSTRING(GL_Acct, 1, 1) = '7', 
                SUM(qryJournal.mDebit) - SUM(qryJournal.mCredit), 
                SUM(qryJournal.mCredit) - SUM(qryJournal.mDebit)) AS Balance 
        FROM (${_qryJournal}) qryJournal 
        LEFT JOIN Policy ON qryJournal.ID_No = Policy.PolicyNo 
        INNER JOIN Policy_Account Account ON Policy.Account = Account.Account 
        WHERE qryJournal.Date_Entry <='${dateFormatted}' 
        GROUP BY Account.AccountCode, qryJournal.Sub_Acct, qryJournal.GL_Acct, qryJournal.ID_No 
        ) a
         where Balance <> 0 ${
           report === "GL Account (Detailed)"
             ? ` AND a.GL_Acct='${account.trim()}' `
             : ``
         }
        `;
    }
  }
  const data = (await prisma.$queryRawUnsafe(qry)) as Array<any>;

  const formatReport = (data: Array<any>) => {
    const groupedData: any = {};

    data.forEach((entry: any) => {
      if (!groupedData[entry["Group Header"]]) {
        groupedData[entry["Group Header"]] = {};
      }
      if (!groupedData[entry["Group Header"]][entry["Header"]]) {
        groupedData[entry["Group Header"]][entry["Header"]] = {};
      }
      if (
        !groupedData[entry["Group Header"]][entry["Header"]][entry["GL_Acct"]]
      ) {
        groupedData[entry["Group Header"]][entry["Header"]][entry["GL_Acct"]] =
          [];
      }

      groupedData[entry["Group Header"]][entry["Header"]][
        entry["GL_Acct"]
      ].push({
        mShort: entry.mShort,
        Sub_Acct: entry.Sub_Acct,
        ID_No: entry.ID_No,
        mID: entry.mID,
        Debit: entry.Debit,
        Credit: entry.Credit,
        Balance: entry.Balance,
      });
    });

    const result: any = [];
    Object.entries(groupedData).forEach(([groupHeader, headers]: any) => {
      Object.entries(headers)?.forEach(([header, glAccts]: any) => {
        Object.entries(glAccts)?.forEach((itm: any) => {
          result.push({
            groupHeader: "",
            header: "",
            glAcct: "sym",
            mShort: "",
            Sub_Acct: "",
            ID_No: `${itm[0]} (${itm[1][0].mShort})`,
            mID: "",
            Debit: "",
            Credit: "",
            Balance: "",
          });

          itm[1]?.forEach((txn: any) => {
            result.push({
              groupHeader: "",
              header: "",
              glAcct: "",
              mShort: txn.mShort,
              Sub_Acct: txn.Sub_Acct,
              ID_No: txn.ID_No,
              mID: txn.mID,
              Debit: txn.Debit,
              Credit: txn.Credit,
              Balance: formatNumber(
                parseFloat(txn.Balance.toString().replace(/,/g, ""))
              ),
            });
          });

          result.push({
            groupHeader: "",
            header: "",
            glAcct: "ttf",
            mShort: "",
            Sub_Acct: "",
            ID_No: "",
            mID: "TOTAL : ",
            Debit: "",
            Credit: "",
            Balance: formatNumber(getSum(itm[1], "Balance")),
          });
        });
      });
    });

    return result;
  };

  const result = formatReport(data);
  result.push({
    groupHeader: "",
    header: "",
    glAcct: "",
    mShort: "",
    Sub_Acct: "",
    ID_No: `Records ${data.length.toLocaleString("en-US")}`,
    mID: "TOTAL : ",
    Debit: "",
    Credit: "",
    Balance: formatNumber(getSum(data, "Balance")),
  });

  const headerIndecxs = getIndexes(
    result,
    (item: any) => item.glAcct === "sym"
  );

  const totalFooter = getIndexes(result, (item: any) => item.glAcct === "ttf");

  let PAGE_WIDTH = 612;
  let PAGE_HEIGHT = 792;
  const props: any = {
    data: result,
    columnWidths: [140, 240, 110],
    headers: [
      { headerName: "I.D. No.", textAlign: "left" },
      { headerName: "IDENTITY", textAlign: "left" },
      { headerName: "AMOUNT", textAlign: "right" },
    ],
    keys: ["ID_No", "mID", "Balance"],
    title: "",
    setRowFontSize: 10,
    BASE_FONT_SIZE: 8,
    PAGE_WIDTH,
    PAGE_HEIGHT,
    MARGIN: { top: 70, right: 40, bottom: 30, left: 60 },
    adjustRowXPostion: (rowIndex: number) => {
      if (headerIndecxs.includes(rowIndex)) {
        return 25;
      } else {
        return 0;
      }
    },

    beforeDraw: (
      pdfReportGenerator: PDFReportGenerator,
      doc: PDFKit.PDFDocument
    ) => {
      pdfReportGenerator.setAlignment(result.length - 1, 1, "right");
      pdfReportGenerator.boldRow(result.length - 1);

      headerIndecxs.forEach((itm: number) => {
        pdfReportGenerator.boldRow(itm);
      });

      totalFooter.forEach((itm: number) => {
        pdfReportGenerator.setAlignment(itm, 1, "right");
        pdfReportGenerator.boldRow(itm);

        pdfReportGenerator.borderColumnInRow(
          itm,
          [
            { column: 0, key: "ID_No" },
            { column: 1, key: "mID" },
            { column: 2, key: "Balance" },
          ],
          {
            top: true,
            bottom: false,
            left: false,
            right: false,
          }
        );
      });
    },
    beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
      doc.font("Helvetica-Bold");
      doc.fontSize(10);
      doc.text(title, 40, 20, {
        align: "left",
        width: 400,
      });

      doc.fontSize(8);
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
}
async function SubsidiaryLedger(req: Request, res: Response) {
  console.log(req.body);
  const _qryJournal = qryJournal();
  let sFilter = " ";
  let Qry = "";
  // Global variables (you can set them as needed)
  let GL_Code = req.body.account; // Example: "ALL"
  let DateFrom: any = new Date(req.body.dateFrom);
  let DateTo: any = new Date(req.body.dateTo);

  const _mSubsi: any = req.body.subsi;
  let mInput = req.body.subsi_options; // User input for Sub-Acct or ID
  let mField = req.body.mField; // Example: Address or any other field
  let dt: any = []; // Result data

  if (GL_Code === "") GL_Code = "ALL";
  // Define your logic
  // Delete from xSubsidiary
  await prisma.$queryRawUnsafe("DELETE FROM xSubsidiary");

  switch (_mSubsi.trim()) {
    case "ALL":
      // Check if specific GL Code is provided
      if (GL_Code.trim() !== "ALL") {
        // If DateFrom is the first day of the month
        if (
          format(new Date(DateFrom), "yyyy-MM-01") ===
          format(new Date(DateFrom), "yyyy-MM-dd")
        ) {
          // Build SQL query for 'BF' or 'AB' Source_Type
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.Source_Type IN ('BF', 'AB') 
                AND qryJournal.Date_Query >= '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
              AND  qryJournal.Date_Query  <= '${format(
                DateFrom,
                "yyyy-MM-dd"
              )}' 
              GROUP BY qryJournal.GL_Acct 
              HAVING qryJournal.GL_Acct = '${GL_Code.trim()}' 
              ORDER BY qryJournal.GL_Acct;
            `;
        } else {
          // Build SQL query excluding 'BFD' and 'BFS'
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.Source_Type NOT IN ('BFD', 'BFS') 
                AND qryJournal.Date_Query >= '${format(
                  new Date(DateFrom),
                  "yyyy-MM-dd"
                )}' 
                AND  qryJournal.Date_Query <= '${format(
                  subDays(DateFrom, 1),
                  "yyyy-MM-dd"
                )}' 
              GROUP BY qryJournal.GL_Acct 
              HAVING qryJournal.GL_Acct = '${GL_Code.trim()}' 
              ORDER BY qryJournal.GL_Acct;
            `;
        }
        console.log(Qry);
      } else {
        // If all GL codes are considered
        if (
          format(new Date(DateFrom), "yyyy-MM-01") ===
          format(new Date(DateFrom), "yyyy-MM-dd")
        ) {
          // SQL query for all GL Codes, Source_Type 'BF' or 'AB'
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.Source_Type IN ('BF', 'AB') 
                AND qryJournal.Date_Query >=  '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
                AND  qryJournal.Date_Query <= '${format(
                  DateFrom,
                  "yyyy-MM-dd"
                )}' 
              GROUP BY qryJournal.GL_Acct 
              ORDER BY qryJournal.GL_Acct;
            `;
        } else {
          // SQL query for all GL Codes, excluding 'BFD' and 'BFS'
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.Source_Type NOT IN ('BFD', 'BFS') 
                AND qryJournal.Date_Query >= '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
                AND qryJournal.Date_Query <= '${format(
                  subDays(DateFrom, 1),
                  "yyyy-MM-dd"
                )}' 
              GROUP BY qryJournal.GL_Acct 
              ORDER BY qryJournal.GL_Acct;
            `;
        }
      }
      // Execute the raw query
      dt = await prisma.$queryRawUnsafe(Qry);

      // If we get results, insert them into xSubsidiary
      if (dt.length > 0) {
        for (const row of dt) {
          let debit = row.mDebit;
          let credit = row.mCredit;
          let balance = parseFloat(debit) - parseFloat(credit);

          // Insert query into xSubsidiary
          await prisma.$queryRawUnsafe(`
              INSERT INTO xSubsidiary 
              (Date_Entry, Sort_Number, Source_Type, Source_No, Explanation, Debit, Credit, Bal, Balance, Address, GL_Acct) 
              VALUES 
              ('${format(subDays(DateFrom, 1), "yyyy-MM-dd")}', 1, 'BF', 
               '${format(
                 subDays(DateFrom, 1),
                 "MMddyy"
               )}', 'Balance Forwarded', 
               ${debit}, ${credit}, ${balance}, ${balance}, '${mField}', '${
            row.GL_Acct
          }');
            `);
        }
      }
      break;
    case "ID #":
      // Handle cases for "ID #"
      sFilter = `AND qryJournal.ID_No = '${mInput}'`;

      if (GL_Code.trim() !== "ALL") {
        if (
          format(new Date(DateFrom), "yyyy-MM-01") ===
          format(new Date(DateFrom), "yyyy-MM-dd")
        ) {
          // Query for a specific GL code with ID filter
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.ID_No = '${mInput}' 
                AND qryJournal.Source_Type IN ('BFD', 'AB') 
                AND qryJournal.Date_Query >= '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
                AND qryJournal.Date_Query <= '${format(
                  DateFrom,
                  "yyyy-MM-dd"
                )}' 
              GROUP BY qryJournal.GL_Acct 
              HAVING qryJournal.GL_Acct = '${GL_Code.trim()}' 
              ORDER BY qryJournal.GL_Acct;
            `;
        } else {
          // Query excluding 'BF' and 'BFS' for specific GL code with ID filter
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.ID_No = '${mInput}' 
                AND qryJournal.Source_Type NOT IN ('BF', 'BFS') 
                AND qryJournal.Date_Query >= '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
                AND  qryJournal.Date_Query <  '${format(
                  DateFrom,
                  "yyyy-MM-dd"
                )}' 
              GROUP BY qryJournal.GL_Acct 
              HAVING qryJournal.GL_Acct = '${GL_Code.trim()}' 
              ORDER BY qryJournal.GL_Acct;
            `;
        }
      } else {
      }
      dt = await prisma.$queryRawUnsafe(Qry);

      // If we get results, insert them into xSubsidiary
      if (dt.length > 0) {
        for (const row of dt) {
          let debit = row.mDebit;
          let credit = row.mCredit;
          let balance = parseFloat(debit) - parseFloat(credit);

          // Insert query into xSubsidiary
          await prisma.$queryRawUnsafe(`
              INSERT INTO xSubsidiary 
              (Date_Entry, Sort_Number, Source_Type, Source_No, Explanation, Debit, Credit, Bal, Balance, Address, GL_Acct) 
              VALUES 
              ('${format(subDays(DateFrom, 1), "yyyy-MM-dd")}', 1, 'BF', 
               '${format(
                 subDays(DateFrom, 1),
                 "MMddyy"
               )}', 'Balance Forwarded', 
               ${debit}, ${credit}, ${balance}, ${balance}, '${mField}', '${
            row.GL_Acct
          }');
            `);
        }
      }

      // Execute and handle results similar to above
      // Add logic for inserting into xSubsidiary if needed.
      break;
    case "Sub-Acct #":
      sFilter = `AND qryJournal.Sub_Acct = '${mInput}'`;

      // Check if specific GL Code is provided
      if (GL_Code.trim() !== "ALL") {
        // If DateFrom is the first day of the month
        if (
          format(new Date(DateFrom), "yyyy-MM-01") ===
          format(new Date(DateFrom), "yyyy-MM-dd")
        ) {
          // Build SQL query for 'BFS' or 'AB' Source_Type with Sub-Acct
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.Sub_Acct = '${mInput}' 
                AND qryJournal.Source_Type IN ('BFS', 'AB') 
                AND qryJournal.Date_Query BETWEEN '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
                AND '${format(DateFrom, "yyyy-MM-dd")}' 
              GROUP BY qryJournal.GL_Acct 
              HAVING qryJournal.GL_Acct = '${GL_Code.trim()}' 
              ORDER BY qryJournal.GL_Acct;
            `;
        } else {
          // Build SQL query excluding 'BF' and 'BFD' with Sub-Acct
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.Sub_Acct = '${mInput}' 
                AND qryJournal.Source_Type NOT IN ('BF', 'BFD') 
                AND qryJournal.Date_Query BETWEEN '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
                AND '${format(subDays(DateFrom, 1), "yyyy-MM-dd")}' 
              GROUP BY qryJournal.GL_Acct 
              HAVING qryJournal.GL_Acct = '${GL_Code.trim()}' 
              ORDER BY qryJournal.GL_Acct;
            `;
        }
      } else {
        // If all GL codes are considered
        if (
          format(new Date(DateFrom), "yyyy-MM-01") ===
          format(new Date(DateFrom), "yyyy-MM-dd")
        ) {
          // SQL query for all GL Codes with Sub-Acct, Source_Type 'BFS' or 'AB'
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.Sub_Acct = '${mInput}' 
                AND qryJournal.Source_Type IN ('BFS', 'AB') 
                AND qryJournal.Date_Query BETWEEN '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
                AND '${format(DateFrom, "yyyy-MM-dd")}' 
              GROUP BY qryJournal.GL_Acct 
              ORDER BY qryJournal.GL_Acct;
            `;
        } else {
          // SQL query for all GL Codes, excluding 'BF' and 'BFD' with Sub-Acct
          Qry = `
              SELECT qryJournal.GL_Acct, 
                     SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                     SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
              FROM (${_qryJournal}) qryJournal 
              WHERE qryJournal.Sub_Acct = '${mInput}' 
                AND qryJournal.Source_Type NOT IN ('BF', 'BFD') 
                AND qryJournal.Date_Query BETWEEN '${format(
                  new Date(DateFrom),
                  "yyyy-MM-01"
                )}' 
                AND '${format(subDays(DateFrom, 1), "yyyy-MM-dd")}' 
              GROUP BY qryJournal.GL_Acct 
              ORDER BY qryJournal.GL_Acct;
            `;
        }
      }
      // Execute the raw query
      dt = await prisma.$queryRawUnsafe(Qry);

      // If we get results, insert them into xSubsidiary
      if (dt.length > 0) {
        for (const row of dt) {
          let debit = row.mDebit;
          let credit = row.mCredit;
          let balance = parseFloat(debit) - parseFloat(credit);

          // Insert query into xSubsidiary
          await prisma.$queryRawUnsafe(`
              INSERT INTO xSubsidiary 
              (Date_Entry, Sort_Number, Source_Type, Source_No, Explanation, Debit, Credit, Bal, Balance, Address, GL_Acct) 
              VALUES 
              ('${format(subDays(DateFrom, 1), "yyyy-MM-dd")}', 1, 'BF', 
               '${format(
                 subDays(DateFrom, 1),
                 "yyyy-MM-dd"
               )}', 'Balance Forwarded', 
               ${debit}, ${credit}, ${balance}, ${balance}, '${mField}', '${
            row.GL_Acct
          }');
            `);
        }
      }

      break;
    // Add similar cases for 'Sub-Acct #' and others as needed
  }
  // Transaction Query
  if (GL_Code.trim() !== "ALL") {
    // For specific GL_Code
    Qry = `
          SELECT 
          qryJournal.Number, 
          qryJournal.Hide_Code, 
          qryJournal.Date_Entry, 
          qryJournal.Source_Type,
                qryJournal.Source_No, 
                COALESCE(qryJournal.Explanation, '') as Explanation, 
                COALESCE(qryJournal.Payto, '') as Payto, 
                qryJournal.GL_Acct, qryJournal.Sub_Acct, 
                qryJournal.ID_No, 
                qryJournal.mShort, 
                qryJournal.mSub_Acct, 
                qryJournal.mID, 
                qryJournal.mDebit, 
                qryJournal.mCredit, 
                COALESCE(qryJournal.Check_Date, '') as Check_Date, 
                COALESCE(qryJournal.Checked, '') as Checked, 
                COALESCE(qryJournal.Bank, '') as Bank, 
                COALESCE(qryJournal.Remarks, '') as Remarks 
          FROM (${_qryJournal}) qryJournal
          WHERE qryJournal.Date_Entry BETWEEN '${format(
            DateFrom,
            "yyyy-MM-dd"
          )}' AND '${format(DateTo, "yyyy-MM-dd")}'
            AND qryJournal.Source_Type NOT IN ('BF', 'BFD', 'BFS')
            AND qryJournal.GL_Acct = '${GL_Code.trim()}'
          ${sFilter}
          ORDER BY  qryJournal.Number,qryJournal.Date_Entry,qryJournal.Source_No, qryJournal.Auto;
        `;
  } else {
    // For all GL codes
    Qry = `
          SELECT qryJournal.Number, qryJournal.Hide_Code, qryJournal.Date_Entry, qryJournal.Source_Type,
                qryJournal.Source_No, qryJournal.Explanation, qryJournal.Payto, qryJournal.GL_Acct,
                qryJournal.Sub_Acct, qryJournal.ID_No, qryJournal.mShort, qryJournal.mSub_Acct, 
                qryJournal.mID, qryJournal.mDebit, qryJournal.mCredit, qryJournal.Check_Date, 
                qryJournal.Checked, qryJournal.Bank, qryJournal.Remarks
          FROM (${_qryJournal}) qryJournal
          WHERE qryJournal.Date_Entry BETWEEN '${format(
            DateFrom,
            "yyyy-MM-dd"
          )}' AND '${format(DateTo, "yyyy-MM-dd")}'
            AND qryJournal.Source_Type NOT IN ('BF', 'BFD', 'BFS')
          ${sFilter}
          ORDER BY   qryJournal.Number,qryJournal.Date_Entry,qryJournal.Source_No, qryJournal.Auto;
        `;
  }

  // Execute the transaction query
  dt = await prisma.$queryRawUnsafe(Qry);

  // Processing query results
  console.log(dt);

  if (dt.length > 0) {
    let lastAcct = "";
    let sParticular = "";
    let Balance = 0;

    for (let i = 0; i < dt.length; i++) {
      const row = dt[i];
      // Check if the GL_Acct has changed

      if (lastAcct !== row.GL_Acct) {
        lastAcct = row.GL_Acct;

        // Query to get the Balance from xSubsidiary
        let balanceQuery = `
              SELECT Balance 
              FROM xSubsidiary 
              WHERE GL_Acct = '${lastAcct}' 
         
            `;
        //       AND Explanation = 'Balance Forwarded';

        let dtBal: any = await prisma.$queryRawUnsafe(balanceQuery);
        console.log(dtBal);
        if (dtBal.length > 0) {
          Balance = dtBal[0].Balance;
        } else {
          Balance = 0;
        }
      }
      // Update Balance
      Balance += parseFloat(row.mDebit) - parseFloat(row.mCredit);

      // Set sParticular based on mField
      switch (mField) {
        case "Explanations":
          sParticular = clrStr(row.Explanation);
          break;
        case "Payee":
          sParticular = clrStr(row.Payto);
          break;
        case "Remarks":
          sParticular = clrStr(row.Remarks);
          break;
      }
      let xsubsidiary_id = i.toString().padStart(5, "0");

      // const xsubsidiary_id = uuidV4();

      // Insert the record into xSubsidiary

      // Execute the insert query
      await prisma.xsubsidiary.create({
        data: {
          Date_Entry: defaultFormat(new Date(row.Date_Entry)),
          Sort_Number: parseInt(row.Number),
          Source_Type: row["Hide_Code"],
          Source_No: row.Source_No,
          Explanation: clrStr(row.Explanation),
          Payto: clrStr(row.Payto),
          GL_Acct: row.GL_Acct,
          Sub_Acct: row.Sub_Acct || "",
          ID_No: clrStr(row.ID_No || ""),
          cGL_Acct: clrStr(row.mShort),
          cSub_Acct: clrStr(row.mSub_Acct),
          cID_No: clrStr(row.mID),
          Debit: row.mDebit,
          Credit: row.mCredit,
          Bal: parseFloat(row.mDebit) - parseFloat(row.mCredit),
          Balance: Balance,
          Check_Date:
            row.Check_Date !== "" && row.Check_Date !== null
              ? defaultFormat(new Date(row.Check_Date))
              : null,
          Check_No: row.Checked,
          Check_Bank: clrStr(row.Bank),
          Address: mField,
          Particulars: sParticular,
          xsubsidiary_id: xsubsidiary_id,
        },
      });
    }
  }

  const result = (await prisma.$queryRawUnsafe(
    "select * FROM xSubsidiary order by Date_Entry "
  )) as Array<any>;
  let runningBalance = 0;
  const data = result.map((itm: any) => {
    itm.Date_Entry = format(new Date(itm.Date_Entry), "MM/dd/yyyy");
    const Debit = parseFloat(itm.Debit.toString().replace(/,/g, ""));
    const Credit = parseFloat(itm.Credit.toString().replace(/,/g, ""));
    itm.Debit = formatNumber(Debit);
    itm.Credit = formatNumber(Credit);
    runningBalance = runningBalance + (Debit - Credit);
    itm.Balance = formatNumber(runningBalance);
    return {
      ...itm,
      refs: `${itm.Source_Type}  ${itm.Source_No}`,
    };
  });
  const totalDebit = getSum(data, "Debit");
  const totalCredit = getSum(data, "Credit");

  let PAGE_WIDTH = 612;
  let PAGE_HEIGHT = 792;
  if (req.body.format === "No Running Balance") {
    data.push({
      Date_Entry: "",
      Sort_Number: 0,
      Source_Type: "",
      Source_No: "",
      Explanation: "",
      Particulars: `${formatNumber(totalDebit - totalCredit)}`,
      Payto: "",
      Address: "",
      Check_Date: "",
      Check_No: "TOTAL",
      Check_Bank: "",
      GL_Acct: "",
      Sub_Acct: "",
      ID_No: " ",
      cGL_Acct: "",
      cSub_Acct: "",
      cID_No: "",
      Debit: formatNumber(totalDebit),
      Credit: formatNumber(totalCredit),
      Bal: -15500,
      Balance: "0",
      xsubsidiary_id: "",
      refs: "",
    });

    PAGE_WIDTH = PAGE_WIDTH + 50;
    PAGE_HEIGHT = PAGE_HEIGHT + 50;
    const props: any = {
      data,
      columnWidths: [60, 80, 40, 100, 50, 85, 85, 140],
      headers: [
        { headerName: "DATE", textAlign: "left" },
        { headerName: "REF No.", textAlign: "left" },
        { headerName: "SUB ACCT", textAlign: "left" },
        { headerName: "ID NO", textAlign: "left" },
        { headerName: "CHECK NO", textAlign: "center" },
        { headerName: "DEBIT", textAlign: "right" },
        { headerName: "CREDIT", textAlign: "right" },
        { headerName: "EXPLANTION", textAlign: "left" },
      ],
      keys: [
        "Date_Entry",
        "refs",
        "Sub_Acct",
        "ID_No",
        "Check_No",
        "Debit",
        "Credit",
        "Particulars",
      ],
      title: "",
      setRowFontSize: 10,
      BASE_FONT_SIZE: 8,
      PAGE_WIDTH,
      PAGE_HEIGHT,
      MARGIN: { top: 120, right: 10, bottom: 20, left: 10 },
      beforeDraw: (
        pdfReportGenerator: PDFReportGenerator,
        doc: PDFKit.PDFDocument
      ) => {
        pdfReportGenerator.setAlignment(data.length - 1, 7, "center");
      },
      beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
        doc.font("Helvetica-Bold");
        doc.fontSize(10);
        doc.text(req.body.title, 10, 20, {
          align: "left",
          width: 400,
        });

        doc.fontSize(8);
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
          pdfReportGenerator.PAGE_HEIGHT - 25,
          {
            align: "right",
            width: 100,
          }
        );
        doc.text(
          `Printed: ${format(new Date(), "MM/dd/yyyy, hh:mm a")}`,
          -75,
          pdfReportGenerator.PAGE_HEIGHT - 25,
          {
            align: "right",
            width: 200,
          }
        );
      },
    };
    const pdfReportGenerator = new PDFReportGenerator(props);
    return pdfReportGenerator.generatePDF(res);
  } else {
    data.push({
      Date_Entry: "",
      Sort_Number: 0,
      Source_Type: "",
      Source_No: "",
      Explanation: "",
      Particulars: ``,
      Payto: "",
      Address: "",
      Check_Date: "",
      Check_No: "TOTAL",
      Check_Bank: "",
      GL_Acct: "",
      Sub_Acct: "",
      ID_No: " ",
      cGL_Acct: "",
      cSub_Acct: "",
      cID_No: "",
      Debit: formatNumber(totalDebit),
      Credit: formatNumber(totalCredit),
      Bal: -15500,
      Balance: `${formatNumber(totalDebit - totalCredit)}`,
      xsubsidiary_id: "",
      refs: "",
    });

    PAGE_WIDTH = PAGE_WIDTH + 135;
    PAGE_HEIGHT = PAGE_HEIGHT + 135;
    const props: any = {
      data,
      columnWidths: [60, 80, 40, 100, 50, 85, 85, 85, 140],
      headers: [
        { headerName: "DATE", textAlign: "left" },
        { headerName: "REF No.", textAlign: "left" },
        { headerName: "SUB ACCT", textAlign: "left" },
        { headerName: "ID NO", textAlign: "left" },
        { headerName: "CHECK NO", textAlign: "center" },
        { headerName: "DEBIT", textAlign: "right" },
        { headerName: "CREDIT", textAlign: "right" },
        { headerName: "BALANCE", textAlign: "right" },
        { headerName: "EXPLANTION", textAlign: "left" },
      ],
      keys: [
        "Date_Entry",
        "refs",
        "Sub_Acct",
        "ID_No",
        "Check_No",
        "Debit",
        "Credit",
        "Balance",
        "Particulars",
      ],
      title: "",
      setRowFontSize: 10,
      BASE_FONT_SIZE: 8,
      PAGE_WIDTH,
      PAGE_HEIGHT,
      MARGIN: { top: 120, right: 10, bottom: 20, left: 10 },
      beforeDraw: (
        pdfReportGenerator: PDFReportGenerator,
        doc: PDFKit.PDFDocument
      ) => {},
      beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
        doc.font("Helvetica-Bold");
        doc.fontSize(10);
        doc.text(req.body.title, 10, 20, {
          align: "left",
          width: 400,
        });

        doc.fontSize(8);
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
          pdfReportGenerator.PAGE_HEIGHT - 25,
          {
            align: "right",
            width: 100,
          }
        );
        doc.text(
          `Printed: ${format(new Date(), "MM/dd/yyyy, hh:mm a")}`,
          -75,
          pdfReportGenerator.PAGE_HEIGHT - 25,
          {
            align: "right",
            width: 200,
          }
        );
      },
    };

    const pdfReportGenerator = new PDFReportGenerator(props);
    return pdfReportGenerator.generatePDF(res);
  }
}
async function TrialBalance(req: Request, res: Response) {
  let qry = "";
  if (req.body.cmbformat === "Default") {
    qry = FinancialStatement(
      req.body.date,
      req.body.subAccount,
      req.body.report
    );
  } else {
    qry = FinancialStatementSumm(req.body.date, req.body.report);
  }
  console.log(qry);
  const _data = (await prisma.$queryRawUnsafe(qry)) as Array<any>;
  const data = _data.map((itm: any) => {
    itm.PrevDebit = formatNumber(
      parseFloat(itm.PrevDebit.toString().replace(/,/g, ""))
    );
    itm.PrevCredit = formatNumber(
      parseFloat(itm.PrevCredit.toString().replace(/,/g, ""))
    );
    itm.PrevBalance = formatNumber(
      parseFloat(itm.PrevBalance.toString().replace(/,/g, ""))
    );
    itm.CurrDebit = formatNumber(
      parseFloat(itm.CurrDebit.toString().replace(/,/g, ""))
    );
    itm.CurrCredit = formatNumber(
      parseFloat(itm.CurrCredit.toString().replace(/,/g, ""))
    );
    itm.TotalBalance = formatNumber(
      parseFloat(itm.TotalBalance.toString().replace(/,/g, ""))
    );
    return itm;
  });

  data.push({
    Code: "",
    Title: "TOTAL :",
    PrevDebit: formatNumber(getSum(data, "PrevDebit")),
    PrevCredit: formatNumber(getSum(data, "PrevCredit")),
    PrevBalance: formatNumber(getSum(data, "PrevBalance")),
    CurrDebit: formatNumber(getSum(data, "CurrDebit")),
    CurrCredit: formatNumber(getSum(data, "CurrCredit")),
    CurrBalance: 0,
    BalDebit: 2865805.43,
    BalCredit: 2839674.17,
    TotalBalance: formatNumber(getSum(data, "TotalBalance")),
  });
  let PAGE_WIDTH = 712;
  let PAGE_HEIGHT = 892;

  const props: any = {
    data,
    columnWidths: [60, 130, 85, 85, 85, 85, 85, 85],
    headers: [
      { headerName: "Acct. No", textAlign: "left" },
      { headerName: "Account Name", textAlign: "left" },
      { headerName: "Debit", textAlign: "left" },
      { headerName: "Credit", textAlign: "left" },
      { headerName: "Balance", textAlign: "right" },
      { headerName: "Debit", textAlign: "right" },
      { headerName: "Credit", textAlign: "right" },
      { headerName: "BALANCE", textAlign: "right" },
    ],
    keys: [
      "Code",
      "Title",
      "PrevDebit",
      "PrevCredit",
      "PrevBalance",
      "CurrDebit",
      "CurrCredit",
      "TotalBalance",
    ],
    title: "",
    setRowFontSize: 10,
    BASE_FONT_SIZE: 8,
    PAGE_WIDTH,
    PAGE_HEIGHT,
    MARGIN: { top: 100, right: 10, bottom: 20, left: 10 },
    beforeDraw: (
      pdfReportGenerator: PDFReportGenerator,
      doc: PDFKit.PDFDocument
    ) => {
      pdfReportGenerator.setAlignment(data.length - 1, 1, "center");
      pdfReportGenerator.boldRow(data.length - 1);
      pdfReportGenerator.borderColumnInRow(
        data.length - 1,
        [
          { column: 0, key: "Code" },
          { column: 1, key: "Title" },
          { column: 2, key: "PrevDebit" },
          { column: 3, key: "PrevCredit" },
          { column: 4, key: "PrevBalance" },
          { column: 5, key: "CurrDebit" },
          { column: 6, key: "CurrCredit" },
          { column: 7, key: "TotalBalance" },
        ],
        {
          top: true,
          bottom: false,
          left: false,
          right: false,
        }
      );
    },
    beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
      doc.font("Helvetica-Bold");
      doc.fontSize(10);
      doc.text(req.body.title, 10, 20, {
        align: "left",
        width: 400,
      });
      doc.fontSize(9);
      doc.text("PREVIOUS BALANCE", 210, 85, {
        align: "left",
        width: 150,
      });

      doc.text("TRANSACTIONS", PAGE_WIDTH - 195, 85, {
        align: "left",
        width: 150,
      });

      doc.fontSize(8);
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
        pdfReportGenerator.PAGE_HEIGHT - 25,
        {
          align: "right",
          width: 100,
        }
      );
      doc.text(
        `Printed: ${format(new Date(), "MM/dd/yyyy, hh:mm a")}`,
        -75,
        pdfReportGenerator.PAGE_HEIGHT - 25,
        {
          align: "right",
          width: 200,
        }
      );
    },
  };

  const pdfReportGenerator = new PDFReportGenerator(props);
  return pdfReportGenerator.generatePDF(res);
}
async function IncomeStatement(req: Request, res: Response) {
  let sql = "";
  if (req.body.cmbformat === "Default") {
    const fs = FinancialStatement(
      req.body.date,
      req.body.subAccount.trim(),
      req.body.report
    );
    const tmp1 = `
    SELECT
      *,
      LEFT(Code, 1) AS H1,
      LEFT(Code, 4) AS H2
    FROM
        (${fs}) tmp
    WHERE
        LEFT(Code, 1) >= '6'
    `;
    sql = `
    SELECT
       CASE tmp1.H1
            WHEN '6' THEN 'INCOME'
            ELSE 'EXPENSES'
        END AS MyHeader,
        Chart_Account.Acct_Title AS Footer,
        tmp1.H1,
        tmp1.H2,
        tmp1.Code,
        tmp1.Title,
        CASE
            WHEN LEFT(tmp1.Code, 1) = '6' THEN (PrevCredit - PrevDebit)
            ELSE tmp1.PrevBalance
        END AS PrevBalance,
        CASE
            WHEN LEFT(tmp1.Code, 1) = '6' THEN (CurrCredit - CurrDebit)
            ELSE tmp1.CurrBalance
        END AS CurrBalance,
        CASE
            WHEN LEFT(tmp1.Code, 1) = '6' THEN (PrevCredit - PrevDebit) + (CurrCredit - CurrDebit)
            ELSE tmp1.TotalBalance
        END AS TotalBalance
    FROM
        (${tmp1}) tmp1
    LEFT JOIN
        Chart_Account ON tmp1.H2 = Chart_Account.Acct_Code
    ORDER BY
        tmp1.Code;
    `;
  } else {
    const tmp = FinancialStatementSumm(req.body.date, req.body.report);
    const tmp1 = `
    SELECT
        *,
        LEFT(Code, 1) AS H1,
        LEFT(Code, 4) AS H2
    FROM
        (${tmp}) tmp
    WHERE
        LEFT(Code, 1) >= '6'`;
    const tmp2 = `
  SELECT
      SubAccount,
      H1,
      0 - SUM(Balance) AS Balance
  FROM
    (${tmp1}) tmp1 
  GROUP BY
      SubAccount,
      H1`;
    const tmp3 = `
    SELECT
        SubAccount,
        SUM(Balance) AS Balance
    FROM
      (${tmp2}) tmp2
    GROUP BY
        SubAccount`;
    sql = `
    SELECT
        tmp1.H1,
        CASE tmp1.H1
            WHEN '6' THEN 'INCOME'
            ELSE 'EXPENSES'
        END AS MyHeader,
        tmp1.H2,
        Chart_Account.Acct_Title AS MyFooter,
        tmp1.Code,
        SUBSTRING(tmp1.Title, LENGTH(tmp1.Code) + 1 , (LENGTH(tmp1.Title) + 1) - LENGTH(tmp1.Code)) AS Title,
        tmp1.SubAccount,
        CASE
            WHEN LEFT(tmp1.Code, 1) = '6' THEN 0 - tmp1.Balance
            ELSE tmp1.Balance
        END AS Balance,
        CASE
            WHEN LEFT(tmp1.Code, 1) = '6' THEN 0 - tmp1.TotalBalance
            ELSE tmp1.TotalBalance
        END AS TotalBalance,
        tmp3.Balance AS SBalance
    FROM
       (${tmp1}) tmp1
    LEFT JOIN
        Chart_Account ON tmp1.H2 = Chart_Account.Acct_Code
    LEFT JOIN
       (${tmp3}) tmp3 ON tmp1.SubAccount = tmp3.SubAccount
    ORDER BY
        tmp1.Code
    `;
  }
  const data: any = await prisma.$queryRawUnsafe(sql);

  console.log(data[0]);
  function groupByHierarchy(data: Array<any>) {
    const grouped: any = {};

    data.forEach((item) => {
      if (!grouped[item.H1]) {
        grouped[item.H1] = { MyHeader: item.MyHeader, categories: {} };
      }

      if (!grouped[item.H1].categories[item.H2]) {
        grouped[item.H1].categories[item.H2] = {
          MyFooter: item.Footer, // Updated from MyFooter to Footer
          items: [],
        };
      }

      grouped[item.H1].categories[item.H2].items.push({
        Code: item.Code,
        Title: item.Title,
        PrevBalance: item.PrevBalance, // Updated to match new data format
        CurrBalance: item.CurrBalance, // Added CurrBalance
        TotalBalance: item.TotalBalance,
      });
    });

    return grouped;
  }

  const newD = groupByHierarchy(data);

  //Function to display the formatted financial report
  let _PrevBalance = 0;
  let _CurrBalance = 0;
  let _totalBalance = 0;
  const result: Array<any> = [];
  for (const h1Key in newD) {
    let totalPrevBalance = 0;
    let totalCurrBalance = 0;
    let totalBalance = 0;
    const header = newD[h1Key];

    result.push({
      MyHeader: "",
      Footer: "",
      H1: "",
      H2: "",
      Code: "",
      Title: header.MyHeader.toUpperCase(),
      PrevBalance: "",
      CurrBalance: "",
      TotalBalance: "",
    });

    if (!header.categories || Object.keys(header.categories).length === 0) {
      console.log("  No data available.");
      continue;
    }

    for (const h2Key in header.categories) {
      const category = header.categories[h2Key];

      if (!category.items || category.items.length === 0) {
        console.log("    No items found.");
        continue;
      }

      category.items.forEach((item: any) => {
        if (item.Code.charAt(0) === "6") {
          _PrevBalance =
            _PrevBalance +
            parseFloat(item.PrevBalance.toString().replace(/,/g, ""));
          _CurrBalance =
            _CurrBalance +
            parseFloat(item.CurrBalance.toString().replace(/,/g, ""));
          _totalBalance =
            _totalBalance +
            parseFloat(item.TotalBalance.toString().replace(/,/g, ""));
        } else {
          _PrevBalance =
            _PrevBalance -
            parseFloat(item.PrevBalance.toString().replace(/,/g, ""));
          _CurrBalance =
            _CurrBalance -
            parseFloat(item.CurrBalance.toString().replace(/,/g, ""));
          _totalBalance =
            _totalBalance -
            parseFloat(item.TotalBalance.toString().replace(/,/g, ""));
        }
        item.PrevBalance = formatNumber(
          parseFloat(item.PrevBalance.toString().replace(/,/g, ""))
        );
        item.CurrBalance = formatNumber(
          parseFloat(item.CurrBalance.toString().replace(/,/g, ""))
        );
        item.TotalBalance = formatNumber(
          parseFloat(item.TotalBalance.toString().replace(/,/g, ""))
        );

        result.push({
          ...item,
          addPaddingFirst: true,
        });
      });
      const PrevBal = getSum(category.items, "PrevBalance");
      const CurrBal = getSum(category.items, "CurrBalance");
      const tBalance = getSum(category.items, "TotalBalance");
      totalPrevBalance += PrevBal;
      totalCurrBalance += CurrBal;
      totalBalance += tBalance;
      result.push({
        MyHeader: "",
        Footer: "",
        H1: "",
        H2: "",
        Code: "",
        Title: category.MyFooter,
        PrevBalance: formatNumber(PrevBal),
        CurrBalance: formatNumber(CurrBal),
        TotalBalance: formatNumber(tBalance),
        addPaddingSecond: true,
      });
    }

    result.push({
      MyHeader: "",
      Footer: "",
      H1: "",
      H2: "",
      Code: "",
      Title: `TOTAL ${header.MyHeader.toUpperCase()}`,
      PrevBalance: formatNumber(totalPrevBalance),
      CurrBalance: formatNumber(totalCurrBalance),
      TotalBalance: formatNumber(totalBalance),
      TotalBalances: "dd",
    });
  }

  result.push({
    MyHeader: "",
    Footer: "",
    H1: "",
    H2: "",
    Code: "",
    Title: `NET INCOME / LOSS`,
    PrevBalance: formatNumber(_PrevBalance),
    CurrBalance: formatNumber(_CurrBalance),
    TotalBalance: formatNumber(_totalBalance),
    TotalBalances: "dd",
  });

  const paddingFirstIndexes = getIndexes(
    result,
    (item: any) => item?.addPaddingFirst
  );

  const paddingFooterIndexes = getIndexes(
    result,
    (item: any) => item?.addPaddingSecond
  );

  const totalBalanceIndexes = getIndexes(
    result,
    (item: any) => item?.TotalBalances === "dd"
  );

  let PAGE_WIDTH = 612;
  let PAGE_HEIGHT = 792;

  const props: any = {
    data: result,
    columnWidths: [260, 115, 110, 110],
    headers: [
      { headerName: "PARTICULARS", textAlign: "left" },
      { headerName: "PREVIOUS BALANCE", textAlign: "right" },
      { headerName: "TRANSACTIONS", textAlign: "right" },
      { headerName: "ENDING BALANCE", textAlign: "right" },
    ],
    keys: ["Title", "PrevBalance", "CurrBalance", "TotalBalance"],
    title: "",
    setRowFontSize: 10,
    BASE_FONT_SIZE: 8,
    PAGE_WIDTH,
    PAGE_HEIGHT,
    MARGIN: { top: 100, right: 10, bottom: 20, left: 10 },
    addPadingfFromLeft: (rowIndex: number, colIndex: number) => {
      if (paddingFirstIndexes.includes(rowIndex) && colIndex === 0) {
        return 20;
      } else if (paddingFooterIndexes.includes(rowIndex) && colIndex === 0) {
        return 45;
      } else {
        return 0;
      }
    },
    addRowHeight: (rowIndex: number) => {
      // if (paddingFirstIndexes.includes(rowIndex)) {
      //   return -10;
      // } else if (totalBalanceIndexes.includes(rowIndex - 1)) {
      //   return -10;
      // }
      return 0;
    },
    beforeDraw: (
      pdfReportGenerator: PDFReportGenerator,
      doc: PDFKit.PDFDocument
    ) => {
      // pdfReportGenerator.setAlignment(data.length - 1, 1, "center");
      // pdfReportGenerator.boldRow(data.length - 1);
      paddingFooterIndexes.forEach((idx: number) => {
        pdfReportGenerator.borderColumnInRow(
          idx,
          [
            { column: 1, key: "PrevBalance" },
            { column: 2, key: "CurrBalance" },
            { column: 3, key: "TotalBalance" },
          ],
          {
            top: false,
            bottom: true,
            left: false,
            right: false,
          },
          8,
          true
        );
      });

      totalBalanceIndexes.forEach((idx: number) => {
        pdfReportGenerator.borderColumnInRow(
          idx,
          [
            { column: 1, key: "PrevBalance" },
            { column: 2, key: "CurrBalance" },
            { column: 3, key: "TotalBalance" },
          ],
          {
            top: false,
            bottom: true,
            left: false,
            right: false,
          },
          8
        );
      });
    },
    beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
      doc.font("Helvetica-Bold");
      doc.fontSize(10);
      doc.text(req.body.title, 10, 20, {
        align: "left",
        width: 400,
      });

      doc.fontSize(8);
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
        pdfReportGenerator.PAGE_HEIGHT - 25,
        {
          align: "right",
          width: 100,
        }
      );
      doc.text(
        `Printed: ${format(new Date(), "MM/dd/yyyy, hh:mm a")}`,
        -75,
        pdfReportGenerator.PAGE_HEIGHT - 25,
        {
          align: "right",
          width: 200,
        }
      );
    },
  };

  const pdfReportGenerator = new PDFReportGenerator(props);
  return pdfReportGenerator.generatePDF(res);
}
async function BalanceSheet(req: Request, res: Response) {
  let qry = "";
  if (req.body.cmbformat === "Default") {
    const tmp = `
    select 
        tmp.Code ,
        tmp.Title ,
        tmp.PrevDebit  ,
        tmp.PrevCredit  ,
        tmp.PrevBalance  ,
        tmp.CurrDebit  ,
        tmp.CurrCredit  ,
        tmp.CurrBalance  ,
        tmp.BalDebit  ,
        tmp.BalCredit  ,
        tmp.TotalBalance  
    from (${FinancialStatement(
      req.body.date,
      req.body.subAccount.toUpperCase(),
      req.body.report
    )}) tmp
  `;
    const tmp1 = `
    SELECT
        Code,
        Title,
        LEFT(Code, 1) AS H1,
        LEFT(Code, 4) AS H2,
        CASE WHEN CAST(LEFT(Code, 1) AS UNSIGNED) >= 4 THEN PrevCredit - PrevDebit ELSE PrevBalance END AS PrevBalance,
        CurrDebit,
        CurrCredit,
        CASE WHEN CAST(LEFT(Code, 1) AS UNSIGNED) >= 4 THEN CurrCredit - CurrDebit ELSE CurrBalance END AS CurrBalance,
        CASE WHEN CAST(LEFT(Code, 1) AS UNSIGNED) >= 4 THEN (PrevCredit - PrevDebit) + (CurrCredit - CurrDebit) ELSE TotalBalance END AS TotalBalance
    FROM (${tmp}) tmp
    WHERE LEFT(Code, 1) <= 5
  `;
    const finalTemp = `
    SELECT
        LEFT(tmp1.Code, 1) AS H1,
        tmp1.H2,
        Chart_Account.Acct_Title AS HT2,
        tmp1.Code AS H3,
        tmp1.Title AS HT3,
        PrevBalance,
        CurrDebit,
        CurrCredit,
        CurrBalance,
        TotalBalance
    FROM (${tmp1}) tmp1
    LEFT JOIN Chart_Account ON tmp1.H2 = Chart_Account.Acct_Code
  `;
    let final = `
    SELECT
        H1,
        Chart_Account.Acct_Title AS HT1,
        H2,
        HT2,
        H3,
        HT3,
        PrevBalance,
        CurrDebit,
        CurrCredit,
        CurrBalance,
        TotalBalance
    FROM (${finalTemp}) FinalTemp
    LEFT JOIN Chart_Account ON FinalTemp.H1 = Chart_Account.Acct_Code
  `;
    const tmp2 = `
    SELECT
        PrevDebit,
        PrevCredit,
        CASE WHEN LEFT(Code, 1) = '6' THEN PrevCredit - PrevDebit ELSE PrevBalance END AS PrevBalance,
        CurrDebit,
        CurrCredit,
        CASE WHEN LEFT(Code, 1) = '6' THEN CurrCredit - CurrDebit ELSE CurrBalance END AS CurrBalance,
        CASE WHEN LEFT(Code, 1) = '6' THEN (PrevCredit - PrevDebit) + (CurrCredit - CurrDebit) ELSE TotalBalance END AS TotalBalance
        FROM (${tmp}) tmp
    WHERE LEFT(Code, 1) >= 6
  `;
    const finals = `
 ${final}
 union all
    SELECT
        '5' AS H1,
        'STOCKHOLDERS EQUITY' AS HT1,
        '5.50' AS H2,
        'RESULT OF OPERATION' AS HT2,
        '5.50.01' AS H3,
        'Net Income / (Loss)' AS HT3,
        SUM(PrevCredit) - SUM(PrevDebit),
        SUM(CurrDebit),
        SUM(CurrCredit),
        SUM(CurrCredit) - SUM(CurrDebit),
        (SUM(PrevCredit) - SUM(PrevDebit)) + (SUM(CurrCredit) - SUM(CurrDebit))
    FROM (${tmp2}) tmp2
   `;
    qry = `
    SELECT
      H1,
      HT1,
      H2,
      HT2,
      H3,
      HT3,
      format(ifnull(PrevBalance,0),0) as PrevBalance,
      format(ifnull(CurrDebit,0),0) as CurrDebit,
      format(ifnull(CurrCredit,0),0) as CurrCredit,
      format(ifnull(CurrBalance,0),0) as CurrBalance,
      format(ifnull(TotalBalance,0),0) as TotalBalance,
      CASE WHEN CAST(H1 AS UNSIGNED) < 4 THEN 'ASSETS' ELSE 'LIABILITIES' END AS H 
    FROM (${finals}) Final`;
  } else {
    const tmp = `
    select
    SACode , 
    SubAccount  , 
    Code  , 
    Title , 
    Balance , 
    TotalBalance 
    from (${FinancialStatementSumm(req.body.date, req.body.report)}) tmp
  `;
    const tmp1 = `
    SELECT 
      SUBSTRING(tmp.Code, 1, 1) AS H1, 
      SUBSTRING(tmp.Code, 1, 4) AS H2, 
      SACode, 
      SubAccount, 
      Code, 
      Title, 
      IF(CAST(SUBSTRING(tmp.Code, 1, 1) AS SIGNED) >= 4, -Balance, Balance) AS Balance, 
      IF(CAST(SUBSTRING(tmp.Code, 1, 1) AS SIGNED) >= 4, -TotalBalance, TotalBalance) AS TotalBalance
      FROM (${tmp}) tmp
    WHERE CAST(SUBSTRING(tmp.Code, 1, 1) AS SIGNED) <= 5`;

    const FinalTemp = `
    SELECT 
        tmp1.H1, 
        tmp1.H2, 
        ca.Acct_Title AS HT2, 
        tmp1.Code AS H3, 
        tmp1.Title AS HT3, 
        tmp1.SACode, 
        tmp1.SubAccount, 
        tmp1.Balance, 
        tmp1.TotalBalance
    FROM (${tmp1}) tmp1
    LEFT JOIN chart_account ca ON tmp1.H2 = ca.Acct_Code
    `;

    const Final = `
    SELECT
       FinalTemp.H1, 
        ca.Acct_Title AS HT1, 
        FinalTemp.H2, 
        FinalTemp.HT2, 
        FinalTemp.H3, 
        FinalTemp.HT3, 
        FinalTemp.SACode, 
        FinalTemp.SubAccount, 
        FinalTemp.Balance, 
        FinalTemp.TotalBalance
      FROM (${FinalTemp}) FinalTemp 
      LEFT JOIN chart_account ca ON FinalTemp.H1 = ca.Acct_Code
      `;

    const tmp2 = `
      SELECT 
        '5' AS H1, 
        'STOCKHOLDERS EQUITY' AS HT1, 
        '5.50' AS H2, 
        'RESULT OF OPERATION' AS HT2, 
        '5.50.01' AS H3, 
        'Net Income / (Loss)' AS HT3, 
        SACode, 
        SubAccount, 
        -Balance AS Balance, 
        -TotalBalance AS TotalBalance
      FROM (${tmp}) tmp
      WHERE CAST(SUBSTRING(tmp.Code, 1, 1) AS SIGNED) >= 6`;

    const Finals = `
      (${Final})
      union all
      SELECT 
         H1, 
        'STOCKHOLDERS EQUITY' AS HT1, 
        '5.50' AS H2, 
        'RESULT OF OPERATION' AS HT2, 
        '5.50.01' AS H3, 
        'Net Income / (Loss)' AS HT3, 
        SACode, 
        SubAccount, 
        SUM(Balance) AS Balance, 
        SUM(TotalBalance) AS TotalBalance
      FROM (${tmp2}) tmp2
      GROUP BY H1, HT1, H2, HT2, H3, HT3, SACode, SubAccount
`;
    qry = `
    SELECT  
      IF(CAST(H1 AS SIGNED) < 4, 'TOTAL ASSETS', 'TOTAL LIABILITIES AND CAPITAL') AS H, 
      Final.*
    FROM (${Finals}) Final`;
  }
  const data: any = await prisma.$queryRawUnsafe(qry);
  function groupData(_data: any) {
    const grouped: any = {};

    _data.forEach((item: any) => {
      // Group by H (Top Level)
      if (!grouped[item.H]) {
        grouped[item.H] = {
          header: item.H,
          groups: {},
        };
      }

      // Group by H1 (Second Level)
      if (!grouped[item.H].groups[item.H1]) {
        grouped[item.H].groups[item.H1] = {
          header: item.HT1,
          subGroups: {},
        };
      }

      // Group by H2 (Third Level)
      if (!grouped[item.H].groups[item.H1].subGroups[item.H2]) {
        grouped[item.H].groups[item.H1].subGroups[item.H2] = {
          subHeader: item.HT2,
          items: [],
        };
      }
      grouped[item.H].groups[item.H1].subGroups[item.H2].items.push(item);
      // Add Item Details
      // grouped[item.H].groups[item.H1].subGroups[item.H2].items.push({
      //   detailHeader: item.HT3,
      //   prevBalance: item.PrevBalance,
      //   currDebit: item.CurrDebit,
      //   currCredit: item.CurrCredit,
      //   currBalance: item.CurrBalance,
      //   totalBalance: item.TotalBalance,
      // });
    });

    return grouped;
  }
  const result = groupData(data);
  const newData: Array<any> = [];
  for (const H in result) {
    let hTotalPrevBalance = 0;
    let hTotalCurrDebite = 0;
    let hTotalCurrCredit = 0;
    let hTotalTotalBalance = 0;

    newData.push({
      H1: "",
      HT1: "",
      H2: "",
      HT2: "",
      H3: "",
      HT3: H,
      PrevBalance: "",
      CurrDebit: "",
      CurrCredit: "",
      CurrBalance: "",
      TotalBalance: "",
      H: "1",
    });

    const H1Groups = result[H].groups;
    for (const H1 in H1Groups) {
      newData.push({
        H1: "1",
        HT1: "",
        H2: "",
        HT2: "",
        H3: "",
        HT3: H1Groups[H1].header,
        PrevBalance: "",
        CurrDebit: "",
        CurrCredit: "",
        CurrBalance: "",
        TotalBalance: "",
        H: "",
      });
      let h1TotalPrevBalance = 0;
      let h1TotalCurrDebite = 0;
      let h1TotalCurrCredit = 0;
      let h1TotalTotalBalance = 0;
      const H2Groups = H1Groups[H1].subGroups;
      for (const H2 in H2Groups) {
        newData.push({
          H1: "",
          HT1: "",
          H2: "1",
          HT2: "",
          H3: "",
          HT3: `${H2Groups[H2].subHeader}`,
          PrevBalance: "",
          CurrDebit: "",
          CurrCredit: "",
          CurrBalance: "",
          TotalBalance: "",
          H: "",
        });
        H2Groups[H2].items.forEach((item: any) => {
          newData.push({
            ...item,
            dd: true,
          });
        });
        let PrevBalance = getSum(H2Groups[H2].items, "PrevBalance");
        let CurrDebit = getSum(H2Groups[H2].items, "CurrDebit");
        let CurrCredit = getSum(H2Groups[H2].items, "CurrCredit");
        let TotalBalance = getSum(H2Groups[H2].items, "TotalBalance");
        h1TotalPrevBalance = h1TotalPrevBalance + PrevBalance;
        h1TotalCurrDebite = h1TotalCurrDebite + CurrDebit;
        h1TotalCurrCredit = h1TotalCurrCredit + CurrCredit;
        h1TotalTotalBalance = h1TotalTotalBalance + TotalBalance;
        newData.push({
          H1: "",
          HT1: "",
          H2: "1",
          HT2: "",
          H3: "",
          HT3: ``,
          PrevBalance: formatNumber(PrevBalance),
          CurrDebit: formatNumber(CurrDebit),
          CurrCredit: formatNumber(CurrCredit),
          CurrBalance: "",
          TotalBalance: formatNumber(TotalBalance),
          H: "",
          footer: true,
        });
      }
      hTotalPrevBalance = hTotalPrevBalance + h1TotalPrevBalance;
      hTotalCurrDebite = hTotalCurrDebite + h1TotalCurrDebite;
      hTotalCurrCredit = hTotalCurrCredit + h1TotalCurrCredit;
      hTotalTotalBalance = hTotalTotalBalance + h1TotalTotalBalance;
      newData.push({
        H1: "1",
        HT1: "",
        H2: "",
        HT2: "",
        H3: "",
        HT3: `TOTAL ${H1Groups[H1].header}`,
        PrevBalance: formatNumber(h1TotalPrevBalance),
        CurrDebit: formatNumber(h1TotalCurrDebite),
        CurrCredit: formatNumber(h1TotalCurrCredit),
        CurrBalance: "",
        TotalBalance: formatNumber(h1TotalTotalBalance),
        H: "",
        footer: true,
      });
    }

    newData.push({
      H1: "",
      HT1: "",
      H2: "",
      HT2: "",
      H3: "",
      HT3: `TOTAL ${H === "ASSETS" ? H : "LIABILITIES AND CAPITAL"}`,
      PrevBalance: formatNumber(hTotalPrevBalance),
      CurrDebit: formatNumber(hTotalCurrDebite),
      CurrCredit: formatNumber(hTotalCurrCredit),
      CurrBalance: "",
      TotalBalance: formatNumber(hTotalTotalBalance),
      H: "1",
      footer: true,
    });
  }

  const HIndexes = getIndexes(newData, (item: any) => item?.H === "1");
  const H1Indexes = getIndexes(newData, (item: any) => item?.H1 === "1");
  const H2Indexes = getIndexes(newData, (item: any) => item?.H2 === "1");
  const H3Indexes = getIndexes(newData, (item: any) => item?.dd);

  const HFooterIndexes = getIndexes(
    newData,
    (item: any) => item?.H === "1" && item?.footer
  );
  const H1FooterIndexes = getIndexes(
    newData,
    (item: any) => item?.H1 === "1" && item?.footer
  );
  const H2FooterIndexes = getIndexes(
    newData,
    (item: any) => item?.H2 === "1" && item?.footer
  );

  let PAGE_WIDTH = 612 + 90;
  let PAGE_HEIGHT = 792 + 90;

  const props: any = {
    data: newData,
    columnWidths: [260, 120, 90, 90, 120],
    headers: [
      { headerName: "PARTICULARS", textAlign: "left" },
      { headerName: "PREVIOUS BALANCE", textAlign: "right" },
      { headerName: "DEBIT", textAlign: "right" },
      { headerName: "CREDIT", textAlign: "right" },
      { headerName: "ENDING BALANCE", textAlign: "right" },
    ],
    keys: ["HT3", "PrevBalance", "CurrDebit", "CurrCredit", "TotalBalance"],
    title: "",
    setRowFontSize: 8,
    BASE_FONT_SIZE: 8,
    PAGE_WIDTH,
    PAGE_HEIGHT,
    addHeaderBorderTop: false,
    MARGIN: { top: 100, right: 10, bottom: 20, left: 10 },
    addPadingfFromLeft: (rowIndex: number, colIndex: number) => {
      if (H3Indexes.includes(rowIndex) && colIndex === 0) {
        return 65;
      }
      if (H2Indexes.includes(rowIndex) && colIndex === 0) {
        return 40;
      }

      if (H1Indexes.includes(rowIndex) && colIndex === 0) {
        return 20;
      }

      return 0;
    },
    addRowHeight: (rowIndex: number) => {
      // if (paddingFirstIndexes.includes(rowIndex)) {
      //   return -10;
      // } else if (totalBalanceIndexes.includes(rowIndex - 1)) {
      //   return -10;
      // }
      return 0;
    },
    beforeDraw: (
      pdfReportGenerator: PDFReportGenerator,
      doc: PDFKit.PDFDocument
    ) => {
      H2FooterIndexes.forEach((idx: number) => {
        pdfReportGenerator.borderColumnInRow(
          idx,
          [
            { column: 1, key: "PrevBalance" },
            { column: 2, key: "CurrDebit" },
            { column: 3, key: "CurrCredit" },
            { column: 4, key: "TotalBalance" },
          ],
          {
            top: true,
            bottom: false,
            left: false,
            right: false,
          },
          8
        );
      });
      H1FooterIndexes.forEach((idx: number) => {
        pdfReportGenerator.borderColumnInRow(
          idx,
          [
            { column: 1, key: "PrevBalance" },
            { column: 2, key: "CurrDebit" },
            { column: 3, key: "CurrCredit" },
            { column: 4, key: "TotalBalance" },
          ],
          {
            top: false,
            bottom: true,
            left: false,
            right: false,
          },
          8
        );
      });
      HFooterIndexes.forEach((idx: number) => {
        pdfReportGenerator.borderColumnInRow(
          idx,
          [
            { column: 1, key: "PrevBalance" },
            { column: 2, key: "CurrDebit" },
            { column: 3, key: "CurrCredit" },
            { column: 4, key: "TotalBalance" },
          ],
          {
            top: false,
            bottom: true,
            left: false,
            right: false,
          },
          8
        );
      });
    },
    beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
      doc.font("Helvetica-Bold");
      doc.fontSize(10);
      doc.text(req.body.title, 10, 20, {
        align: "left",
        width: 400,
      });

      doc.text("TRANSACTIONS", 460, 75, {
        align: "left",
        width: 200,
      });
      doc.fontSize(8);
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
        pdfReportGenerator.PAGE_HEIGHT - 25,
        {
          align: "right",
          width: 100,
        }
      );
      doc.text(
        `Printed: ${format(new Date(), "MM/dd/yyyy, hh:mm a")}`,
        -75,
        pdfReportGenerator.PAGE_HEIGHT - 25,
        {
          align: "right",
          width: 200,
        }
      );
    },
  };

  const pdfReportGenerator = new PDFReportGenerator(props);
  return pdfReportGenerator.generatePDF(res);
}
async function GeneralLedger(req: Request, res: Response) {
  const qry = _GeneralLedgerReport(
    req.body.date,
    req.body.subAccount,
    req.body.report,
    0,
    req.body.nominalAccountRef === "Pre Closing" ? 0 : 1
  );

  const data = (await prisma.$queryRawUnsafe(qry)) as Array<any>;

  const result: Array<any> = [];

  const grouped = data.reduce((acc, item) => {
    if (!acc[item.GL_Acct]) acc[item.GL_Acct] = [];
    acc[item.GL_Acct].push(item);
    return acc;
  }, {});

  let grandTotalDebit = 0;
  let grandTotalCredit = 0;

  for (const acct in grouped) {
    const group = grouped[acct];
    const title = group[0].Title;

    result.push({
      GL_Acct: acct,
      Title: "",
      BookCode: "",
      Book: title,
      Debit: "",
      Credit: "",
      SubTotal: "",
    });

    let accountTotalDebit = 0;
    let accountTotalCredit = 0;

    group.forEach((entry: any) => {
      let Debit = parseFloat(entry.Debit.toString().replace(/,/g, ""));
      let Credit = parseFloat(entry.Credit.toString().replace(/,/g, ""));
      accountTotalDebit += Debit;
      accountTotalCredit += Credit;
      entry.Debit = formatNumber(Debit);
      entry.Credit = formatNumber(Credit);
      entry.SubTotal = "";
      result.push(entry);
    });

    result.push({
      GL_Acct: "",
      Title: "P2",
      BookCode: "",
      Book: `Account Total :`,
      Debit: formatNumber(accountTotalDebit),
      Credit: formatNumber(accountTotalCredit),
      SubTotal: formatNumber(accountTotalDebit - accountTotalCredit),
    });

    grandTotalDebit += accountTotalDebit;
    grandTotalCredit += accountTotalCredit;
  }
  result.push({
    GL_Acct: "GRAND TOTAL",
    Title: "",
    BookCode: "",
    Book: ``,
    Debit: formatNumber(grandTotalDebit),
    Credit: formatNumber(grandTotalCredit),
    SubTotal: formatNumber(grandTotalDebit - grandTotalCredit),
  });

  let PAGE_WIDTH = 612;
  let PAGE_HEIGHT = 792;

  const P2Indexes = getIndexes(result, (item: any) => item?.Title === "P2");

  const props: any = {
    data: result,
    columnWidths: [50, 200, 70, 90, 90, 90],
    headers: [
      { headerName: "ACCT#", textAlign: "left" },
      { headerName: "ACCOUNT TITLE / TRANSACTIONS", textAlign: "left" },
      { headerName: "SOURCE BOOK", textAlign: "left" },
      { headerName: "DEBIT", textAlign: "right" },
      { headerName: "CREDIT", textAlign: "right" },
      { headerName: "BALANCE", textAlign: "right" },
    ],
    keys: ["GL_Acct", "Book", "BookCode", "Debit", "Credit", "SubTotal"],
    title: "",
    setRowFontSize: 8,
    BASE_FONT_SIZE: 8,
    PAGE_WIDTH,
    PAGE_HEIGHT,
    addHeaderBorderTop: false,
    MARGIN: { top: 100, right: 10, bottom: 20, left: 10 },
    beforeDraw: (
      pdfReportGenerator: PDFReportGenerator,
      doc: PDFKit.PDFDocument
    ) => {
      pdfReportGenerator.SpanRow(result.length - 1, 0, 2);
      pdfReportGenerator.setAlignment(result.length - 1, 1, "left");

      pdfReportGenerator.borderColumnInRow(
        result.length - 1,
        [
          { column: 3, key: "Debit" },
          { column: 4, key: "Credit" },
          { column: 5, key: "SubTotal" },
        ],
        {
          top: false,
          bottom: true,
          left: false,
          right: false,
        },
        8
      );

      P2Indexes.forEach((idx: number) => {
        pdfReportGenerator.setAlignment(idx, 1, "right");
        pdfReportGenerator.borderColumnInRow(
          idx,
          [
            { column: 3, key: "Debit" },
            { column: 4, key: "Credit" },
            { column: 5, key: "SubTotal" },
          ],
          {
            top: true,
            bottom: false,
            left: false,
            right: false,
          },
          8
        );
      });
    },
    beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
      doc.font("Helvetica-Bold");
      doc.fontSize(10);
      doc.text(req.body.title, 10, 20, {
        align: "left",
        width: 400,
      });

      doc.text("TRANSACTIONS", 460, 75, {
        align: "left",
        width: 200,
      });
      doc.fontSize(8);
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
        pdfReportGenerator.PAGE_HEIGHT - 25,
        {
          align: "right",
          width: 100,
        }
      );
      doc.text(
        `Printed: ${format(new Date(), "MM/dd/yyyy, hh:mm a")}`,
        -75,
        pdfReportGenerator.PAGE_HEIGHT - 25,
        {
          align: "right",
          width: 200,
        }
      );
    },
  };

  const pdfReportGenerator = new PDFReportGenerator(props);
  return pdfReportGenerator.generatePDF(res);
}

async function PostDatedChecksRegistry(req: Request, res: Response) {
  const title = req.body.title;
  const dateFrom = format(new Date(req.body.dateFrom), "yyyy-MM-dd");
  const dateTo = format(new Date(req.body.dateTo), "yyyy-MM-dd");
  let qry = "";
  let sortQry = "";
  let whereQry = "";
  if ((req.body.sort = "Name")) {
    sortQry = `Order By Name ${
      req.body.order === "Ascending" ? "ASC" : "DESC"
    }`;
  } else if ((req.body.sort = "Check Date")) {
    sortQry = `Order By Check_Date ${
      req.body.order === "Ascending" ? "ASC" : "DESC"
    }`;
  } else if ((req.body.sort = "Date Received")) {
    sortQry = `Order By Date ${
      req.body.order === "Ascending" ? "ASC" : "DESC"
    }`;
  }

  if (req.body.type === "All") {
  } else if (req.body.type === "Rent") {
    whereQry = `AND PNo like '%rent%'`;
  } else if (req.body.type === "Loan") {
    whereQry = `AND PNo like '%rent%'`;
  }

  switch (req.body.field) {
    case "Check Date":
      if (req.body.branch === "All") {
        qry = `
          SELECT PDC.* From PDC WHERE (((PDC.Check_Date)>='${dateFrom}' And (PDC.Check_Date)<='${dateTo}')
        AND (((PDC.PDC_Remarks)<>'Fully Paid' And (PDC.PDC_Remarks)<>'Foreclosed') Or ((PDC.PDC_Remarks)='Replaced' Or (PDC.PDC_Remarks) IS NULL Or (PDC.PDC_Remarks)='')) AND ((PDC.PDC_Status)<>'Pulled Out'))  ${whereQry} ${sortQry}`;
      } else {
        qry = `
        SELECT 
        PDC.* From PDC WHERE (((PDC.Check_Date)>='${dateFrom}' And (PDC.Check_Date)<='${dateTo}') 
        AND ((PDC.PDC_Remarks)<>'Fully Paid' Or (PDC.PDC_Remarks)='Replaced' Or (PDC.PDC_Remarks) IS NULL Or (PDC.PDC_Remarks)='') AND ((PDC.PDC_Status)<>'Pulled Out')) ${whereQry} ${sortQry}
        `;
      }
      break;
    case "Date Received":
      if (req.body.branch === "All") {
        qry = `
          SELECT PDC.* From PDC WHERE (((PDC.Check_Date)>='${dateFrom}' And (PDC.Check_Date)<='${dateTo}')
        AND (((PDC.PDC_Remarks)<>'Fully Paid' And (PDC.PDC_Remarks)<>'Foreclosed') Or ((PDC.PDC_Remarks)='Replaced' Or (PDC.PDC_Remarks) IS NULL Or (PDC.PDC_Remarks)='')) AND ((PDC.PDC_Status)<>'Pulled Out'))  ${whereQry} ${sortQry}`;
      } else {
        qry = `
            SELECT PDC.* From PDC WHERE (((PDC.Date)>='${dateFrom}' And (PDC.Date)<='${dateTo}') 
            AND ((PDC.PDC_Remarks)<>'Fully Paid' Or (PDC.PDC_Remarks)='Replaced' Or (PDC.PDC_Remarks) IS NULL Or (PDC.PDC_Remarks)='') AND ((PDC.PDC_Status)<>'Pulled Out')) ${whereQry} ${sortQry}

        `;
      }
      break;
  }
  const data_ = (await prisma.$queryRawUnsafe(qry)) as Array<any>;

  function groupData(_data: any) {
    const groupedData: any = {};
    _data.forEach((item: any) => {
      const month = format(new Date(item.Check_Date), "yyyy-MM"); // Group by Month (YYYY-MM)
      const date = format(new Date(item.Check_Date), "yyyy-MM-dd"); // Group by Date (YYYY-MM-dd)

      if (!groupedData[month]) {
        groupedData[month] = {};
      }
      if (!groupedData[month][date]) {
        groupedData[month][date] = [];
      }
      groupedData[month][date].push(item);
    });
    const sortedData: any = [];
    const _sort = Object.keys(groupedData).sort();

    _sort.forEach((month) => {
      const monthDataArray = groupedData[month];
      const dailyKey: any = Object.keys(monthDataArray);
      let monthlyTotal = 0;
      dailyKey.forEach((daily: any) => {
        sortedData.push({
          PDC_ID: "dd",
          Ref_No: "",
          PNo: "",
          IDNo: "",
          Date: `${format(new Date(daily), "MMMM dd, yyyy")}`,
          Name: "",
          Remarks: "",
          Bank: "",
          Branch: "",
          Check_Date: ``,
          Check_No: "",
          Check_Amnt: "",
          Check_Remarks: "",
          SlipCode: "",
          DateDepo: "",
          ORNum: "",
          PDC_Status: "",
          Date_Stored: "",
          Date_Endorsed: "",
          Date_Pulled_Out: "",
          PDC_Remarks: "",
          mark: "",
        });
        monthDataArray[daily].forEach((itm: any) => {
          itm.Check_Date = format(new Date(itm.Check_Date), "MM/dd/yyyy");
          itm.Check_Amnt = formatNumber(
            parseFloat(itm.Check_Amnt.toString().replace(/,/g, ""))
          );
          itm.Date = format(new Date(itm.Date), "MM/dd/yyyy");
          sortedData.push(itm);
        });
        monthlyTotal += getSum(monthDataArray[daily], "Check_Amnt");
        sortedData.push({
          PDC_ID: "dta",
          Ref_No: "",
          PNo: "",
          IDNo: "",
          Date: ``,
          Name: "",
          Remarks: "",
          Bank: "",
          Branch: "",
          Check_Date: `DAILY TOTAL`,
          Check_No: "",
          Check_Amnt: `${formatNumber(
            getSum(monthDataArray[daily], "Check_Amnt")
          )}`,
          Check_Remarks: "",
          SlipCode: "",
          DateDepo: "",
          ORNum: "",
          PDC_Status: "",
          Date_Stored: "",
          Date_Endorsed: "",
          Date_Pulled_Out: "",
          PDC_Remarks: "",
          mark: "",
        });
      });

      sortedData.push({
        PDC_ID: "mt",
        Ref_No: "",
        PNo: "",
        IDNo: "",
        Date: "",
        Name: "",
        Remarks: "",
        Bank: "",
        Branch: "",
        Check_Date: `MONTH of ${format(new Date(dailyKey[0]), "MMMM")}`,
        Check_No: "",
        Check_Amnt: formatNumber(monthlyTotal),
        Check_Remarks: "",
        SlipCode: "",
        DateDepo: "",
        ORNum: "",
        PDC_Status: "",
        Date_Stored: "",
        Date_Endorsed: "",
        Date_Pulled_Out: "",
        PDC_Remarks: "",
        mark: "",
      });
    });
    return sortedData;
  }
  const data = groupData(data_);

  data.push({
    PDC_ID: "",
    Ref_No: "",
    PNo: "",
    IDNo: "",
    Date: `TOTAL # OF CHECK(S) : ${data_.length}`,
    Name: "",
    Remarks: "",
    Bank: "",
    Branch: "",
    Check_Date: "GRAND TOTAL",
    Check_No: "",
    Check_Amnt: formatNumber(getSum(data_, "Check_Amnt")),
    Check_Remarks: "",
    SlipCode: "",
    DateDepo: "",
    ORNum: "",
    PDC_Status: "",
    Date_Stored: "",
    Date_Endorsed: "",
    Date_Pulled_Out: "",
    PDC_Remarks: "",
    mark: "",
  });

  const dailyTotalIndexes = getIndexes(
    data,
    (item: any) => item.PDC_ID === "dta"
  );

  const dailyDateIndexes = getIndexes(
    data,
    (item: any) => item.PDC_ID === "dd"
  );
  const monthTotalIndexes = getIndexes(
    data,
    (item: any) => item.PDC_ID === "mt"
  );

  let PAGE_WIDTH = 712;
  let PAGE_HEIGHT = 892;
  const props: any = {
    data: data,
    columnWidths: [90, 80, 150, 80, 60, 80, 80, 60],
    headers: [
      { headerName: "DATE RECEIVED", textAlign: "left" },
      { headerName: "ACCT NO.", textAlign: "left" },
      { headerName: "NAME", textAlign: "left" },
      { headerName: "CHECK DATE", textAlign: "left" },
      { headerName: "BANK", textAlign: "left" },
      { headerName: "CHECK #", textAlign: "left" },
      { headerName: "AMOUNT", textAlign: "right" },
      { headerName: "OR #", textAlign: "left" },
    ],
    keys: [
      "Date",
      "PNo",
      "Name",
      "Check_Date",
      "Bank",
      "Check_No",
      "Check_Amnt",
      "ORNum",
    ],
    title: title,
    adjustTitleFontSize: 6,
    setRowFontSize: 10,
    BASE_FONT_SIZE: 6,
    PAGE_WIDTH,
    PAGE_HEIGHT,
    MARGIN: { top: 80, right: 20, bottom: 30, left: 20 },
    beforeDraw: (
      pdfReportGenerator: PDFReportGenerator,
      doc: PDFKit.PDFDocument
    ) => {
      pdfReportGenerator.boldRow(data.length - 1);
      pdfReportGenerator.SpanRow(data.length - 1, 3, 2);
      pdfReportGenerator.SpanRow(data.length - 1, 0, 2);
      pdfReportGenerator.borderColumnInRow(
        data.length - 1,
        [{ column: 6, key: "Check_Amnt" }],
        {
          top: true,
          bottom: false,
          left: false,
          right: false,
        }
      );

      monthTotalIndexes.forEach((itm: number) => {
        pdfReportGenerator.boldRow(itm);
        pdfReportGenerator.SpanRow(itm, 3, 2);
        pdfReportGenerator.borderColumnInRow(
          itm,
          [{ column: 6, key: "Check_Amnt" }],
          {
            top: true,
            bottom: false,
            left: false,
            right: false,
          }
        );
      });
      dailyDateIndexes.forEach((itm: number) => {
        pdfReportGenerator.boldRow(itm);
      });
      dailyTotalIndexes.forEach((itm: number) => {
        pdfReportGenerator.boldRow(itm);

        pdfReportGenerator.borderColumnInRow(
          itm,
          [{ column: 6, key: "Check_Amnt" }],
          {
            top: true,
            bottom: false,
            left: false,
            right: false,
          }
        );
      });
    },
    beforePerPageDraw: (pdfReportGenerator: any, doc: PDFKit.PDFDocument) => {
      // doc.font("Helvetica-Bold");
      // doc.fontSize(10);
      // doc.text(title, 20, 40, {
      //   align: "left",
      //   width: 400,
      // });
      // doc.fontSize(8);
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
}
const getIndexes = (array: Array<any>, condition: any) => {
  return array.reduce((indexes, item, index) => {
    if (condition(item)) {
      indexes.push(index); // Store the index if condition is met
    }
    return indexes;
  }, []);
};

function chkNull(value: any) {
  return value ?? "";
}

function clrStr(str: string) {
  return str?.trim();
}

const abstractDataCollection = async (req: Request) => {
  const { queryCollection, queryJournal } = AbstractCollections(
    req.body.report,
    req.body.subAccount.toUpperCase(),
    req.body.date,
    req.body.order
  );
  const queryCollectionData: Array<any> = await prisma.$queryRawUnsafe(
    queryCollection
  );
  const data: any = queryCollectionData.map((itm: any) => {
    itm.Debit = formatNumber(
      parseFloat(itm.Debit.toString().replace(/,/g, ""))
    );
    itm.Credit = formatNumber(
      parseFloat(itm.Credit.toString().replace(/,/g, ""))
    );
    return itm;
  });
  const _summary: any = await prisma.$queryRawUnsafe(queryJournal);

  const summary = _summary.map((itm: any) => {
    itm.Title = `${itm.GL_Acct}   ${itm.Title}`;
    itm.mDebit = formatNumber(
      parseFloat(itm.mDebit.toString().replace(/,/g, ""))
    );
    itm.mCredit = formatNumber(
      parseFloat(itm.mCredit.toString().replace(/,/g, ""))
    );
    return itm;
  });
  console.log(data);

  return { data, summary };
};
async function AbstractCollection(req: Request, res: Response) {
  const { data, summary } = await abstractDataCollection(req);
  const headers = [
    { label: "DATE", key: "Date", style: { width: 60, textAlign: "left" } },
    { label: "ID #", key: "IDNo", style: { width: 80, textAlign: "left" } },
    {
      label: "CLIENT NAME",
      key: "cName",
      style: { width: 150, textAlign: "left" },
    },
    { label: "OR #", key: "ORNo", style: { width: 50, textAlign: "left" } },
    {
      label: "BANK/BRANCH",
      key: "Bank",
      style: { width: 100, textAlign: "left" },
    },
    {
      label: "CHECK #",
      key: "cCheck_No",
      style: { width: 65, textAlign: "left" },
    },
    {
      label: "AMOUNT",
      key: "Debit",
      style: { width: 80, textAlign: "right" },
    },
    {
      label: "ACCOUNT",
      key: "DRTitle",
      style: { width: 100, textAlign: "left" },
    },
    {
      label: "AMOUNT",
      key: "Credit",
      style: { width: 80, textAlign: "right" },
    },
    {
      label: "ACCOUNT",
      key: "CRTitle",
      style: { width: 100, textAlign: "left" },
    },
    {
      label: "PURPOSE",
      key: "Purpose",
      style: { width: 100, textAlign: "left" },
    },
    {
      label: "REMARKS",
      key: "CRRemarks",
      style: { width: 100, textAlign: "left" },
    },
  ];

  const summaryHeaders = [
    {
      label: "ACCOUNTING TITLE",
      key: "Title",
      style: { width: 250, textAlign: "left" },
    },
    { label: "DEBIT", key: "mDebit", style: { width: 80, textAlign: "right" } },
    {
      label: "CREDIT",
      key: "mCredit",
      style: { width: 80, textAlign: "right" },
    },
  ];
  const outputFilePath = "manok.pdf";

  const PAGE_WIDTH = 1150; // A4 Portrait width
  const PAGE_HEIGHT = 595; // A4 Portrait height
  const MARGINS = {
    top: 100,
    bottom: 50,
    left: 20,
    right: 20,
  };
  const rowFontSize = 9;
  const doc = new PDFDocument({
    margin: 0,
    size: [PAGE_WIDTH, PAGE_HEIGHT],
    bufferPages: true,
  });
  const writeStream = fs.createWriteStream(outputFilePath);
  doc.pipe(writeStream);

  function getRowHeight(itm: any, headers: any) {
    const rowHeight = Math.max(
      ...headers.map((hItm: any) => {
        return doc.heightOfString(itm[hItm.key] || "-", {
          width: hItm.style.width - 5,
          align: hItm.style.textAlign,
        });
      }),
      rowFontSize + 1
    );

    return rowHeight + 5;
  }
  function addPageHeader(header: Array<any>, y: number, _x: any = 0) {
    doc.font("Helvetica-Bold");
    doc.fontSize(11);
    const rowHeight = Math.max(
      ...header.map((itm) =>
        doc.heightOfString(itm.label, { width: itm.style.width })
      ),
      10
    );
    let x = MARGINS.left + _x;
    header.forEach((itm) => {
      doc.text(itm.label, x, y, {
        width: itm.style.width - 5,
        align:
          itm.label === "ACCOUNTING TITLE"
            ? "center"
            : itm.style.textAlign === "right"
            ? "center"
            : itm.style.textAlign,
      });
      x += itm.style.width + 5;
    });
    return y + rowHeight + 5;
  }
  function drawTitle() {
    doc.font("Helvetica-Bold");
    doc.fontSize(12);
    doc.text(req.body.title, 20, 30);
  }
  function drawAfter(yAxis: any, rowHeight: any) {
    doc.text("------ Nothing Follows -------", PAGE_WIDTH / 2 - 60, yAxis, {
      width: 120,
    });
    doc.font("Helvetica-Bold");
    yAxis += 20;
    const DRAccount = headers.slice(0, 7).reduce((c: any, itm) => {
      return (c += itm.style.width);
    }, 0);

    const CRAccount = headers.slice(0, 9).reduce((c: any, itm) => {
      return (c += itm.style.width);
    }, 0);
    doc
      .moveTo(DRAccount, yAxis - 5)
      .lineTo(CRAccount + 120, yAxis - 5)
      .lineWidth(1)
      .stroke();

    doc.text("TOTAL :", 500, yAxis, { width: 100 });
    doc.text(formatNumber(getSum(data, "Debit")), DRAccount + 10, yAxis, {
      width: 100,
      align: "right",
    });
    doc.text(formatNumber(getSum(data, "Credit")), CRAccount + 10, yAxis, {
      width: 100,
      align: "right",
    });

    return rowHeight + yAxis;
  }

  drawTitle();
  let currentPage = 1;
  let yAxis = MARGINS.top;
  yAxis = addPageHeader(headers, yAxis);

  data.forEach((itm: any, idx: number) => {
    let rowHeight = getRowHeight(itm, headers);

    if (yAxis + rowHeight > PAGE_HEIGHT - MARGINS.bottom) {
      currentPage = currentPage + 1;
      doc.addPage({
        size: [PAGE_WIDTH, PAGE_HEIGHT],
        margin: 0,
        bufferPages: true,
      });
      drawTitle();
      yAxis = addPageHeader(headers, MARGINS.top);
    }

    let x = MARGINS.left;
    headers.forEach((hItm: any) => {
      const value = itm[hItm.key] || "-";
      doc.font("Helvetica");
      doc.fontSize(10);
      doc.text(value, x, yAxis, {
        width: hItm.style.width - 5,
        align: value === "-" ? "center" : hItm.style.textAlign,
      });
      x += hItm.style.width + 5;
    });

    yAxis += rowHeight;
  });

  yAxis += 5;
  yAxis = drawAfter(yAxis, 30);

  // ================ SUAMMARY ========================
  // summaryHeaders
  const totalSumarryHeigth = summary.reduce((container: any, itm: any) => {
    container += getRowHeight(itm, summaryHeaders);
    return container;
  }, 65);

  if (yAxis + totalSumarryHeigth > PAGE_HEIGHT - MARGINS.top) {
    console.log("here 1");
    const extraX = 350;
    currentPage = currentPage + 1;
    doc.addPage({
      size: [PAGE_WIDTH, PAGE_HEIGHT],
      margin: 0,
      bufferPages: true,
    });

    drawTitle();
    let yAxis = MARGINS.top;
    yAxis = addPageHeader(summaryHeaders, yAxis, extraX);
    summary.forEach((itm: any, idx: number) => {
      let rowHeight = getRowHeight(itm, summaryHeaders);

      if (yAxis + rowHeight > PAGE_HEIGHT - MARGINS.bottom) {
        currentPage = currentPage + 1;
        doc.addPage({
          size: [PAGE_WIDTH, PAGE_HEIGHT],
          margin: 0,
          bufferPages: true,
        });
        drawTitle();
        yAxis = addPageHeader(summaryHeaders, MARGINS.top, extraX);
      }

      let x = MARGINS.left;
      summaryHeaders.forEach((hItm: any) => {
        const value = itm[hItm.key] || "-";
        doc.font("Helvetica");
        doc.fontSize(10);
        doc.text(value, x + extraX, yAxis, {
          width: hItm.style.width - 5,
          align: value === "-" ? "center" : hItm.style.textAlign,
        });
        x += hItm.style.width + 5;
      });

      yAxis += rowHeight;
    });

    doc
      .moveTo(extraX + 270, yAxis - 2)
      .lineTo(extraX + 270 + 80 + 85, yAxis - 2)
      .lineWidth(1)
      .stroke();

    doc.font("Helvetica-Bold");
    doc.text("TOTAL :", extraX + 200, yAxis + 5);
    doc.text(formatNumber(getSum(summary, "mDebit")), extraX + 270, yAxis + 5, {
      width: 80,
      align: "right",
    });
    doc.text(
      formatNumber(getSum(summary, "mCredit")),
      extraX + 270 + 85,
      yAxis + 5,
      { width: 80, align: "right" }
    );
    yAxis += 22;
    doc
      .moveTo(extraX + 270, yAxis - 2)
      .lineTo(extraX + 270 + 80 + 85, yAxis - 2)
      .lineWidth(1)
      .stroke();

    yAxis += 40;

    doc.text("Prepared : ___________", extraX + 20, yAxis + 5);
    doc.text("Checked : ___________", extraX + 150 + 20, yAxis + 5);
    doc.text("Approved : ___________", extraX + 300 + 20, yAxis + 5);

    doc.font("Helvetica");
  } else {
    const extraX = 350;
    yAxis += 50;
    doc.font("Helvetica-Bold");
    doc.text("SUMMARY:", extraX, yAxis);
    yAxis += 30;
    yAxis = addPageHeader(summaryHeaders, yAxis, extraX);
    summary.forEach((itm: any, idx: number) => {
      let rowHeight = getRowHeight(itm, summaryHeaders);
      let x = MARGINS.left;
      summaryHeaders.forEach((hItm: any) => {
        const value = itm[hItm.key] || "-";
        doc.font("Helvetica");
        doc.fontSize(10);
        doc.text(value, x + extraX, yAxis, {
          width: hItm.style.width - 5,
          align: value === "-" ? "center" : hItm.style.textAlign,
        });
        x += hItm.style.width + 5;
      });
      yAxis += rowHeight;
    });

    doc
      .moveTo(extraX + 270, yAxis - 2)
      .lineTo(extraX + 270 + 80 + 85, yAxis - 2)
      .lineWidth(1)
      .stroke();

    doc.font("Helvetica-Bold");
    doc.text("TOTAL :", extraX + 200, yAxis + 5);
    doc.text(formatNumber(getSum(summary, "mDebit")), extraX + 270, yAxis + 5, {
      width: 80,
      align: "right",
    });
    doc.text(
      formatNumber(getSum(summary, "mCredit")),
      extraX + 270 + 85,
      yAxis + 5,
      { width: 80, align: "right" }
    );
    yAxis += 22;
    doc
      .moveTo(extraX + 270, yAxis - 2)
      .lineTo(extraX + 270 + 80 + 85, yAxis - 2)
      .lineWidth(1)
      .stroke();

    yAxis += 40;

    doc.text("Prepared : ___________", extraX + 20, yAxis + 5);
    doc.text("Checked : ___________", extraX + 150 + 20, yAxis + 5);
    doc.text("Approved : ___________", extraX + 300 + 20, yAxis + 5);

    doc.font("Helvetica");
  }

  const range = doc.bufferedPageRange();
  let i;
  let end;

  for (
    i = range.start, end = range.start + range.count, range.start <= end;
    i < end;
    i++
  ) {
    doc.switchToPage(i);
    doc.text(
      `Page ${i + 1} of ${range.count}`,
      PAGE_WIDTH - 80,
      PAGE_HEIGHT - 30
    );
    doc.text(
      `Printed ${format(new Date(), "MM/dd/yyyy hh:mm a")}`,
      20,
      PAGE_HEIGHT - 30
    );
  }

  doc.end();

  writeStream.on("finish", (e: any) => {
    console.log(`PDF created successfully at: ${outputFilePath}`);
    const readStream = fs.createReadStream(outputFilePath);
    readStream.pipe(res);

    readStream.on("end", () => {
      fs.unlink(outputFilePath, (err: any) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log(`File ${outputFilePath} deleted successfully.`);
        }
      });
    });
  });
}
const generalJournalBookGJBData = async (req: Request) => {
  const qry = CashDisbursementBook_GJB(
    req.body.sub_acct,
    req.body.date,
    req.body.dateFormat,
    req.body.order
  );

  const data: any = await prisma.$queryRawUnsafe(qry.strSQL);
  const summary: any = await prisma.$queryRawUnsafe(qry.strSubSQL);
  return { data, summary };
};
async function GeneralJournalBookGJB(req: Request, res: Response) {
  
}
export default accountingReporting;
