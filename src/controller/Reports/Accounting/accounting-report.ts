import express from "express";
import { AgingAccountsReport } from "../../../model/db/stored-procedured";
import { PrismaList } from "../../../model/connection";
import { __executeQuery } from "../../../model/Task/Production/policy";
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
      data: await __executeQuery(`select AccountCode from policy_account`,req),
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
accountingReporting.post("/report/generate-report-schedule-of-account", async (req, res) => {
  try {
    console.log(req.body)
    res.send({
      message: "Successfully Get Report",
      success: true,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({
      message: err.message,
      success: false,
    });
  }
});
export default accountingReporting;
