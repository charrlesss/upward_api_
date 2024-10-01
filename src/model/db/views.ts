export function clients_view() {
  return `
  select * from (SELECT 
    if(aa.option = "individual", CONCAT(IF(aa.lastname is not null and trim(aa.lastname) <> '', CONCAT(aa.lastname, ', '), ''),aa.firstname), aa.company) as ShortName,
    aa.entry_client_id AS IDNo,
    aa.firstname,
    aa.middlename,
    aa.company,
    aa.address,
    aa.option AS options,
    aa.sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    aa.client_contact_details_id AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_client aa 
UNION ALL SELECT 
    CONCAT(IF(aa.lastname is not null and trim(aa.lastname) <> '', CONCAT(aa.lastname, ', '),''), aa.firstname) AS ShortName,
    aa.entry_agent_id AS IDNo,
    aa.firstname,
    aa.middlename,
    NULL AS company,
    aa.address,
    NULL AS options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    aa.agent_contact_details_id AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_agent aa 
UNION ALL SELECT 
    CONCAT(IF(aa.lastname is not null and trim(aa.lastname) <> '', CONCAT(aa.lastname, ', '),''), aa.firstname) AS ShortName,
    aa.entry_employee_id AS IDNo,
    aa.firstname,
    aa.middlename,
    NULL AS company,
    aa.address,
    NULL AS options,
    aa.sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    NULL AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_employee aa 
UNION ALL SELECT 
    aa.fullname AS ShortName,
    aa.entry_fixed_assets_id AS IDNo,
    NULL AS firstname,
    NULL AS middlename,
    NULL AS company,
    NULL AS address,
    NULL AS options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    NULL AS contact_details_id,
    aa.description,
    aa.remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_fixed_assets aa 
UNION ALL SELECT 
    aa.description AS ShortName,
    aa.entry_others_id AS IDNo,
    NULL AS firstname,
    NULL AS middlename,
    NULL AS company,
    NULL AS address,
    NULL AS options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    NULL AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_others aa
 UNION ALL SELECT 
    if(aa.option = "individual", CONCAT(IF(aa.lastname is not null and trim(aa.lastname) <> '',  CONCAT(aa.lastname, ', '), ''),aa.firstname), aa.company) as ShortName,
    aa.entry_supplier_id AS IDNo,
    aa.firstname,
    aa.middlename,
    aa.company,
    aa.address,
    aa.option as options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    aa.supplier_contact_details_id as  contact_details_id,
    NULL AS description,
    NULL AS remarks,
    aa.VAT_Type,
    aa.tin_no
FROM
    entry_supplier aa) id_entry`;
}

export function qryJournal() {
  const selectClient = clients_view();

//   const qry = `
//     SELECT
//         a.Branch_Code,
//         CASE 
//             WHEN a.Source_Type IN ('BFD', 'AB', 'BF', 'BFS') THEN DATE_ADD(a.Date_Entry, INTERVAL 1 DAY) 
//             ELSE a.Date_Entry 
//         END AS Date_Query,
//         a.Date_Entry,
//         a.Source_Type,
//         a.Source_No,
//         a.Explanation,
//         a.Payto,
//         a.GL_Acct,
//         e.Acct_Title AS mShort,
//         e.Short,
//         a.ID_No,
//         a.Check_Collect,
//         a.Check_Date,
//         a.Check_No AS Checked,
//         a.Check_Bank AS Bank,
//         a.Check_Return,
//         a.Check_Deposit,
//         a.Check_Reason,
//         a.Debit AS mDebit,
//         a.Credit AS mCredit,
//         a.TC,
//         a.Remarks,
//         f.Books_Desc,
//         f.Hide_Code,
//         f.Number,
//         f.Book_Code,
//         c.Acronym as Sub_Acct,
//         COALESCE(c.ShortName, '') AS mSub_Acct,
//         COALESCE(d.ShortName, '') AS mID,
//         a.AutoNo AS Auto,
//         a.Check_No
//     FROM
//     journal a
//     LEFT OUTER JOIN    policy b ON a.ID_No = b.PolicyNo
//     LEFT OUTER JOIN    sub_account c ON a.Sub_Acct = c.Acronym OR  a.Sub_Acct = c.Sub_Acct
//     LEFT OUTER JOIN (${selectClient}) d ON a.ID_No = d.IDNo
//     LEFT OUTER JOIN    chart_account e ON a.GL_Acct = e.Acct_Code
//     LEFT OUTER JOIN    books f ON a.Source_Type = f.Code
// `;


const qry = `
SELECT 
    DISTINCT 
    Journal.Branch_Code, 
    CASE 
        WHEN Journal.Source_Type = 'BFD' OR Journal.Source_Type = 'AB' OR Journal.Source_Type = 'BF' OR Journal.Source_Type = 'BFS' 
        THEN DATE_ADD(Journal.Date_Entry, INTERVAL 1 DAY) 
        ELSE Journal.Date_Entry 
    END AS Date_Query, 
    Journal.Date_Entry, 
    Journal.Source_Type, 
    Journal.Source_No, 
    Journal.Explanation, 
    Journal.Payto, 
    Journal.GL_Acct, 
    \`Chart Account\`.Acct_Title AS mShort, 
    \`Chart Account\`.Short, 
    Journal.ID_No, 
    Journal.Check_Collect, 
    Journal.Check_Date, 
    Journal.Check_No AS \`Checked\`, 
    Journal.Check_Bank AS Bank, 
    Journal.Check_Return, 
    Journal.Check_Deposit, 
    Journal.Check_Reason, 
    Journal.Debit AS mDebit, 
    Journal.Credit AS mCredit, 
    Journal.TC, 
    Journal.Remarks, 
    Books.\`Books_Desc\`, 
    Books.\`Hide_Code\`, 
    Books.Number, 
    Books.\`Book_Code\`, 
    Journal.Sub_Acct, 
    IFNULL(Sub_Account.ShortName, '') AS mSub_Acct, 
    IFNULL(\`ID Entry\`.Shortname, '') AS mID, 
    Journal.AutoNo AS Auto, 
    Journal.Check_No
FROM 
    Chart_Account as \`Chart Account\`
    RIGHT OUTER JOIN (
    select * from (SELECT 
    if(aa.option = "individual", CONCAT(IF(aa.lastname is not null and trim(aa.lastname) <> '', CONCAT(aa.lastname, ', '), ''),aa.firstname), aa.company) as ShortName,
    aa.entry_client_id AS IDNo,
    aa.firstname,
    aa.middlename,
    aa.company,
    aa.address,
    aa.option AS options,
    aa.sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    aa.client_contact_details_id AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_client aa 
UNION ALL SELECT 
    CONCAT(IF(aa.lastname is not null and trim(aa.lastname) <> '', CONCAT(aa.lastname, ', '),''), aa.firstname) AS ShortName,
    aa.entry_agent_id AS IDNo,
    aa.firstname,
    aa.middlename,
    NULL AS company,
    aa.address,
    NULL AS options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    aa.agent_contact_details_id AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_agent aa 
UNION ALL SELECT 
    CONCAT(IF(aa.lastname is not null and trim(aa.lastname) <> '', CONCAT(aa.lastname, ', '),''), aa.firstname) AS ShortName,
    aa.entry_employee_id AS IDNo,
    aa.firstname,
    aa.middlename,
    NULL AS company,
    aa.address,
    NULL AS options,
    aa.sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    NULL AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_employee aa 
UNION ALL SELECT 
    aa.fullname AS ShortName,
    aa.entry_fixed_assets_id AS IDNo,
    NULL AS firstname,
    NULL AS middlename,
    NULL AS company,
    NULL AS address,
    NULL AS options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    NULL AS contact_details_id,
    aa.description,
    aa.remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_fixed_assets aa 
UNION ALL SELECT 
    aa.description AS ShortName,
    aa.entry_others_id AS IDNo,
    NULL AS firstname,
    NULL AS middlename,
    NULL AS company,
    NULL AS address,
    NULL AS options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    NULL AS contact_details_id,
    NULL AS description,
    NULL AS remarks,
	NULL AS VAT_Type,
    NULL AS tin_no
FROM
    entry_others aa
 UNION ALL SELECT 
    if(aa.option = "individual", CONCAT(IF(aa.lastname is not null and trim(aa.lastname) <> '',  CONCAT(aa.lastname, ', '), ''),aa.firstname), aa.company) as ShortName,
    aa.entry_supplier_id AS IDNo,
    aa.firstname,
    aa.middlename,
    aa.company,
    aa.address,
    aa.option as options,
    NULL AS sub_account,
    aa.createdAt,
    aa.update AS updatedAt,
    aa.supplier_contact_details_id as  contact_details_id,
    NULL AS description,
    NULL AS remarks,
    aa.VAT_Type,
    aa.tin_no
FROM
    entry_supplier aa) id_entry
    ) \`ID Entry\` 
    RIGHT OUTER JOIN Journal 
    LEFT OUTER JOIN Policy ON Journal.ID_No = Policy.PolicyNo 
    ON \`ID Entry\`.IDNo = Journal.ID_No 
    LEFT OUTER JOIN Sub_Account ON Journal.Sub_Acct = Sub_Account.Acronym 
    ON \`Chart Account\`.Acct_Code = Journal.GL_Acct 
    LEFT OUTER JOIN Books ON Journal.Source_Type = Books.Code
`

  return qry;
}

