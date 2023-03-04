import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOption } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOption);
    if (!session)
      return res.status(401).json({ message: "Please sign in to make posts" });
    console.log(req.body);
    const title: string = req.body.title;

    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    if (title.length > 300) {
      return res
        .status(403)
        .json({ message: "Please Write a shorter message" });
    }
    if (!title.length) {
      return res.status(403).json({ message: "please create a post " });
    }
    try {
      const result = await prisma.post.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(403).json({ err: "Error has occurred, Please try again!" });
    }
  }
}
