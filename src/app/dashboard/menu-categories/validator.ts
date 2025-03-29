import { z } from "zod";

export const addMenuSchema = z.object({
  name: z.string().min(3).max(255),
  isActive: z.boolean().optional().default(false),
});

export const updateMenuSchema = z.object({
  name: z.string().min(3).max(255),
  isActive: z.boolean().optional().default(false),
});
