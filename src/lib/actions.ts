"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";

// --------- CUISINE TYPE ACTIONS ---------
export async function getCuisinType() {
  try {
    const cuisines = await db.cuisineType.findMany();
    return { cuisines };
  } catch {
    return { success: false, error: "Failed to get cuisine type" };
  }
}
export async function createCuisineType(formData: FormData) {
  const type = formData.get("type") as string;

  try {
    await db.cuisineType.create({
      data: { type },
    });
    revalidatePath("/admin/cuisines");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create cuisine type" };
  }
}

export async function updateCuisineType(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const type = formData.get("type") as string;

  try {
    await db.cuisineType.update({
      where: { id },
      data: { type },
    });
    revalidatePath("/admin/cuisines");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update cuisine type" };
  }
}

export async function deleteCuisineType(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  try {
    await db.cuisineType.delete({
      where: { id },
    });
    revalidatePath("/admin/cuisines");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete cuisine type" };
  }
}

// --------- MENU ACTIONS ---------

export async function createMenu(formData: FormData) {
  const name = formData.get("name") as string;
  const cuisineId = parseInt(formData.get("cuisineId") as string);

  try {
    await db.menu.create({
      data: {
        name,
        cuisineId,
      },
    });
    revalidatePath("/admin/menus");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to create menu" };
  }
}

export async function updateMenu(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const cuisineId = parseInt(formData.get("cuisineId") as string);

  try {
    await db.menu.update({
      where: { id },
      data: {
        name,
        cuisineId,
      },
    });
    revalidatePath("/admin/menus");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update menu" };
  }
}

export async function deleteMenu(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  try {
    await db.menu.delete({
      where: { id },
    });
    revalidatePath("/admin/menus");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete menu" };
  }
}

// --------- Blog ACTIONS ---------
export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;

  try {
    await db.blog.create({
      data: {
        title,
        content,
        author,
      },
    });
  } catch {
    return { success: false, error: "Error creating blog" };
  }
}
