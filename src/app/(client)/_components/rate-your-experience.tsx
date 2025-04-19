"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner"; 
import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "@/config/routes";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";


const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={filled ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z"
    />
  </svg>
);

export default function RateYourExperience() {
  const { _axios } = useAuthAxios();
  const [selectedRating, setSelectedRating] = useState<number>(0); 
  const [isRatingSelected, setIsRatingSelected] = useState<boolean>(false); 
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false); 
  const [comment, setComment] = useState<string>("");
  const [reviewerName, setreviewerName] = useState<string>(""); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); 

  // useMutation for submitting review
  const { mutateAsync: createReviewSync } = useMutation({
    mutationKey: KEYS.REVIEWS.ADD,
    mutationFn: async (data: { stars: number; comment: string; reviewerName: string }) => {
      try {
        const response = await _axios.post(API_ROUTES.REVIEW, data);
        return response.data;
      } catch (error) {
        console.error("Error submitting review:", error);
        throw new Error("There was a problem creating your review.");
      }
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      setIsPopupVisible(false);
      setSelectedRating(0); 
      setIsRatingSelected(false); 
      setComment(""); 
      setreviewerName(""); 
    },
    onError: () => {
      toast.error("Failed to submit your review.");
    },
  });

  const handleStarHover = (rating: number) => {

    if (!isRatingSelected) {
      setSelectedRating(rating); 
    }
  };

  const handleStarClick = (rating: number) => {
    // console.log("Star clicked:", rating);
    setSelectedRating(rating); 
    setIsRatingSelected(true); 
    // console.log("Updated selectedRating after click:", rating); 
    setIsPopupVisible(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setreviewerName(e.target.value);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); 
    setComment(""); 
    setreviewerName(""); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (!selectedRating || !comment.trim() || !reviewerName.trim()) {
      toast.error("Please provide a name, rating, and comment.");
      return;
    }

    setIsSubmitting(true);


    createReviewSync({
      stars: selectedRating,
      comment: comment,
      reviewerName: reviewerName,
    })
      .finally(() => {
        setIsSubmitting(false); // Reset loading state
      });
  };

  return (
    <div className="text-white bg-[#121A1D] flex flex-col gap-x-5 gap-y-2 items-center justify-center font-fredoka py-8">
      {/* Rating Stars Section */}
      <p className="text-[clamp(1.875rem,1.7825rem+0.3896vw,2.25rem)] font-bold text-center flex flex-col items-center justify-center leading-9">
        <span>Rate Your</span>
        <span>Experience</span>
      </p>

      <div className="flex items-center gap-x-2">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleStarClick(i + 1)} 
            onMouseEnter={() => handleStarHover(i + 1)} 
            onMouseLeave={() => handleStarHover(0)} 
            className={`cursor-pointer ${
              selectedRating >= i + 1 ? "text-amber-500" : "text-white"
            }`}
          >
            <StarIcon filled={selectedRating >= i + 1} />
          </button>
        ))}
      </div>

      {/* Popup for Comment Input (Visible after selecting a rating) */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#0a1316] w-[400px] p-6 rounded-lg relative">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-white text-xl"
            >
              X
            </button>

            <h2 className="font-black text-white text-xl mb-6 font-['Poppins',Helvetica]">
              Leave a Comment
            </h2>

            {/* Name Input */}
            <input
              type="text"
              value={reviewerName}
              onChange={handleNameChange}
              placeholder="Your name"
              className="w-full h-[40px] bg-neutral-100 text-black rounded-[5px] border border-solid border-white p-3 text-sm mb-4"
            />

            {/* Comment Input */}
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your feedback..."
              className="w-full h-[81px] bg-neutral-100 text-black rounded-[5px] border border-solid border-white resize-none p-3 text-sm"
            />

            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className={`w-[97px] h-[31px] bg-white text-black hover:bg-white/90 rounded-[5px] ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
