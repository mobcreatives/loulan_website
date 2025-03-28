import { z } from "zod";

export const reviewSchema = z.object({
  reviewerName: z.string().min(3).max(255),
  comment: z.string().min(3).max(255),
  stars: z.coerce.number().int().min(1).max(5),
  isFeatured: z.boolean().optional().default(false),
});

export const updateReviewSchema = z.object({
  reviewerName: z.string().min(3).max(255).optional(),
  comment: z.string().min(3).max(255).optional(),
  stars: z.coerce.number().int().min(1).max(5).optional(),
  isFeatured: z.boolean().optional(),
});
