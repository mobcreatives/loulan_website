"use client";

import { register } from "@/app/(auth)/register/helper";
import { TLoginData } from "@/app/(auth)/register/types";
import { loginSchema } from "@/app/(auth)/register/validator";
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
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FaTag } from 'react-icons/fa';
import { useAuth } from "@/context/auth-context";

interface RegisterDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function RegisterDialog({
  open,
  setOpen,
  onSuccess,
}: RegisterDialogProps) {
  const { login: authLogin } = useAuth();
  const {
    register: registerField,
    formState: { errors },
    handleSubmit,
  } = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["register", "user"],
    mutationFn: register,
    onSuccess: async (data) => {
      toast.success("Registration successful");
      // After successful registration, log the user in
      authLogin(data.token);
      setOpen(false);
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: unknown) => {
      let message = "Registration failed";
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        message = err.response?.data?.message || message;
      }
      toast.error(message);
    },
  });

  async function onSubmit(data: TLoginData) {
    await mutateAsync(data);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <DialogTitle>Sign up with email</DialogTitle>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="my-4 p-4 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-lg flex items-center justify-between shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="flex items-center space-x-2">
                <FaTag className="text-2xl text-rose-700 transform hover:scale-110 transition-all duration-300" />
                <span className="font-extrabold text-rose-700 text-lg">
                  Register now to get a 5% discount on your booking!
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <DialogDescription>
                Create an account and get exclusive benefits.
              </DialogDescription>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="space-y-5">
                <BaseInput
                  label="Username"
                  type="text"
                  required
                  placeholder="Enter Username"
                  error={errors.username?.message}
                  {...registerField("username")}
                />
                <BaseInput
                  label="email"
                  type="email"
                  required
                  placeholder="Enter Email"
                  error={errors.email?.message}
                  {...registerField("email")}
                />
                <BaseInput
                  label="password"
                  type="password"
                  required
                  placeholder="Password"
                  error={errors.password?.message}
                  {...registerField("password")}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary py-2.5 rounded-[6px] font-medium cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                Sign up
              </motion.button>
            </motion.form>
          </DialogHeader>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
} 