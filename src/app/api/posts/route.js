import prisma from "@/utils/connectDb";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");

  const POSTS_PER_PAGE = 2;

  console.log(searchParams);

  try {
    const posts = await prisma.post.findMany({
      take: POSTS_PER_PAGE,
      skip: 1,
    });
    return new NextResponse(JSON.stringify(posts, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
