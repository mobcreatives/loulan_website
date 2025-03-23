"use server";

import { PrismaClient } from "@prisma/client";
import { TAddMenuData } from "./_add/types";
import { addMenuDataSchema } from "./_add/validator";

const prisma = new PrismaClient();

export async function addMenu(data: TAddMenuData) {
  console.log("💀 -> addMenu -> data <3", data);
  const result = addMenuDataSchema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  try {
    const menu = await prisma.menu.create({
      data: {
        name: data.name,
        cuisineId: data.cuisine,
      },
    });
    return menu;
  } catch (error) {
    console.log(error);
  }
}

export async function getMenu() {
  const menus = await prisma.menu.findMany();
  console.log("💀 -> getMenu -> menus <3", menus);
  return menus;
}
