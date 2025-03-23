import { ChevronDown, X } from "lucide-react";
import { TIconProps } from "../types";

export default function Icon({ flag }: TIconProps) {
  return flag ? (
    <X
      color="#60697B"
      width={12}
      className="cursor-pointer hover:text-primary"
    />
  ) : (
    <ChevronDown
      size={16}
      strokeWidth={2}
      className="shrink-0 text-muted-foreground/80"
      aria-hidden="true"
    />
  );
}
