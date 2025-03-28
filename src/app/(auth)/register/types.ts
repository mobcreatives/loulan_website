import { z } from "zod";
import { loginSchema } from "./validator";

export type TLoginData = z.infer<typeof loginSchema>;
