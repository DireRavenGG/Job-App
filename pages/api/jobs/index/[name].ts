import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function getJobs(
  { query: { name } }: { query: { name: string } },
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });
  const username = name;

  try {
    const jobs = await prisma.job.findMany({
      where: {
        user: username,
      },
    });
    res.status(200);
    res.json({ jobs });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to fetch jobs" });
  } finally {
    await prisma.$disconnect();
  }
}
