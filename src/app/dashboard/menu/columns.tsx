import { ColumnDef } from "@tanstack/react-table";
import { Menu } from "@prisma/client";

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
  ] as ColumnDef<Menu>[];
}
