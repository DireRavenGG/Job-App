import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";

export default async function getJobs(
  { query: { name } }: { query: { name: string } },
  res: NextApiResponse
) {
  const username = name;
  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId: username,
      },
    });

    res.status(200);
    res.json({ jobs });
  } catch (e) {
    res.status(500);
    res.json({ jobs: [] });
  } finally {
    await prisma.$disconnect();
  }
}
