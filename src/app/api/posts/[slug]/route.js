import prisma from "@/utils/connectDb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;
  console.log(slug);
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    console.log(post);
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
