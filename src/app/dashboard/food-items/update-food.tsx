"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BaseInput,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  SelectField,
  Switch,
} from "@/components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { updateFoodSchema } from "./validator";
import BaseTextarea from "@/components/inputs/base-textarea";
import { useAuthAxios } from "@/config/auth-axios";
import { toast } from "sonner";
import AttachmentInput from "@/components/inputs/attachments-input";
import { TUpdateFoodArgs, TUpdateFoodData, TUpdateFoodProps } from "./types";
import { TResponse } from "@/global/types";
import { TMenuCategoryDetails } from "../menu-categories/types";
import { API_ROUTES } from "@/config/routes";
import { mapData } from "@/lib/utils";

export default function UpdateFood({
  open,
  setOpen,
  refetch,
  data,
}: Readonly<TUpdateFoodProps>) {
  const { _axios } = useAuthAxios();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<TUpdateFoodData>({
    resolver: zodResolver(updateFoodSchema),
  });

  const featured = watch("isFeatured");

  const { data: menus } = useQuery({
    queryKey: KEYS.MENU.GET,
    queryFn: getMenuCategories,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: KEYS.CUISINE.UPDATE,
    mutationFn: (updateData: TUpdateFoodArgs) =>
      updateFood(updateData.id, updateData.data),
    onSuccess: async () => {
      await refetch();
      toast("Food updated successfully");
      setOpen(false);
    },
    onError: () => {
      toast("Failed to update cuisine. Please try again.");
    },
  });
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

  async function updateFood(id: number, data: TUpdateFoodData) {
    let updateData = {};
    if (data.imageUrl) {
      updateData = {
        ...data,
        imageUrl: data.imageUrl[0],
      };
    }
    try {
      const response = await _axios.patch(
        `${API_ROUTES.FOODS}/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch {
      throw new Error("Failed to update food");
    }
  }

  async function onSubmit(updateData: TUpdateFoodData) {
    await mutateAsync({
      id: data.id,
      data: updateData,
    });
  }

  useEffect(() => {
    reset({
      name: data.name,
      price: data.price,
      menuId: data.menuId,
      description: data.description,
      isFeatured: data.isFeatured,
    });
  }, [reset, data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>Add Cuisine</DialogTitle>
          <DialogDescription className="max-w-[350px] text-center">
            Add a new cuisine type.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4 max-h-[60dvh] overflow-y-auto px-2">
            <BaseInput
              label="Name"
              placeholder="Enter Food Name"
              {...register("name")}
              error={errors.name?.message}
            />
            <BaseInput
              type="number"
              label="Price"
              placeholder="Enter Price"
              {...register("price")}
              error={errors.price?.message} // Fixed to use price error
            />
            <SelectField
              data={mapData(menus ?? [])}
              setValue={setValue}
              name="menuId"
              label="Menu"
              placeholder="Select Menu"
              error={errors.menuId?.message ?? ""}
              allowSearch
              searchPlaceholder="Search Menu"
              emptyDataMessage="No menu found"
              modal
            />
            <BaseTextarea
              label="Description"
              error={errors.description?.message ?? ""}
              placeholder="Enter Description"
              rows={8}
              {...register("description")}
            />
            <AttachmentInput
              label="Image"
              setValue={setValue}
              name="imageUrl"
              error={errors.imageUrl?.message ?? ""}
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="isFeatured"
                name="isFeatured"
                defaultChecked={featured}
                onCheckedChange={(isChecked) =>
                  setValue("isFeatured", isChecked)
                }
              />
              <Label htmlFor="isFeatured">Feature this food</Label>
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="text-[#2e2e2e] cursor-pointer px-5 py-2 bg-primary rounded-[8px] mt-1"
              disabled={isPending}
            >
              Add
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
