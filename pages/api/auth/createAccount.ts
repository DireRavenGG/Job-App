import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import * as argon2 from "argon2";
const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userData } = req.body;
  const { username, password } = userData;
  const saltedPassword = await argon2.hash(password);
  const user = await prisma.user.create({
    data: {
      username,
      password: saltedPassword,
    },
  });
  res.json({ user });
};

export default createAccount;
