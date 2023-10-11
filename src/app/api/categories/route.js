import prisma from "@/utils/connectDb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories, { status: 200 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
export const POST = async (req) => {
  try {
    const body = await req.json();
    const newCat = await prisma.category.create({
      data: { ...body },
    });
    return new NextResponse(JSON.stringify(newCat, { status: 201 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }, { status: 500 })
    );
  }
};
