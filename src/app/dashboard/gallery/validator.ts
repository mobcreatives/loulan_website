import { z } from "zod";

export const addGallerySchema = z.object({
  image: z.array(z.instanceof(File)),
  description: z.string().nonempty(),
  isVisible: z.boolean().optional().default(true),
});

export const updateGallerySchema = z.object({
  image: z.array(z.instanceof(File)).optional(),
  description: z.string().optional(),
  isVisible: z.boolean().optional().default(true),
});
