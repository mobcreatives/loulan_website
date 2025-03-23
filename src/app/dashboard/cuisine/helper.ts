"use server";

import { PrismaClient } from "@prisma/client";
import { TAddCuisineData } from "./types";
import { cuisineSchema } from "./_add/validator";
const prisma = new PrismaClient();

export async function addCuisine(data: TAddCuisineData) {
  const validate = cuisineSchema.safeParse(data);
  if (!validate.success) {
    throw new Error("Invalid data");
  }
  try {
    const cuisine = await prisma.cuisineType.create({
      data: {
        type: data.type,
      },
    });
    return cuisine;
  } catch {
    throw new Error("Failed to create cuisine");
  }
}

export async function getCuisines() {
  const cuisines = await prisma.cuisineType.findMany();
  return cuisines;
}
