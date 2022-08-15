import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import * as argon2 from "argon2";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";
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
    res.json({ user });
  } else {
    res.json({});
  }
};

export default withIronSessionApiRoute(signIn, ironOptions);
