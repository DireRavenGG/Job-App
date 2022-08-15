import { withIronSessionApiRoute } from "iron-session/next/dist";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../../lib/config";

const logoutRoute = (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.send({ ok: true });
};

export default withIronSessionApiRoute(logoutRoute, ironOptions);
