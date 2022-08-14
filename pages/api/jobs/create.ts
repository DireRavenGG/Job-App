import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function createJob(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { job: jobData } = req.body;

    const job = await prisma.job.create({
      data: {
        title: jobData.title,
        datePosted: jobData.datePosted,
        status: jobData.status,
        moreInfo: jobData.moreInfo,
        user: jobData.name,
      },
    });
    res.status(201);
    res.json({ job });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: "Sorry unable to add" });
  } finally {
    await prisma.$disconnect();
  }
}
