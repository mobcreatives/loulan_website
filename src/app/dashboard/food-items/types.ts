import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { TMenuDetails } from "../menu/types";
import { foodSchema, updateFoodSchema } from "./validator";
import { z } from "zod";

export type TAddFoodProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TFoodDetails[], Error>>;
};
export type TUpdateFoodProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TFoodDetails[], Error>>;
  data: TFoodDetails;
};
export type TAddFoodData = z.infer<typeof foodSchema>;
export type TUpdateFoodData = z.infer<typeof updateFoodSchema>;

export interface TFoodDetails {
  id: number;
  name: string;
  price: number;
  description: string;
  imgUrl: string;
  isFeatured: boolean;
  availability: boolean;
  menuId: number;
  createdAt: string;
  updatedAt: string;
  menu: TMenuDetails;
}

export type TUpdateFoodArgs = {
  id: number;
  data: TUpdateFoodData;
};

export type TPaginationData = {
  page: number;
  limit: number;
};
export type TPaginationProps = {
  pagination: TPaginationData;
  setPagination: React.Dispatch<React.SetStateAction<TPaginationData>>;
  totalPages: number;
};
