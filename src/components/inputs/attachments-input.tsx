import { cn } from "@/lib/utils";
import { useState } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";
import { TAttachmentProps } from "./types";

export default function AttachmentInput<T extends FieldValues>({
  label,
  required,
  error,
  name,
  setValue,
  accept = "*",
  multiple = false,
}: Readonly<TAttachmentProps<T>>) {
  const [files, setFiles] = useState<File[] | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    setFiles((prev) => {
      if (!prev) return Array.from(files);
      return [...prev, ...Array.from(files)];
    });
    setValue(name as Path<T>, Array.from(files) as PathValue<T, Path<T>>);
  }

  function removeSelectedFile(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) {
    e.stopPropagation();
    setFiles((prevFiles) => {
      return prevFiles ? prevFiles.filter((_, i) => i !== index) : null;
    });
  }

  function showSelectedFiles() {
    if (Array.isArray(files) && files.length > 0) {
      return (
        <div className="w-full">
          {files.map((file, index) => {
            return (
              <div
                key={file.name}
                className={cn(
                  "relative flex items-center justify-between w-full py-3 border-[#E3E3E3] cursor-pointer border-b"
                )}
              >
                <div className="flex items-center gap-1">
                  {/* <AttachmentIconComponent /> */}
                  <p className="text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-[#6B7280] w-[30ch] truncate break-words text-ellipsis overflow-hidden">
                    {file.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => removeSelectedFile(e, index)}
                  className="transition-opacity duration-200 opacity-50 hover:opacity-100 size-5 cursor-pointer"
                >
                  {/* <DeleteIconComponent /> */}
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  }
  return (
    <div className="w-full">
      <div className="flex flex-col w-full space-y-2">
        <label
          htmlFor={label}
          className="text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-[#12191E] tracking-[-0.28px] capitalize"
        >
          {label}
          {required && <span className="pl-1 text-rose-500">*</span>}
        </label>
        <div className="min-h-11 rounded-[8px] bg-[#FEFEFE] shadow-[0px_0px_20px_0px_rgba(30,34,40,0.05)] focus:outline-hidden focus:border-[rgba(119,78,167,0.25)] px-5 flex flex-col justify-center placeholder:text-[#6B7280] placeholder:text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-[#6B7280] border border-[#2e2e2e]">
          {Array.isArray(files) && files.length > 0 && showSelectedFiles()}
          <div className="relative">
            <input
              type="file"
              id={label}
              name={label}
              multiple={multiple}
              accept={accept}
              className="absolute inset-0 opacity-0 cursor-pointer peer file:cursor-pointer"
              onChange={handleFileChange}
            />
            <div
              className={cn(
                "flex items-center cursor-pointer peer-hover:underline underline-offset-2 gap-x-1 text-[#686868] font-medium",
                files?.length ? "my-3" : "mt-0"
              )}
            >
              {/* <ImageIconComponent /> */}
              <p>Add attachments</p>
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}

export { AttachmentInput };
