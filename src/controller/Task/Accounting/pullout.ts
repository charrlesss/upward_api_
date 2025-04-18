import express, { Request } from "express";
import {
  createPulloutRequest,
  createPulloutRequestDetails,
  updateAnyId,
  insertApprovalCode,
  deletePulloutRequest,
  deletePulloutRequestDetails,
  loadRCPNApproved,
  loadRCPNApprovedList,
  loadRequestNumber,
  loadDetails,
  checkApprovedCode,
  deletePulloutRequestAutoCodes,
  checkApprovedCodeIsUsed,
  updateCode,
  approved,
} from "../../../model/Task/Accounting/pullout.model";
import { getUserById } from "../../../model/StoredProcedure";
import generateUniqueUUID from "../../../lib/generateUniqueUUID";
import sendEmail from "../../../lib/sendEmail";
import { format } from "date-fns";
import generateRandomNumber from "../../../lib/generateRandomNumber";
import saveUserLogs from "../../../lib/save_user_logs";
import { VerifyToken } from "../../Authentication";
import { defaultFormat } from "../../../lib/defaultDateFormat";

const Pullout = express.Router();
const PulloutRequest = express.Router();
const PulloutApporved = express.Router();

const UMISEmailToSend = [
  "upwardinsurance.grace@gmail.com",
  "lva_ancar@yahoo.com",
  "upwardinsurance.grace@gmail.com",
];
const UCSMIEmailToSend = [
  "upward.csmi@yahoo.com",
  "upward.csmi@gmail.com",
  "upwardinsurance.grace@gmail.com",
];

PulloutRequest.post(
  `/pullout/reqeust/save-pullout-request`,
  async (req, res) => {
    try {
      const department = req.cookies["up-dpm-login"];
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

      const subtitle = `
    <h3>Check storage pullout</h3>
    <h3>Pullout Request</h3>
    `;
      const {
        rcpn: RCPNo,
        ppno: PNNo,
        name: Name,
        reason,
        data: selected,
        flag: requestMode,
      } = req.body;
      const user = await getUserById((req.user as any).UserId);
      let text = "";
      const Requested_By = user?.Username;
      const Requested_Date = new Date();
      text = getSelectedCheck(selected);

      if (requestMode === "edit") {
        await deletePulloutRequest(req, RCPNo);
        await deletePulloutRequestDetails(req, RCPNo);
      }
      await deletePulloutRequestAutoCodes(req, RCPNo);

      await createPulloutRequest(
        {
          RCPNo: RCPNo,
          PNNo: PNNo,
          Reason: reason,
          Status: "PENDING",
          Requested_By: user?.Username,
          Branch: "HO",
          Requested_Date: defaultFormat(new Date()),
        },
        req
      );
      const status =
        requestMode === "edit"
          ? ["APPROVED", "CANCEL", "DISAPPROVED"]
          : ["APPROVED", "PENDING", "CANCEL", "DISAPPROVED"];
      await createPulloutRequestDetailsFunc(selected, RCPNo, req, status);
      await updateAnyId("pullout", req);

      const approvalCode = generateRandomNumber(6);

      if (department === "UMIS") {
        for (const toEmail of UMISEmailToSend) {
          await sendRequestEmail({
            RCPNo: RCPNo,
            PNNo: PNNo,
            reason,
            client: Name,
            text,
            Requested_By,
            Requested_Date,
            approvalCode,
            subtitle,
            toEmail,
          });
        }
      } else {
        for (const toEmail of UCSMIEmailToSend) {
          await sendRequestEmail({
            RCPNo: RCPNo,
            PNNo: PNNo,
            reason,
            client: Name,
            text,
            Requested_By,
            Requested_Date,
            approvalCode,
            subtitle,
            toEmail,
          });
        }
      }

      const pullout_auth_codes_id = await generateUniqueUUID(
        "pullout_auth_codes",
        "pullout_auth_codes_id"
      );
      await insertApprovalCode(
        {
          pullout_auth_codes_id,
          RCPN: RCPNo,
          For_User: `[${UMISEmailToSend.join(",")}]`,
          Approved_Code: approvalCode.toString(),
          Disapproved_Code: "",
        },
        req
      );

      await saveUserLogs(req, RCPNo, "add", "Pullout");

      res.send({
        message: "Save Successfully",
        success: true,
      });
    } catch (error: any) {
      console.log(error);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
      });
    }
  }
);
PulloutApporved.get(
  "/pullout/approved/load-request-number",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully",
        success: true,
        rcpn: await loadRequestNumber(req),
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        rcpn: [],
      });
    }
  }
);
PulloutApporved.post("/pullout/approved/load-details", async (req, res) => {
  try {
    res.send({
      message: "Successfully",
      success: true,
      details: await loadDetails(req, req.body.RCPNo),
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
      details: [],
    });
  }
});
PulloutApporved.post("/pullout/approved/confirm", async (req, res) => {
  try {
    const RCPNo = req.body.RCPNo;
    const code = req.body.code;
    const dt = (await checkApprovedCode(req, code)) as Array<any>;
    const dt1 = (await checkApprovedCodeIsUsed(req, RCPNo)) as Array<any>;
    if (dt.length <= 0) {
      return res.send({
        message: "Invalid Authorization Code",
        success: false,
      });
    }

    if (dt1.length > 0) {
      return res.send({
        message: `Request No. ${RCPNo} had already been approved/disapproved!`,
        success: false,
      });
    }

    res.send({
      message: "You want to confirm this transaction?",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
    });
  }
});
PulloutApporved.post("/pullout/approved/confirm-code", async (req, res) => {
  try {
    const department = req.cookies["up-dpm-login"];

    const RCPNo = req.body.RCPNo;
    const PNNo = req.body.PNNo;
    const reason = req.body.reason;
    const Name = req.body.Name;
    const code = req.body.code;
    const selected = req.body.selected;

    const user = await getUserById((req.user as any).UserId);
    const Requested_By = user?.Username as string;
    const Requested_Date = new Date();
    await updateCode(req, Requested_By, code);
    await approved(req, Requested_By, RCPNo);

    let text = "";
    const subtitle = `
    <h3>Check storage pullout</h3>
    <h3>Pullout Approved</h3>
    `;
    text = getSelectedCheck(selected);

    if (department === "UMIS") {
      for (const toEmail of UMISEmailToSend) {
        await sendApprovedEmail({
          RCPNo: RCPNo,
          PNNo: PNNo,
          reason,
          client: Name,
          text,
          approvedBy: Requested_By,
          Requested_Date,
          code,
          subtitle,
          toEmail,
          selected,
          isApproved: true,
        });
      }
    } else {
      for (const toEmail of UCSMIEmailToSend) {
        await sendApprovedEmail({
          RCPNo: RCPNo,
          PNNo: PNNo,
          reason,
          client: Name,
          text,
          approvedBy: Requested_By,
          Requested_Date,
          code,
          subtitle,
          toEmail,
          selected,
          isApproved: true,
        });
      }
    }

    res.send({
      message: "Request has been approved!",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    res.send({
      message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
      success: false,
    });
  }
});

PulloutApporved.post(
  "/pullout/approved/load-rcpn-approved",
  async (req, res) => {
    try {
      res.send({
        message: "Successfully",
        success: true,
        rcpn: await loadRCPNApproved(req),
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        id: [],
      });
    }
  }
);

PulloutApporved.post(
  "/pullout/approved/load-rcpn-approved-list",
  async (req, res) => {
    try {
      const RCPN = req.body.RCPN;
      const data = await loadRCPNApprovedList(req, RCPN);
      const jsonString = JSON.stringify(data, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      );
      const rcpnList = JSON.parse(jsonString);
      res.send({
        message: "Successfully",
        success: true,
        rcpnList,
      });
    } catch (error: any) {
      console.log(error.message);
      res.send({
        message: `We're experiencing a server issue. Please try again in a few minutes. If the issue continues, report it to IT with the details of what you were doing at the time.`,
        success: false,
        id: [],
      });
    }
  }
);

async function createPulloutRequestDetailsFunc(
  selected: string,
  RCPNo: string,
  req: Request,
  checkStatus: Array<string>
) {
  JSON.parse(selected).forEach(async (item: any) => {
    const PRD_ID = await generateUniqueUUID(
      "pullout_request_details",
      "PRD_ID"
    );
    if (!checkStatus.includes(item.Status)) {
      await createPulloutRequestDetails(
        {
          RCPNo: RCPNo,
          CheckNo: item.Check_No,
          PRD_ID,
        },
        req
      );
    }
  });
}
function getSelectedCheck(selected: string) {
  let tbodyText = "";
  JSON.parse(selected).forEach((item: any) => {
    tbodyText += generateTextTable(item);
  });
  return tbodyText;
}
function generateTextTable(item: any) {
  return `<tr>
 <td style="border: 1px solid #ddd; padding: 8px">${item.Check_Date}</td>
 <td style="border: 1px solid #ddd; padding: 8px">${item.Bank}</td>
 <td style="border: 1px solid #ddd; padding: 8px">${item.Check_No}</td>
 <td style="border: 1px solid #ddd; padding: 8px">₱${item.Check_Amnt}</td>
</tr>`;
}
async function sendRequestEmail(props: any) {
  const {
    RCPNo,
    PNNo,
    reason,
    client,
    text,
    Requested_Date,
    Requested_By,
    approvalCode,
    subtitle,
    toEmail,
  } = props;
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
        >RCP No. : </strong
      ><strong
        style="${strong2}"
        >${RCPNo}</strong
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
        >Client : </strong
      ><strong
        style="${strong2}"
        >${client}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Reason : </strong
      ><strong
        style="${strong2}"
        >${reason}</strong
      >
    </p>
    ${
      approvalCode
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
          Date
        </th>
        <th
          style="${th}"
        >
          Bank
        </th>
        <th
          style="${th}"
        >
          Check No.
        </th>
        <th
          style="${th}"
        >
          Amount
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
    PNNo,
    client,
    reason,
    code,
    selected,
    approvedBy,
    isApproved,
    toEmail,
  } = props;
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
    background-color:  ${isApproved ? "green" : "red"};
    color: white;`;
  await sendEmail(
    { user: "upwardumis2020@gmail.com", pass: "vapw ridu eorg ukxd" },
    "upwardumis2020@gmail.com",
    `${toEmail}`,
    `${isApproved ? "Approved" : "Disapproved"}`,
    `
  <div
    style="
      background-color: ${isApproved ? "green" : "red"};
      color: white;
      padding: 7px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      text-align: center;
    "
  >
    <h2>UPWARD</h2>
    <p>Check storage pullout</p>
  </div>
  <div style="text-align: center">
    <p>
      <strong
        style="${strong1}"
        >Status : </strong
      ><strong
        style="${strong2} ${isApproved ? "color:green" : "color:red"}"
        >${isApproved ? "APPROVED" : "DISAPPROVED"}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Policy No. : </strong
      ><strong
        style="${strong2}"
        >${PNNo}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Client : </strong
      ><strong
        style="${strong2}"
        >${client}</strong
      >
    </p>
    <p>
      <strong
        style="${strong1}"
        >Reason : </strong
      ><strong
        style="${strong2}"
        >${reason}</strong
      >
    </p>
    <p>
    <strong
      style="${strong1}"
      >${isApproved ? "Approved by" : "Disapproved by"} : </strong
    ><strong
      style="${strong2}"
      >${approvedBy}</strong
    >
  </p>
  <p>
  <strong
    style="${strong1}"
    >${isApproved ? "Approved by" : "Disapproved by"} : </strong
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
          Date
        </th>
        <th
          style="${th}"
        >
          Bank
        </th>
        <th
          style="${th}"
        >
          Check No.
        </th>
        <th
          style="${th}"
        >
          Amount
        </th>
      </tr>
    </thead>
    <tbody>
      ${getSelectedCheck(selected)}
    </tbody>
  </table>`
  );
}
Pullout.use(PulloutRequest);
Pullout.use(PulloutApporved);
export default Pullout;
