import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/db";

type NextApiRequestWithParams = NextApiRequest & {
  query: { name: string };
};

export default async function getJobs(
  req: NextApiRequestWithParams,
  res: NextApiResponse
) {
  const username = req.query.name;
  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId: username,
      },
    });

    res.status(200);
    res.json(jobs);
  } catch (e) {
    res.status(500);
    res.json([]);
  } finally {
    await prisma.$disconnect();
  }
}
