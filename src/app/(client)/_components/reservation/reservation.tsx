"use client";

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
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format, isToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoginDialog from "@/app/(client)/booking/_components/login-dialog";

export default function Reservation() {
  const { _axios } = useAuthAxios();
  const { getItem } = useLocalStorage();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [formData, setFormData] = useState<TAddReservationData>(
    {} as TAddReservationData
  );
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
  const numberOfGuests = watch("guestsNum");

  // Get current time in HH:mm format
  const currentTime = useMemo(() => {
    const now = new Date();
    return format(now, "HH:mm");
  }, []);

  // Generate time slots from 10:00 to 23:30 with 30-minute intervals in Nepali format
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 10; hour < 24; hour++) {
      const displayHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      slots.push({
        value: `${hour.toString().padStart(2, '0')}:00`,
        label: `${displayHour}:00 ${ampm}`
      });
      if (hour < 23) {
        slots.push({
          value: `${hour.toString().padStart(2, '0')}:30`,
          label: `${displayHour}:30 ${ampm}`
        });
      }
    }
    return slots;
  }, []);

  // Filter time slots based on current time if date is today
  const availableTimeSlots = useMemo(() => {
    if (!date) return timeSlots;
    
    const selectedDate = new Date(date);
    if (!isToday(selectedDate)) return timeSlots;

    const [currentHour, currentMinute] = currentTime.split(':').map(Number);
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    return timeSlots.map(slot => {
      const [slotHour, slotMinute] = slot.value.split(':').map(Number);
      const slotTimeInMinutes = slotHour * 60 + slotMinute;
      
      // Add 30 minutes buffer to current time
      const isDisabled = slotTimeInMinutes < (currentTimeInMinutes + 30);
      return {
        ...slot,
        disabled: isDisabled
      };
    });
  }, [date, currentTime, timeSlots]);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: KEYS.RESERVATIONS.ADD,
    mutationFn: addReservation,
    onSuccess: () => {
      toast(
        `A ${
          numberOfGuests > 4 ? "rounded" : "rectangle"
        } table has been booked.`
      );
      reset();
      setOpenLoginDialog(false);
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
    const token = getItem("token");
    if (!token) {
      setFormData(data);
      setOpenLoginDialog(true);
      return;
    }
    await mutateAsync(data);
  }

  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 bg-[#0A1316] text-white py-10 space-y-14">
      <div className="space-y-3 flex flex-col items-center">
        <TextWithLine
          text="Reservation"
          className="before:w-[100%] before:h-[1px] before:-bottom-0.5"
        />
              <TextWithLine
          text="Book Your Table"
          className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
              />
            </div>

      <form onSubmit={handleSubmit(handleSubmitAdd)}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="w-full">
                <input
                  name="number-of-guest"
                  id="number-of-guest"
                  placeholder="No. of Guests"
                  {...register("guestsNum")}
                  type="number"
                  className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
                />
                {errors.guestsNum && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.guestsNum.message}
                  </p>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4 ">
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
                          <span className="mt-1 text-[#555555]">
                            Pick a date
                          </span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                    selected={date ? new Date(date) : undefined}
                        onSelect={(date) => {
                          if (date)
                            setValue("date", format(date, "yyyy-MM-dd"));
                        }}
                        className="p-3 pointer-events-auto"
                        disabled={[
                          {
                        before: new Date(new Date().setHours(0, 0, 0, 0)),
                          },
                        ]}
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
                value={watch("time")}
                  >
                    <SelectTrigger className="w-full bg-white rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] !h-12 text-black">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent className="h-[20em] overflow-y-auto">
                  {availableTimeSlots.map((slot) => (
                    <SelectItem 
                      key={slot.value} 
                      value={slot.value}
                      disabled={slot.disabled}
                      className={slot.disabled ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      {slot.label}
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
                  type="text"
                  name="name"
                  id="name"
                  {...register("name")}
                  placeholder="Fullname"
                  className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <input
              type="text"
                  name="phone"
                  id="phone"
                  {...register("phone")}
              placeholder="Phone"
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
              {...register("email")}
              placeholder="Email"
              className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700] text-black w-full"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
            </div>
        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
                className={cn(
              "btn-gold",
              "hover:scale-105 transition-all duration-300",
              "active:scale-95",
              isPending && "opacity-50 cursor-not-allowed"
                )}
                disabled={isPending}
              >
            {isPending ? "Booking..." : "Book a Table"}
          </Button>
        </div>
      </form>

      <LoginDialog
        open={openLoginDialog}
        setOpen={setOpenLoginDialog}
        data={formData}
        mutationFunction={mutateAsync}
      />
    </section>
  );
}
