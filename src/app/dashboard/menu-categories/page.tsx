"use client";

import React, { useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import CategoryCard from "./_components/category-card";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  PageTitle,
  Switch,
} from "@/components";
import { initialCategories } from "./data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMenuSchema } from "./validator";
import { TAddMenuData } from "./types";
import { useMutation } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { useAuthAxios } from "@/config/auth-axios";
import { toast } from "sonner";
import { API_ROUTES } from "@/config/routes";
// Mock data
export default function MenuCategories() {
  const { _axios } = useAuthAxios();
  // states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    setValue: addSetValue,
  } = useForm<TAddMenuData>({
    resolver: zodResolver(addMenuSchema),
  });

  const { mutateAsync: addMutateSync, isPending: addPending } = useMutation({
    mutationKey: KEYS.MENU_CATEGORIES.ADD,
    mutationFn: addMenuCategory,
    onSuccess: () => {
      toast.success("Menu category added successfully");
      setIsAddDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to add menu category");
    },
  });

  async function addMenuCategory(data: TAddMenuData) {
    try {
      const response = await _axios.post(API_ROUTES.MENU_CATEGORIES, data);
      return response.data;
    } catch {
      throw new Error("Failed to add menu category");
    }
  }

  const handleEdit = (id: string) => {
    console.log("Edit category:", id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };
  async function addSubmit(data: TAddMenuData) {
    await addMutateSync(data);
  }
  return (
    <div>
      <PageTitle
        title="Menu Categories"
        description="Manage your restaurant's menu categories"
        actions={
          <button
            className="btn-gold cursor-pointer text-black"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus size={18} />
            Add Category
          </button>
        }
      />
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 gold-focus-ring"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            itemCount={category.itemCount}
            isActive={category.isActive}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {filteredCategories.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No categories found</p>
            <button className="btn-gold">
              <Plus size={18} />
              Add Your First Category
            </button>
          </div>
        )}
      </div>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={addHandleSubmit(addSubmit)}>
            <DialogHeader className="px-0">
              <div className="flex items-center justify-between">
                <DialogTitle>Add New Menu Category</DialogTitle>
              </div>
              <DialogDescription>
                Add a new menu category to your collection
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  {...addRegister("name")}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  name="isActive"
                  onCheckedChange={(isChecked) =>
                    addSetValue("isActive", isChecked)
                  }
                />
                <Label htmlFor="isActive">Make menu active</Label>
              </div>
            </div>
            <DialogFooter className="px-0 border-t pt-4">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-gold"
                  disabled={addPending}
                >
                  {addPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {addPending ? "Saving..." : "Add Menu"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
