import { z } from "zod";

export const addGallerySchema = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  description: z.string().optional(),
  isVisible: z.boolean().optional().default(true),
});

export const updateGallerySchema = z.object({
  image: z.array(z.instanceof(File)).optional(),
  description: z.string().optional(),
  isVisible: z.boolean().optional().default(true),
});
