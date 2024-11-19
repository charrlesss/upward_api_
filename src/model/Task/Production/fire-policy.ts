import { Request } from "express";
import { PrismaList } from "../../connection";
const { CustomPrismaClient } = PrismaList();

export async function getRateType(Line: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

  return await prisma.$queryRawUnsafe(`
    select Type from rates a where  a.Line ='${Line}' group by TYPE
  `);
}

export async function createFirePolicy(
  {
    PolicyNo,
    Account,
    BillNo,
    DateFrom,
    DateTo,
    Location,
    PropertyInsured,
    Constraction,
    Occupancy,
    Boundaries,
    Mortgage,
    Warranties,
    InsuredValue,
    Percentage,
  }: any,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

  return await prisma.fpolicy.create({
    data: {
      PolicyNo,
      Account,
      BillNo,
      DateFrom,
      DateTo,
      Location,
      PropertyInsured,
      Constraction,
      Occupancy,
      Boundaries,
      Mortgage,
      Warranties,
      InsuredValue,
      Percentage,
    },
  });
}

export async function searchFirePolicy(search: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

  const query = `
  select 
  a.*,
  b.*,
  c.ShortName as client_fullname,
  
   CONCAT(IF(d.lastname IS NOT NULL
				AND TRIM(d.lastname) <> '', CONCAT(d.lastname, ', '), ''), d.firstname) as agent_fullname,
  c.address,
  c.sale_officer,
  date_format(b.DateIssued,'%m/%d/%Y') as _DateIssued
   FROM fpolicy a
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
  )  c on b.IDNo = c.IDNo
  left join entry_agent d on b.AgentID = d.entry_agent_id
  where 
  a.PolicyNo like '%${search}%' or
  c.ShortName like '%${search}%' 
  order by b.DateIssued desc
  limit 100
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteFirePolicy(policyNo: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

  const query = `
  delete from fpolicy 
  where 
   PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyFromFire(policyNo: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

  const query = `
  delete from policy 
  where 
  PolicyType = 'FIRE' and PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
