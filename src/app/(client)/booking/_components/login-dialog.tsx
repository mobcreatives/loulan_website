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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { TLoginDialogProps } from "../types";
import { FaTag } from 'react-icons/fa'; // Importing discount icon
import { motion } from "framer-motion";
import RegisterDialog from "./register-dialog";

export default function LoginDialog({
  open,
  setOpen,
  data,
  mutationFunction,
}: TLoginDialogProps) {
  const [showRegister, setShowRegister] = useState(false);
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
      // Submit reservation after successful login
      if (data && Object.keys(data).length > 0) {
        try {
          await mutationFunction(data);
        } catch (error) {
          // Silently handle reservation submission errors
        }
      }
      setOpen(false);
      // Reload to update auth state
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: () => {
      // Backend warnings should not show on design - silently handle
    },
  });

  async function onSubmit(data: TLoginData) {
    await mutateAsync(data);
  }

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setOpen(true); // Show login dialog after successful registration
  };

  return (
    <>
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
                <DialogTitle>Login here</DialogTitle>
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
                    Login to get a 5% discount on your booking!
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <DialogDescription>
                  Login here and get discount on your order.
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
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        setShowRegister(true);
                      }}
                      className="text-primary font-bold hover:underline"
                    >
                      Register
                    </button>
                  </p>
                </div>

                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full capitalize text-white bg-rose-700 py-2.5 rounded-[6px] font-medium cursor-pointer"
                    type="button"
                    onClick={() => mutationFunction(data)}
                  >
                    Continue as guest
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-primary py-2.5 rounded-[6px] font-medium cursor-pointer"
                    type="submit"
                    disabled={isPending}
                  >
                    Login
                  </motion.button>
                </motion.div>
              </motion.form>
            </DialogHeader>
          </motion.div>
        </DialogContent>
      </Dialog>

      <RegisterDialog
        open={showRegister}
        setOpen={setShowRegister}
        onSuccess={handleRegisterSuccess}
      />
    </>
  );
}
