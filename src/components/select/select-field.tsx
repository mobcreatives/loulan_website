"use client";
import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { FieldValues, Path, PathValue } from "react-hook-form";
import Icon from "./_components/icon";
import Multi from "./_components/multi";
import Single from "./_components/single";
import { TSingleFieldProps } from "./types";

export default function SelectField<
  T extends { label: string; value: number | string | boolean },
  G extends FieldValues
>({
  data = [],
  label,
  className,
  disabled,
  placeholder,
  searchPlaceholder,
  emptyDataMessage,
  setValue,
  name,
  initialsData,
  error,
  allowSearch = false,
  allowClear = false,
  modal = false,
  required = false,
  mode = "single",
}: TSingleFieldProps<T, G>) {
  const id = useId();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<T>({} as T);
  const [multiSelectedData, setMultiSelectedData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [search, setSearch] = useState<string>("");

  /**
   * The function `handleOnSelect` manages the selection of data based on the mode (single or multi) in a
   * TypeScript React component.
   * @param {T} data - The `data` parameter in the `handleOnSelect` function is of type `T`, which means
   * it can be any data type. It is the data that is selected by the user and needs to be handled based
   * on the mode of selection (single or multi).
   */
  function handleOnSelect(data: T) {
    if (mode === "single") {
      setSelectedData(data);
      setValue(name as Path<G>, data.value as PathValue<G, Path<G>>);
      setOpen(false);
    }
    if (mode === "multi") {
      setMultiSelectedData((prev) => {
        const result = prev.find((item) => item.value === data.value)
          ? prev.filter((item) => item.value !== data.value)
          : [...prev, data];
        setValue(
          name as Path<G>,
          result.map((item) => item.value) as PathValue<G, Path<G>>
        );
        return result;
      });
    }
  }

  useEffect(() => {
    if (!initialsData) return;
    if (mode === "single" && !Array.isArray(initialsData)) {
      setValue(name as Path<G>, initialsData.value as PathValue<G, Path<G>>);
      setSelectedData(initialsData);
    }
  }, [initialsData, setValue, name, mode]);

  useEffect(() => {
    if (!initialsData) return;
    if (mode === "multi" && Array.isArray(initialsData)) {
      return setMultiSelectedData(initialsData);
    }
  }, [initialsData, setValue, name, mode]);

  /* The `useEffect` hook is responsible for filtering the data based on the search
input */
  useEffect(() => {
    if (!search) return setFilteredData(data);
    setFilteredData(
      data.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  return (
    <div>
      <div className="flex flex-col w-full space-y-2">
        {label && (
          <Label
            htmlFor={label}
            id={label}
            className="text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] text-[#12191E] tracking-[-0.28px] capitalize"
          >
            {label}
            {required && <span className="pl-1 text-rose-500">*</span>}
          </Label>
        )}
        <Popover open={open} onOpenChange={setOpen} modal={modal}>
          <PopoverTrigger asChild>
            <Button
              onClick={() => setOpen(!open)}
              id={label ?? id}
              variant="outline"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                "bg-white border border-[#2e2e2e] w-full text-[#2e2e2e] font-poppins font-medium text-[clamp(0.875rem0.8442rem+0.1299vw,1rem)] placeholder:text-[clamp(0.75rem,0.6883rem+0.2597vw,1rem)] h-12 rounded-[8px] placeholder-[#5f5f5f] px-4 focus:outline-[#FFD700] cursor-pointer",
                className
              )}
            >
              {mode === "single" && (
                <Single
                  data={data}
                  placeholder={placeholder}
                  selectedData={selectedData}
                  icon={
                    <Icon
                      flag={
                        Object.keys(selectedData ?? {}).length > 0 && allowClear
                      }
                    />
                  }
                />
              )}
              {mode === "multi" && (
                <Multi
                  data={data}
                  placeholder={placeholder}
                  multiSelectedData={multiSelectedData}
                  icon={
                    <Icon flag={multiSelectedData.length > 0 && allowClear} />
                  }
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full min-w-[var(--radix-popper-anchor-width)] border-input rounded-[12px] p-4 max-w-[var(--radix-popper-content-width)] shadow-[0px_6px_12px_0px_rgba(0,0,0,0.10)]"
            align="start"
          >
            <Command>
              {allowSearch && (
                <div className="flex items-center px-4 h-11 bg-[#FEFEFE] rounded-[8px] shadow-[0px_0px_8px_0px_rgba(119,78,167,0.10)] text-sm">
                  <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    aria-hidden={!allowSearch}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent outline-hidden focus:outline-hidden focus-visible:ring-0"
                  />
                  {/* <SearchIconComponent /> */}
                </div>
              )}
              <CommandList
                className={cn(
                  "custom-scrollbar max-h-[15em] rounded-[inherit] mt-2",
                  allowSearch ? "mt-2" : "mt-0"
                )}
              >
                <CommandGroup>
                  {Array.isArray(filteredData) && filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <CommandItem
                        key={`${item.value}`}
                        onSelect={() => handleOnSelect(item)}
                        className="cursor-pointer"
                      >
                        {mode === "multi" && (
                          <div
                            className={cn(
                              "size-4.5 flex items-center justify-center rounded-[2px] border-[1.35px] border-primary cursor-pointer",
                              multiSelectedData.find(
                                (i) => i.value === item.value
                              ) && "bg-primary"
                            )}
                          >
                            <Check
                              strokeWidth={2}
                              className={cn(
                                "m-1 opacity-0 text-white",
                                multiSelectedData.find(
                                  (i) => i.value === item.value
                                ) && "opacity-100"
                              )}
                            />
                          </div>
                        )}
                        {mode === "single" && (
                          <div
                            className={cn(
                              "size-4.5 flex items-center justify-center rounded-[2px] border-[1.35px] border-primary cursor-pointer",
                              selectedData.value === item.value && "bg-primary"
                            )}
                          >
                            <Check
                              size={10}
                              strokeWidth={2}
                              className={cn(
                                "m-1 opacity-0 text-white",
                                selectedData.value === item.value &&
                                  "opacity-100"
                              )}
                            />
                          </div>
                        )}
                        <p className="w-[90%] overflow-hidden text-sm text-left break-words text-ellipsis truncate pl-1 capitalize">
                          {item.label}
                        </p>
                      </CommandItem>
                    ))
                  ) : (
                    <CommandItem className="flex items-center justify-center">
                      <p>{emptyDataMessage}</p>
                    </CommandItem>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}
export { SelectField };
