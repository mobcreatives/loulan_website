"use client";

import { Card } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useAuthAxios } from "@/config/auth-axios";
import { API_ROUTES } from "@/config/routes";
import { KEYS } from "@/config/constants";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  menuId: number;
  availability: boolean;
  isFeatured: boolean;
  menu: {
    id: number;
    name: string;
    isActive: boolean;
  };
}

interface FoodResponse {
  foodItems: FoodItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface FoodListProps {
  categoryId?: number;
}

export default function FoodList({ categoryId }: FoodListProps) {
  const { _axios } = useAuthAxios();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page when search query changes
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: response, isLoading } = useQuery<FoodResponse>({
    queryKey: [...KEYS.FOOD.GET, categoryId, currentPage, debouncedSearchQuery],
    queryFn: async () => {
      try {
        const url = categoryId
          ? `${API_ROUTES.FOODS}?menuId=${categoryId}&page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearchQuery}`
          : `${API_ROUTES.FOODS}?page=${currentPage}&limit=${itemsPerPage}&search=${debouncedSearchQuery}`;
        console.log("Fetching from URL:", url);
        const response = await _axios.get<FoodResponse>(url);
        console.log("API Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching foods:", error);
        throw new Error("Failed to fetch foods");
      }
    },
  });

  const foods = response?.foodItems || [];
  const totalPages = response?.pagination?.totalPages || 1;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative max-w-md w-full">
          <Input
            type="text"
            placeholder="Search food items..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-[#121A1D] text-white border-primary pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary"
            size={20}
          />
        </div>
      </div>

      {foods.length === 0 ? (
        <div className="text-center text-white py-8">
          <p>No food items available for this category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <Card key={food.id} className="p-4 bg-[#121A1D] text-white">
                <div className="relative h-48 mb-4">
                  <Image
                    src={food.imgUrl || "/placeholder-food.jpg"}
                    alt={food.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                {/* <h3 className="text-lg font-semibold mb-2 text-white">
                  {food.name}
                </h3> */}
                <p className="text-sm text-gray-400 mb-4">{food.description}</p>
                <div className="flex justify-between items-center">
                  {/* <span className="text-primary font-semibold">
                    NRS {food.price}
                  </span> */}
                </div>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-[#121A1D] text-white border-primary hover:bg-primary hover:text-[#121A1D]"
              >
                Previous
              </Button>
              <span className="flex items-center text-white">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-[#121A1D] text-white border-primary hover:bg-primary hover:text-[#121A1D]"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
