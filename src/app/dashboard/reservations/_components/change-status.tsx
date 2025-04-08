import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import React from "react";
import { TReservationDetails, TStatus } from "../types";

export type TChangeStatusProps = {
  status: TStatus;
  handleStatusChange(
    reservation: TReservationDetails,
    status: TStatus
  ): Promise<void>;
  reservation: TReservationDetails;
};
export default function ChangeStatus({
  status,
  handleStatusChange,
  reservation,
}: Readonly<TChangeStatusProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <span className="capitalize cursor-pointer">{status?.toLowerCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {["PENDING", "CONFIRMED", "CANCELLED"].map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => handleStatusChange(reservation, status as TStatus)}
            className="capitalize cursor-pointer"
          >
            {status?.toLowerCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
