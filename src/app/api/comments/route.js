import { getAuthSession } from "@/utils/authOptions";
import prisma from "@/utils/connectDb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");
  try {
    const comments = await prisma.comment.findMany({
      where: { ...(postSlug && { postSlug }) },
      include: { user: true },
    });
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Failed" }, { status: 500 })
    );
  }
};

export const POST = async (req, res) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Permited entry!" }, { status: 401 })
      );
    }
    const body = await req.json();
    const newComment = await prisma.comment.create({
      data: { ...body, userEmail: session.user.email },
    });
    return new NextResponse(JSON.stringify(newComment, { status: 201 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Failed" }, { status: 500 })
    );
  }
};
