import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import * as argon2 from "argon2";
const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userData } = req.body;
  const { username, password } = userData;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  let isPassword = false;
  if (user) {
    isPassword = await argon2.verify(user.password, password);
  }
  if (isPassword) {
    console.log(user);
  } else {
    res.status(401);
    res.send("Fucked up");
  }
};

export default signIn;
