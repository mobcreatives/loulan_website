"use client";
import React, { useState } from "react";
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
  SelectField,
} from "@/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { TAddFoodData, TAddFoodProps } from "./types";
import { foodSchema } from "./validator";
import { addFood } from "../helper";
import { getMenu } from "../../menu/helper";
import { mapData } from "@/lib/utils";
import BaseTextarea from "@/components/inputs/base-textarea";
import AttachmentInput from "@/components/inputs/attachments-input";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

export default function AddFood({ open, setOpen }: Readonly<TAddFoodProps>) {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<TAddFoodData>({
    resolver: zodResolver(foodSchema),
  });

  const { data: menus } = useQuery({
    queryKey: KEYS.MENU.GET,
    queryFn: getMenu,
  });

  const { mutateAsync } = useMutation({
    mutationKey: KEYS.CUISINE.ADD,
    mutationFn: addFood,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.CUISINE.GET,
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error adding food:", error);
      alert("Failed to add cuisine. Please try again.");
    },
  });

  async function onSubmit(data: TAddFoodData) {
    const formData = {
      ...data, // Include all the form data
      imageUrl, // Include the image URL
    };
    console.log("formdata", formData);
    await mutateAsync(formData);
  }

  // Function to map menu data (adjust as per your data structure)
  const mapData = (menus: any[]) =>
    menus.map((menu) => ({ value: menu.id, label: menu.name }));

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
              name="menu"
              label="Menu"
              placeholder="Select Menu"
              error={errors.menu?.message ?? ""}
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
            {/* UploadThing Dropzone with Preview */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Images
              </label>
              <UploadButton
                endpoint="foodImage"
                className="bg-black"
                onClientUploadComplete={(res) => {
                  console.log("Upload response:", res); // Log the entire response
                  const uploadedImageUrl = res[0]?.url; // Adjust based on the response structure
                  if (uploadedImageUrl) {
                    console.log("uploaded image url", res);
                    setImageUrl(uploadedImageUrl);
                  }
                  // Do something with the response
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="text-[#2e2e2e] cursor-pointer px-5 py-2 bg-primary rounded-[8px] mt-1"
            >
              Add
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
