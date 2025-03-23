import { z } from "zod";
import { cuisineSchema } from "./validator";

export type TAddCuisineData = z.infer<typeof cuisineSchema>;

export type TAddCuisineProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
