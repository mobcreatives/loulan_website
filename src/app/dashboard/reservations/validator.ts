import { z } from "zod";

export const addReservationSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(255, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email" }).optional(),
  phone: z.string().min(7, { message: "Invalid phone number" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  guestsNum: z.coerce.number().min(1, { message: "Invalid number of guests" }),
  status: z
    .enum(["PENDING", "CONFIRMED", "CANCELLED"])
    .optional()
    .default("PENDING"),
});

export const updateReservationSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(255, { message: "Name is too long" })
    .optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  phone: z.string().min(7, { message: "Invalid phone number" }).optional(),
  date: z.string().min(1, { message: "Date is required" }).optional(),
  time: z.string().min(1, { message: "Time is required" }).optional(),
  guestsNum: z.coerce
    .number()
    .min(1, { message: "Invalid number of guests" })
    .optional(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]).optional(),
});
