import { z } from "zod";
import { reviewSchema, updateReviewSchema } from "./validator";

export type TAddReviewData = z.infer<typeof reviewSchema>;
export type TUpdateReviewData = z.infer<typeof updateReviewSchema>;

export type TUpdateReviewArgs = {
  id: number;
  data: Partial<TUpdateReviewData>;
};

export interface TReviewDetails {
  id: number;
  stars: number;
  comment: string;
  reviewerName: string;
  isFeatured: boolean;
  createdAt: string;
}
