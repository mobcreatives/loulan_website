"use client";

import { timeSlots } from "@/app/dashboard/reservations/data";
import { TAddReservationData } from "@/app/dashboard/reservations/types";
import { addReservationSchema } from "@/app/dashboard/reservations/validator";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextWithLine,
} from "@/components";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";
import { API_ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Reservation() {
  const { _axios } = useAuthAxios();
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<TAddReservationData>({
      resolver: zodResolver(addReservationSchema),
    });
  const date = watch("date");
  const { mutateAsync, isPending } = useMutation({
    mutationKey: KEYS.RESERVATIONS.ADD,
    mutationFn: addReservation,
    onSuccess: () => {
      toast("Reservation added successfully");
      reset();
    },
    onError: () => {
      toast("Failed to add reservation");
    },
  });
  async function addReservation(data: TAddReservationData) {
    try {
      const response = await _axios.post(API_ROUTES.RESERVATIONS, data);
      return response.data;
    } catch {
      throw new Error("Failed to add reservation");
    }
  }

  async function handleSubmitAdd(data: TAddReservationData) {
    await mutateAsync(data);
  }
  return (
    <section className="flex justify-center px-6 sm:px-10 md:px-16 lg:px-40 2xl:px-44 py-12">
      <div className="max-w-[1200px] text-white w-full">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-8">
          <div className="text-center">
            <div className="uppercase text-[clamp(1.875rem,1.7825rem+0.3896vw,2.25rem)] font-bold -space-y-2">
              <h4 className="tracking-wide">Reserve</h4>
              <TextWithLine
                text="a table"
                className="before:bottom-1 before:h-[1.5px] before:w-35"
              />
            </div>
            <p className="mt-4">Discover our New Menu!</p>
          </div>
          <form
            className="font-epilogue space-y-6 text-[clamp(0.875rem,0.85rem+0.125vw,1rem)] w-100 md:w-150 xl:w-200"
            onSubmit={handleSubmit(handleSubmitAdd)}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="number-of-guest"
                id="number-of-guest"
                placeholder="No. of Guests"
                {...register("guestsNum")}
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black"
              />
              <div className="grid md:grid-cols-2 gap-4 ">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full flex items-center justify-start text-left bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black"
                      name="date"
                      id="date-trigger"
                    >
                      <CalendarIcon className="mr-1 size-4" />
                      {date ? (
                        <span>{format(new Date(date), "PPP")}</span>
                      ) : (
                        <span className="mt-1 text-[#555555]">Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date ? new Date(date) : undefined}
                      onSelect={(date) => {
                        if (date) setValue("date", format(date, "yyyy-MM-dd"));
                      }}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <div>
                  <Select
                    name="time"
                    onValueChange={(value) => setValue("time", value)}
                  >
                    <SelectTrigger className="w-full bg-white rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] !h-12 text-black">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="h-[20em] overflow-y-auto">
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name")}
                placeholder="Fullname"
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black"
              />
              <input
                type="text"
                name="phone"
                id="phone"
                {...register("phone")}
                placeholder="Phone Number"
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black"
              />
            </div>
            <div className="flex justify-end lg:px-4">
              <button
                className={cn(
                  "bg-primary text-black px-6 py-2 rounded-[12px] font-medium capitalize font-fredoka relative before:content-[''] before:absolute before:inset-0 before:left-1 before:scale-y-125 before:w-[100.5%] before:rounded-[12px] before:border-2 before:border-primary before:-z-1 isolate cursor-pointer"
                )}
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Reserve"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
