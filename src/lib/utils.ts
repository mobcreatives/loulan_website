import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function mapData<
  T extends { name: string; id: number | string | boolean }
>(data: T | T[]): { label: string; value: number | string | boolean }[] {
  if (!Array.isArray(data)) {
    return [
      {
        label: data?.name,
        value: data?.id,
      },
    ];
  }
  return data.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));
}
export function getInitials(name: string) {
  const userNameArray = name?.split(" ");
  return `${userNameArray?.[0][0]}${
    userNameArray.length > 1 ? userNameArray?.pop()?.[0] : ""
  }`.toUpperCase();
}
