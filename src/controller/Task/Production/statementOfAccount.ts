import express from "express";
import { prisma } from "../..";

const StatementOfAccount = express.Router();

StatementOfAccount.post("/soa/search-by-policy", async (req, res) => {
  const data = await prisma.$queryRawUnsafe(`
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
  `%${req.body.search}%`,
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

export default StatementOfAccount;
