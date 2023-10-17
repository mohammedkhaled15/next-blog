import prisma from "@/utils/connectDb";

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    // .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$]+/g, "")
    .replaceAll("%20", " ");

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
  const sluged = slugify(slug);
  console.log("sluged=>", sluged);
  try {
    const post = await prisma.post.update({
      where: { slug: sluged },
      data: { views: { increment: 1 } },
      include: { user: true },
    });
    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
};
