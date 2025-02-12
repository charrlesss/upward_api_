import { Request } from "express";
import { prisma } from "../../../controller/index";


export async function getMarineRate(account: string, line: string, req: Request) {

  const query = `
    select Rate from Rates 
    where 
    Account = '${account}' 
    and Line = '${line}' 
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function createMarinePolicy(data: any, req: Request) {

  return await prisma.mpolicy.create({
    data,
  });
}
export async function searchMarinePolicy(search: string, req: Request) {

  const query = `
     select a.*,b.*, 
       c.ShortName as client_fullname,
      CONCAT(IF(d.lastname IS NOT NULL
            AND TRIM(d.lastname) <> '', CONCAT(d.lastname, ', '), ''), d.firstname) as agent_fullname,
      c.address,
    c.sale_officer,
    date_format(b.DateIssued,'%m/%d/%Y') as _DateIssued
     FROM mpolicy a
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
export async function createWords(data: any, req: Request) {

  return await prisma.words.create({
    data,
  });
}
export async function deleteWords(req: Request) {

  return await prisma.$queryRawUnsafe(`
    delete from words where Wordings = 'Mpolicy' and (SType = 1 OR SType = 0)
`);
}
export async function getWords(req: Request) {

  return await prisma.$queryRawUnsafe(`
    select * from words where Wordings = 'Mpolicy' and (SType = 1 OR SType = 0)
`);
}
export async function deleteMarinePolicy(PolicyNo: string, req: Request) {
  const query = `
  delete from mpolicy 
  where 
    PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyFromMarine(policyNo: string, req: Request) {

  const query = `
  delete from policy 
  where 
  PolicyType = 'MAR' and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
