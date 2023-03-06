import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOption } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOption);
    if (!session) return res.status(401).json({ message: "Please sign in" });

    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email,
        },
        include: {
          Post: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              Comment: true,
            },
          },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json({ err: "Error has occurred, Please try again!" });
    }
  }
}
