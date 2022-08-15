import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import * as argon2 from "argon2";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";

declare module "iron-session" {
  interface IronSessionData {
    account?: {
      id: number;
      username: string;
      pfp?: string;
    };
  }
}

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
  if (isPassword && user) {
    req.session.account = {
      id: user.id,
      username: user.username,
      pfp: user.pfp || "",
    };
    await req.session.save();
    res.redirect("/");
    res.send("logged in");
  } else {
    res.json({});
  }
};

export default withIronSessionApiRoute(signIn, ironOptions);
