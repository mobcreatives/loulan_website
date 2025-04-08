"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  PageTitle,
} from "@/components";
import FoodItemCard from "./_components/food-item-card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthAxios } from "@/config/auth-axios";
import { API_ROUTES } from "@/config/routes";
import { KEYS } from "@/config/constants";
import AddFood from "./add-food";
import { TResponse } from "@/global/types";
import { TFoodDetails } from "./types";
import UpdateFood from "./update-food";
import { toast } from "sonner";
import { TMenuCategoryDetails } from "../menu-categories/types";

export default function FoodItems() {
  const { _axios } = useAuthAxios();
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<TFoodDetails | null>(null);

  const { mutateAsync: deleteMutateSync, isPending: deletePending } =
    useMutation({
      mutationKey: KEYS.FOOD.DELETE,
      mutationFn: deleteFood,
      onSuccess: async () => {
        await refetch();
        toast("Food item deleted successfully");
        setOpenDeleteDialog(false);
      },
      onError: () => {
        toast("Failed to delete food item. Please try again.");
      },
    });
  const { data: foods, refetch } = useQuery({
    queryKey: KEYS.FOOD.GET,
    queryFn: getFoods,
  });
  // tanstack/react-query
  const { data: menus } = useQuery({
    queryKey: KEYS.MENU_CATEGORIES.GET,
    queryFn: getMenuCategories,
  });
  console.log("💀 -> FoodItems -> menus <3", menus);
  // handlers
  async function getMenuCategories() {
    try {
      const response = await _axios.get<
        TResponse<TMenuCategoryDetails, "menus">
      >(API_ROUTES.MENU_CATEGORIES);
      return response.data.menus;
    } catch {
      throw new Error("Failed to fetch menu categories");
    }
  }
  const { mutateAsync: toggleFeaturedMutateSync } = useMutation({
    mutationKey: KEYS.FOOD.TOGGLE_FEATURED,
    mutationFn: toggleFeatured,
    onSuccess: async () => {
      await refetch();
      toast("Food item updated successfully");
    },
    onError: () => {
      toast("Failed to update food item. Please try again.");
    },
  });

  async function getFoods() {
    try {
      const response = await _axios.get<TResponse<TFoodDetails, "foodItems">>(
        API_ROUTES.FOODS
      );
      return response.data.foodItems;
    } catch {
      throw new Error("Failed to fetch food items");
    }
  }

  async function deleteFood(id: number) {
    try {
      return await _axios.delete(`${API_ROUTES.FOODS}/${id}`);
    } catch {
      throw new Error("Failed to delete food item");
    }
  }
  async function toggleFeatured(id: number) {
    try {
      return await _axios.patch(`${API_ROUTES.FOODS}/${id}/featured`);
    } catch {
      throw new Error("Failed to toggle featured");
    }
  }
  function handleEdit(data: TFoodDetails) {
    setSelectedFood(data);
    setOpenEditDialog(true);
  }

  function handleDelete(data: TFoodDetails) {
    setSelectedFood(data);
    setOpenDeleteDialog(true);
  }

  const handleToggleFeatured = (data: TFoodDetails) => {
    toggleFeaturedMutateSync(data.id);
  };

  function confirmDelete() {
    if (selectedFood) {
      deleteMutateSync(selectedFood.id);
    }
  }
  return (
    <div>
      <PageTitle
        title="Food Items"
        description="Manage your restaurant's menu items"
        actions={
          <button
            className="btn-gold cursor-pointer text-black"
            onClick={() => setOpenAddDialog(true)}
          >
            <Plus size={18} />
            Add Food Item
          </button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 gold-focus-ring"
            placeholder="Search food items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* <div className="flex gap-2">
          <select
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 gold-focus-ring"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            className={`px-4 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors ${
              showFeaturedOnly
                ? "bg-gold-DEFAULT text-black"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
          >
            <Filter size={16} />
            Featured Only
          </button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods?.map((item) => (
          <FoodItemCard
            key={item.id}
            data={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFeatured={handleToggleFeatured}
          />
        ))}

        {foods?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No food items found</p>
            <button className="btn-gold">
              <Plus size={18} />
              Add Your First Food Item
            </button>
          </div>
        )}
      </div>
      <AddFood
        open={openAddDialog}
        setOpen={setOpenAddDialog}
        refetch={refetch}
      />
      {openEditDialog && (
        <UpdateFood
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          refetch={refetch}
          data={selectedFood}
        />
      )}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image from the gallery? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deletePending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
