import express from "express";
import { prisma } from "../..";
import PDFReportGenerator from "../../../lib/pdf-generator";
import path from "path";
import { format } from "date-fns";
import PDFDocument from "pdfkit";
import fs from "fs";

const StatementOfAccount = express.Router();

StatementOfAccount.post("/soa/search-by-policy", async (req, res) => {
  const data = await prisma.$queryRawUnsafe(
    `
    SELECT 
          a.PolicyType,
          a.PolicyNo,
          date_format(a.DateIssued,'%m/%d/%Y') as DateIssued,
          b.IDNo,
          b.Shortname
        
      FROM upward_insurance_umis.policy a
      left join (
      SELECT 
        "Client" as IDType,
        aa.entry_client_id AS IDNo,
        aa.sub_account,
        if(aa.option = "individual", CONCAT(IF(aa.lastname is not null AND aa.lastname <> '', CONCAT(aa.lastname, ', '), ''),aa.firstname), aa.company) as Shortname,
        aa.entry_client_id as client_id,
        aa.address 
      FROM
        entry_client aa
      union all
      SELECT 
        "Agent" as IDType,
        aa.entry_agent_id AS IDNo,
        aa.sub_account,
        CONCAT(IF(aa.lastname is not null AND aa.lastname <> '', CONCAT(aa.lastname, ', '),''), aa.firstname) AS Shortname,
        aa.entry_agent_id as client_id,
        aa.address
      FROM 
        entry_agent aa
      union all
      SELECT 
        "Employee" as IDType,
        aa.entry_employee_id AS IDNo,
        aa.sub_account,
        CONCAT(IF(aa.lastname is not null AND aa.lastname <> '', CONCAT(aa.lastname , ', '),''), aa.firstname) AS Shortname,
        aa.entry_employee_id as client_id,
        aa.address  
      FROM
        entry_employee aa
      union all
      SELECT 
        "Supplier" as IDType,
        aa.entry_supplier_id AS IDNo,
        aa.sub_account,
        if(aa.option = "individual", CONCAT(IF(aa.lastname is not null AND aa.lastname <> '', CONCAT(aa.lastname, ', '),''),aa.firstname), aa.company) as Shortname,
        aa.entry_supplier_id as client_id,
        aa.address
      FROM
        entry_supplier aa
      union all
      SELECT 
        "Fixed Assets" as IDType,
        aa.entry_fixed_assets_id AS IDNo,
        aa.sub_account,
        aa.fullname AS Shortname,
        aa.entry_fixed_assets_id as client_id,
        aa.description as address
      FROM
        entry_fixed_assets aa
      union all
      SELECT 
        "Others" as IDType,
        aa.entry_others_id AS IDNo,
        aa.sub_account,
        aa.description AS Shortname,
        aa.entry_others_id as client_id,
        aa.description as address
      FROM
        entry_others aa
      )  b on b.IDNo = a.IDNo
      where
        a.PolicyNo like ? 
        OR  b.IDNo like ? 
        OR  b.Shortname like ?
     order by a.DateIssued desc
    limit 500
      ;
  `,
    `%${req.body.search}%`,
    `%${req.body.search}%`,
    `%${req.body.search}%`
  );
  try {
    res.send({
      message: "Successfully Policy Details",
      success: true,
      data,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
});

StatementOfAccount.post("/soa/generate-soa", async (req, res) => {
  console.log(req.body);
  const qry = (policytablename: string) => `
  SELECT * FROM ${policytablename} a 
  left join policy b on a.PolicyNo = b.PolicyNo
  where a.careOf = 'ASTRA MULTIMARKET CORPORATION';`;

  const COMDATA = (await prisma.$queryRawUnsafe(qry("vpolicy"))) as Array<any>;
  const FIREDATA = (await prisma.$queryRawUnsafe(qry("fpolicy"))) as Array<any>;
  const MARINEDATA = (await prisma.$queryRawUnsafe(
    qry("mpolicy")
  )) as Array<any>;
  
  const BONDSDATA = (await prisma.$queryRawUnsafe(
    qry("bpolicy")
  )) as Array<any>;
  const MSPRDATA = (await prisma.$queryRawUnsafe(
    qry("msprpolicy")
  )) as Array<any>;

  const PADATA = (await prisma.$queryRawUnsafe(qry("papolicy"))) as Array<any>;
  const CGLDATA = (await prisma.$queryRawUnsafe(
    qry("cglpolicy")
  )) as Array<any>;


  let PAGE_WIDTH = 594;
  let PAGE_HEIGHT = 841;

  const outputFilePath = "manok.pdf";
  const doc = new PDFDocument({
    size: [PAGE_WIDTH, PAGE_HEIGHT],
    margin: 0,
    bufferPages: true,
  });

  const writeStream = fs.createWriteStream(outputFilePath);
  doc.pipe(writeStream);

  let yAxis = 20;
  doc.image(
    path.join(path.dirname(__dirname), "../../../static/image/logo.png"),
    30,
    yAxis,
    {
      fit: [120, 120],
    }
  );

  yAxis += 10;
  doc.fontSize(60);
  doc.font("Helvetica-Bold");
  doc.text("UPWARD", 155, yAxis);
  yAxis += 50;

  if (process.env.DEPARTMENT === "UMIS") {
    doc.fontSize(9);
    doc.text("MANAGEMENT INSURANCE SERVICES", 245, yAxis);
  }
  if (process.env.DEPARTMENT === "UCSMI") {
    doc.fontSize(9);
    doc.text("CONSULTANCY SERVICES AND MANAGEMENT INC.", 190, yAxis);
  }

  yAxis += 40;
  doc.font("Helvetica");
  doc.fontSize(8);
  doc.text("STATEMENT OF ACCOUNT", 30, yAxis, {
    width: PAGE_WIDTH - 30,
    align: "center",
  });

  yAxis += 10;
  doc.text(`${format(new Date(), "MMMM dd, yyyy")}`, 30, yAxis, {
    width: PAGE_WIDTH - 30,
    align: "center",
  });

  yAxis += 10;
  doc.fontSize(9);
  doc.text(`Ref. No. : ${req.body.refNo}`, 30, yAxis, {
    width: PAGE_WIDTH - 60,
    align: "right",
  });
  doc.fontSize(8);

  const arrayHeaderData = [
    { label: "ACCT. NAME", value: "tttttttttweqweqwe" },
    { label: "ADDRESS", value: "asdasdasdasd" },
    { label: "ACCT. BAL.", value: "123123" },
  ];
  for (const itm of arrayHeaderData) {
    yAxis += 12;
    doc.text(itm.label, 30, yAxis, {
      width: 70,
      align: "left",
    });
    doc.text(`:`, 100, yAxis, {
      width: 10,
      align: "left",
    });
    doc.text(itm.value, 130, yAxis, {
      width: PAGE_WIDTH - 30,
      align: "left",
    });
  }

  yAxis += 15;
  doc
    .moveTo(30, yAxis)
    .lineTo(PAGE_WIDTH - 30, yAxis)
    .stroke();
    
  yAxis += 20;
  doc
    .moveTo(30, yAxis)
    .lineTo(PAGE_WIDTH - 30, yAxis)
    .stroke();  

  const data = [];
  if (COMDATA.length > 0) {
    data.push(...COMDATA);
  }
  if (FIREDATA.length > 0) {
    data.push(...FIREDATA);
  }
  if (MARINEDATA.length > 0) {
    data.push(...MARINEDATA);
  }
  if (BONDSDATA.length > 0) {
    data.push(...BONDSDATA);
  }
  if (MSPRDATA.length > 0) {
    data.push(...MSPRDATA);
  }
  if (PADATA.length > 0) {
    data.push(...PADATA);
  }
  if (CGLDATA.length > 0) {
    data.push(...CGLDATA);
  }
  console.log(data)


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
});

export default StatementOfAccount;
