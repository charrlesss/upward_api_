import { Request } from "express";
import { prisma } from "../../controller/index";

interface SublineType {
  Line: string;
  SublineName: string;
}

export async function searchSubline(search: string) {
  const query2 = `
    SELECT 
        a.ID,
        a.Line,
        a.SublineName,
        (DATE_FORMAT(a.createdAt, '%Y-%m-%d')) as createdAt
    FROM 
          subline a
    where 
        a.Line like '%${search}%'
        OR a.SublineName like '%${search}%'
    ORDER BY a.SublineName asc limit 500

    `;
  return await prisma.$queryRawUnsafe(query2);
}

export async function findSubline(
  Line: string,
  SublineName: string,
  req: Request
) {
  return await prisma.subline.findMany({ where: { Line, SublineName } });
}
export async function getline(req: Request) {
  const query1 = `
      SELECT
          a.Line
      FROM
            subline a
      GROUP BY a.Line;
      `;
  return await prisma.$queryRawUnsafe(query1);
}

export async function addSubline(data: SublineType, req: Request) {
  return await prisma.subline.create({
    data,
  });
}

export async function updateSubline(
  {
    ID,
    SublineName,
  }: {
    ID: string;
    SublineName: string;
  },
  req: Request
) {
  return await prisma.subline.update({
    data: {
      SublineName,
    },
    where: {
      ID,
    },
  });
}

export async function deletesubline(ID: string, req: Request) {
  return await prisma.subline.delete({ where: { ID } });
}

export async function getNextId(tablename: string, req: Request) {
  const result: any = await prisma.$queryRawUnsafe(`
    SELECT AUTO_INCREMENT
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = '${tablename}'`);

  return result;
}
