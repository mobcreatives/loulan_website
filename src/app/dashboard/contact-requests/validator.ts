import { z } from "zod";

export const contactUsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().min(1, "Message is required"),
});
