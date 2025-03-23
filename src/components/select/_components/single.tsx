import { cn } from "@/lib/utils";
import { TSingleProps } from "../types";

export default function Single<
  T extends { label: string; value: number | string | boolean }
>({ data, icon, placeholder, selectedData }: TSingleProps<T>) {
  return (
    <>
      <p
        className={cn(
          "truncate w-full text-left",
          !selectedData.value && "text-muted-foreground"
        )}
      >
        {Object.keys(selectedData).length ? (
          <span className="text-sm capitalize">
            {data.find((item) => item.value === selectedData.value)?.label}
          </span>
        ) : (
          <span className="text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-[#6B7280] ">
            {placeholder}
          </span>
        )}
      </p>
      {icon}
    </>
  );
}
