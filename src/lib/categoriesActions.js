import prisma from "@/utils/connectDb";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addCategory = async (catObj) => {
  try {
    const newCat = await prisma.category.create({
      data: { ...catObj },
    });
    return newCat;
  } catch (error) {
    console.log(error);
    return error;
  }
};
