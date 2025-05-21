"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { TextWithLine } from "@/components";
import { contactUsSchema } from "@/app/dashboard/contact-requests/validator"; 
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import Head from "next/head";


type TContactUsData = z.infer<typeof contactUsSchema>;

export default function ContactUs() {
  const { _axios } = useAuthAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactUsSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: KEYS.CONTACTS.ADD,
    mutationFn: sendContactMessage,
    onSuccess: () => {
      toast("Message sent successfully");
      reset();
    },
    onError: () => {
      toast("Failed to send message");
    },
  });

  // Send message to backend
  async function sendContactMessage(data: TContactUsData) {
    try {
      const response = await _axios.post(API_ROUTES.CONTACTS, data);
      return response.data;
    } catch {
      throw new Error("Failed to send message");
    }
  }

  // Handle form submission
  async function handleSubmitContact(data: TContactUsData) {
    await mutateAsync(data);
  }

  return (
    <>
      <Head>
        <title>Contact | Loulan Restaurant and Bar</title>
        <meta name="description" content="Contact Loulan Restaurant and Bar in Thamel, Kathmandu. Get in touch for reservations, inquiries, or feedback." />
        <meta property="og:title" content="Contact | Loulan Restaurant and Bar" />
        <meta property="og:description" content="Contact Loulan Restaurant and Bar in Thamel, Kathmandu. Get in touch for reservations, inquiries, or feedback." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.loulanrestaurant.com.np/contact" />
        <meta property="og:image" content="https://www.loulanrestaurant.com.np/og-image.jpg" />
      </Head>
      <section className="flex flex-col items-center text-white pt-12 pb-15">
        <TextWithLine
          text="Contact Us"
          className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
        />
        <div className="flex flex-col md:flex-row gap-15 mt-10">
          <form
            className="font-epilogue space-y-8 text-[clamp(0.875rem,0.85rem+0.125vw,1rem)] w-100 mt-3"
            onSubmit={handleSubmit(handleSubmitContact)}
          >
            <div className="flex flex-col gap-y-6">
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  {...register("name")}
                  className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address (Optional)"
                  {...register("email")}
                  className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div className="w-full">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Your Message"
                  {...register("message")}
                  rows={4}
                  className="bg-white rounded-[8px] placeholder-[#555555] px-4 py-2 font-semibold focus:outline-[#FFD700] text-black w-full"
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>
            </div>
            <div className="flex justify-end lg:px-4">
              <button
                className={cn(
                  "bg-primary text-black px-6 py-2 rounded-[12px] font-medium capitalize font-fredoka relative before:content-[''] before:absolute before:inset-0 before:left-1 before:scale-y-125 before:w-[100.5%] before:rounded-[12px] before:border-2 before:border-primary before:-z-1 isolate cursor-pointer"
                )}
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
