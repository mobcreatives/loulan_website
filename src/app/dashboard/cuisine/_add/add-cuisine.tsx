import React from "react";
import { useForm } from "react-hook-form";
import { TAddCuisineData, TAddCuisineProps } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { cuisineSchema } from "./validator";
import { addCuisine } from "../helper";
import {
  BaseInput,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";

export default function AddCuisine({
  open,
  setOpen,
}: Readonly<TAddCuisineProps>) {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TAddCuisineData>({
    resolver: zodResolver(cuisineSchema),
  });
  const { mutateAsync } = useMutation({
    mutationKey: KEYS.CUISINE.ADD,
    mutationFn: addCuisine,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.CUISINE.GET,
      });
      setOpen(false);
    },
    // TODO: handle error
  });
  async function onSubmit(data: TAddCuisineData) {
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <BaseInput
            label="type"
            placeholder="Enter Cuisine Type"
            {...register("type")}
            error={errors.type?.message}
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
