import { FieldValues, UseFormSetValue } from "react-hook-form";

export type TAttachmentProps<T extends FieldValues> = {
  error: string;
  name: keyof T;
  label: string;
  setValue: UseFormSetValue<T>;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
};
