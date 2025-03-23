import React from "react";
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

export default function AddFood({ open, setOpen }: Readonly<TAddFoodProps>) {
  const queryClient = useQueryClient();
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
    // TODO: handle error
  });
  async function onSubmit(data: TAddFoodData) {
    await mutateAsync(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>Add Cuisine</DialogTitle>
          <DialogDescription className="max-w-[350px] text-center">
            Add a new cuisine type.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4 max-h-[60dvh] overflow-y-auto">
            <BaseInput
              label="Name"
              placeholder="Enter Food Name"
              {...register("name")}
              error={errors.name?.message}
            />
            <BaseInput
              label="Price"
              placeholder="Enter Price"
              {...register("price")}
              error={errors.name?.message}
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
            <AttachmentInput
              setValue={setValue}
              name="images"
              label="Images"
              error={errors.images?.message ?? ""}
              multiple
              accept="image/*"
            />
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
