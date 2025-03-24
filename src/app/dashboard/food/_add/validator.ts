import { z } from "zod";

export const foodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  menu: z.number().min(1, "Price is required"),
  imageUrl: z.string().optional(),
  isFeatured: z.boolean().optional().default(false),
});
