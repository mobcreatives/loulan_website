import { ColumnDef, Table } from "@tanstack/react-table";

export type TDataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
};

export type TTableHeadProps<T> = {
  table: Table<T>;
};
export type TTableBodyProps<T> = {
  table: Table<T>;
};
