import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
export default async function getJobs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jobs = await prisma.job.findMany();
    res.status(200);
    res.json({ jobs });
  } catch (e) {
    res.status(500);
    res.json({ jobs: [] });
  } finally {
    await prisma.$disconnect();
  }
}
