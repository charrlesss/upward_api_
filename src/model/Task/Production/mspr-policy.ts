import { Request } from "express";
import { PrismaList } from "../../connection";
import { prisma } from "../../../controller/index";

export async function getMSPRRate(Account: string, Line: string, req: Request) {

  const query = `select * from rates where trim(Account)='${Account.trim()}' AND  Line = '${Line}'`;
  console.log(query);
  return await prisma.$queryRawUnsafe(query);
}
export async function createMSPRPolicy(data: any, req: Request) {
  return await prisma.msprpolicy.create({ data });
}

export async function searchMsprPolicy(search: string, req: Request) {
  const query = `
select 
    a.*,
    b.*, 
    c.ShortName as client_fullname,
      CONCAT(IF(d.lastname IS NOT NULL
            AND TRIM(d.lastname) <> '', CONCAT(d.lastname, ', '), ''), d.firstname) as agent_fullname,
      c.address,
    c.sale_officer,
    date_format(b.DateIssued , '%m/%d/%Y') as DateIssued
     FROM msprpolicy a
    left join policy b
    on a.PolicyNo = b.PolicyNo 
    left join (
    SELECT 
            IF(aa.option = 'individual', CONCAT(IF(aa.lastname IS NOT NULL
                AND TRIM(aa.lastname) <> '', CONCAT(aa.lastname, ', '), ''), aa.firstname), aa.company) AS ShortName,
              aa.entry_client_id AS IDNo,
              aa.sub_account,
                    aa.address,
                    aa.sale_officer
          FROM
            entry_client aa
    ) c on b.IDNo = c.IDNo
    left join entry_agent d on b.AgentID = d.entry_agent_id
    where 
    a.PolicyNo like '%${search}%' or
     c.ShortName like '%${search}%' 
    order by b.DateIssued desc
    limit 100
    `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteMsprPolicy(PolicyNo: string, req: Request) {
  const query = `
  delete from msprpolicy 
  where 
  PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyFromMspr(policyNo: string, req: Request) {
  const query = `
  delete from policy 
  where 
  PolicyType = 'MSPR' and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
