import { z } from "zod";

export const addMenuDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cuisine: z.number().min(1, "Price is required"),
});
