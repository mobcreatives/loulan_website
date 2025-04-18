"use client";

import { login } from "@/app/(auth)/login/helper";
import { TLoginData } from "@/app/(auth)/login/types";
import { loginSchema } from "@/app/(auth)/login/validator";
import {
  BaseInput,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TLoginDialogProps } from "../types";

export default function LoginDialog({
  open,
  setOpen,
  data,
  mutationFunction,
}: TLoginDialogProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
  });
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["login", "user"],
    mutationFn: login,
    onSuccess: async () => {
      toast.success("Login successful");
      mutationFunction(data);
      setOpen(false);
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  async function onSubmit(data: TLoginData) {
    await mutateAsync(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login here</DialogTitle>
          <DialogDescription className="">
            Login here and get discount on your order.
          </DialogDescription>
          <form className="mt-5 space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <BaseInput
                label="email"
                type="email"
                required
                placeholder="Enter Email"
                error={errors.email?.message}
                {...register("email")}
              />
              <BaseInput
                label="password"
                type="password"
                required
                placeholder="Password"
                error={errors.password?.message}
                {...register("password")}
              />
              <p className="-mt-1">
                Don&apos;t have an account?
                <Link href="/register" className="pl-1 hover:underline ">
                  Register
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                className="w-full capitalize text-white bg-rose-700 py-2.5 rounded-[6px] font-medium cursor-pointer"
                type="button"
                onClick={() => mutationFunction(data)}
              >
                cancel
              </button>
              <button
                className="w-full bg-primary py-2.5 rounded-[6px] font-medium cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                Login
              </button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
