import React from "react";
import { Label } from "..";

export default function BaseInput({
  placeholder,
  label,
  error = "",
  type = "text",
  ...rest
}: React.ComponentProps<"input"> & { label: string; error?: string }) {
  return (
    <div className="w-full space-y-2.5">
      <Label className="capitalize">{label}</Label>
      <div className="space-y-1">
        <input
          type={type}
          placeholder={placeholder}
          className="bg-white border border-[#2e2e2e] w-full text-[#2e2e2e] font-poppins font-medium text-[clamp(0.875rem0.8442rem+0.1299vw,1rem)] placeholder:text-[clamp(0.75rem,0.6883rem+0.2597vw,1rem)] h-12 rounded-[8px] placeholder-[#5f5f5f] px-4 focus:outline-[#FFD700]"
          {...rest}
        />
        {error && <p className="text-rose-500 text-xs">{error}</p>}
      </div>
    </div>
  );
}

export { BaseInput };
