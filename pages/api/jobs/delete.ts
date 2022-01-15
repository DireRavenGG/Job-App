import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function deleteJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const id = req.body.id;
    const deleteJob = await prisma.job.delete({
      where: id,
    });
    res.status(201);
    res.json(deleteJob);
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: "Sorry unable to add" });
  } finally {
    await prisma.$disconnect();
  }
}
