import { Request } from "express";
import { prisma } from "../../controller/index";

interface DataEntryClientTypes {
  entry_client_id: string;
  sub_account: string;
  email: string;
  mobile: string;
  telephone: string;
  address: string;
  option: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  company?: string;
  sale_officer?: string;
  client_mortgagee: string;
  client_branch: string;
  chassis: string;
  engine: string;
  suffix: string;
  tin: string;
  auth_representative?: string;
}

interface EntryEmployeeType {
  firstname: string;
  lastname: string;
  middlename: string;
  sub_account: string;
  address: string;
  entry_employee_id: string;
  suffix?: string;
}

interface EntryAgentType {
  entry_agent_id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  mobile: string;
  telephone: string;
  address: string;
  sub_account: string;
  suffix?: string;
}

interface EntryFixedAssetsType {
  entry_fixed_assets_id: string;
  description: string;
  remarks: string;
  fullname: string;
  sub_account: string;
}

interface EntrySupplierType {
  entry_supplier_id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  company: string;
  address: string;
  tin_no: string;
  VAT_Type: string;
  option: string;
  email: string;
  telephone: string;
  mobile: string;
  sub_account: string;
}

interface EntryOthersType {
  entry_others_id: string;
  description: string;
  sub_account: string;
  remarks: string;
}

const queryList: any = {
  Client: {
    query: (search: string, hasLimit: boolean = false) => `
    SELECT 
            a.entry_client_id,
            a.firstname,
            a.lastname,
            a.middlename,
            a.option,
            (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt,
            a.address,
            a.company,
            b.email,
            b.mobile,
            b.telephone,
            concat(c.Acronym,'-',c.ShortName) as NewShortName,
            c.ShortName as ShortName,
            c.Sub_Acct as sub_account,
            a.sale_officer,
            a.client_mortgagee,
            a.client_branch,
            a.chassis,
            a.engine,
            a.auth_representative,
            a.suffix,
            a.tin
        FROM
          entry_client a
            LEFT JOIN
          contact_details b ON a.client_contact_details_id = b.contact_details_id
            LEFT JOIN
          sub_account c ON a.sub_account = c.Sub_Acct
        where 
        a.entry_client_id like '%${search}%'
        OR a.firstname like '%${search}%'
        OR a.lastname like '%${search}%'
        OR a.company like '%${search}%'
        ORDER BY a.entry_client_id desc 
       limit 500
    `,
  },
  Employee: {
    query: (search: string, hasLimit: boolean = false) => `
  SELECT 
        a.entry_employee_id,
        a.firstname,
        a.middlename,
        a.lastname,
        a.address,
         a.suffix,
        b.ShortName AS NewShortName,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt,
        b.Sub_Acct as sub_account
    FROM
      entry_employee a
        LEFT JOIN
      sub_account b ON a.sub_account = b.Sub_Acct
    where 
        a.entry_employee_id like '%${search}%'
        OR a.firstname like '%${search}%'
        OR a.lastname like '%${search}%'
        ORDER BY a.createdAt desc 
        limit 500
  `,
  },
  Agent: {
    query: (search: string, hasLimit: boolean = false) => `
    SELECT 
      a.entry_agent_id,
      a.firstname,
      a.lastname,
      a.middlename,
      a.address,
      a.suffix,
      (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt,
      b.email,
      b.mobile,
      b.telephone,
      a.sub_account,
      a.suffix,
      a.position,
      c.ShortName
    FROM
      entry_agent a
      LEFT JOIN
      contact_details b ON a.agent_contact_details_id = b.contact_details_id
           LEFT JOIN
      sub_account c ON a.sub_account = c.sub_acct
    where 
    a.entry_agent_id like '%${search}%'
    OR a.firstname like '%${search}%'
    OR a.lastname like '%${search}%'
    ORDER BY a.createdAt desc 
    limit 500
  `,
  },
  "Fixed Assets": {
    query: (search: string, hasLimit: boolean = false) => `
  SELECT 
      a.entry_fixed_assets_id,
      a.fullname,
      a.description,
      a.remarks,
      (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt,
      a.sub_account,
      b.ShortName
    FROM
      entry_fixed_assets a 
      left join sub_account b on a.sub_account = b.Sub_Acct
    where
    a.entry_fixed_assets_id like '%${search}%'
    OR a.fullname like '%${search}%'
    ORDER BY a.createdAt desc 
   limit 500
  `,
  },
  Supplier: {
    query: (search: string, hasLimit: boolean = false) => `
  SELECT  
      a.entry_supplier_id,
      a.firstname,
      a.lastname,
      a.middlename,
      a.company,
      a.address,
      a.tin_no,
      a.VAT_Type,
      a.option,
      (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) AS createdAt,
      b.email,
      b.mobile,
      b.telephone,
      a.sub_account,
      c.ShortName
    FROM
      entry_supplier a
      LEFT JOIN
      contact_details b ON a.supplier_contact_details_id = b.contact_details_id
       LEFT JOIN
      sub_account c ON a.sub_account = c.Sub_Acct
    where 
    a.entry_supplier_id like '%${search}%'
    OR a.firstname like '%${search}%'
    OR a.lastname like '%${search}%'
    OR a.company like '%${search}%'
    ORDER BY a.createdAt desc 
   limit 100
  `,
  },
  Others: {
    query: (search: string, hasLimit: boolean = false) => `
    SELECT 
      a.entry_others_id,
      a.description,
      (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) AS createdAt,
      a.sub_account,
      a.remarks,
      b.ShortName
    FROM
      entry_others a
       left join sub_account b on a.sub_account = b.Sub_Acct
    where
    a.entry_others_id like '%${search}%'
    OR a.description like '%${search}%'
    ORDER BY a.createdAt desc 
    limit 500
  `,
  },
};

export async function CreateClientEntry(
  data: DataEntryClientTypes,
  req: Request
) {
  const { email, telephone, mobile, ...rest } = data;
  await prisma.entry_client.create({
    data: {
      ...rest,
      contact_details: {
        create: {
          email,
          telephone,
          mobile,
        },
      },
    },
  });
}
export async function CreateEmployeeEntry(data: EntryEmployeeType) {
  await prisma.entry_employee.create({
    data,
  });
}
export async function CreateAgentEntry(data: EntryAgentType) {
  const { email, telephone, mobile, ...rest } = data;

  await prisma.entry_agent.create({
    data: {
      ...rest,
      contact_details: {
        create: {
          email,
          telephone,
          mobile,
        },
      },
    },
  });
}
export async function CreateFixedAssetstEntry(data: EntryFixedAssetsType) {
  await prisma.entry_fixed_assets.create({
    data,
  });
}
export async function CreateSupplierEntry(data: EntrySupplierType) {
  const { email, telephone, mobile, ...rest } = data;

  await prisma.entry_supplier.create({
    data: {
      ...rest,
      contact_details: {
        create: {
          email,
          telephone,
          mobile,
        },
      },
    },
  });
}
export async function CreateOtherEntry(data: EntryOthersType) {
  await prisma.entry_others.create({
    data,
  });
}
export async function getAllSubAccount(req: Request) {
  const query = `
    SELECT 
        a.Sub_Acct,
        a.Acronym,
    CONCAT(a.Acronym, '-', a.ShortName) AS NewShortName
    FROM
    sub_account a
    `;
  return await prisma.$queryRawUnsafe(query);
}
async function updateClient(data: DataEntryClientTypes, req: Request) {
  const getEntryClient = await prisma.entry_client.findUnique({
    where: { entry_client_id: data.entry_client_id },
  });
  let injectQuery = "";
  if (data.option === "company") {
    injectQuery = `
    \`firstname\`='',
    \`lastname\`='',
    \`middlename\`='',
    \`company\`='${data.company}',
    `;
  } else {
    injectQuery = `
    \`firstname\`='${data.firstname}',
    \`lastname\`='${data.lastname}',
    \`middlename\`='${data.middlename}',
    \`company\`='',
    `;
  }

  const query1 = `
  update 
      \`entry_client\`
   set 
    ${injectQuery}
    \`address\`='${data.address}',
    \`option\`='${data.option}',
    \`sub_account\`='${data.sub_account}',
    \`sale_officer\`='${data.sale_officer}',
     \`client_mortgagee\`='${data.client_mortgagee}',
    \`client_branch\`='${data.client_branch}',
     \`chassis\`='${data.chassis}',
    \`engine\`='${data.engine}',
    \`update\`=NOW()
    where 
      \`entry_client_id\`= '${data.entry_client_id}'
   `;
  const query2 = `
   update 
      \`contact_details\`
    set 
      \`email\`='${data.email}',
      \`mobile\`='${data.mobile}',
      \`telephone\`='${data.telephone}'
    where 
       \`contact_details_id\` = '${getEntryClient?.client_contact_details_id}'
    `;

  await prisma.$transaction([
    prisma.$queryRawUnsafe(query1),
    prisma.$queryRawUnsafe(query2),
  ]);
}
async function updateEmployee(data: EntryEmployeeType, req: Request) {
  const query = `
  update 
      \`entry_employee\`
   set 
    \`firstname\`='${data.firstname}',
    \`lastname\`='${data.lastname}',
    \`middlename\`='${data.middlename}',
    \`address\`='${data.address}',
    \`sub_account\`='${data.sub_account}',
    \`update\`=NOW()
    where 
      \`entry_employee_id\`= '${data.entry_employee_id}'
   `;

  await prisma.$queryRawUnsafe(query);
}

async function updateAgent(data: EntryAgentType, req: Request) {
  const getEntryClient = await prisma.entry_agent.findUnique({
    where: { entry_agent_id: data.entry_agent_id },
  });
  const query1 = `
  update 
      \`entry_agent\`
   set 
    \`firstname\`='${data.firstname}',
    \`lastname\`='${data.lastname}',
    \`middlename\`='${data.middlename}',
    \`address\`='${data.address}',
    \`sub_account\`='${data.sub_account}',
    \`update\`=NOW()
    where 
      \`entry_agent_id\`= '${data.entry_agent_id}'
   `;
  const query2 = `
   update 
      \`contact_details\`
    set 
      \`email\`='${data.email}',
      \`mobile\`='${data.mobile}',
      \`telephone\`='${data.telephone}'
    where 
       \`contact_details_id\` = '${getEntryClient?.agent_contact_details_id}'
    `;

  await prisma.$transaction([
    prisma.$queryRawUnsafe(query1),
    prisma.$queryRawUnsafe(query2),
  ]);
}
async function updateFixedAssets(data: EntryFixedAssetsType, req: Request) {
  const query = `
  update 
      \`entry_fixed_assets\`
   set 
    \`description\`='${data.description}',
    \`remarks\`='${data.remarks}',
    \`fullname\`='${data.fullname}',
    \`sub_account\`='${data.sub_account}',
    \`update\`=NOW()
    where 
      \`entry_fixed_assets_id\`= '${data.entry_fixed_assets_id}'
   `;

  await prisma.$queryRawUnsafe(query);
}
async function updateOthers(data: EntryOthersType, req: Request) {
  const query = `
  update 
      \`entry_others\`
   set 
    \`description\`='${data.description}',
    \`sub_account\`='${data.sub_account}',
    \`remarks\`='${data.remarks}',
    \`update\`=NOW()
    where 
      \`entry_others_id\`= '${data.entry_others_id}'
   `;
  await prisma.$queryRawUnsafe(query);
}
async function updateSupplier(data: EntrySupplierType, req: Request) {
  const getEntryClient = await prisma.entry_supplier.findUnique({
    where: { entry_supplier_id: data.entry_supplier_id },
  });
  let injectQuery = ``;
  if (data.company) {
    injectQuery = `
    \`firstname\`='',
    \`lastname\`='',
    \`middlename\`='',
    \`company\`='${data.company}',
    `;
  } else {
    injectQuery = `
    \`firstname\`='${data.firstname}',
    \`lastname\`='${data.lastname}',
    \`middlename\`='${data.middlename}',
    \`company\`='',
    `;
  }
  const query1 = `
  update 
      \`entry_supplier\`
   set 
    ${injectQuery}
    \`address\`='${data.address}',
    \`option\`='${data.option}',
    \`tin_no\`='${data.tin_no}',
    \`VAT_Type\`='${data.VAT_Type}',
    \`sub_account\`='${data.sub_account}',
    \`update\`=NOW()
    where 
      \`entry_supplier_id\`= '${data.entry_supplier_id}'
   `;
  const query2 = `
   update 
      \`contact_details\`
    set 
      \`email\`='${data.email}',
      \`mobile\`='${data.mobile}',
      \`telephone\`='${data.telephone}'
    where 
       \`contact_details_id\` = '${getEntryClient?.supplier_contact_details_id}'
    `;

  await prisma.$transaction([
    prisma.$queryRawUnsafe(query1),
    prisma.$queryRawUnsafe(query2),
  ]);
}
export async function searchEntry(
  entry: string,
  search: string,
  hasLimit: boolean = false,
  req: Request
) {
  return await prisma.$queryRawUnsafe(
    queryList[`${entry}`].query(search, hasLimit)
  );
}
export async function updateEntry(entry: string, data: any, req: Request) {
  switch (entry) {
    case "Client":
      await updateClient(data, req);
      break;
    case "Employee":
      await updateEmployee(data, req);
      break;
    case "Agent":
      await updateAgent(data, req);
      break;
    case "Fixed Assets":
      await updateFixedAssets(data, req);
      break;
    case "Supplier":
      await updateSupplier(data, req);
      break;
    case "Others":
      await updateOthers(data, req);
      break;
  }
}
export async function deleteEntry(entry: string, id: string, req: Request) {
  switch (entry) {
    case "Client":
      await prisma.entry_client.delete({
        where: {
          entry_client_id: id,
        },
        include: {
          contact_details: true,
        },
      });

      break;
    case "Employee":
      await prisma.entry_employee.delete({
        where: {
          entry_employee_id: id,
        },
      });
      break;
    case "Agent":
      await prisma.entry_agent.delete({
        where: {
          entry_agent_id: id,
        },
        include: {
          contact_details: true,
        },
      });
      break;
    case "Fixed Assets":
      await prisma.entry_fixed_assets.delete({
        where: {
          entry_fixed_assets_id: id,
        },
      });
      break;
    case "Supplier":
      await prisma.entry_supplier.delete({
        where: {
          entry_supplier_id: id,
        },
        include: {
          contact_details: true,
        },
      });
      break;
    case "Others":
      // await updateOthers(id);
      await prisma.entry_others.delete({
        where: {
          entry_others_id: id,
        },
      });
      break;
  }
}
export async function getClientInIdEntry(where: string, req: Request) {
  return await prisma.$queryRawUnsafe(`call id_entry('${where}')`);
}
export async function getSubAccounts(req: Request) {
  return await prisma.$queryRawUnsafe(` 
  SELECT 
    a.Sub_Acct,
    a.Acronym,
  a.ShortName
  FROM
    sub_account a`);
}

export async function IDGenerator(sign: string, type: string, req: Request) {
  const lastSeq = await prisma.id_sequence.findFirst({ where: { type } });
  const newCount = incrementLastCount(lastSeq?.last_count as string);
  const newMonth = getMonth();
  const newYear = getYear();
  return `${sign}-${newMonth}${newYear}-${newCount}`;
}
export async function UpdateId(
  type: string,
  newCount: string,
  newMonth: string,
  newYear: string,
  req: Request
) {
  await prisma.id_sequence.update({
    where: {
      type,
    },
    data: {
      last_count: {
        set: newCount,
      },
      month: {
        set: newMonth,
      },
      year: {
        set: newYear,
      },
    },
  });
}
export function incrementLastCount(str: string) {
  let num = parseInt(str, 10);
  num++;
  return num.toString().padStart(str.length, "0");
}
export function getMonth() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  return currentMonth.toString().padStart(2, "0");
}
export function getYear() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return (currentYear % 100).toString();
}

export async function deleteClientById(client_id: string, req: Request) {
  const contactId: any = await prisma.$queryRawUnsafe(` 
   SELECT client_contact_details_id FROM entry_client where entry_client_id = '${client_id}' ;
`);

  const contact_details_id = contactId[0].client_contact_details_id;
  await prisma.$queryRawUnsafe(` 
delete FROM entry_client where entry_client_id = '${client_id}' ;
`);
  await prisma.$queryRawUnsafe(` 
  DELETE FROM contact_details 
WHERE
    contact_details_id = '${contact_details_id}' ;
  `);
}

export async function deleteEmployeeById(client_id: string) {
  await prisma.$queryRawUnsafe(` 
    delete FROM entry_employee where entry_employee_id = '${client_id}' ;
`);
}

export async function deleteAgentById(agent_id: string) {
  await prisma.$queryRawUnsafe(` 
    delete FROM entry_agent where entry_agent_id = '${agent_id}' ;
`);
}

export async function deleteFixedAssetsById(entry_fixed_assets_id: string) {
  await prisma.$queryRawUnsafe(` 
    delete FROM entry_fixed_assets where entry_fixed_assets_id = '${entry_fixed_assets_id}' ;
`);
}

export async function deleteOthersById(agent_id: string) {
  await prisma.$queryRawUnsafe(` 
    delete FROM entry_others where entry_others_id = '${agent_id}' ;
`);
}

export async function deleteSupplierById(supplier_id: string) {
  const contactId: any = await prisma.$queryRawUnsafe(` 
   SELECT supplier_contact_details_id FROM entry_supplier where entry_supplier_id = '${supplier_id}' ;
`);

  const contact_details_id = contactId[0].client_contact_details_id;
  await prisma.$queryRawUnsafe(` 
    delete FROM entry_supplier where entry_supplier_id = '${supplier_id}' ;
`);
  await prisma.$queryRawUnsafe(` 
  DELETE FROM contact_details 
  WHERE
      contact_details_id = '${contact_details_id}' ;
  `);
}
