import { z } from "zod";

export const addMenuDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  images: z.array(z.instanceof(File)).optional(),
  price: z.number().min(1, "Price is required"),
  type: z.enum(["korean", "chinese"]),
  description: z.string().optional(),
});
