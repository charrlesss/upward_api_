import express from "express";
import cors from "cors";
import router, { prisma } from "./src/controller";
import path from "path";
import cookieParser from "cookie-parser";
import env from "dotenv";
import { createIdSequence } from "./src/model/StoredProcedure";
import { hashSync } from "bcrypt";

env.config({ path: ".env.ucsmi" });
const PORT = process.env.PORT;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "https://umis.upwardinsurance.net",
    "https://ucsmi.upwardinsurance.net",
    "https://upwardinsurance.net",
    "http://192.168.100.220:3000",
    "/",
    "*",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

async function callthis() {
  const array = [
    ["TP-2501-006", "CV-BC-543198/25"],
    ["TP-2501-018", "CV-BC-543196/25"],
    ["TP-2501-020", "CV-BC-543197/25"],
    ["TP-2502-002", "CV-BC-543240/25"],
    ["TP-2502-003", "CV-BC-543241/25"],
    ["TP-2502-007", "CV-BC-543235/25"],
    ["TP-2502-009", "PC-BC-248956/25"],
    ["TP-2502-011", "CV-BC-543234/25"],
    ["TP-2502-012", "CV-BC-543233/25"],
    ["TP-2502-013", "CV-BC-543231/25"],
    ["TP-2502-014", "CV-BC-543230/25"],
    ["TP-2502-024", "CV-BC-531269/25"],
    ["TP-2502-027", "PC-BC-248958/25"],
    ["TP-2502-028", "CV-BC-543237/25"],
    ["TP-2502-030", "CV-BC-543239/25"],
    ["TP-2502-032", "CV-BC-543238/25"],
    ["TP-2503-001", "CV-BC-531349/25"],
    ["TP-2503-006", "CV-BC-543101/25"],
    ["TP-2503-007", "CV-BC-531350/25"],
    ["TP-2503-013", "CV-BC-543108/25"],
    ["TP-2503-015", "CV-BC-543109/25"],
    ["TP-2503-016", "CV-BC-543110/25"],
    ["TP-2503-019", "CV-BC-54310/25"],
    ["TP-2503-020", "CV-BC-543106/25"],
    ["TP-2503-029", "CV-BC-531347/25"],
    ["TP-2504-018", "CV-BC-543380/25"],
    ["TP-2505-002", "PC-BC-329338/25"],
    ["TP-2505-002", "PC-BC329338/25"],
    ["TP-2505-007", "CV-BC-543211/25"],
  ];
  for (const itm of array) {
    console.log(itm);
    await prisma.$queryRawUnsafe(
      `
      UPDATE new_upward_insurance_ucsmi.collection
      SET
          CRLoanID = ?,
          CRCode = '1.03.01',
          CRTitle = 'Premium Receivables',
          Purpose = 'Premium Collection'
      WHERE
          CRLoanID = ? 
          and CRCode = '1.03.03'
          
      `,
      itm[1],
      itm[0]
    );
    await prisma.$queryRawUnsafe(
      `
    UPDATE new_upward_insurance_ucsmi.journal 
    SET 
        Explanation = 'Premium Collection',
        GL_Acct = '1.03.01',
        cGL_Acct = 'Premium Receivables'
    WHERE
             GL_Acct = '1.03.03'
            AND ID_No = ?
      `,
      itm[1]
    );
  }
}

async function main() {
  console.log(hashSync("dwight", 12));
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "1000mb" }));
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(express.static(path.join(__dirname, "static")));
  app.use(express.static(path.join(__dirname, "/static/image/")));
  app.use(express.static(path.join(__dirname, "/src/viewucsmi")));
  app.use("/api", router);

  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/src/viewucsmi/", "index.html"));
  });
  app.listen(PORT, () => console.log(`Listen in port ${PORT}`));
}

main()
  .then(async () => {})
  .catch(async (e) => {
    console.error(e);
  });
