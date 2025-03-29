"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Plus, Search } from "lucide-react";
import CategoryCard from "./_components/category-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMenuSchema, updateMenuSchema } from "./validator";
import {
  TAddMenuData,
  TMenuCategoryDetails,
  TUpdateMenuCategoryArgs,
  TUpdateMenuData,
} from "./types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { useAuthAxios } from "@/config/auth-axios";
import { toast } from "sonner";
import { API_ROUTES } from "@/config/routes";
import { TResponse } from "@/global/types";
export default function MenuCategories() {
  const { _axios } = useAuthAxios();
  // states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<TMenuCategoryDetails | null>(null);

  const {
    register: addRegister,
    handleSubmit: addHandleSubmit,
    setValue: addSetValue,
    reset: addReset,
  } = useForm<TAddMenuData>({
    resolver: zodResolver(addMenuSchema),
  });

  const {
    register: editRegister,
    handleSubmit: editHandleSubmit,
    setValue: editSetValue,
    reset: editReset,
    watch: editWatch,
  } = useForm<TUpdateMenuData>({
    resolver: zodResolver(updateMenuSchema),
  });
  const editActive = editWatch("isActive");
  const { mutateAsync: addMutateSync, isPending: addPending } = useMutation({
    mutationKey: KEYS.MENU_CATEGORIES.ADD,
    mutationFn: addMenuCategory,
    onSuccess: () => {
      refetch();
      toast.success("Menu category added successfully");
      setIsAddDialogOpen(false);
      addReset();
    },
    onError: () => {
      toast.error("Failed to add menu category");
    },
  });

  const { mutateAsync: editMutateSync, isPending: editPending } = useMutation({
    mutationKey: KEYS.MENU_CATEGORIES.UPDATE,
    mutationFn: (updateDate: TUpdateMenuCategoryArgs) =>
      editCategory(updateDate.id, updateDate.data),
    onSuccess: () => {
      refetch();
      toast.success("Menu category updated successfully");
      setIsEditDialogOpen(false);
      editReset();
    },
    onError: () => {
      toast.error("Failed to update menu category");
    },
  });

  const { mutateAsync: deleteMutateSync, isPending: deletePending } =
    useMutation({
      mutationKey: KEYS.MENU_CATEGORIES.DELETE,
      mutationFn: (id: number) => deleteCategory(id),
      onSuccess: () => {
        refetch();
        toast.success("Menu category deleted successfully");
        setIsDeleteDialogOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete menu category");
      },
    });

  const { data: menusCategories, refetch } = useQuery({
    queryKey: KEYS.MENU_CATEGORIES.GET,
    queryFn: getMenuCategories,
  });

  const filteredCategories =
    menusCategories?.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? menusCategories;

  async function addMenuCategory(data: TAddMenuData) {
    try {
      const response = await _axios.post(API_ROUTES.MENU_CATEGORIES, data);
      return response.data;
    } catch {
      throw new Error("Failed to add menu category");
    }
  }
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

  async function editCategory(id: number, data: TMenuCategoryDetails) {
    try {
      const response = await _axios.patch(
        `${API_ROUTES.MENU_CATEGORIES}/${id}`,
        data
      );
      return response.data;
    } catch {
      throw new Error("Failed to update menu category");
    }
  }

  async function deleteCategory(id: number) {
    try {
      const response = await _axios.delete(
        `${API_ROUTES.MENU_CATEGORIES}/${id}`
      );
      return response.data;
    } catch {
      throw new Error("Failed to delete menu category");
    }
  }

  function handleEdit(data: TMenuCategoryDetails) {
    setSelectedCategory(data);
    setIsEditDialogOpen(true);
  }

  function handleDelete(data: TMenuCategoryDetails) {
    setSelectedCategory(data);
    setIsDeleteDialogOpen(true);
  }

  async function addSubmit(data: TAddMenuData) {
    await addMutateSync(data);
  }

  async function editSubmit(data: TMenuCategoryDetails) {
    if (!selectedCategory) return;
    await editMutateSync({
      id: selectedCategory.id,
      data,
    });
  }

  function confirmDelete() {
    if (!selectedCategory) return;
    deleteMutateSync(selectedCategory.id);
  }

  useEffect(() => {
    if (selectedCategory) {
      editReset({
        name: selectedCategory.name,
        isActive: selectedCategory.isActive,
      });
    }
  }, [editReset, selectedCategory]);
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
        {filteredCategories?.map((category) => (
          <CategoryCard
            key={category.id}
            data={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
        {filteredCategories?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-4">No categories found</p>
            <button className="btn-gold">
              <Plus size={18} />
              Add Your First Category
            </button>
          </div>
        )}
      </div>
      {/* Add menu category starts here */}
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
                  defaultChecked={true}
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
      {/* Add menu category ends here */}

      {/* Edit menu category starts here */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <form onSubmit={editHandleSubmit(editSubmit)}>
            <DialogHeader className="px-0">
              <div className="flex items-center justify-between">
                <DialogTitle>Edit Menu Category</DialogTitle>
              </div>
              <DialogDescription>
                Edit the menu category details
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  {...editRegister("name")}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  name="isActive"
                  defaultChecked={editActive}
                  onCheckedChange={(isChecked) =>
                    editSetValue("isActive", isChecked)
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
                  disabled={editPending}
                >
                  {editPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {editPending ? "Saving..." : "Update Menu"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Edit menu category ends here */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>{`
              This will permanently delete the menu, ${selectedCategory?.name}. This action cannot be undone.
            `}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
              disabled={deletePending}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
