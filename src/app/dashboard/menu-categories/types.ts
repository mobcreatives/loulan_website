import { z } from "zod";
import { addMenuSchema, updateMenuSchema } from "./validator";

export type TAddMenuData = z.infer<typeof addMenuSchema>;
export type TUpdateMenuData = z.infer<typeof updateMenuSchema>;
