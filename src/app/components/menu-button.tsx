import { cn } from "@/lib/utils";
import { TMenuButtonPros } from "../types";
import { cloneElement } from "react";

export default function MenuButton({
  activeTab,
  setActiveTab,
  text,
  icon,
}: Readonly<TMenuButtonPros>) {
  return (
    <button
      className={cn(
        "cursor-pointer w-[120px] h-[120px] flex items-center justify-center flex-col gap-y-1 outline-white outline-3 rounded-[20px]",
        activeTab === text &&
          "bg-[url('/images/active-menu.png')] bg-no-repeat bg-center bg-contain outline-hidden h-[130px]"
      )}
      onClick={() => setActiveTab(text)}
      type="button"
    >
      <p className="w-[50px]">
        {cloneElement(icon, {
          className: cn(activeTab !== text && "fill-primary"),
        })}
      </p>
      <p
        className={cn(
          "font-fredoka text-white font-medium capitalize",
          activeTab === text && "text-black"
        )}
      >
        {text}
      </p>
    </button>
  );
}
