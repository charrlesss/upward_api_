import express from "express";
import {
  approvalCodePostponement,
  checkPostponementRequestAutoID,
  createPostponement,
  createPostponementDetails,
  getCheckPostponementPNNo,
  getSelectedCheckPostponementPNNo,
  searchEditPostponentRequest,
  searchSelectedEditPostponentRequest,
  updateOnCancelPostponentRequest,
  updateOnCancelPostponentRequestDetails,
  updatePostponementStatus,
  updateApprovalPostponementCode,
  findApprovalPostponementCode,
  searchPDCCLients,
  getRCPNList,
  getRCPNDetails,
  deleteOnUpdate,
} from "../../../model/Task/Accounting/chek-postponement.model";
import { getUserById } from "../../../model/StoredProcedure";
import { updateAnyId } from "../../../model/Task/Accounting/pullout.model";
import { format } from "date-fns";
import sendEmail from "../../../lib/sendEmail";
import generateRandomNumber from "../../../lib/generateRandomNumber";
import saveUserLogs from "../../../lib/save_user_logs";
import { VerifyToken } from "../../Authentication";
import generateUniqueUUID from "../../../lib/generateUniqueUUID";
import { PrismaList } from "../../../model/connection";
import { Request } from "express";
import { defaultFormat } from "../../../lib/defaultDateFormat";
import { v4 as uuidv4 } from "uuid";


const { CustomPrismaClient } = PrismaList();

const CheckPostponement = express.Router();

CheckPostponement.get('/check-postponement/request/load-pnno', async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);


    setTimeout(async () => {
      // Step 2: Create `tmp_numbers` table
      await prisma.$executeRawUnsafe(`
  CREATE TEMPORARY TABLE tmp_numbers (number INT);
`);

      // Step 3: Insert data into `tmp_numbers`
      await prisma.$executeRawUnsafe(`
  INSERT INTO tmp_numbers (number)
  SELECT x.i * 10 + y.i
  FROM (SELECT 0 i UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 
        UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) x,
       (SELECT 0 i UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 
        UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) y;
`);

      // Step 4: Create `TMP` table
      await prisma.$executeRawUnsafe(`
  CREATE TEMPORARY TABLE TMP AS
  SELECT
      DATE_ADD(CURDATE(), INTERVAL number DAY) AS \`Date\`,
      1 AS IsWorkDay,
      1 AS IsWeekDay
  FROM
      tmp_numbers;
`);

      // Step 5: Update `TMP` table based on holidays
      await prisma.$executeRawUnsafe(`
  UPDATE TMP
  SET IsWorkDay = 0
  WHERE \`Date\` IN (SELECT \`Date\` FROM HOLIDAYS);
`);

      // Step 6: Update `TMP` table for weekends
      await prisma.$executeRawUnsafe(`
  UPDATE TMP
  SET IsWeekDay = 0, IsWorkDay = 0
  WHERE DAYOFWEEK(\`Date\`) IN (1, 7); -- Sunday = 1, Saturday = 7
`);

      // Step 7: Final SELECT query to fetch data
      const data = await prisma.$queryRawUnsafe(`

  select * from (
        select  '' as PNo,
          '' as Name,
          '' AS BName
  union all
  SELECT 
      a.PNo,
      a.Name,
      'HO' AS BName
  FROM
      PDC a
  LEFT JOIN TMP c
      ON c.\`Date\` >= CURDATE() AND c.\`Date\` < a.Check_Date
  LEFT JOIN (
      SELECT 
          ID_No,
          SUM(IFNULL(Debit, 0) - IFNULL(Credit, 0)) AS Balance
      FROM
          Journal
      WHERE GL_Acct = '1.03.01'
      GROUP BY ID_No
  ) d
      ON a.PNo = d.ID_No
  LEFT JOIN policy f
      ON a.PNo = f.policyno
  GROUP BY
      a.PNo, a.Name
  HAVING
      COUNT(c.\`Date\`) >= 3
  ) a
  ORDER BY
      a.PNo;
`);
      await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS \`tmp_numbers\`;`);
      await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS \`TMP\`;`);

      res.send({
        success: true,
        message: "Successfully load pnnno",
        data
      })
    }, 200)

  } catch (error: any) {
    console.log(`${CheckPostponement} : ${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
})
CheckPostponement.get('/check-postponement/request/auto-id', async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);

    const sql = `
      SELECT 
          CAST((YEAR(CURDATE()) % 100) AS CHAR) AS Year,
          lpad((COUNT(1) + 1), 4, '0') AS Count
      FROM 
          postponement
      WHERE 
          SUBSTRING(RPCDNo, 7, 2) = LPAD(YEAR(CURDATE()) % 100, 2, '0')
          AND Branch = 'HO';
      `
    const data = await prisma.$queryRawUnsafe(sql);
    res.send({
      message: "Successfully Get ID",
      success: true,
      data
    });
  } catch (error: any) {
    console.log(`${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
})
CheckPostponement.post('/check-postponement/request/load-checks', async (req, res) => {
  try {

    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);


    await prisma.$executeRawUnsafe(`  
    DROP TEMPORARY TABLE IF EXISTS tmp_dates;
    `)
    await prisma.$executeRawUnsafe(`  
          CREATE TEMPORARY TABLE tmp_dates (
        Date DATE,
        IsWorkDay BOOLEAN,
        IsWeekDay BOOLEAN
    );
    `)
    await prisma.$executeRawUnsafe(`  
  INSERT INTO tmp_dates (Date, IsWorkDay, IsWeekDay)
  SELECT 
      DATE_ADD(CURDATE(), INTERVAL n DAY) AS Date,
      1 AS IsWorkDay,
      CASE WHEN DAYOFWEEK(DATE_ADD(CURDATE(), INTERVAL n DAY)) IN (1, 7) THEN 0 ELSE 1 END AS IsWeekDay
  FROM (
      SELECT a.N + b.N * 10 AS n
      FROM (
          SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 
          UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
      ) a,
      (
          SELECT 0 AS N UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3
      ) b
      ORDER BY n
      LIMIT 30
  ) numbers;
    `)

    await prisma.$executeRawUnsafe(`  
      UPDATE tmp_dates t
      JOIN holidays h ON t.Date = h.Date
      SET t.IsWorkDay = 0;
    `)

    await prisma.$executeRawUnsafe(`  
    UPDATE tmp_dates
    SET IsWorkDay = 0, IsWeekDay = 0
    WHERE DAYOFWEEK(Date) IN (1, 7);  
    `)

    const data = await prisma.$queryRawUnsafe(`
      SELECT '' as CheckNo
      union all
      SELECT 
        T.Check_No AS CheckNo
      FROM PDC T
      LEFT JOIN tmp_dates c 
          ON c.Date >= CURDATE() 
          AND c.Date <= T.Check_Date
          AND c.IsWorkDay = 1
      WHERE T.PNo = '${req.body.PNNo}'
      GROUP BY T.Check_No, T.Check_Date
      HAVING COUNT(c.Date) >= 3;
    `)

    res.send({
      message: "Successfully Get ID",
      success: true,
      data
    });
  } catch (error: any) {
    console.log(`${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
})
CheckPostponement.post('/check-postponement/request/load-checks-details', async (req, res) => {
  try {

    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
    const data = await prisma.$queryRawUnsafe(`
        SELECT 
            Cast(Check_Date as Date) CheckDate,
      Bank,
      Check_No CheckNo,
      Check_Amnt Amount 
        FROM PDC  
          Where 
        Check_No = '${req.body.checkNo}' And PNo = '${req.body.PNNo}'
      limit 1
      `)
    res.send({
      message: "Successfully Get ID",
      success: true,
      data
    });
  } catch (error: any) {
    console.log(`${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
})
CheckPostponement.post('/check-postponement/request/load-rpcdno', async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
    const data = await prisma.$queryRawUnsafe(` select '' as  RPCDNo  union all SELECT RPCDNo FROM postponement  Where Status = 'PENDING' and Branch = 'HO'`)

    res.send({
      message: "Successfully Saved",
      success: true,
      data
    });
  } catch (error: any) {
    console.log(`${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
})
CheckPostponement.post('/check-postponement/request/load-rpcd-details', async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
    const data = await prisma.$queryRawUnsafe(` 
       SELECT 
      PNNO,
      (SELECT DISTINCT
              (name)
          FROM
              PDC
          WHERE
              PNo = a.PNNo AND Check_No = a.CheckNo) AS 'Name',
      CheckNo,
      'Head Office' AS 'Branch Name',
      (SELECT 
              bank
          FROM
              PDC
          WHERE
              Check_No = a.CheckNo AND PNo = a.PNNO) AS 'Bank',
      (SELECT 
              Check_Amnt
          FROM
              PDC
          WHERE
              Check_No = a.CheckNo AND PNo = a.PNNO) AS 'check_Amnt',
      a.OldCheckDate,
      a.NewCheckDate,
      a.Reason,
      (SELECT 
              PaidVia
          FROM
              Postponement
          WHERE
              RPCDNo = a.RPCD) AS 'PaidVia',
      (SELECT 
              Surplus
          FROM
              Postponement
          WHERE
              RPCDNo = a.RPCD) AS 'Surplus',
      (SELECT 
              Deducted_to
          FROM
              Postponement
          WHERE
              RPCDNo = a.RPCD) AS 'Deducted_to',
      (SELECT 
              PaidInfo
          FROM
              Postponement
          WHERE
              RPCDNo = a.RPCD) AS 'PaidInfo'
  FROM
      (SELECT 
          *,
              (SELECT 
                      pnno
                  FROM
                      Postponement
                  WHERE
                      RPCDNo = A.RPCD) AS 'PNNO'
      FROM
          Postponement_Detail A) a
  WHERE
      RPCD = '${req.body.RPCDNo}'  
      `)

    res.send({
      message: "Successfully Saved",
      success: true,
      data
    });
  } catch (error: any) {
    console.log(`${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
})
CheckPostponement.post('/check-postponement/request/check-is-pending', async (req, res) => {
  try {

    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
    const data = await prisma.$queryRawUnsafe(`
            SELECT * FROM (
            SELECT 
             *,
              (SELECT PNNO FROM Postponement WHERE RPCDNo = a.RPCDNo) AS PNNO,
              (SELECT status FROM Postponement WHERE RPCDNo = a.RPCDNo) AS Status
              
            FROM Postponement_Detail a
          ) tbl 
          WHERE checkNo = '${req.body.checkNo}' AND Status = 'PENDING';
      `)
    res.send({
      message: "Successfully Get ID",
      success: true,
      data
    });
  } catch (error: any) {
    console.log(`${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
})
CheckPostponement.post('/check-postponement/request/saving', async (req, res) => {
  try {
    const prisma = CustomPrismaClient(req.cookies["up-dpm-login"]);
    // HEADER
    await prisma.postponement.create({
      data: {
        RPCDNo: req.body.RPCDNoRef,
        PNNo: req.body.PNNoRef,
        HoldingFees: req.body.HoldingFeesRef,
        PenaltyCharge: req.body.PenaltyChargeRef,
        PaidVia: req.body.HowToBePaidRef,
        PaidInfo: req.body.RemarksRef,
        Date: defaultFormat(new Date()),
        Status: "PENDING",
        Branch: req.body.BranchRef,
        Prepared_by: req.body.Prepared_By,
        Surplus: req.body.SurplusRef,
        Deducted_to: req.body.DeductedToRef
      }
    })

    // DETAILS
    const selected = JSON.parse(req.body.data)

    for (const itm of selected) {
      await prisma.postponement_detail.create({
        data: {
          RPCDNo: uuidv4(),
          RPCD: req.body.RPCDNoRef,
          CheckNo: itm[1],
          OldCheckDate: defaultFormat(new Date(itm[4])),
          NewCheckDate: defaultFormat(new Date(itm[5])),
          Reason: itm[8]
        }
      })
    }


    res.send({
      message: "Successfully Saved",
      success: true,
      data: []
    });
  } catch (error: any) {
    console.log(`${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      data: [],
    });
  }
})




/// ============================

CheckPostponement.get(
  "/check-postponement/reqeust/search-pnno-client",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully Get ID",
        success: true,
        pnnoClients: await searchPDCCLients(req),
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        pnnoClients: [],
      });
    }
  }
);
CheckPostponement.post(
  "/check-postponement/selected-pn-no-checklist",
  async (req, res) => {
    const { PNNo } = req.body;
    try {
      const selectedChecks = await getSelectedCheckPostponementPNNo(PNNo, req);
      res.send({
        message: "Successfully Get Search Selected",
        success: true,
        selectedChecks,
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        selectedChecks: [],
      });
    }
  }
);
CheckPostponement.get(
  "/check-postponement/reqeust/get-id",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully Get ID",
        success: true,
        id: await checkPostponementRequestAutoID(req),
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        id: [],
      });
    }
  }
);
CheckPostponement.post("/check-postponement/save", async (req, res) => {
  const { userAccess }: any = await VerifyToken(
    req.cookies["up-ac-login"] as string,
    process.env.USER_ACCESS as string
  );
  if (userAccess.includes("ADMIN")) {
    return res.send({
      message: `CAN'T SAVE, ADMIN IS FOR VIEWING ONLY!`,
      success: false,
    });
  }

  try {
    if (req.body.requestMode === "edit") {
      await deleteOnUpdate(req, req.body.RPCD);
    }

    const user = await getUserById((req.user as any).UserId);
    const data = {
      RPCDNo: req.body.RPCD,
      PNNo: req.body.PNNo,
      HoldingFees: req.body.holdingFee,
      PenaltyCharge: req.body.penaltyCharge,
      PaidVia: req.body.paidVia,
      PaidInfo: req.body.paidInfo,
      PaidDate: req.body.paidDate,
      Date: new Date(),
      Status: "PENDING",
      Branch: "HO",
      ClientBranch: req.body.branch,
      Prepared_by: user?.Username,
      Surplus: req.body.surplus,
      Deducted_to: req.body.deductedTo,
      Requested_By: user?.Username,
      Requested_Date: new Date(),
    };
    await createPostponement(data, req);

    JSON.parse(req.body.checkSelected).forEach(async (item: any) => {
      const details = {
        RPCD: req.body.RPCD,
        RPCDNo: `${req.body.RPCD}-${item.temp_id}`,
        CheckNo: item.Check_No,
        OldCheckDate: new Date(item.Check_Date),
        NewCheckDate: new Date(item.New_Check_Date),
        Reason: item.Reason,
      };
      await createPostponementDetails(details, req);
    });

    const subtitle = `
      <h3>Check Deposit Postponement Request</h3>
    `;
    const text = getSelectedCheck(req.body.checkSelected);
    const Requested_By = user?.Username;
    const Requested_Date = new Date();
    const approvalCode = generateRandomNumber(6);

    const EmailToSend = [
      "upwardinsurance.grace@gmail.com",
      "lva_ancar@yahoo.com",
      "encoder.upward@yahoo.com",
      "charlespalencia21@gmail.com",
    ];

    for (const toEmail of EmailToSend) {
      await sendRequestEmail({
        ...req.body,
        text,
        Requested_By,
        Requested_Date,
        approvalCode,
        subtitle,
        toEmail,
      });
    }

    const postponement_auth_codes_id = await generateUniqueUUID(
      "postponement_auth_codes",
      "postponement_auth_codes_id"
    );

    await approvalCodePostponement(
      {
        postponement_auth_codes_id,
        RPCD: req.body.RPCD,
        For_User: Requested_By,
        Approved_Code: approvalCode.toString(),
        Disapproved_Code: "",
      },
      req
    );
    await updateAnyId("check-postponement", req);
    await saveUserLogs(req, req.body.RPCD, `add request`, "Check-Postponement");
    res.send({ message: "Save Successfully.", success: true });
  } catch (error: any) {
    console.log(`${CheckPostponement} : ${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
    });
  }
});
CheckPostponement.post(
  "/check-postponement/request/get-rcpn-list",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully Get ID",
        success: true,
        rcpn: await getRCPNList(req),
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        rcpn: [],
      });
    }
  }
);
CheckPostponement.get(
  "/check-postponement/request/get-rcpn-list",
  async (req, res) => {
    try {

      res.send({
        message: "Successfully Get ID",
        success: true,
        rcpn: await getRCPNList(req),
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        rcpn: [],
      });
    }
  }
);
CheckPostponement.post(
  "/check-postponement/request/get-rcpn-selected-datails",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully Get ID",
        success: true,
        rcpnDetails: await getRCPNDetails(req, req.body.RPCDNo),
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        rcpnDetails: [],
      });
    }
  }
);
CheckPostponement.get("/check-postponement/search-edit", async (req, res) => {
  const { searchEdit } = req.query;
  try {
    const selectedRequest = await searchEditPostponentRequest(
      searchEdit as string,
      req
    );
    res.send({
      message: "Successfully Get Search Selected",
      success: true,
      selectedRequest,
    });
  } catch (error: any) {
    console.log(`${CheckPostponement} : ${error.message}`);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      selectedRequest: [],
    });
  }
});
CheckPostponement.post(
  "/check-postponement/search-selected-edit",
  async (req, res) => {
    try {
      const selectedSearchEdit = await searchSelectedEditPostponentRequest(
        req.body.RPCD,
        req
      );
      res.send({
        message: "Successfully Get Search Selected",
        success: true,
        selectedSearchEdit,
      });
    } catch (error: any) {
      console.log(`${CheckPostponement} : ${error.message}`);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        selectedSearchEdit: [],
      });
    }
  }
);
CheckPostponement.post(
  "/check-postponement/approved-request",
  async (req, res) => {
    const { userAccess }: any = await VerifyToken(
      req.cookies["up-ac-login"] as string,
      process.env.USER_ACCESS as string
    );
    if (userAccess.includes("ADMIN")) {
      return res.send({
        message: `CAN'T APPROVED, ADMIN IS FOR VIEWING ONLY!`,
        success: false,
      });
    }

    try {
      if (
        req.body.code === "" ||
        req.body.code === null ||
        req.body.code === undefined
      ) {
        return res.send({
          message: "Invalid Approval Code",
          success: false,
        });
      }
      const isAuthorized: any = await findApprovalPostponementCode(
        req.body.code,
        req.body.RPCD,
        req
      );

      if (isAuthorized.length <= 0) {
        return res.send({
          message: "Invalid Approval Code",
          success: false,
        });
      }

      const user = await getUserById((req.user as any).UserId);
      await updatePostponementStatus(
        req.body.isApproved,
        req.body.RPCD,
        user?.Username as string,
        req
      );
      await updateApprovalPostponementCode(
        user?.Username as string,
        req.body.RPCD,
        req
      );
      const subtitle = `
        <h3>Check Deposit Postponement Request</h3>
      `;
      const text = getSelectedCheck(req.body.checkSelected);
      const Approved_By = user?.Username;

      const EmailToSend = [
        "upwardinsurance.grace@gmail.com",
        "lva_ancar@yahoo.com",
        "encoder.upward@yahoo.com",
        "charlespalencia21@gmail.com",
      ];

      for (const toEmail of EmailToSend) {
        await sendApprovedEmail({
          ...req.body,
          text,
          Requested_By: req.body.Requested_By,
          Requested_Date: req.body.Requested_Date,
          approvalCode: req.body.code,
          subtitle,
          Approved_By,
          toEmail,
        });
      }

      await saveUserLogs(
        req,
        req.body.RPCD,
        `${req.body.isApproved ? "approved" : "disapproved"} request`,
        "Check-Postponement"
      );

      res.send({
        message: `${req.body.isApproved ? "APPROVED" : "DISAPPROVED"} Request ${req.body.RPCD
          } Successfully`,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
      });
    }
  }
);
function getSelectedCheck(selected: string) {
  let tbodyText = "";
  JSON.parse(selected).forEach((item: any) => {
    tbodyText += generateTextTable(item);
  });
  return tbodyText;
}
function generateTextTable(item: any) {
  return `
  <tr>
    <td style="border: 1px solid #ddd; padding: 8px">${item.Check_No}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.Bank}</td>
    <td style="border: 1px solid #ddd; padding: 8px">₱${item.Check_Amnt}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.Check_Date}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.New_Check_Date}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.DateDiff}</td>
    <td style="border: 1px solid #ddd; padding: 8px">${item.Reason}</td>
  </tr>`;
}
async function sendRequestEmail(props: any) {
  const {
    RPCD,
    PNNo,
    client,
    text,
    Requested_Date,
    Requested_By,
    approvalCode,
    subtitle,
    holdingFee,
    penaltyCharge,
    surplus,
    paidVia,
    toEmail,
  } = props;
  const totalFee =
    parseFloat(holdingFee.replace(/,/g, "")) +
    parseFloat(penaltyCharge.replace(/,/g, "")) +
    parseFloat(surplus.replace(/,/g, ""));
  const strong1 = `
    font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            color: #334155;
          
    `;
  const strong2 = `font-family: 'Courier New', Courier, monospace;
    font-size: 16px;`;
  const th = ` border: 1px solid #ddd;
    padding: 8px;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #64748b;
    color: white;`;
  await sendEmail(
    { user: "upwardumis2020@gmail.com", pass: "vapw ridu eorg ukxd" },
    "upwardumis2020@gmail.com",
    `${toEmail}`,
    "For Approval",
    `
  <div
    style="
      background-color: #64748b;
      color: white;
      padding: 7px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      text-align: center;
    "
  >
    <h2>UPWARD</h2>
    ${subtitle}
    
  </div>
  <div style="text-align: center">
    <p>
      <strong
        style="${strong1}"
        >RCPD No. : </strong
      ><strong
        style="${strong2}"
        >${RPCD}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >PN No. : </strong
      ><strong
        style="${strong2}"
        >${PNNo}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Branch : </strong
      ><strong
        style="${strong2}"
        >HO</strong
      >
    </p>
    <p>
    <strong
      style="${strong1}"
      >Account Name : </strong
    ><strong
      style="${strong2}"
      >${client}</strong
    >
    ${approvalCode
      ? `<p>
      <strong
        style="${strong1}"
        >Approval Code : </strong
      ><strong
        style="${strong2} color:green;font-weight: bold;"
        >${approvalCode}</strong
      >
    </p>`
      : ""
    }
  </div>
  <table
    style="
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    "
  >
    <thead>
      <tr>
        <th
          style="${th}"
        >
          Check No.
        </th>
        <th
          style="${th}"
        >
          Bank
        </th>
        <th
          style="${th}"
        >
          Amount
        </th>
        <th
          style="${th}"
        >
          Old Deposite Date
        </th>
        <th
          style="${th}"
        >
          New Deposite Date
        </th>
        <th
          style="${th}"
        >
          Date Difference
        </th>
        <th
          style="${th}"
        >
          Reason
        </th>
      </tr>
    </thead>
    <tbody>
      ${text}
    </tbody>
  </table>
  <br />
  <br />
  <div
    style="
      text-align: center;
      font-size: 14px;
      font-family: 'Courier New', Courier, monospace;
    "
  >
    <p>Total Fees:<span style="font-weight: 600; color: #334155;">${totalFee}</span></p>
    <p style="font-weight: 200">
    How to be paid:<span style="font-weight: 600;color: #334155;">
      ${paidVia}
    </span>
    </p>
    <p>Other Informations</p>
  </div>
  <br />
  <br />
  <div
    style="
      text-align: center;
      font-size: 14px;
      font-family: 'Courier New', Courier, monospace;
    "
  >
    <p>Request By:<span style="font-weight: 600; color: #334155;">${Requested_By}</span></p>
    <p style="font-weight: 200">
      Request Date:<span style="font-weight: 600;color: #334155;">${format(
      Requested_Date,
      "MM/dd/yyyy"
    )}</span>
    </p>
    <p>This is a computer generated E-mail</p>
  </div>
    `
  );
}
async function sendApprovedEmail(props: any) {
  const {
    RPCD,
    PNNo,
    client,
    text,
    Requested_Date,
    Requested_By,
    subtitle,
    holdingFee,
    penaltyCharge,
    surplus,
    paidVia,
    isApproved,
    username,
    code,
    Approved_By,
    toEmail,
  } = props;
  const totalFee =
    parseFloat(holdingFee.replace(/,/g, "")) +
    parseFloat(penaltyCharge.replace(/,/g, "")) +
    parseFloat(surplus.replace(/,/g, ""));
  const strong1 = `
    font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            color: #334155;
          
    `;
  const strong2 = `font-family: 'Courier New', Courier, monospace;
    font-size: 16px;`;
  const th = ` border: 1px solid #ddd;
    padding: 8px;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color:${isApproved ? "green" : "#b91c1c"};
    color: white;`;
  await sendEmail(
    { user: "upwardumis2020@gmail.com", pass: "vapw ridu eorg ukxd" },
    "upwardumis2020@gmail.com",
    `${toEmail}`,
    `${isApproved ? "Approved" : "Disapproved"}`,
    `
  <div
    style="
      background-color: ${isApproved ? "green" : "#b91c1c"};
      color: white;
      padding: 7px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      text-align: center;
    "
  >
    <h2>UPWARD</h2>
    ${subtitle}
  </div>
  <div style="text-align: center">
  <p>
      <strong
        style="${strong1}"
        >Status : </strong
      ><strong
        style="${strong2}"
        >${isApproved
      ? "<span style='color:green'>APPROVED</span>"
      : "<span style='color:#b91c1c'>DISAPPROVED</span>"
    }</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >RCPD No. : </strong
      ><strong
        style="${strong2}"
        >${RPCD}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >PN No. : </strong
      ><strong
        style="${strong2}"
        >${PNNo}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Branch : </strong
      ><strong
        style="${strong2}"
        >Head Office</strong
      >
    </p>
    <p>
    <strong
      style="${strong1}"
      >Account Name : </strong
    ><strong
      style="${strong2}"
      >${client}</strong
    >
    </p>

    <p>
    <strong
      style="${strong1}"
      >Approved By: </strong
    ><strong
      style="${strong2}"
      >${Approved_By}</strong
    >
    </p>
   <p>
    <strong
      style="${strong1}"
      >Approved Code: </strong
    ><strong
      style="${strong2} color:green;font-weight: bold;"
      >${code}</strong
    >
    </p>
  </div>
  <table
    style="
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    "
  >
    <thead>
      <tr>
        <th
          style="${th}"
        >
          Check No.
        </th>
        <th
          style="${th}"
        >
          Bank
        </th>
        <th
          style="${th}"
        >
          Amount
        </th>
        <th
          style="${th}"
        >
          Old Deposite Date
        </th>
        <th
          style="${th}"
        >
          New Deposite Date
        </th>
        <th
          style="${th}"
        >
          Date Difference
        </th>
        <th
          style="${th}"
        >
          Reason
        </th>
      </tr>
    </thead>
    <tbody>
      ${text}
    </tbody>
  </table>
  <br />
  <br />
  <div
    style="
      text-align: center;
      font-size: 14px;
      font-family: 'Courier New', Courier, monospace;
    "
  >
    <p>Total Fees:<span style="font-weight: 600; color: #334155;">${totalFee}</span></p>
    <p style="font-weight: 200">
    How to be paid:<span style="font-weight: 600;color: #334155;">
      ${paidVia}
    </span>
    </p>
    <p>Other Informations</p>
  </div>
  <br />
  <br />
  <div
    style="
      text-align: center;
      font-size: 14px;
      font-family: 'Courier New', Courier, monospace;
    "
  >
    <p>Request By:<span style="font-weight: 600; color: #334155;">${Requested_By}</span></p>
    <p style="font-weight: 200">
      Request Date:<span style="font-weight: 600;color: #334155;">${format(
      new Date(Requested_Date),
      "MM/dd/yyyy"
    )}</span>
    </p>
    <p>This is a computer generated E-mail</p>
  </div>
    `
  );
}
export default CheckPostponement;
