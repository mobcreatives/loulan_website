import { z } from "zod";

export const foodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  menuId: z.number().min(1, "Price is required"),
  imageUrl: z.array(z.instanceof(File)).optional(),
  isFeatured: z.boolean().optional().default(false),
});

export const updateFoodSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.coerce.number().min(1, "Price is required").optional(),
  menuId: z.number().min(1, "Price is required").optional(),
  imgUrl: z.array(z.instanceof(File)).optional().optional(),
  isFeatured: z.boolean().optional().default(false).optional(),
});
