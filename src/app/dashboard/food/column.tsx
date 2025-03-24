"use client";

import { Food } from "@prisma/client";
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
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => row.original.price,
    },
    {
      accessorKey: "menu",
      header: "Menu",
      cell: ({ row }) => row.original.menuId,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => row.original.description,
    },
  ] as ColumnDef<Food>[];
}
