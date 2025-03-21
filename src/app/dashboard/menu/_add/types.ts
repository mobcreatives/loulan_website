import { z } from "zod";
import { addMenuDataSchema } from "./validator";

export type TAddMenuProps = {
  open: boolean;
  setOpenAddDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TAddMenuData = z.infer<typeof addMenuDataSchema>;
