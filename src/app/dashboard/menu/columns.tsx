import { ColumnDef } from "@tanstack/react-table";
import { TMenuDetails } from "./types";

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
      accessorKey: "type",
      header: "Category",
      cell: ({ row }) => row.original.type,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => row.original.description,
    },
  ] as ColumnDef<TMenuDetails>[];
}
