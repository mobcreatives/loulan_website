import { z } from "zod";
import { addGallerySchema, updateGallerySchema } from "./validator";

export type TImageGalleryDetails = {
  id: number;
  imgUrl: string;
  description: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TAddGalleyData = z.infer<typeof addGallerySchema>;
export type TUpdateGalleryData= z.infer<typeof updateGallerySchema>;

export type TUpdateGalleryArgs = {
  id: number;
  data: TUpdateGalleryData;
};
