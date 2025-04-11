"use server";

import { PrismaClient } from "@prisma/client";
import { TAddFoodData } from "./_add/types";
import { foodSchema } from "./_add/validator";

const prisma = new PrismaClient();

export async function addFood(data: TAddFoodData) {
  const result = foodSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  try {
    // await prisma.food.create({
    //   data: {
    //     name: data.name,
    //     description: data.description,
    //     price: data.price,
    //     menuId: data.menu,
    //     // imgUrl: data.imageUrl!,
    //   },
    // });
  } catch {
    throw new Error("Fail to add food.");
  }
}

export async function getFood() {
  const food = await prisma.food.findMany();
  return food;
}
