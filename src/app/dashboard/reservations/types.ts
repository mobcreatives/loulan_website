import { z } from "zod";
import { addReservationSchema, updateReservationSchema } from "./validator";

export type TAddReservationData = z.infer<typeof addReservationSchema>;

export type TUpdateReservationData = z.infer<typeof updateReservationSchema>;

export type TReservationDetails = {
  id: number;
  name: string;
  guestsNum: number;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: TStatus; // "PENDING";
  createdAt: string;
  updatedAt: string;
};

export type TStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export type TUpdateReservationArgs = {
  id: number;
  data: TUpdateReservationData;
};
export type TChangeStatusProps = {
  status: TStatus;
  handleStatusChange(
    reservation: TReservationDetails,
    status: TStatus
  ): Promise<void>;
  reservation: TReservationDetails;
};