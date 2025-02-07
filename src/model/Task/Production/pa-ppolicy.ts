import { Request } from "express";
import { prisma } from "../../../controller/index";


export async function createPAPolicy(data: any, req: Request) {
  return await prisma.papolicy.create({ data });
}

export async function searchPAPolicy(search: string, req: Request) {
  const query = `
  select a.*,b.*, 
  c.ShortName as client_fullname,
  CONCAT(IF(d.lastname IS NOT NULL
				AND TRIM(d.lastname) <> '', CONCAT(d.lastname, ', '), ''), d.firstname) as agent_fullname,
  c.address,
  format(a.sumInsured,2) as sumInsured,
  c.sale_officer,
  date_format(b.DateIssued , '%m/%d/%Y') as DateIssued
   FROM papolicy a
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
  a.PolicyNo like '%${search}%' OR
  c.ShortName like '%${search}%' 
  order by b.DateIssued desc
  limit 100
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePAPolicy(PolicyNo: string, req: Request) {
  const query = `
  delete from papolicy 
  where 
   PolicyNo = '${PolicyNo}' 
  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function findPAPolicy(PolicyNo: string, req: Request) {
  const query = `
  select *  from papolicy 
  where 
   PolicyNo = '${PolicyNo}' and TRIM(PolicyType) = 'PA'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyByPAPolicy(PolicyNo: string, req: Request) {
  const query = `
  delete from policy 
  where 
   PolicyNo = '${PolicyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
