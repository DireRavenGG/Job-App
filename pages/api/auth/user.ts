import { withIronSessionApiRoute } from "iron-session/next/dist";
import { NextApiRequest, NextApiResponse } from "next";
import { ironOptions } from "../../../lib/config";

const userRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send({ user: req.session.account });
};

export default withIronSessionApiRoute(userRoute, ironOptions);
