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
import { FaTag } from 'react-icons/fa'; // Importing discount icon

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

          {/* Enhanced Discount Offer Section */}
          <div className="my-4 p-4 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg flex items-center justify-between shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="flex items-center space-x-2">
              <FaTag className="text-2xl text-rose-700 transform hover:scale-110 transition-all duration-300" />
              <span className="font-extrabold text-rose-700 text-lg">
                Login to get a 5% discount on your booking!
              </span>
            </div>
          </div>

          <DialogDescription>
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
              {/* Continue as Guest Button with Hover Effect */}
              <button
                className="w-full capitalize text-white bg-rose-700 py-2.5 rounded-[6px] font-medium cursor-pointer transform hover:scale-105 transition-all duration-300"
                type="button"
                onClick={() => mutationFunction(data)}
              >
                Continue as guest
              </button>

              {/* Login Button with Hover Effect */}
              <button
                className="w-full bg-primary py-2.5 rounded-[6px] font-medium cursor-pointer transform hover:scale-105 transition-all duration-300"
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
