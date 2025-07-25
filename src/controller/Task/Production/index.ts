import express from "express";
import VehiclePolicy from "./vehiclepolicy";
import FirePolicy from "./firepolicy";
import MarinePolicy from "./marinepolicy";
import BondPolicy from "./bondpolicy";
import MSPRPolicy from "./msprpolicy";
import PAPolicy from "./papolicy";
import CGLPolicy from "./cglpolicy";
import Policy from "./policy";
import RenewalNotice from "./renewalnotice";
import StatementOfAccount from "./statementOfAccount";
import Endorsement from "./endorsement";

const Production = express.Router();

Production.use("/production", RenewalNotice);
Production.use("/production", VehiclePolicy);
Production.use("/production", FirePolicy);
Production.use("/production", MarinePolicy);
Production.use("/production", BondPolicy);
Production.use("/production", MSPRPolicy);
Production.use("/production", PAPolicy);
Production.use("/production", CGLPolicy);
Production.use("/production", StatementOfAccount);
Production.use("/production", Policy);
Production.use("/production", Endorsement);

export default Production;
