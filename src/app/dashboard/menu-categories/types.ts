import { z } from "zod";
import { addMenuSchema, updateMenuSchema } from "./validator";

export type TAddMenuData = z.infer<typeof addMenuSchema>;
export type TUpdateMenuData = z.infer<typeof updateMenuSchema>;

export type TMenuCategoryDetails = {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TUpdateMenuCategoryArgs = {
  id: number;
  data: TMenuCategoryDetails;
};
