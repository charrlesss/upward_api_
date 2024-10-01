import express from "express";
import { format, startOfMonth, isEqual, subDays } from "date-fns";
import { v4 as uuidV4 } from "uuid";
import { qryJournal } from "../../../model/db/views";
import { PrismaList } from "../../../model/connection";

const SubsidiaryLedger = express.Router();
let dt: any = [];
const { CustomPrismaClient } = PrismaList();

SubsidiaryLedger.post("/subsidiary-ledger-report", async (req, res) => {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  let account: string = req.body.account;
  let DateFrom: any = format(new Date(req.body.dateFrom), "MM/dd/yyyy");
  let DateTo: any = format(new Date(req.body.dateTo), "MM/dd/yyyy");
  let subsi: number = req.body.subsi;
  let subsi_options: string = req.body.subsi_options;
  let field: number = req.body.field;
  let Balance = 0;
  let sFilter = " ";
  let Qry = "";

  const balanceForwarded: any = [];
  const report: any = [];
  if (account === "") account = "ALL";
  try {
    switch (subsi) {
      case 0:
        // Balances

        if (account !== "ALL") {
          if (
            new Date(
              new Date(DateFrom).getMonth() +
                1 +
                "/01/" +
                new Date(DateFrom).getFullYear()
            ) === new Date(DateFrom)
          ) {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
              FROM (${qryJournal()}) qryJournal
            WHERE 
            ((qryJournal.Source_Type = 'BF' OR qryJournal.Source_Type = 'AB') 
            AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '
            ${new Date(DateFrom).getFullYear()}-${
              new Date(DateFrom).getMonth() + 1
            }-01' 
            AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
              new Date(DateTo),
              "yyyy-MM-dd"
            )}') 
            AND (qryJournal.GL_Acct = '${account}'))
            GROUP BY qryJournal.GL_Acct
            ORDER BY qryJournal.GL_Acct`;
            dt = await prisma.$queryRawUnsafe(Qry);
          } else {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE 
            ((qryJournal.Source_Type <> 'BFD' AND qryJournal.Source_Type <> 'BFS') 
            AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
              DateFrom
            ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
            AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
              new Date(DateTo),
              "yyyy-MM-dd"
            )}') AND (qryJournal.GL_Acct = '${account}'))
            GROUP BY qryJournal.GL_Acct
            ORDER BY qryJournal.GL_Acct`;
            console.log(Qry);
            dt = await prisma.$queryRawUnsafe(Qry);
          }
        } else {
          // All GL Codes
          if (
            new Date(
              new Date(DateFrom).getMonth() +
                1 +
                "/01/" +
                new Date(DateFrom).getFullYear()
            ) === new Date(DateFrom)
          ) {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE ((qryJournal.Source_Type = 'BF' OR qryJournal.Source_Type = 'AB') 
            AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
              DateFrom
            ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
            AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
              new Date(DateTo),
              "yyyy-MM-dd"
            )}'))
            GROUP BY qryJournal.GL_Acct
            ORDER BY qryJournal.GL_Acct`;

            dt = await prisma.$queryRawUnsafe(Qry);
          } else {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE ((qryJournal.Source_Type <> 'BFD' AND qryJournal.Source_Type <> 'BFS') 
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
            GROUP BY qryJournal.GL_Acct
            ORDER BY qryJournal.GL_Acct`;

            dt = await prisma.$queryRawUnsafe(Qry);
          }
        }
        if (dt.length > 0) {
          for (let i = 0; i < dt.length; i++) {
            const xsubsidiary_id = uuidV4();
            balanceForwarded.push({
              xsubsidiary_id,
              Date_Entry: format(new Date(DateFrom), "yyyy-MM-dd"),
              Sort_Number: 1,
              Source_Type: "BF",
              Source_No: format(new Date(DateTo), "yyyy-MM-dd"),
              Explanation: "Balance Forwarded",
              Debit: dt[i].mDebit,
              Credit: dt[i].mCredit,
              Bal: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
              Balance: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
              Address: field,
              GL_Acct: dt[i].GL_Acct,
            });
          }
        }
        break;
      case 1:
        sFilter = ` AND qryJournal.ID_No = '${subsi_options}'  `;
        // Balances
        if (account !== "ALL") {
          if (
            new Date(
              new Date(DateFrom).getMonth() +
                1 +
                "/01/" +
                new Date(DateFrom).getFullYear()
            ) === new Date(DateFrom)
          ) {
            Qry = `
            SELECT 
              qryJournal.GL_Acct,
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE 
              (
               (qryJournal.Source_Type = 'BFD' OR qryJournal.Source_Type = 'AB') 
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
              ${sFilter}
            GROUP BY qryJournal.GL_Acct
            HAVING (qryJournal.GL_Acct = '${account}')
            ORDER BY qryJournal.GL_Acct`;
            dt = await prisma.$queryRawUnsafe(Qry);
          } else {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE (
              (qryJournal.Source_Type <> 'BF' 
              AND qryJournal.Source_Type <> 'BFS')
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
              ${sFilter}
            GROUP BY qryJournal.GL_Acct
            HAVING (qryJournal.GL_Acct = '${account}')
            ORDER BY qryJournal.GL_Acct`;
            dt = await prisma.$queryRawUnsafe(Qry);
          }
        } else {
          // All GL Codes
          if (
            new Date(
              new Date(DateFrom).getMonth() +
                1 +
                "/01/" +
                new Date(DateFrom).getFullYear()
            ) === new Date(DateFrom)
          ) {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE (
              (qryJournal.Source_Type = 'BFD' OR qryJournal.Source_Type = 'AB') 
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
            ${sFilter} 
            GROUP BY qryJournal.GL_Acct
            ORDER BY qryJournal.GL_Acct`;
            dt = await prisma.$queryRawUnsafe(Qry);
          } else {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE 
              (
               (qryJournal.Source_Type <> 'BF' 
              AND qryJournal.Source_Type <> 'BFS') 
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
              ${sFilter}
            GROUP BY qryJournal.GL_Acct
            ORDER BY qryJournal.GL_Acct`;
            console.log(Qry);
            dt = await prisma.$queryRawUnsafe(Qry);
          }
        }

        if (dt.length > 0) {
          for (let i = 0; i < dt.length; i++) {
            const xsubsidiary_id = uuidV4();
            balanceForwarded.push({
              xsubsidiary_id,
              Date_Entry: format(new Date(DateFrom), "yyyy-MM-dd"),
              Sort_Number: 1,
              Source_Type: "BF",
              Source_No: format(new Date(DateTo), "yyyy-MM-dd"),
              Explanation: "Balance Forwarded",
              Debit: dt[i].mDebit,
              Credit: dt[i].mCredit,
              Bal: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
              Balance: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
              Address: field,
              GL_Acct: dt[i].GL_Acct,
            });
          }
        }
        break;
      case 2:
        sFilter = ` `;
        // Balances
        if (account !== "ALL") {
          sFilter = ` AND qryJournal.Sub_Acct = '${subsi_options}' `;

          if (
            new Date(
              new Date(DateFrom).getMonth() +
                1 +
                "/01/" +
                new Date(DateFrom).getFullYear()
            ) === new Date(DateFrom)
          ) {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE 
              ((qryJournal.Sub_Acct = '${subsi_options}') 
              AND (qryJournal.Source_Type = 'BFS' OR qryJournal.Source_Type = 'AB') 
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
            GROUP BY qryJournal.GL_Acct
            HAVING (qryJournal.GL_Acct = '${account}')
            ORDER BY qryJournal.GL_Acct`;
            dt = await prisma.$queryRawUnsafe(Qry);
          } else {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE ((qryJournal.Sub_Acct = '${subsi_options}') 
              AND (qryJournal.Source_Type <> 'BF' 
              AND qryJournal.Source_Type <> 'BFD') 
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') < '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
            GROUP BY qryJournal.GL_Acct
            HAVING (qryJournal.GL_Acct = '${account}')
            ORDER BY qryJournal.GL_Acct`;
            dt = await prisma.$queryRawUnsafe(Qry);
          }
        } else {
          // All GL Codes
          if (
            new Date(
              new Date(DateFrom).getMonth() +
                1 +
                "/01/" +
                new Date(DateFrom).getFullYear()
            ) === new Date(DateFrom)
          ) {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE 
              ((qryJournal.Sub_Acct = '${subsi_options}') 
              AND (qryJournal.Source_Type = 'BFS' OR qryJournal.Source_Type = 'AB') 
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
            GROUP BY qryJournal.GL_Acct
            ORDER BY qryJournal.GL_Acct`;
            dt = await prisma.$queryRawUnsafe(Qry);
          } else {
            Qry = `
            SELECT 
              qryJournal.GL_Acct, 
              SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
              SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
            FROM (${qryJournal()}) qryJournal
            WHERE 
              ((qryJournal.Sub_Acct = '${subsi_options}') 
              AND (qryJournal.Source_Type <> 'BF' 
              AND qryJournal.Source_Type <> 'BFD') 
              AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
                DateFrom
              ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01' 
              AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
                new Date(DateTo),
                "yyyy-MM-dd"
              )}'))
            GROUP BY qryJournal.GL_Acct
            ORDER BY qryJournal.GL_Acct`;
            dt = await prisma.$queryRawUnsafe(Qry);
          }
        }
        if (dt.length > 0) {
          for (let i = 0; i < dt.length; i++) {
            const xsubsidiary_id = uuidV4();
            balanceForwarded.push({
              xsubsidiary_id,
              Date_Entry: format(new Date(DateFrom), "yyyy-MM-dd"),
              Sort_Number: 1,
              Source_Type: "BF",
              Source_No: format(new Date(DateTo), "yyyy-MM-dd"),
              Explanation: "Balance Forwarded",
              Debit: dt[i].mDebit,
              Credit: dt[i].mCredit,
              Bal: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
              Balance: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
              Address: field,
              GL_Acct: dt[i].GL_Acct,
            });
          }
        }
        break;
    }

    //Transaction
    if (account !== "ALL") {
      Qry = `
      SELECT
          qryJournal.Number,
          qryJournal.Hide_Code,
          qryJournal.Date_Entry,
          qryJournal.Source_Type,
          qryJournal.Source_No,
          IFNULL(qryJournal.Explanation,'') AS Explanation,
          IFNULL(qryJournal.Payto,'') AS Payto,
          qryJournal.GL_Acct, qryJournal.Sub_Acct,
          qryJournal.ID_No,
          qryJournal.mShort,
          qryJournal.mSub_Acct,
          qryJournal.mID,
          qryJournal.mDebit,
          qryJournal.mCredit,
          IFNULL(qryJournal.Check_Date,'') AS Check_Date,
          IFNULL(qryJournal.Checked,'') AS Checked,
          IFNULL(qryJournal.Bank, '') AS Bank,
          IFNULL(qryJournal.Remarks, '') AS Remarks
      FROM (${qryJournal()}) qryJournal
      WHERE
          ((date_format(qryJournal.Date_Entry,'%Y-%m-%d') >= '${format(
            new Date(DateFrom),
            "yyyy-MM-dd"
          )}'
          AND date_format(qryJournal.Date_Entry,'%Y-%m-%d') <= '${format(
            new Date(DateTo),
            "yyyy-MM-dd"
          )}')
          AND (qryJournal.Source_Type <> 'BF'
          AND qryJournal.Source_Type <> 'BFD'
          AND qryJournal.Source_Type <> 'BFS')
          AND (qryJournal.GL_Acct = '${account}')) 
          ${sFilter}
      ORDER BY qryJournal.Date_Entry, qryJournal.Number, qryJournal.Source_No, qryJournal.Auto`;
      dt = await prisma.$queryRawUnsafe(Qry);
    } else {
      // All GL Code
      Qry = `
      SELECT
        qryJournal.Number,
        qryJournal.Hide_Code,
        qryJournal.Date_Entry,
        qryJournal.Source_Type,
        qryJournal.Source_No,
        qryJournal.Explanation,
        qryJournal.Payto,
        qryJournal.GL_Acct,
        qryJournal.Sub_Acct,
        qryJournal.ID_No,
        qryJournal.mShort,
        qryJournal.mSub_Acct,
        qryJournal.mID,
        qryJournal.mDebit,
        qryJournal.mCredit,
        qryJournal.Check_Date,
        qryJournal.Checked,
        qryJournal.Bank,
        qryJournal.Remarks
      FROM (${qryJournal()}) qryJournal
      WHERE
        ((date_format(qryJournal.Date_Entry,'%Y-%m-%d') >= '${format(
          new Date(DateFrom),
          "yyyy-MM-dd"
        )}'
        AND date_format(qryJournal.Date_Entry,'%Y-%m-%d') <= '${format(
          new Date(DateTo),
          "yyyy-MM-dd"
        )}')
        AND (qryJournal.Source_Type <> 'BF'
        AND qryJournal.Source_Type <> 'BFD'
        AND qryJournal.Source_Type <> 'BFS'))
        ${sFilter}
       ORDER BY
       qryJournal.Date_Entry, qryJournal.Number, qryJournal.Source_No, qryJournal.Auto`;
      dt = await prisma.$queryRawUnsafe(Qry);
    }

    if (dt.length > 0) {
      let dtBal: any = [];
      let lastAcct = "";
      let sParticular = "";
      for (let i = 0; i < dt.length; i++) {
        const xsubsidiary_id = uuidV4();
        if (lastAcct !== chkNull(dt[i].GL_Acct)) {
          lastAcct = chkNull(dt[i].GL_Acct);
          dtBal = balanceForwarded.filter(
            (itms: any) =>
              itms.GL_Acct === lastAcct &&
              itms.Explanation === "Balance Forwarded"
          );
          if (dtBal.length > 0) {
            Balance = dtBal[0].Balance;
          } else {
            Balance = 0;
          }
        }
        Balance =
          Balance + (parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit));

        const fieldList = ["Explanations", "Payee", "Remarks"];
        switch (fieldList[field]) {
          case "Explanations":
            sParticular = clrStr(dt[i].Explanation);
            break;
          case "Payee":
            sParticular = clrStr(dt[i].Payto);
            break;
          case "Remarks":
            sParticular = clrStr(dt[i].Remarks);
            break;
        }
        report.push({
          xsubsidiary_id: xsubsidiary_id,
          Date_Entry: format(new Date(dt[i].Date_Entry), "yyyy-MM-dd"),
          Sort_Number: Number(dt[i].Number),
          Source_Type: dt[i]["Hide_Code"],
          Source_No: dt[i].Source_No,
          Explanation: clrStr(dt[i].Explanation),
          Payto: clrStr(dt[i].Payto),
          GL_Acct: chkNull(dt[i].GL_Acct),
          Sub_Acct: dt[i].Sub_Acct,
          ID_No: clrStr(dt[i].ID_No),
          cGL_Acct: clrStr(chkNull(dt[i].mShort)),
          cSub_Acct: clrStr(dt[i].mSub_Acct),
          cID_No: clrStr(dt[i].mID),
          Debit: dt[i].mDebit,
          Credit: dt[i].mCredit,
          Bal: Math.abs(
            parseFloat(
              (parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit)).toFixed(4)
            )
          ),
          Balance: Math.abs(
            parseFloat(parseFloat(Balance.toString())?.toFixed(4))
          ),
          Check_Date: dt[i].Check_Date ? `${dt[i].Check_Date}` : null,
          Check_No: dt[i].Check ? `${dt[i].Check}` : null,
          Check_Bank: dt[i].Bank ? `${clrStr(dt[i].Bank)}` : null,
          Address: fieldList[field],
          Particulars: sParticular,
        });
      }
    }

    res.send({
      message: "Successuflly Get Report",
      success: true,
      report: JSON.stringify(report),
      reports: report,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({
      message: err.message,
      success: false,
    });
  }
});

// SubsidiaryLedger.post("/subsidiary-ledger-report-desk-ss", async (req, res) => {
//   const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
//   let account: string = req.body.account;
//   let DateFrom: any = format(new Date(req.body.dateFrom), "MM/dd/yyyy");
//   let DateTo: any = format(new Date(req.body.dateTo), "MM/dd/yyyy");
//   let subsi: number = req.body.subsi;
//   let subsi_options: string = req.body.subsi_options;
//   let field: number = req.body.field;
//   let Balance = 0;
//   let sFilter = " ";
//   let Qry = "";

//   const balanceForwarded: any = [];
//   const report: any = [];
//   if (account === "") account = "ALL";
//   try {
//     switch (subsi) {
//       case 0:
//         // Balances

//         if (account !== "ALL") {
//           if (
//             new Date(
//               new Date(DateFrom).getMonth() +
//                 1 +
//                 "/01/" +
//                 new Date(DateFrom).getFullYear()
//             ) === new Date(DateFrom)
//           ) {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//               FROM (${qryJournal()}) qryJournal
//             WHERE
//             ((qryJournal.Source_Type = 'BF' OR qryJournal.Source_Type = 'AB')
//             AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '
//             ${new Date(DateFrom).getFullYear()}-${
//               new Date(DateFrom).getMonth() + 1
//             }-01'
//             AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//               new Date(DateTo),
//               "yyyy-MM-dd"
//             )}')
//             AND (qryJournal.GL_Acct = '${account}'))
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct`;

//             console.log(Qry);

//             dt = await prisma.$queryRawUnsafe(Qry);
//           } else {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE
//             ((qryJournal.Source_Type <> 'BFD' AND qryJournal.Source_Type <> 'BFS')
//             AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//               DateFrom
//             ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//             AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//               new Date(DateTo),
//               "yyyy-MM-dd"
//             )}') AND (qryJournal.GL_Acct = '${account}'))
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct`;

//             console.log(Qry);

//             dt = await prisma.$queryRawUnsafe(Qry);
//           }
//         } else {
//           // All GL Codes
//           if (
//             new Date(
//               new Date(DateFrom).getMonth() +
//                 1 +
//                 "/01/" +
//                 new Date(DateFrom).getFullYear()
//             ) === new Date(DateFrom)
//           ) {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE ((qryJournal.Source_Type = 'BF' OR qryJournal.Source_Type = 'AB')
//             AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//               DateFrom
//             ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//             AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//               new Date(DateTo),
//               "yyyy-MM-dd"
//             )}'))
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct`;
//             dt = await prisma.$queryRawUnsafe(Qry);
//           } else {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE ((qryJournal.Source_Type <> 'BFD' AND qryJournal.Source_Type <> 'BFS')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct`;
//             dt = await prisma.$queryRawUnsafe(Qry);
//           }
//         }
//         if (dt.length > 0) {
//           for (let i = 0; i < dt.length; i++) {
//             const xsubsidiary_id = uuidV4();
//             balanceForwarded.push({
//               xsubsidiary_id,
//               Date_Entry: format(new Date(DateFrom), "yyyy-MM-dd"),
//               Sort_Number: 1,
//               Source_Type: "BF",
//               Source_No: format(new Date(DateTo), "yyyy-MM-dd"),
//               Explanation: "Balance Forwarded",
//               Debit: dt[i].mDebit,
//               Credit: dt[i].mCredit,
//               Bal: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
//               Balance: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
//               Address: field,
//               GL_Acct: dt[i].GL_Acct,
//             });
//           }
//         }
//         break;
//       case 1:
//         sFilter = ` AND qryJournal.ID_No = '${subsi_options}'  `;
//         // Balances
//         if (account !== "ALL") {
//           if (
//             new Date(
//               new Date(DateFrom).getMonth() +
//                 1 +
//                 "/01/" +
//                 new Date(DateFrom).getFullYear()
//             ) === new Date(DateFrom)
//           ) {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE
//               (
//                (qryJournal.Source_Type = 'BFD' OR qryJournal.Source_Type = 'AB')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//               ${sFilter}
//             GROUP BY qryJournal.GL_Acct
//             HAVING (qryJournal.GL_Acct = '${account}')
//             ORDER BY qryJournal.GL_Acct`;
//             dt = await prisma.$queryRawUnsafe(Qry);
//           } else {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE (
//               (qryJournal.Source_Type <> 'BF'
//               AND qryJournal.Source_Type <> 'BFS')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//               ${sFilter}
//             GROUP BY qryJournal.GL_Acct
//             HAVING (qryJournal.GL_Acct = '${account}')
//             ORDER BY qryJournal.GL_Acct`;

//             dt = await prisma.$queryRawUnsafe(Qry);
//           }
//         } else {
//           // All GL Codes
//           if (
//             new Date(
//               new Date(DateFrom).getMonth() +
//                 1 +
//                 "/01/" +
//                 new Date(DateFrom).getFullYear()
//             ) === new Date(DateFrom)
//           ) {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE (
//               (qryJournal.Source_Type = 'BFD' OR qryJournal.Source_Type = 'AB')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//             ${sFilter}
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct`;
//             dt = await prisma.$queryRawUnsafe(Qry);
//           } else {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE
//               (
//                (qryJournal.Source_Type <> 'BF'
//               AND qryJournal.Source_Type <> 'BFS')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//               ${sFilter}
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct`;
//             console.log(Qry);
//             dt = await prisma.$queryRawUnsafe(Qry);
//           }
//         }

//         if (dt.length > 0) {
//           for (let i = 0; i < dt.length; i++) {
//             const xsubsidiary_id = uuidV4();
//             balanceForwarded.push({
//               xsubsidiary_id,
//               Date_Entry: format(new Date(DateFrom), "yyyy-MM-dd"),
//               Sort_Number: 1,
//               Source_Type: "BF",
//               Source_No: format(new Date(DateTo), "yyyy-MM-dd"),
//               Explanation: "Balance Forwarded",
//               Debit: dt[i].mDebit,
//               Credit: dt[i].mCredit,
//               Bal: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
//               Balance: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
//               Address: field,
//               GL_Acct: dt[i].GL_Acct,
//             });
//           }
//         }
//         break;
//       case 2:
//         sFilter = ` `;
//         // Balances
//         if (account !== "ALL") {
//           sFilter = ` AND qryJournal.Sub_Acct = '${subsi_options}' `;

//           if (
//             new Date(
//               new Date(DateFrom).getMonth() +
//                 1 +
//                 "/01/" +
//                 new Date(DateFrom).getFullYear()
//             ) === new Date(DateFrom)
//           ) {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE
//               ((qryJournal.Sub_Acct = '${subsi_options}')
//               AND (qryJournal.Source_Type = 'BFS' OR qryJournal.Source_Type = 'AB')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//             GROUP BY qryJournal.GL_Acct
//             HAVING (qryJournal.GL_Acct = '${account}')
//             ORDER BY qryJournal.GL_Acct`;
//             dt = await prisma.$queryRawUnsafe(Qry);
//           } else {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE ((qryJournal.Sub_Acct = '${subsi_options}')
//               AND (qryJournal.Source_Type <> 'BF'
//               AND qryJournal.Source_Type <> 'BFD')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') < '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//             GROUP BY qryJournal.GL_Acct
//             HAVING (qryJournal.GL_Acct = '${account}')
//             ORDER BY qryJournal.GL_Acct`;
//             dt = await prisma.$queryRawUnsafe(Qry);
//           }
//         } else {
//           // All GL Codes
//           if (
//             new Date(
//               new Date(DateFrom).getMonth() +
//                 1 +
//                 "/01/" +
//                 new Date(DateFrom).getFullYear()
//             ) === new Date(DateFrom)
//           ) {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE
//               ((qryJournal.Sub_Acct = '${subsi_options}')
//               AND (qryJournal.Source_Type = 'BFS' OR qryJournal.Source_Type = 'AB')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct`;
//             dt = await prisma.$queryRawUnsafe(Qry);
//           } else {
//             Qry = `
//             SELECT
//               qryJournal.GL_Acct,
//               SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//               SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${qryJournal()}) qryJournal
//             WHERE
//               ((qryJournal.Sub_Acct = '${subsi_options}')
//               AND (qryJournal.Source_Type <> 'BF'
//               AND qryJournal.Source_Type <> 'BFD')
//               AND ( date_format(qryJournal.Date_Query,'%Y-%m-%d') >= '${new Date(
//                 DateFrom
//               ).getFullYear()}-${new Date(DateFrom).getMonth() + 1}-01'
//               AND  date_format(qryJournal.Date_Query,'%Y-%m-%d') <= '${format(
//                 new Date(DateTo),
//                 "yyyy-MM-dd"
//               )}'))
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct`;
//             dt = await prisma.$queryRawUnsafe(Qry);
//           }
//         }
//         if (dt.length > 0) {
//           for (let i = 0; i < dt.length; i++) {
//             const xsubsidiary_id = uuidV4();
//             balanceForwarded.push({
//               xsubsidiary_id,
//               Date_Entry: format(new Date(DateFrom), "yyyy-MM-dd"),
//               Sort_Number: 1,
//               Source_Type: "BF",
//               Source_No: format(new Date(DateTo), "yyyy-MM-dd"),
//               Explanation: "Balance Forwarded",
//               Debit: dt[i].mDebit,
//               Credit: dt[i].mCredit,
//               Bal: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
//               Balance: parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit),
//               Address: field,
//               GL_Acct: dt[i].GL_Acct,
//             });
//           }
//         }
//         break;
//     }
//     //Transaction
//     if (account !== "ALL") {
//       Qry = `
//       SELECT
//           qryJournal.Number,
//           qryJournal.Hide_Code,
//           qryJournal.Date_Entry,
//           qryJournal.Source_Type,
//           qryJournal.Source_No,
//           IFNULL(qryJournal.Explanation,'') AS Explanation,
//           IFNULL(qryJournal.Payto,'') AS Payto,
//           qryJournal.GL_Acct, qryJournal.Sub_Acct,
//           qryJournal.ID_No,
//           qryJournal.mShort,
//           qryJournal.mSub_Acct,
//           qryJournal.mID,
//           qryJournal.mDebit,
//           qryJournal.mCredit,
//           IFNULL(qryJournal.Check_Date,'') AS Check_Date,
//           IFNULL(qryJournal.Checked,'') AS Checked,
//           IFNULL(qryJournal.Bank, '') AS Bank,
//           IFNULL(qryJournal.Remarks, '') AS Remarks
//       FROM (${qryJournal()}) qryJournal
//       WHERE
//           ((date_format(qryJournal.Date_Entry,'%Y-%m-%d') >= '${format(
//             new Date(DateFrom),
//             "yyyy-MM-dd"
//           )}'
//           AND date_format(qryJournal.Date_Entry,'%Y-%m-%d') <= '${format(
//             new Date(DateTo),
//             "yyyy-MM-dd"
//           )}')
//           AND (qryJournal.Source_Type <> 'BF'
//           AND qryJournal.Source_Type <> 'BFD'
//           AND qryJournal.Source_Type <> 'BFS')
//           AND (qryJournal.GL_Acct = '${account}'))
//           ${sFilter}
//       ORDER BY qryJournal.Date_Entry, qryJournal.Number, qryJournal.Source_No, qryJournal.Auto`;
//       dt = await prisma.$queryRawUnsafe(Qry);
//     } else {
//       // All GL Code
//       Qry = `
//       SELECT
//         qryJournal.Number,
//         qryJournal.Hide_Code,
//         qryJournal.Date_Entry,
//         qryJournal.Source_Type,
//         qryJournal.Source_No,
//         qryJournal.Explanation,
//         qryJournal.Payto,
//         qryJournal.GL_Acct,
//         qryJournal.Sub_Acct,
//         qryJournal.ID_No,
//         qryJournal.mShort,
//         qryJournal.mSub_Acct,
//         qryJournal.mID,
//         qryJournal.mDebit,
//         qryJournal.mCredit,
//         qryJournal.Check_Date,
//         qryJournal.Checked,
//         qryJournal.Bank,
//         qryJournal.Remarks
//       FROM (${qryJournal()}) qryJournal
//       WHERE
//         ((date_format(qryJournal.Date_Entry,'%Y-%m-%d') >= '${format(
//           new Date(DateFrom),
//           "yyyy-MM-dd"
//         )}'
//         AND date_format(qryJournal.Date_Entry,'%Y-%m-%d') <= '${format(
//           new Date(DateTo),
//           "yyyy-MM-dd"
//         )}')
//         AND (qryJournal.Source_Type <> 'BF'
//         AND qryJournal.Source_Type <> 'BFD'
//         AND qryJournal.Source_Type <> 'BFS'))
//         ${sFilter}
//        ORDER BY
//        qryJournal.Date_Entry, qryJournal.Number, qryJournal.Source_No, qryJournal.Auto`;
//       dt = await prisma.$queryRawUnsafe(Qry);
//     }

//     console.log(dt);

//     if (dt.length > 0) {
//       let dtBal: any = [];
//       let lastAcct = "";
//       let sParticular = "";
//       for (let i = 0; i < dt.length; i++) {
//         const xsubsidiary_id = uuidV4();
//         if (lastAcct !== chkNull(dt[i].GL_Acct)) {
//           lastAcct = chkNull(dt[i].GL_Acct);
//           dtBal = balanceForwarded.filter(
//             (itms: any) =>
//               itms.GL_Acct === lastAcct &&
//               itms.Explanation === "Balance Forwarded"
//           );
//           if (dtBal.length > 0) {
//             Balance = dtBal[0].Balance;
//           } else {
//             Balance = 0;
//           }
//         }
//         Balance =
//           Balance + (parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit));

//         const fieldList = ["Explanations", "Payee", "Remarks"];
//         switch (fieldList[field]) {
//           case "Explanations":
//             sParticular = clrStr(dt[i].Explanation);
//             break;
//           case "Payee":
//             sParticular = clrStr(dt[i].Payto);
//             break;
//           case "Remarks":
//             sParticular = clrStr(dt[i].Remarks);
//             break;
//         }
//         report.push({
//           xsubsidiary_id: xsubsidiary_id,
//           Date_Entry: format(new Date(dt[i].Date_Entry), "yyyy-MM-dd"),
//           Sort_Number: Number(dt[i].Number),
//           Source_Type: dt[i]["Hide_Code"],
//           Source_No: dt[i].Source_No,
//           Explanation: clrStr(dt[i].Explanation),
//           Payto: clrStr(dt[i].Payto),
//           GL_Acct: chkNull(dt[i].GL_Acct),
//           Sub_Acct: dt[i].Sub_Acct,
//           ID_No: clrStr(dt[i].ID_No),
//           cGL_Acct: clrStr(chkNull(dt[i].mShort)),
//           cSub_Acct: clrStr(dt[i].mSub_Acct),
//           cID_No: clrStr(dt[i].mID),
//           Debit: dt[i].mDebit,
//           Credit: dt[i].mCredit,
//           Bal: Math.abs(
//             parseFloat(
//               (parseFloat(dt[i].mDebit) - parseFloat(dt[i].mCredit)).toFixed(4)
//             )
//           ),
//           Balance: Math.abs(
//             parseFloat(parseFloat(Balance.toString())?.toFixed(4))
//           ),
//           Check_Date: dt[i].Check_Date ? `${dt[i].Check_Date}` : null,
//           Check_No: dt[i].Check ? `${dt[i].Check}` : null,
//           Check_Bank: dt[i].Bank ? `${clrStr(dt[i].Bank)}` : null,
//           Address: fieldList[field],
//           Particulars: sParticular,
//         });
//       }
//     }

//     res.send({
//       message: "Successuflly Get Report",
//       success: true,
//       data: report,
//     });
//   } catch (err: any) {
//     console.log(err.message);
//     res.send({
//       message: err.message,
//       success: false,
//       data: [],
//     });
//   }
// });

SubsidiaryLedger.post("/subsidiary-ledger-report-desk", async (req, res) => {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const _qryJournal = qryJournal();
  let sFilter = " ";
  let Qry = "";

  // Global variables (you can set them as needed)
  let GL_Code = req.body.account; // Example: "ALL"
  let DateFrom: any = new Date(req.body.dateFrom);
  let DateTo: any = new Date(req.body.dateTo);

  const _mSubsi: any = ["ALL", "ID #", ""][req.body.subsi];
  let mInput = req.body.subsi_options; // User input for Sub-Acct or ID
  let mField = ""; // Example: Address or any other field
  let dt: any = []; // Result data

  if (GL_Code === "") GL_Code = "ALL";
  // Define your logic
  try {
    // Delete from xSubsidiary
    await prisma.$queryRawUnsafe("DELETE FROM xSubsidiary");

    let Qry = "";

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
            // Build SQL query excluding 'BFD' and 'BFS'
            Qry = `
            SELECT qryJournal.GL_Acct, 
                   SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                   SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
            FROM (${_qryJournal}) qryJournal 
            WHERE qryJournal.Source_Type NOT IN ('BFD', 'BFS') 
              AND qryJournal.Date_Query BETWEEN '${format(
                new Date(DateFrom),
                "yyyy-MM-dd"
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
            // SQL query for all GL Codes, Source_Type 'BF' or 'AB'
            Qry = `
            SELECT qryJournal.GL_Acct, 
                   SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                   SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
            FROM (${_qryJournal}) qryJournal 
            WHERE qryJournal.Source_Type IN ('BF', 'AB') 
              AND qryJournal.Date_Query BETWEEN '${format(
                new Date(DateFrom),
                "yyyy-MM-01"
              )}' 
              AND '${format(DateFrom, "yyyy-MM-dd")}' 
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
             '${format(subDays(DateFrom, 1), "MMddyy")}', 'Balance Forwarded', 
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
            // Query excluding 'BF' and 'BFS' for specific GL code with ID filter
            Qry = `
            SELECT qryJournal.GL_Acct, 
                   SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit, 
                   SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit 
            FROM (${_qryJournal}) qryJournal 
            WHERE qryJournal.ID_No = '${mInput}' 
              AND qryJournal.Source_Type NOT IN ('BF', 'BFS') 
              AND qryJournal.Date_Query BETWEEN '${format(
                new Date(DateFrom),
                "yyyy-MM-01"
              )}' 
              AND '${format(DateFrom, "yyyy-MM-dd")}' 
            GROUP BY qryJournal.GL_Acct 
            HAVING qryJournal.GL_Acct = '${GL_Code.trim()}' 
            ORDER BY qryJournal.GL_Acct;
          `;
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
        ORDER BY  qryJournal.Number;
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
        ORDER BY  qryJournal.Number;
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

      for (let i = 0; i < dt.length - 1; i++) {
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
        let xsubsidiary_id = i.toString().padStart(5, '0');

        // const xsubsidiary_id = uuidV4();

        // Insert the record into xSubsidiary
        let insertQuery = `
          INSERT INTO xSubsidiary (
            Date_Entry, 
            Sort_Number, Source_Type, Source_No, Explanation, Payto, GL_Acct, Sub_Acct, 
            ID_No, cGL_Acct, cSub_Acct, cID_No, Debit, Credit, Bal, Balance, Check_Date, 
            Check_No, Check_Bank, Address, Particulars,xsubsidiary_id
          ) VALUES (
            '${format(new Date(row.Date_Entry), "yyyy-MM-dd HH:mm:ss")}', 
            ${row.Number}, 
            '${row["Hide_Code"]}', 
            '${row.Source_No}', 
            '${clrStr(row.Explanation)}', '
            ${clrStr(row.Payto)}', 
            '${row.GL_Acct}', 
            '${row.Sub_Acct || ""}',
             '${clrStr(row.ID_No || "")}', 
             '${clrStr(row.mShort)}', 
            '${clrStr(row.mSub_Acct)}', 
            '${clrStr(row.mID)}', 
            ${row.mDebit}, ${row.mCredit}, 
            ${parseFloat(row.mDebit) - parseFloat(row.mCredit)}, 
            ${Balance}, 
            ${
              row.Check_Date !== "" && row.Check_Date !== null
                ? `'${format(new Date(row.Check_Date), "yyyy-MM-dd HH:mm:ss")}'`
                : null
            }, 
            '${row.Checked}', '${clrStr(
          row.Bank
        )}', '${mField}', '${sParticular}','${xsubsidiary_id}'
          );
        `;

        // Execute the insert query
        await prisma.$queryRawUnsafe(insertQuery);
      }
    }

    const report = await prisma.$queryRawUnsafe(
      "select * FROM xSubsidiary order by xsubsidiary_id "
    );

    res.send({
      message: "Successuflly Get Report",
      success: true,
      data: report,
    });
  } catch (error: any) {
    console.error("Error executing query:", error);

    res.send({
      message: error.message,
      success: false,
      data: [],
    });
  }
});

function chkNull(value: any) {
  return value ?? "";
}

function clrStr(str: string) {
  return str?.trim();
}
export default SubsidiaryLedger;

// SubsidiaryLedger.post("/subsidiary-ledger-report-desk", async (req, res) => {
//   const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
//   const _qryJournal = qryJournal();
//   let Balance = 0;
//   let sFilter = " ";
//   let Qry = "";

//   // Global variables (you can set them as needed)
//   let GL_Code = req.body.account; // Example: "ALL"
//   let DateFrom: any = new Date(req.body.dateFrom);
//   let DateTo: any = new Date(req.body.dateTo);

//   const _mSubsi: any = ["ALL", "ID #", ""][req.body.subsi];
//   let mInput = req.body.subsi_options; // User input for Sub-Acct or ID
//   let mField = ""; // Example: Address or any other field
//   let dt: any = []; // Result data
//   let report: any = [];

//   if (GL_Code === "") GL_Code = "ALL";

//   // Define your logic
//   try {
//     // Delete from xSubsidiary
//     report = [];

//     let Qry = "";

//     switch (_mSubsi.trim()) {
//       case "ALL":
//         // Check if specific GL Code is provided
//         if (GL_Code.trim() !== "ALL") {
//           // If DateFrom is the first day of the month
//           if (isEqual(DateFrom, startOfMonth(DateFrom))) {
//             // Build SQL query for 'BF' or 'AB' Source_Type
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.Source_Type IN ('BF', 'AB')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(DateFrom, "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             HAVING qryJournal.GL_Acct = '${GL_Code.trim()}'
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           } else {
//             // Build SQL query excluding 'BFD' and 'BFS'
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.Source_Type NOT IN ('BFD', 'BFS')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(subDays(DateFrom, 1), "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             HAVING qryJournal.GL_Acct = '${GL_Code.trim()}'
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           }
//         } else {
//           // If all GL codes are considered
//           if (isEqual(DateFrom, startOfMonth(DateFrom))) {
//             // SQL query for all GL Codes, Source_Type 'BF' or 'AB'
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.Source_Type IN ('BF', 'AB')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(DateFrom, "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           } else {
//             // SQL query for all GL Codes, excluding 'BFD' and 'BFS'
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.Source_Type NOT IN ('BFD', 'BFS')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(subDays(DateFrom, 1), "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           }
//         }

//         // Execute the raw query
//         dt = await prisma.$queryRawUnsafe(Qry);

//         // If we get results, insert them into xSubsidiary
//         if (dt.length > 0) {
//           for (const row of dt) {
//             let debit = row.mDebit;
//             let credit = row.mCredit;
//             let balance = parseFloat(debit) - parseFloat(credit);

//             // Insert query into xSubsidiary
//             await prisma.$queryRawUnsafe(`
//             INSERT INTO xSubsidiary
//             (Date_Entry, Sort_Number, Source_Type, Source_No, Explanation, Debit, Credit, Bal, Balance, Address, GL_Acct)
//             VALUES
//             ('${format(subDays(DateFrom, 1), "yyyy-MM-dd")}', 1, 'BF',
//              '${format(subDays(DateFrom, 1), "MMddyy")}', 'Balance Forwarded',
//              ${debit}, ${credit}, ${balance}, ${balance}, '${mField}', '${
//               row.GL_Acct
//             }');
//           `);
//           }
//         }
//         break;

//       case "ID #":
//         // Handle cases for "ID #"
//         sFilter = `AND qryJournal.ID_No = '${mInput}'`;

//         if (GL_Code.trim() !== "ALL") {
//           if (isEqual(DateFrom, startOfMonth(DateFrom))) {
//             // Query for a specific GL code with ID filter
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.ID_No = '${mInput}'
//               AND qryJournal.Source_Type IN ('BFD', 'AB')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(DateFrom, "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             HAVING qryJournal.GL_Acct = '${GL_Code.trim()}'
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           } else {
//             // Query excluding 'BF' and 'BFS' for specific GL code with ID filter
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.ID_No = '${mInput}'
//               AND qryJournal.Source_Type NOT IN ('BF', 'BFS')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(DateFrom, "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             HAVING qryJournal.GL_Acct = '${GL_Code.trim()}'
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           }
//         }
//         // Execute and handle results similar to above
//         // Add logic for inserting into xSubsidiary if needed.
//         break;

//       case "Sub-Acct #":
//         sFilter = `AND qryJournal.Sub_Acct = '${mInput}'`;

//         // Check if specific GL Code is provided
//         if (GL_Code.trim() !== "ALL") {
//           // If DateFrom is the first day of the month
//           if (isEqual(DateFrom, startOfMonth(DateFrom))) {
//             // Build SQL query for 'BFS' or 'AB' Source_Type with Sub-Acct
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.Sub_Acct = '${mInput}'
//               AND qryJournal.Source_Type IN ('BFS', 'AB')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(DateFrom, "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             HAVING qryJournal.GL_Acct = '${GL_Code.trim()}'
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           } else {
//             // Build SQL query excluding 'BF' and 'BFD' with Sub-Acct
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.Sub_Acct = '${mInput}'
//               AND qryJournal.Source_Type NOT IN ('BF', 'BFD')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(subDays(DateFrom, 1), "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             HAVING qryJournal.GL_Acct = '${GL_Code.trim()}'
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           }
//         } else {
//           // If all GL codes are considered
//           if (isEqual(DateFrom, startOfMonth(DateFrom))) {
//             // SQL query for all GL Codes with Sub-Acct, Source_Type 'BFS' or 'AB'
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.Sub_Acct = '${mInput}'
//               AND qryJournal.Source_Type IN ('BFS', 'AB')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(DateFrom, "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           } else {
//             // SQL query for all GL Codes, excluding 'BF' and 'BFD' with Sub-Acct
//             Qry = `
//             SELECT qryJournal.GL_Acct,
//                    SUM(IFNULL(qryJournal.mDebit, 0)) AS mDebit,
//                    SUM(IFNULL(qryJournal.mCredit, 0)) AS mCredit
//             FROM (${_qryJournal}) qryJournal
//             WHERE qryJournal.Sub_Acct = '${mInput}'
//               AND qryJournal.Source_Type NOT IN ('BF', 'BFD')
//               AND qryJournal.Date_Query BETWEEN '${format(
//                 startOfMonth(DateFrom),
//                 "yyyy-MM-dd"
//               )}'
//               AND '${format(subDays(DateFrom, 1), "yyyy-MM-dd")}'
//             GROUP BY qryJournal.GL_Acct
//             ORDER BY qryJournal.GL_Acct;
//           `;
//           }
//         }

//         // Execute the raw query
//         dt = await prisma.$queryRawUnsafe(Qry);

//         // If we get results, insert them into xSubsidiary
//         if (dt.length > 0) {
//           for (const row of dt) {
//             let debit = row.mDebit;
//             let credit = row.mCredit;
//             let balance = parseFloat(debit) - parseFloat(credit);

//             // Insert query into xSubsidiary
//             await prisma.$queryRawUnsafe(`
//             INSERT INTO xSubsidiary
//             (Date_Entry, Sort_Number, Source_Type, Source_No, Explanation, Debit, Credit, Bal, Balance, Address, GL_Acct)
//             VALUES
//             ('${format(subDays(DateFrom, 1), "yyyy-MM-dd")}', 1, 'BF',
//              '${format(subDays(DateFrom, 1), "MMddyy")}', 'Balance Forwarded',
//              ${debit}, ${credit}, ${balance}, ${balance}, '${mField}', '${
//               row.GL_Acct
//             }');
//           `);
//           }
//         }

//         break;

//       // Add similar cases for 'Sub-Acct #' and others as needed
//     }

//     // Transaction Query
//     if (GL_Code.trim() !== "ALL") {
//       // For specific GL_Code
//       Qry = `
//         SELECT qryJournal.Number, qryJournal.Hide_Code, qryJournal.Date_Entry, qryJournal.Source_Type,
//               qryJournal.Source_No, COALESCE(qryJournal.Explanation, '') as Explanation,
//               COALESCE(qryJournal.Payto, '') as Payto, qryJournal.GL_Acct, qryJournal.Sub_Acct,
//               qryJournal.ID_No, qryJournal.mShort, qryJournal.mSub_Acct, qryJournal.mID,
//               qryJournal.mDebit, qryJournal.mCredit, COALESCE(qryJournal.Check_Date, '') as Check_Date,
//               COALESCE(qryJournal.Checked, '') as Checked, COALESCE(qryJournal.Bank, '') as Bank,
//               COALESCE(qryJournal.Remarks, '') as Remarks
//         FROM (${_qryJournal}) qryJournal
//         WHERE qryJournal.Date_Entry BETWEEN '${format(
//           DateFrom,
//           "yyyy-MM-dd"
//         )}' AND '${format(DateTo, "yyyy-MM-dd")}'
//           AND qryJournal.Source_Type NOT IN ('BF', 'BFD', 'BFS')
//           AND qryJournal.GL_Acct = '${GL_Code.trim()}'
//         ${sFilter}
//         ORDER BY qryJournal.Date_Entry, qryJournal.Number, qryJournal.Source_No, qryJournal.Auto;
//       `;
//     } else {
//       // For all GL codes
//       Qry = `
//         SELECT qryJournal.Number, qryJournal.Hide_Code, qryJournal.Date_Entry, qryJournal.Source_Type,
//               qryJournal.Source_No, qryJournal.Explanation, qryJournal.Payto, qryJournal.GL_Acct,
//               qryJournal.Sub_Acct, qryJournal.ID_No, qryJournal.mShort, qryJournal.mSub_Acct,
//               qryJournal.mID, qryJournal.mDebit, qryJournal.mCredit, qryJournal.Check_Date,
//               qryJournal.Checked, qryJournal.Bank, qryJournal.Remarks
//         FROM (${_qryJournal}) qryJournal
//         WHERE qryJournal.Date_Entry BETWEEN '${format(
//           DateFrom,
//           "yyyy-MM-dd"
//         )}' AND '${format(DateTo, "yyyy-MM-dd")}'
//           AND qryJournal.Source_Type NOT IN ('BF', 'BFD', 'BFS')
//         ${sFilter}
//         ORDER BY qryJournal.Date_Entry, qryJournal.Number, qryJournal.Source_No, qryJournal.Auto;
//       `;
//     }

//     // Execute the transaction query
//     dt = await prisma.$queryRawUnsafe(Qry);
//     // Processing query results
//     if (dt.length > 0) {
//       let lastAcct = "";
//       let sParticular = "";
//       for (let i = 0; i < dt.length; i++) {
//         let row = dt[i];

//         // Check if the GL_Acct has changed
//         if (lastAcct !== row.GL_Acct) {
//           lastAcct = row.GL_Acct;

//           // Query to get the Balance from xSubsidiary
//           let balanceQuery = `SELECT Balance FROM xSubsidiary WHERE GL_Acct = '${lastAcct}' AND Explanation = 'Balance Forwarded';`;
//           let dtBal: any = await prisma.$queryRawUnsafe(balanceQuery);

//           if (dtBal.length > 0) {
//             Balance = dtBal[0].Balance;
//           } else {
//             Balance = 0;
//           }
//         }

//         // Update Balance
//         Balance += parseFloat(row.mDebit) - parseFloat(row.mCredit);

//         // Set sParticular based on mField
//         switch (mField) {
//           case "Explanations":
//             sParticular = clrStr(row.Explanation);
//             break;
//           case "Payee":
//             sParticular = clrStr(row.Payto);
//             break;
//           case "Remarks":
//             sParticular = clrStr(row.Remarks);
//             break;
//         }

//         // Insert the record into xSubsidiary
//         // let insertQuery = `
//         //   INSERT INTO xSubsidiary (
//         //     Date_Entry,
//         //     Sort_Number,
//         //     Source_Type,
//         //     Source_No,
//         //     Explanation,
//         //     Payto,
//         //     GL_Acct,
//         //     Sub_Acct,
//         //     ID_No,
//         //     cGL_Acct,
//         //     cSub_Acct,
//         //     cID_No,
//         //     Debit,
//         //     Credit,
//         //     Bal,
//         //     Balance,
//         //     Check_Date,
//         //     Check_No,
//         //     Check_Bank,
//         //     Address,
//         //     Particulars
//         //   ) VALUES (
//         //     '${}',
//         //     ${row.Number},
//         //     '${row["Hide_Code"]}',
//         //     '${row.Source_No}',
//         //     '${clrStr(row.Explanation)}',
//         //     '${clrStr(row.Payto)}',
//         //     '${row.GL_Acct}',
//         //     '${row.Sub_Acct}',
//         //     '${clrStr(row.ID_No || "")}',
//         //     '${clrStr(row.mShort)}',
//         //     '${clrStr(row.mSub_Acct)}',
//         //     '${clrStr(row.mID)}',
//         //     ${row.mDebit},
//         //     ${row.mCredit},
//         //     ${parseFloat(row.mDebit) - parseFloat(row.mCredit)},
//         //     ${Balance},
//         //     '${row.Check_Date}',
//         //     '${row.Check}',
//         //     '${clrStr(row.Bank)}',
//         //     '${mField}',
//         //     '${sParticular}'
//         //   );
//         // `;
//         report.push({
//           Date_Entry: new Date(row.Date_Entry).toISOString(),
//           Sort_Number: row.Number.toString(),
//           Source_Type: row.Hide_Code,
//           Source_No: row.Source_No,
//           Explanation: clrStr(row.Explanation),
//           Payto: clrStr(row.Payto),
//           GL_Acct: row.GL_Acct,
//           Sub_Acct: row.Sub_Acct,
//           ID_No: clrStr(row.ID_No || ""),
//           cGL_Acct: clrStr(row.mShort),
//           cSub_Acct: clrStr(row.mSub_Acct),
//           cID_No: clrStr(row.mID),
//           Debit: row.mDebit,
//           Credit: row.mCredit,
//           Bal: parseFloat(row.mDebit) - parseFloat(row.mCredit),
//           Balance: Balance,
//           Check_Date: row.Check_Date,
//           Check_No: row.Check,
//           Check_Bank: clrStr(row.Bank),
//           Address: mField,
//           Particulars: sParticular,
//         });
//         // Execute the insert query
//         // const report = await prisma.$queryRawUnsafe(insertQuery);
//         console.log(report);
//       }
//     }

//     res.send({
//       message: "Successuflly Get Report",
//       success: true,
//       data:report,
//     });
//   } catch (error: any) {
//     console.error("Error executing query:", error);

//     res.send({
//       message: error.message,
//       success: false,
//       data: [],
//     });
//   }
// });
