import { Request } from "express";
import { prisma } from "../../../controller/index";


export async function createCGLPolicy(data: any, req: Request) {

  return await prisma.cglpolicy.create({ data });
}

export async function searchCGLPolicy(search: string, req: Request) {

  const query = `
     select a.*,b.*, 
          c.ShortName as client_fullname,
		  CONCAT(IF(d.lastname IS NOT NULL
				AND TRIM(d.lastname) <> '', CONCAT(d.lastname, ', '), ''), d.firstname) as agent_fullname,
		  c.address,
        format(a.sumInsured,2) as sumInsured,
        a.address  as cgl_address,
        c.sale_officer,
        date_format(b.DateIssued , '%m/%d/%Y') as DateIssued
        FROM cglpolicy a
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

export async function deleteCGLPolicy(PolicyNo: string, req: Request) {

  const query = `
    delete from cglpolicy 
    where 
     PolicyNo = '${PolicyNo}' 
    `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyByCGL(PolicyNo: string, req: Request) {

  const query = `
    delete from policy 
    where 
    PolicyNo = '${PolicyNo}' and TRIM(PolicyType) = 'CGL'
    `;
  return await prisma.$queryRawUnsafe(query);
}
