import express, { Request, Response } from "express";
import {
  AgingAccountsReport,
  PostDatedCheckRegistered,
} from "../../../model/db/stored-procedured";
import { PrismaList } from "../../../model/connection";
import { __executeQuery } from "../../../model/Task/Production/policy";
import { qry_id_policy_sub, qryJournal } from "../../../model/db/views";
import { format, subDays } from "date-fns";
import PDFReportGenerator from "../../../lib/pdf-generator";
import { formatNumber, getSum } from "../Production/production-report";
import { defaultFormat } from "../../../lib/defaultDateFormat";
const { CustomPrismaClient } = PrismaList();

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
      data: await __executeQuery(qry, req),
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
      data: await __executeQuery(`select AccountCode from policy_account`, req),
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
      data: await __executeQuery(
        `SELECT Acronym FROM Sub_Account order by Acronym asc`,
        req
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
      data: await __executeQuery(
        `SELECT Acronym, ShortName FROM Sub_Account where Acronym like '%${req.body.search}%'  order by Acronym asc`,
        req
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
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
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
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
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
          SELECT qryJournal.Number, qryJournal.Hide_Code, qryJournal.Date_Entry, qryJournal.Source_Type,
                qryJournal.Source_No, COALESCE(qryJournal.Explanation, '') as Explanation, 
                COALESCE(qryJournal.Payto, '') as Payto, qryJournal.GL_Acct, qryJournal.Sub_Acct, 
                qryJournal.ID_No, qryJournal.mShort, qryJournal.mSub_Acct, qryJournal.mID, 
                qryJournal.mDebit, qryJournal.mCredit, COALESCE(qryJournal.Check_Date, '') as Check_Date, 
                COALESCE(qryJournal.Checked, '') as Checked, COALESCE(qryJournal.Bank, '') as Bank, 
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
  console.log(Qry);

  // Execute the transaction query
  dt = await prisma.$queryRawUnsafe(Qry);

  // Processing query results

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

  const data = result.map((itm: any) => {
    itm.Date_Entry = format(new Date(itm.Date_Entry), "MM/dd/yyyy");
    itm.Debit = formatNumber(
      parseFloat(itm.Debit.toString().replace(/,/g, ""))
    );
    itm.Credit = formatNumber(
      parseFloat(itm.Credit.toString().replace(/,/g, ""))
    );
    return {
      ...itm,
      refs: `${itm.Source_Type}  ${itm.Source_No}`,
    };
  });

  let PAGE_WIDTH = 612 + 50;
  let PAGE_HEIGHT = 792 + 50;
  const props: any = {
    data,
    columnWidths: [80, 80, 120, 50, 95, 95, 100],
    headers: [
      { headerName: "DATE", textAlign: "left" },
      { headerName: "REF No.", textAlign: "left" },
      { headerName: "ID NO", textAlign: "left" },
      { headerName: "CHECK NO", textAlign: "center" },
      { headerName: "DEBIT", textAlign: "right" },
      { headerName: "CREDIT", textAlign: "right" },
      { headerName: "EXPLANTION", textAlign: "left" },
    ],
    keys: [
      "Date_Entry",
      "refs",
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
      // doc.font("Helvetica");
      // const pageNumberText = `Page ${currentPage}`;
      // doc.text(
      //   pageNumberText,
      //   PAGE_WIDTH - 160,
      //   pdfReportGenerator.PAGE_HEIGHT - 35,
      //   {
      //     align: "right",
      //     width: 100,
      //   }
      // );
      // doc.text(
      //   `Printed: ${format(new Date(), "MM/dd/yyyy, hh:mm a")}`,
      //   -35,
      //   pdfReportGenerator.PAGE_HEIGHT - 35,
      //   {
      //     align: "right",
      //     width: 200,
      //   }
      // );
    },
  };
  const pdfReportGenerator = new PDFReportGenerator(props);
  return pdfReportGenerator.generatePDF(res);
}
async function PostDatedChecksRegistry(req: Request, res: Response) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

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

export default accountingReporting;
