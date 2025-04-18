import { TAddReservationData } from "@/app/dashboard/reservations/types";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export type TLoginDialogProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  data: TAddReservationData;
  mutationFunction: UseMutateAsyncFunction<
    unknown,
    Error,
    {
      name?: string;
      email?: string;
      status?: "PENDING" | "CONFIRMED" | "CANCELLED";
      date?: string;
      phone?: string;
      time?: string;
      guestsNum?: number;
    },
    unknown
  >;
};
