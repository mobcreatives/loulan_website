"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TAddMenuData, TAddMenuProps } from "./types";
import { addMenuDataSchema } from "./validator";
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
import { addMenu } from "../helper";
import { KEYS } from "@/config/constants";
import { mapData } from "@/lib/utils";
import { getCuisines } from "../../cuisine/helper";
export default function AddMenu({ open, setOpen }: Readonly<TAddMenuProps>) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TAddMenuData>({
    resolver: zodResolver(addMenuDataSchema),
  });
  const { data: cuisine } = useQuery({
    queryFn: getCuisines,
    queryKey: KEYS.CUISINE.GET,
  });
  const { mutateAsync } = useMutation({
    mutationKey: KEYS.MENU.ADD,
    mutationFn: addMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.MENU.GET,
      });
      setOpen(false);
    },
    // TODO: handle error
  });

  async function onSubmit(data: TAddMenuData) {
    await mutateAsync(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>Add Menu</DialogTitle>
          <DialogDescription>Add a New Menu.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <BaseInput
            label="type"
            placeholder="Enter Cuisine Type"
            {...register("name")}
            error={errors.name?.message}
          />
          <SelectField
            data={mapData(
              cuisine?.map((item) => ({
                name: item.type,
                id: item.id,
              })) ?? []
            )}
            setValue={setValue}
            name="cuisine"
            label="Cuisine Type"
            placeholder="Select Cuisine Type"
            error={errors.cuisine?.message ?? ""}
            allowSearch
            searchPlaceholder="Search Cuisine Type"
            emptyDataMessage="No user cuisine type found"
            modal
          />
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
