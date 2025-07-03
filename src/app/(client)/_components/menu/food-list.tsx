"use client";

import { Card } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useAuthAxios } from "@/config/auth-axios";
import { API_ROUTES } from "@/config/routes";
import { KEYS } from "@/config/constants";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useAuth } from "@/context/auth-context";
import UpdateFood from "@/app/dashboard/food-items/update-food";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { TFoodDetails } from "@/app/dashboard/food-items/types";

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

// Helper to map FoodItem to TFoodDetails
function mapFoodItemToTFoodDetails(food: FoodItem): TFoodDetails {
  return {
    ...food,
    createdAt: '',
    updatedAt: '',
    menu: {
      id: food.menu.id,
      name: food.menu.name,
      description: '',
      price: 0,
      images: [],
      type: 'chinese',
    },
  };
}

export default function FoodList({ categoryId }: FoodListProps) {
  const { _axios } = useAuthAxios();
  const { isAdmin } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery] = useState("");
  const itemsPerPage = 9;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState<TFoodDetails | null>(null);
  const { data: response, isLoading: queryLoading, refetch } = useQuery<FoodResponse>({
    queryKey: [...KEYS.FOOD.GET, categoryId, currentPage, searchQuery],
    queryFn: async () => {
      try {
        let url = categoryId
          ? `${API_ROUTES.FOODS}?menuId=${categoryId}&page=${currentPage}&limit=${itemsPerPage}`
          : `${API_ROUTES.FOODS}?page=${currentPage}&limit=${itemsPerPage}`;
        const trimmedSearch = searchQuery.trim();
        if (trimmedSearch) {
          url += `&search=${encodeURIComponent(trimmedSearch)}`;
        }
        const response = await _axios.get<FoodResponse>(url);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch foods");
      }
    },
  });

  const foods = response?.foodItems || [];
  const totalPages = response?.pagination?.totalPages || 1;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  async function handleDeleteFood() {
    if (!selectedFood) return;
    try {
      await _axios.delete(`${API_ROUTES.FOODS}/${selectedFood.id}`);
      toast.success("Food item deleted successfully");
      setDeleteOpen(false);
      setSelectedFood(null);
      refetch();
    } catch {
      toast.error("Failed to delete food item");
    }
  }

  if (queryLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        {/* <div className="relative max-w-md w-full">
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
        </div> */}
      </div>

      {foods.length === 0 ? (
        <div className="text-center text-white py-8">
          <p>No food items available for this category.</p>
        </div>
      ) : (
        <>
          <PhotoProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <Card key={food.id} className="p-4 bg-[#121A1D] text-white">
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    <PhotoView src={food.imgUrl || "/placeholder-food.jpg"}>
                      <Image
                        src={food.imgUrl || "/placeholder-food.jpg"}
                        alt={food.name}
                        fill
                        className="object-cover rounded-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
                      />
                    </PhotoView>
                  </div>
                  <div className="text-sm text-gray-400 mb-4 space-y-1">
                    {food.description.split('\n').map((line, index) => (
                      <p key={index} className="line-clamp-1">{line}</p>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    {/* <span className="text-primary font-semibold">
                      NRS {food.price}
                    </span> */}
                    {isAdmin && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedFood(mapFoodItemToTFoodDetails(food)); setEditOpen(true); }}>Edit</Button>
                        <Button size="sm" variant="destructive" onClick={() => { setSelectedFood(mapFoodItemToTFoodDetails(food)); setDeleteOpen(true); }}>Delete</Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </PhotoProvider>

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
          {/* Edit Dialog */}
          {isAdmin && selectedFood && (
            <UpdateFood
              open={editOpen}
              setOpen={setEditOpen}
              refetch={refetch as any}
              data={selectedFood}
            />
          )}
          {/* Delete Dialog */}
          {isAdmin && (
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Food Item</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this food item? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteFood} className="bg-red-500 hover:bg-red-600 text-white">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </>
      )}
    </div>
  );
}
