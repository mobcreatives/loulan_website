"use client";

import { CuisineType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export default function Columns() {
  return [
    {
      id: "sn",
      header: "S No.",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.original.type,
    },
  ] as ColumnDef<CuisineType>[];
}
