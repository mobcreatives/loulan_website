import { z } from "zod";

const urlSchema = z
  .string()
  .trim()
  .nullable()
  .optional()
  .refine(
    (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Invalid URL format" }
  );

export const updateSettingSchema = z.object({
  description: z.string().min(1, "Description is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  openingHours: z.string().min(1, "Opening hours are required"),
  facebookUrl: urlSchema,
  instagramUrl: urlSchema,
  twitterUrl: urlSchema,
  enableReservation: z.boolean(),
  showReviews: z.boolean(),
});

