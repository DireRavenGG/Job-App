import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({});
  const { userData } = await req.body;

  try {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    });
    res.status(201);
    res.json({ user });
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ error: "Unbable to login" });
  }
}
