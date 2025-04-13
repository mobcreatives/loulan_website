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
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Booking() {
  const { _axios } = useAuthAxios();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TAddReservationData>({
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
    <section className="flex flex-col items-center text-white pt-12 pb-15">
      <TextWithLine
        text="Table Booking"
        className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
      />
      <div className="flex flex-col md:flex-row gap-15 mt-10">
        <form
          className="font-epilogue space-y-8 text-[clamp(0.875rem,0.85rem+0.125vw,1rem)] w-100 mt-3"
          onSubmit={handleSubmit(handleSubmitAdd)}
        >
          <div className="flex flex-col gap-y-6">
            <div className="w-full">
              <input
                type="number"
                name="number-of-guest"
                id="number-of-guest"
                {...register("guestsNum")}
                placeholder="No. of Guests"
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
              />
              {errors.guestsNum && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.guestsNum.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fullname"
                {...register("name")}
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div className="">
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
                        <span className="mt-1 text-[#555555]">Pick a date..</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date ? new Date(date) : new Date()}
                      onSelect={(date) => {
                        if (date) setValue("date", format(date, "yyyy-MM-dd"));
                      }}
                      className="p-3 pointer-events-auto"
{/*                       disabled={[
                        {
                          before: new Date(),
                        },
                      ]} */}

                        disabled = {(date)=> date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

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
                {errors.time && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                {...register("phone")}
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                {...register("email")}
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
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
              {isPending ? "Loading..." : "Reserve"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
