"use server";

import { PrismaClient } from "@prisma/client";
import { TAddMenuData } from "./_add/types";
import { addMenuDataSchema } from "./_add/validator";

const prisma = new PrismaClient();

export async function addMenu(data: TAddMenuData) {
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
  } catch {
    throw new Error("Failed to add menu");
  }
}

export async function getMenu() {
  const menus = await prisma.menu.findMany();
  return menus;
}
