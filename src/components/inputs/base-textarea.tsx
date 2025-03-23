export default function BaseTextarea({
  error,
  label,
  name,
  placeholder,
  disabled,
  required,
  rows = 5,
  ...rest
}: React.ComponentProps<"textarea"> & { label: string; error: string }) {
  return (
    <div className="w-full">
      <div className="flex flex-col w-full space-y-2">
        <label
          htmlFor=""
          className="text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-[#2e2e2e] tracking-[-0.28px] capitalize font-medium"
        >
          {label}
          {required && <span className="pl-1 text-rose-500">*</span>}
        </label>
        <textarea
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          name={name}
          {...rest}
          className="w-full rounded-[8px] bg-[#FEFEFE] shadow-[0px_0px_20px_0px_rgba(30,34,40,0.05)] focus:outline-hidden focus:border-primary px-5 placeholder:text-[#6B7280] placeholder:text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-sm resize-none h-16 font-medium custom-scrollbar py-3 border border-[#2e2e2e]"
          style={{ resize: "none", height: "6em" }}
        />
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}
