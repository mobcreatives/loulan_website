"use client";
import { _axios } from "@/config/axios";
import { KEYS } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Add type for paginated gallery response
interface GalleryPaginatedResponse {
  galleries: Array<{
    id: number;
    imgUrl: string;
    description: string | null;
    isVisible: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  };
}

export default function MasonryGallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading } = useQuery<GalleryPaginatedResponse>({
    queryKey: [KEYS.GALLERY.GET, currentPage],
    queryFn: () => getAllGalleries(currentPage, itemsPerPage),
    placeholderData: (prev) => prev,
  });

  async function getAllGalleries(page = 1, limit = 10): Promise<GalleryPaginatedResponse> {
    try {
      const response = await _axios.get(`${API_ROUTES.GALLERY}?visible=true&page=${page}&limit=${limit}`);
      return response.data;
    } catch {
      throw new Error("Failed to load gallery");
    }
  }

  const galleries = data?.galleries || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return (
    <div className="min-h-[200px] flex items-center justify-center">
      <p className="text-gray-500">Loading gallery...</p>
    </div>
  );

  return (
    <div className="min-h-screen p-4 mt-5">
      {/* Gallery images grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        <PhotoProvider>
          {galleries.map((gallery, index) => (
            <div
              key={gallery.id}
              className="break-inside-avoid mb-4 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative w-full aspect-auto">
                <PhotoView key={gallery.id} src={gallery.imgUrl}>
                  <Image
                    src={gallery.imgUrl}
                    alt={gallery.description || "Gallery image"}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    priority={index < 6}
                  />
                </PhotoView>
              </div>
            </div>
          ))}
        </PhotoProvider>
      </div>

      {/* Pagination (always show) */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(Math.max(1, pagination.page - 1))}
          disabled={pagination.page === 1}
          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={pagination.page === page ? "default" : "outline"}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 ${
              pagination.page === page 
                ? "bg-primary text-white" 
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.page + 1))}
          disabled={pagination.page === pagination.totalPages}
          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
