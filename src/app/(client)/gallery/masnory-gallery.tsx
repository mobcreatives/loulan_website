"use client";
import { _axios } from "@/config/axios";
import { KEYS } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function MasonryGallery() {
  const { data: galleries } = useQuery({
    queryFn: getAllGalleries,
    queryKey: KEYS.GALLERY.GET,
  });

  async function getAllGalleries() {
    try {
      const response = await _axios.get(API_ROUTES.GALLERY);
      return response.data;
    } catch {
      throw new Error("Failed to load gallery");
    }
  }

  return (
    <div className="min-h-screen p-4 mt-5">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleries?.galleries.map((gallery, index) => (
          <div
            key={gallery.id}
            className="break-inside-avoid mb-4 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
    </div>
  );
}
