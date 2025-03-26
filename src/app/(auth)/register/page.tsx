"use client";

import { BaseInput } from "@/components";
import { useForm } from "react-hook-form";
import { TLoginData } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./validator";
import { useMutation } from "@tanstack/react-query";
import { login } from "./helper";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
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
      await toast.success("Login successful");
      router.push("/");
    },
    onError: () => {
      toast.error("Login failed");
    },
  });

  async function onSubmit(data: TLoginData) {
    await mutateAsync(data);
  }
  return (
    <section className="h-screen max-h-screen max-w-screen flex items-center justify-center bg-[#0A1316]">
      <div className="px-8 pt-5 pb-8 bg-white shadow-[0_8px_32px_0] shadow-primary/20 backdrop-blur-[12px rounded-[12px] border border-white/18 font-epilogue">
        <div>
          <h3 className="text-[clamp(1.125rem,1.0633rem+0.2597vw,1.375rem)] text-center font-medium font-epilogue">
            Sign up with email
          </h3>
          <div className="flex justify-center text-[#797B78] leading-4.5 mt-1">
            <p className="w-[30ch] text-center">
              Discover the best chinese and korean foods.
            </p>
          </div>
        </div>
        <form className="mt-5 space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <BaseInput
              label="Username"
              type="text"
              required
              placeholder="Enter Username"
              error={errors.username?.message}
              {...register("email")}
            />
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
              Already have an account?
              <Link href="/login" className="pl-1 hover:underline">
                Login
              </Link>
            </p>
          </div>
          <button
            className="w-full bg-primary py-2.5 rounded-[6px] font-medium cursor-pointer"
            type="submit"
            disabled={isPending}
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
