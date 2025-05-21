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
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import LoginDialog from "./_components/login-dialog";
import { motion } from "framer-motion";
import Head from "next/head";

export default function Booking() {
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
    <>
      <Head>
        <title>Reservation | Loulan Restaurant and Bar</title>
        <meta name="description" content="Book your table at Loulan Restaurant and Bar in Thamel, Kathmandu. Reserve online for authentic Chinese & Korean cuisine." />
        <meta property="og:title" content="Reservation | Loulan Restaurant and Bar" />
        <meta property="og:description" content="Book your table at Loulan Restaurant and Bar in Thamel, Kathmandu. Reserve online for authentic Chinese & Korean cuisine." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.loulanrestaurant.com.np/booking" />
        <meta property="og:image" content="https://www.loulanrestaurant.com.np/og-image.jpg" />
      </Head>
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-white pt-12 pb-15"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TextWithLine
            text="Table Booking"
            className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-15 mt-10"
        >
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
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
                          <span className="mt-1 text-[#555555]">
                            Pick a date..
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
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex justify-end lg:px-4"
            >
              <button
                className={cn(
                  "bg-primary text-black px-6 py-2 rounded-[12px] font-medium capitalize font-fredoka relative before:content-[''] before:absolute before:inset-0 before:left-1 before:scale-y-125 before:w-[100.5%] before:rounded-[12px] before:border-2 before:border-primary before:-z-1 isolate cursor-pointer"
                )}
                type="submit"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "Reserve"}
              </button>
            </motion.div>
          </motion.form>
        </motion.div>

        <LoginDialog
          data={formData}
          open={openLoginDialog}
          setOpen={setOpenLoginDialog}
          mutationFunction={mutateAsync}
        />
      </motion.section>
    </>
  );
}
