"use client";

import { TReviewDetails } from "@/app/dashboard/reviews/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { TResponse } from "@/global/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React from "react";

export default function FloatingReview() {
  const { _axios } = useAuthAxios();
  const { data: reviews } = useQuery({
    queryKey: KEYS.REVIEWS.GET,
    queryFn: getPreviews,
  });
  async function getPreviews() {
    try {
      const response = await _axios.get<TResponse<TReviewDetails, "data">>(
        `${API_ROUTES.REVIEW}?isFeatured`
      );
      return response.data.data;
    } catch (error) {
      throw new Error("There was a problem getting your review. Please");
    }
  }
  return (
    <section className="fixed right-3 bottom-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-primary rounded-full size-16 cursor-pointer font-semibold text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)]">
            Reviews
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-90 bg-[#0A1316] border-[#0A1316]">
          <div className="max-h-[20em] overflow-y-auto text-white">
            <div className="space-y-2">
              <h4 className="font-medium leading-none mb-5">Reviews</h4>
              {reviews?.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg bg-[#1e2629] px-4 shadow-sm py-2"
                >
                  <div className="space-x-2">
                    <div className="flex items-end gap-x-2">
                      <p className="text-sm font-medium capitalize text-nowrap">
                        {review.reviewerName}
                      </p>
                      <p className="text-xs text-muted-foreground text-nowrap">
                        {format(review.createdAt, "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                  <p>
                    {Array.from({ length: review.stars }, (_, i: number) => (
                      <span key={`${i}stars`}>⭐</span>
                    ))}
                  </p>
                  <p className="mt-2 text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)]">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
}
