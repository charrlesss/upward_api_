import { Request } from "express";
import { PrismaList } from "../../connection";
import { Prisma } from "@prisma/client";
const { CustomPrismaClient } = PrismaList();



export async function searchClientByNameOrByID(input: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const qry = `
  select * from (
    SELECT 
        a.entry_client_id AS IDNo,
        IF(a.company <> ''
                AND a.company IS NOT NULL,
            a.company,
            CONCAT(IF(a.lastname <> ''
                            AND a.lastname IS NOT NULL,
                        CONCAT(a.lastname, ', '),
                        ''),
                    a.firstname)) AS Name,
        'Client' AS IDType,
         a.address,
         a.sale_officer
    FROM
        entry_client a
    ) a
  where 
  a.IDNo like '%${input}%' OR
  a.name like '%${input}%' 
  order by a.name asc
  limit 500
  `
  return await prisma.$queryRawUnsafe(qry) as any
}
export async function searchAgentByNameOrByID(input: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const qry = `
  select * from (
    SELECT 
        a.entry_agent_id AS IDNo,
      CONCAT(IF(a.lastname <> ''
                            AND a.lastname IS NOT NULL,
                        CONCAT(a.lastname, ', '),
                        ''),
                    a.firstname) AS Name,
        'Client' AS IDType
    FROM
        entry_agent a
    ) a

    where 
    a.IDNo like '%${input}%' OR
    a.name like '%${input}%' 
    order by a.name asc
    limit 500
  `
  return await prisma.$queryRawUnsafe(qry) as any
}
export async function getPolicyAccount(whr: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const qry = `
 SELECT '' as Account union all  SELECT Account FROM policy_account ${whr} ORDER BY Account;
  `
  return await prisma.$queryRawUnsafe(qry) as any
}
export async function getPolicyMortgagee(whr: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const qry = `
  SELECT '' as Mortgagee union all SELECT Mortgagee FROM Mortgagee ${whr} ORDER BY Mortgagee;
  `
  return await prisma.$queryRawUnsafe(qry) as any
}
export async function getPolicyDenomination(whr: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const qry = `
SELECT '' as Type union all  select distinct Type from Rates ${whr};
  `
  return await prisma.$queryRawUnsafe(qry) as any
}

export async function getPolicySubAccount(req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const qry = `SELECT Acronym FROM Sub_Account ORDER BY Acronym`
  return await prisma.$queryRawUnsafe(qry) as any
}
export async function generateTempID(req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const qry = `SELECT 
      CONCAT('TP-',
              CAST((YEAR(NOW()) % 100) AS CHAR),
              CAST(FORMAT(COUNT(DISTINCT (policyno)) + 1,
                      '0000')
                  AS CHAR)) AS 'PolicyNo'
  FROM
      Policy
  WHERE
      PolicyNo LIKE '%TP-%'`
  return await prisma.$queryRawUnsafe(qry) as any
}


// ===========================



export async function getTPL_IDS(search: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);


  const ctplQry = `
        SELECT 
            Prefix
        FROM
            upward_insurance_umis.ctplregistration
            where Prefix <> '' AND Prefix is not null
        GROUP BY Prefix;
        `
  const ctplPreffix = await prisma.$queryRawUnsafe(ctplQry) as any
  let qry = ''
  ctplPreffix.forEach((pref: any) => {
    qry += `
            select * from (
                 Select   
                Source_No,
                cast(Credit as decimal(18,2)) as 'Cost' 
                from Journal 
            where 
                Explanation ='CTPL Registration' 
                and Source_No 
                like'%${pref.Prefix}%' and 
                Credit > 0 
                and Remarks is null 
            order by CAST(SUBSTRING(source_no, 3, CHAR_LENGTH(source_no)) AS SIGNED) asc
            limit 1 
            ) a
             union all
    `
  });
  qry += `
           SELECT 
                MIN(Source_No) as Source_No,
                MIN(Debit) as Cost
            FROM
                journal
            WHERE
                cGL_Acct = 'CTPL Inventory'
                    AND Explanation = 'CTPL Registration'
                    AND Source_No_Ref_ID <> ''
                    AND (Remarks = '' OR Remarks IS NULL)
                    AND Source_No like '%${search}%'
                    group by Source_No_Ref_ID
                    order by Source_No;
        
        `
        console.log(qry)
  return await prisma.$queryRawUnsafe(qry);
}

export async function getRateFromTPLUpdate(Source_No: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

  return await prisma.$queryRawUnsafe(`
  SELECT 
      MIN(Source_No) AS Source_No,
      MIN(CAST(Credit AS DECIMAL (18 , 2 ))) as Cost ,
      Source_No_Ref_ID
  FROM
      journal
  WHERE
          Explanation = 'CTPL Registration'
          AND Credit > 0
          AND Remarks IS NULL 
          AND Source_No = '${Source_No}'
  GROUP BY Source_No_Ref_ID
  ORDER BY Source_No ASC
  `);
}

export async function createJournal(data: any, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.journal.create({ data });
}

export async function deleteJournal(Source_No_Ref_ID: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.journal.deleteMany({
    where: {
      Source_No_Ref_ID,
    },
  });
}

export async function findManyJournal(Source_No_Ref_ID: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.journal.findMany({
    where: {
      Source_No_Ref_ID,
    },
  });
}

export async function updateJournal(
  Source_No: string,
  Cost: string,
  AutoNo: bigint,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.journal.update({
    data: {
      Credit: Cost,
      Source_No,
    },
    where: {
      AutoNo,
    },
  });
}

export async function findPolicy(PolicyNo: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.policy.findUnique({ where: { PolicyNo } });
}
export async function getPolicy(
  account: string,
  form_type: string,
  policy_no: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
  SELECT * FROM policy 
  WHERE 
  Account = '${account}'
  AND PolicyType = '${form_type}' 
  AND PolicyNo = '${policy_no}'
  `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getRate(
  account: string,
  line: string,
  type: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
  select Rate from Rates 
  where 
  trim(Account) = '${account.trim()}' 
  and trim(Line) = '${line}' 
  and trim(Type) = '${type}'
  `;
  console.log(query)
  return await prisma.$queryRawUnsafe(query);
}

export async function getRateVPolicy(
  account: string,
  line: string,
  type: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
  select Rate from Rates 
  where 
  trim(Account) = '${account.trim()}' 
  and trim(Line) = '${line}' 
  and trim(Type) = '${type}'
  `;
  console.log(query)
  return await prisma.$queryRawUnsafe(query);
}


export async function getClientById(entry_client_id: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
  SELECT 
    b.*
  FROM 
  entry_client a
    LEFT JOIN
  sub_account b ON a.sub_account = b.Sub_Acct
  where a.entry_client_id ='${entry_client_id}'
  `;
  console.log(query);

  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicyByVehicle(
  form_type: string,
  policyNo: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
  delete from policy 
  where 
  PolicyType = '${form_type}' 
  and PolicyNo = '${policyNo}'
  `;
  console.log(query);
  return await prisma.$queryRawUnsafe(query);
}

export async function deletePolicy(
  subAccount: string,
  form_type: string,
  policyNo: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
  delete from policy 
  where 
  Account = '${subAccount}' 
  and PolicyType = '${form_type}' 
  and PolicyNo = '${policyNo}'
  `;
  console.log(query);
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteVehiclePolicy(
  form_type: string,
  policyNo: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
  delete from vpolicy 
  where 
   PolicyNo = '${policyNo}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteJournalBySource(
  source_no: string,
  source_type: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
    delete from journal 
    where 
    Source_No = '${source_no}' 
    and Source_Type = '${source_type}'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function deleteTPLFromJournalBySource(
  source_no: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const query = `
  delete from journal 
  where 
  Source_No = '${source_no}' 
  and Source_Type = 'GL'
  and Explanation <> 'CTPL Registration'
  `;
  return await prisma.$queryRawUnsafe(query);
}

export async function createPolicy(
  data: {
    IDNo: string;
    Account: string;
    SubAcct: string;
    PolicyType: string;
    PolicyNo: string;
    DateIssued: Date;
    TotalPremium: number;
    Vat: string;
    DocStamp: string;
    FireTax: string;
    LGovTax: string;
    Notarial: string;
    Misc: string;
    TotalDue: string;
    TotalPaid: string;
    Journal: boolean;
    AgentID: string;
    AgentCom: string;
  },
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.policy.create({
    data,
  });
}

export async function createVehiclePolicy(
  data: {
    PolicyNo: string;
    Account: string;
    PolicyType: string;
    CoverNo: string;
    ORNo: string;
    DateFrom: string;
    DateTo: string;
    Model: string;
    Make: string;
    BodyType: string;
    Color: string;
    BLTFileNo: string;
    PlateNo: string;
    ChassisNo: string;
    MotorNo: string;
    AuthorizedCap: string;
    UnladenWeight: string;
    TPL: string;
    TPLLimit: string;
    PremiumPaid: string;
    EstimatedValue: string;
    Aircon: string;
    Stereo: string;
    Magwheels: string;
    Others: string;
    OthersAmount: string;
    Deductible: string;
    Towing: string;
    RepairLimit: string;
    BodilyInjury: string;
    PropertyDamage: string;
    PersonalAccident: string;
    SecI: string;
    SecIIPercent: string;
    ODamage: string;
    Theft: string;
    Sec4A: string;
    Sec4B: string;
    Sec4C: string;
    AOG: string;
    MortgageeForm: boolean;
    Mortgagee: string;
    Denomination: string;
    AOGPercent: string;
    LocalGovTaxPercent: string;
    TPLTypeSection_I_II: string;
    Remarks: string;
  },
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.vpolicy.create({
    data,
  });
}

export async function createJournalInVP(
  data: {
    Branch_Code: string;
    Date_Entry: string;
    Source_Type: string;
    Source_No: string;
    Explanation: string;
    GL_Acct: string;
    Sub_Acct: string;
    ID_No: string;
    cGL_Acct: string;
    cSub_Acct: string;
    cID_No: string;
    Debit: number;
    Credit: number;
    TC: string;
    Remarks: string;
    Source_No_Ref_ID: string;
  },
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.journal.create({
    data,
  });
}

export async function updateJournalByPolicy(
  Source_No: string,
  Explanation: string,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.journal.updateMany({
    where: {
      Source_No,
      AND: {
        Explanation,
      },
    },
    data: {
      Remarks: "Used",
    },
  });
}

export async function getTempPolicyID(req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  return await prisma.$queryRawUnsafe(`
  select
  concat(
  'TP-',
  right('000000',6 - LENGTH(CAST(CAST(substring(IF(
      a.PolicyNo = '' OR a.PolicyNo IS NULL,'1',a.PolicyNo), 4) as SIGNED) + 1 As SIGNED))),
  IF(
     a.PolicyNo = '' OR a.PolicyNo IS NULL,
      '1',
    CAST(substring(a.PolicyNo,4) as SIGNED) +1
    )
  ) AS tempPolicy_No
   from (
    SELECT  MAX(PolicyNo) as PolicyNo FROM vpolicy a where left(a.PolicyNo ,2) = 'TP' and a.PolicyType = 'COM' ORDER BY a.PolicyNo ASC
  ) a`);
}

export async function searchDataVPolicy(
  search: string,
  policyType: string,
  isTemp: boolean,
  req: Request
) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
  const qry = `

   SELECT 
        a.*,
        b.*,
      c.ShortName as client_fullname,
      CONCAT(IF(d.lastname IS NOT NULL
            AND TRIM(d.lastname) <> '', CONCAT(d.lastname, ', '), ''), d.firstname) as agent_fullname,
      c.address,
       c.sale_officer,
        date_format(a.DateIssued,'%m/%d/%Y') as _DateIssued
      FROM
        policy a
            LEFT JOIN
          vpolicy b ON a.PolicyNo = b.PolicyNo
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
          ) c on a.IDNo = c.IDNo 
          left join entry_agent d on a.AgentID = d.entry_agent_id 
              WHERE 

            b.PolicyNo is not null and
            a.PolicyNo is not null and
            a.PolicyType = '${policyType}' and
            ${isTemp
      ? "left(a.PolicyNo,3) = 'TP-'and"
      : "left(a.PolicyNo,3) != 'TP-' and"
    }
        (
            a.PolicyNo like '%${search}%' or
            c.ShortName like '%${search}%' or
             b.PlateNo like '%${search}%' or
            b.ChassisNo like '%${search}%' or
           b.MotorNo like '%${search}%' 
        )
      ORDER BY a.PolicyNo desc
      LIMIT 100 
  `;
  return await prisma.$queryRawUnsafe(qry);
}

export async function getCostByTPL(Source_No: string, req: Request) {
  const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

  return await prisma.$queryRawUnsafe(`
       SELECT 
				  (Source_No) AS Source_No,
				  (CAST(Credit AS DECIMAL (18 , 2 ))) as Cost ,
				  Source_No_Ref_ID
			  FROM
				  journal
			  WHERE
					  Explanation = 'CTPL Registration'
					  AND Credit > 0
            AND Source_No = '${Source_No}'
      `);
}
