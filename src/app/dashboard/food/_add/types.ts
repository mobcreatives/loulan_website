import { foodSchema } from "./validator";
import { z } from "zod";

export type TAddFoodProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TAddFoodData = z.infer<typeof foodSchema>;
