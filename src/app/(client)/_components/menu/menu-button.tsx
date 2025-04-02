import { cn } from "@/lib/utils";
import { cloneElement } from "react";
import { TMenuButtonPros } from "./types";
import { useClientMenuStore } from "./store";

export default function MenuButton({ data, icon }: Readonly<TMenuButtonPros>) {
  const { setActiveTab, activeTab } = useClientMenuStore();
  return (
    <button
      className={cn(
        "cursor-pointer w-[120px] h-[120px] flex items-center justify-center flex-col gap-y-1 outline-white outline-3 rounded-[20px]",
        activeTab?.name === data.name &&
          "bg-[url('/images/active-menu.png')] bg-no-repeat bg-center bg-contain outline-hidden h-[130px]"
      )}
      onClick={() => setActiveTab(data)}
      type="button"
    >
      <p className="w-[50px]">
        {cloneElement(icon, {
          className: cn(activeTab?.name !== data.name && "fill-primary"),
        })}
      </p>
      <p
        className={cn(
          "font-fredoka text-white font-medium capitalize",
          activeTab?.name === data.name && "text-black"
        )}
      >
        {data.name}
      </p>
    </button>
  );
}
