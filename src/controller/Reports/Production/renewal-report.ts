import express from "express";
import { format } from "date-fns";
import { mapColumnsToKeys } from "./report-fields";
import { exportToExcel } from "./report-to-excel";
import { RenewalNoticeReport } from "../../../model/db/stored-procedured";
import { PrismaList } from "../../../model/connection";

const RenewalReport = express.Router();


const { CustomPrismaClient } = PrismaList();

RenewalReport.post("/renewal-notice", async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

    let { date, policy, type, account } = req.body;
  
    const query = RenewalNoticeReport(
      policy,
      account,
      type,
      date,
    );
    console.log(query)
    const data: any = await prisma.$queryRawUnsafe(query);
    res.send({
      data,
      message:"Successfully get Data",
      success:true
    });
  } catch (error:any) {
    console.log(error.message)
    res.send({
      report:[],
      message:error.message,
      success:false
    });
  }
});

RenewalReport.post("/export-excel-renewal-notice", async (req, res) => {
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
      sendFile();
    },
  });
});
export default RenewalReport;
