import { z } from "zod";
import { addReservationSchema, updateReservationSchema } from "./validator";

export type TAddReservationData = z.infer<typeof addReservationSchema>;

export type TUpdateReservationData = z.infer<typeof updateReservationSchema>;
