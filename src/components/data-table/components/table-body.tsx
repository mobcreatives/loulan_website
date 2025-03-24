import { cn } from "@/lib/utils";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import { TTableBodyProps } from "../types";

type ExtendedColumnDef<T> = ColumnDef<T> & {
  isAction?: boolean;
  disableTableCellPadding?: boolean;
};

export default function DataTableBody<T>({
  table,
}: Readonly<TTableBodyProps<T>>) {
  return (
    <tbody className="w-full">
      {table.getRowModel()?.rows.map((row) => {
        return (
          <tr
            key={row.id}
            className={cn("group border-solid border-[#E5E7EB]")}
          >
            {row.getVisibleCells().map((cell) => {
              const { columnDef }: { columnDef: ExtendedColumnDef<T> } =
                cell.column;
              return (
                <td
                  key={uuidv4()}
                  id={`ticket-table-data-${cell.id}`}
                  className={cn(
                    "h-10 text-[clamp(12px,_1.5vw,_14px)] font-medium leading-5 group-hover:bg-primary/10 cursor-pointer px-3"
                  )}
                >
                  {flexRender(columnDef.cell, {
                    ...cell.getContext(),
                  })}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
