import React from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type SelectFieldProps<T, G extends FieldValues> = {
  data: T[];
  label?: string;
  emptyDataMessage?: string;
  placeholder?: string;
  setValue: UseFormSetValue<G>;
  name: keyof G;
  allowClear?: boolean;
  allowSearch?: boolean;
  modal?: boolean;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  initialsData?: T | T[];
  mode?: "single" | "multi";
  error: string;
};
export type TSelectProps<T> = {
  selectedData: T;
  handleSelectClick: (data: T) => void;
  options: T[];
  label?: string;
  required?: boolean;
  searchPlaceholder?: string;
  selectPlaceholder?: string;
  className?: string;
  width?: `w-${string}`;
  showSearch?: boolean;
  allowClear?: boolean;
};
type SearchableSelectFieldProps<T, G extends FieldValues> = SelectFieldProps<
  T,
  G
> & {
  allowSearch: true;
  searchPlaceholder: string;
};

type NonSearchableSelectFieldProps<T, G extends FieldValues> = SelectFieldProps<
  T,
  G
> & {
  allowSearch?: false;
  searchPlaceholder?: never;
};

export type TSingleFieldProps<T, G extends FieldValues> =
  | SearchableSelectFieldProps<T, G>
  | NonSearchableSelectFieldProps<T, G>;

export type TComponentsBaseProps<T> = {
  data: T[];
  placeholder: string | undefined;
  icon: React.ReactNode;
};

export type TSingleProps<T> = TComponentsBaseProps<T> & {
  selectedData: T;
};

export type TMultiProps<T> = TComponentsBaseProps<T> & {
  multiSelectedData: T[];
};

export type TIconProps = {
  flag: boolean;
};
