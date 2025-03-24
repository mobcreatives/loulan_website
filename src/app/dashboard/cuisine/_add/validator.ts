import { z } from "zod";

export const cuisineSchema = z.object({
  type: z.string().nonempty("Name is required"),
});
