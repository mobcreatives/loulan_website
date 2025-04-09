"use client";
import { _axios } from "@/config/axios";
import { KEYS } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";

export default function MasonryGallery() {
  const { data: galleries } = useQuery({
    queryFn: getAllGalleries,
    queryKey: KEYS.GALLERY.GET,
  });

  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);

  async function getAllGalleries() {
    try {
      const response = await _axios.get(API_ROUTES.GALLERY);
      return response.data;
    } catch {
      throw new Error("Failed to load gallery");
    }
  }

  // Open the image in the modal
  const openImageExpansion = (index: number) => {
    setExpandedImageIndex(index);
  };

  // Close the image modal
  const closeImageExpansion = () => {
    setExpandedImageIndex(null);
  };

  // Navigation controls (previous, next)
  const nextImage = () => {
    if (expandedImageIndex !== null && expandedImageIndex < galleries?.galleries.length - 1) {
      setExpandedImageIndex(expandedImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (expandedImageIndex !== null && expandedImageIndex > 0) {
      setExpandedImageIndex(expandedImageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen p-4 mt-5">
      {/* Gallery images grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleries?.galleries.map((gallery, index) => (
          <div
            key={gallery.id}
            className="break-inside-avoid mb-4 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => openImageExpansion(index)} // Open modal on click
          >
            <div className="relative w-full aspect-auto">
              <Image
                src={gallery.imgUrl}
                alt={gallery.description}
                width={500}
                height={500}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                priority={index < 6}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Expanded Image */}
      {expandedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md"
          onClick={closeImageExpansion} // Close modal on clicking outside
        >
          <div
            className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-transparent p-4 rounded-lg shadow-xl max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Image */}
            <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] flex justify-center items-center">
              <Image
                src={galleries?.galleries[expandedImageIndex].imgUrl || ""}
                alt="Expanded view"
                width={1000}
                height={1000}
                className="w-full h-full object-contain cursor-pointer transition-transform duration-500"
              />
            </div>

            {/* Image Description */}
            <p className="mt-4 text-center text-white font-semibold">
              {galleries?.galleries[expandedImageIndex].description}
            </p>

            {/* Navigation controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex gap-4">
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="text-white bg-black opacity-50 hover:opacity-100 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-4">
              {/* Next Button */}
              <button
                onClick={nextImage}
                className="text-white bg-black opacity-50 hover:opacity-100 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={closeImageExpansion}
              className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
