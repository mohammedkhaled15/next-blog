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

export const getSinglePost = async (slug) => {
  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });
    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
};
