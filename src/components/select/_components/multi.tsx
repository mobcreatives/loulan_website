import { cn } from "@/lib/utils";
import { TMultiProps } from "../types";

export default function Multi<
  T extends { label: string; value: string | number | boolean }
>({ multiSelectedData, placeholder, icon }: TMultiProps<T>) {
  return (
    <>
      {Array.isArray(multiSelectedData) && (
        <>
          <p
            className={cn(
              "w-[90%] text-left overflow-hidden text-sm break-words text-ellipsis truncate",
              !multiSelectedData.length && "text-muted-foreground"
            )}
          >
            {multiSelectedData.length > 0 ? (
              <span className="capitalize">
                {multiSelectedData.map((item) => item.label)?.join(", ")}
              </span>
            ) : (
              <span className="text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-[#6B7280]">
                {placeholder}
              </span>
            )}
          </p>
          {icon}
        </>
      )}
    </>
  );
}
