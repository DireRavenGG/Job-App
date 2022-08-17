import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../prisma/db";
import * as argon2 from "argon2";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/config";

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userData } = req.body;
  const { username, password } = userData;
  const saltedPassword = await argon2.hash(password);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: saltedPassword,
      },
    });

    req.session.account = {
      id: user.id,
      username: user.username,
      pfp: user.pfp || "",
    };

    await req.session.save();
    res.json({ status: true });
  } catch (e) {
    res.json({ status: false });
  }
};

export default withIronSessionApiRoute(createAccount, ironOptions);
