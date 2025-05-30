import { Request } from "express";
import { prisma } from "../../controller/index";

interface RateType {
  Account: string;
  Line: string;
  Type: string;
  Rate: string;
}

export async function addRate(data: RateType, req: Request) {
  return await prisma.rates.create({ data });
}
export async function searchRate(search: string) {
  const query = `
  SELECT 
    a.ID,
    a.Account,
    a.Line,
    a.Type,
    a.Rate,
    (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
  FROM
    rates a
    where
        a.ID like '%${search}%'
        OR a.Account like '%${search}%'
        OR a.Line like '%${search}%'
        OR a.Type like '%${search}%'
        OR a.Rate like '%${search}%'
    ORDER BY a.Account asc
    limit 500
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getPolicyAccounts() {
  const query = ` 
    SELECT 
        a.Account
    FROM
      policy_account a
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getBonds(req: Request) {
  const query = ` 
    SELECT 
        a.SublineName
    FROM
      subline a
    WHERE
    a.Line = 'Bonds';
    `;
  return await prisma.$queryRawUnsafe(query);
}
export async function getFire(req: Request) {
  const query = ` 
      SELECT 
          a.SublineName
      FROM
        subline a
      WHERE
      a.Line = 'Fire';
      `;
  return await prisma.$queryRawUnsafe(query);
}
export async function updateRate(
  ID: string,
  Type: string,
  Rate: string,
  req: Request
) {
  return await prisma.rates.update({ where: { ID }, data: { Type, Rate } });
}
export async function addRates(data: RateType, req: Request) {
  await prisma.rates.create({ data });
}
export async function deleteRate(ID: string, req: Request) {
  await prisma.rates.delete({ where: { ID } });
}
