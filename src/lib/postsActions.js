import { getAuthSession } from "@/utils/authOptions";
import prisma from "@/utils/connectDb";

export const getAllPosts = async (page, cat) => {
  const POSTS_PER_PAGE = 3;

  const query = {
    orderBy: [{ views: "desc" }],
    take: POSTS_PER_PAGE,
    skip: POSTS_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return { posts, count, POSTS_PER_PAGE };
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Create A Post
export const POST = async (req, res) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Permited entry!" }, { status: 401 })
      );
    }
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });
    return new NextResponse(JSON.stringify(post, { status: 201 }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Failed" }, { status: 500 })
    );
  }
};
