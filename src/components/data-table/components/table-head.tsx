import { cn } from "@/lib/utils";
import { flexRender } from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import { TTableHeadProps } from "../types";

export default function DataTableHead<T>({
  table,
}: Readonly<TTableHeadProps<T>>) {
  return (
    <thead className="sticky top-0 z-10 w-full border-b border-solid border-[#E5E7EB] bg-[#F6EDFC]">
      {table.getHeaderGroups().map((headerGroup) => {
        return (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              const { columnDef } = header.column;
              return (
                <th
                  key={uuidv4()}
                  colSpan={header.colSpan}
                  scope="col"
                  className={cn(
                    `py-3 text-left text-[#60697B] text-nowrap bg-primary/90 text-[clamp(10px,_1.5vw,_12px)] font-medium uppercase px-3`,
                    index === 0 && "pl-4"
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(columnDef.header, header.getContext())}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
}
