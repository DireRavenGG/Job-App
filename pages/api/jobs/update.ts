import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function updateJobs(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ["query"] });

  try {
    console.log(req.body);
    const id = req.body.id;

    const status = req.body.status;

    const jobs = await prisma.job.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status,
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
