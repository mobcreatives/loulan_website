"use client";
import { cn } from "@/lib/utils";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Table } from "..";
import { TDataTableProps } from "./types";
import { useState } from "react";
import DataTableHead from "./components/table-head";
import DataTableBody from "./components/table-body";

export default function DataTable<T>({
  data,
  columns,
  className,
}: Readonly<TDataTableProps<T>>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
  });

  return (
    <div
      className={cn(
        "custom-scrollbar relative h-[calc(100dvh-10.75em)] overflow-auto rounded-b-[12px]",
        className
      )}
    >
      <Table className="w-full">
        <DataTableHead table={table} />
        <DataTableBody table={table} />
      </Table>
    </div>
  );
}

export { DataTable };
