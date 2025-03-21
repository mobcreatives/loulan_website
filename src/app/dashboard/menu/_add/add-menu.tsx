"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TAddMenuData, TAddMenuProps } from "./types";
import { addMenuDataSchema } from "./validator";

export default function AddMenu({ open }: Readonly<TAddMenuProps>) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TAddMenuData>({
    resolver: zodResolver(addMenuDataSchema),
  });

  return <div>{open}</div>;
}
