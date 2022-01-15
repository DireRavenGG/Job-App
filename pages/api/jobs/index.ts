import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getJobs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    const jobs = await prisma.job.findMany();
    res.status(200);
    res.json({ jobs });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to fetch jobs" });
  } finally {
    await prisma.$disconnect();
  }
}
