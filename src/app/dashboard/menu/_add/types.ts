import { z } from "zod";
import { addMenuDataSchema } from "./validator";

export type TAddMenuProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TAddMenuData = z.infer<typeof addMenuDataSchema>;
