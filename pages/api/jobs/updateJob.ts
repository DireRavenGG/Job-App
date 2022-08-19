import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";

export default async function updateJobs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const jobData = req.body;

    const status = req.body.status;

    const jobs = await prisma.job.update({
      where: {
        id: parseInt(jobData.id),
      },
      data: {
        title: jobData.title,
        moreInfo: jobData.moreInfo,
      },
    });
    res.status(200);
    res.json({ jobs });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: "Unable to update jobs" });
  } finally {
    await prisma.$disconnect();
  }
}
