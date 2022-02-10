import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});
  const { userData } = await req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: userData.username,
        password: userData.password,
      },
    });
    res.status(201);
    console.log(user);
    res.json({ user });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: "Unbable to login" });
  }
}
