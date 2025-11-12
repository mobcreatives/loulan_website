"use client";

import {  } from "@/components";
import {  API_ROUTES } from "@/config/routes";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TSettingResponse } from "@/app/dashboard/settings/types";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";

export default function Opening() {
  const { _axios } = useAuthAxios();

  // Fetch the settings data
  const { data, isLoading, isError } = useQuery<TSettingResponse>({
    queryKey: KEYS.SETTINGS.GET,
    queryFn: async () => {
      try {
        const response = await _axios.get<TSettingResponse>(API_ROUTES.SETTINGS);
        return response.data;
      } catch (error) {
        console.error("Error fetching settings:", error);
        throw new Error("Failed to fetch settings");
      }
    },
  });

  return (
    <section className="bg-[url('/images/opening-bg.png')] bg-cover bg-no-repeat bg-center text-white my-16">
      <div className="bg-[#000000cb] flex justify-center px-6 sm:px-10 md:px-16 lg:px-40 2xl:px-44 py-12">
        <div className="flex items-center justify-center flex-col gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12 w-full max-w-[1200px]">
          <div className="flex-shrink-0">
            <p className="text-[clamp(2.25rem,2.1266rem+0.5195vw,2.75rem)] font-bold text-center md:text-left">
              Working Hours
            </p>
          </div>
          <div className="bg-[#121A1D] p-8 md:p-12 text-center space-y-6 md:space-y-8 rounded-lg border border-white/10 flex-1 max-w-md">
            {isLoading ? (
              <div className="space-y-2">
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-2/3 mx-auto"></div>
                </div>
              </div>
            ) : isError ? (
              <div className="space-y-1">
                <p className="font-semibold text-sm text-white/70">Error loading hours</p>
              </div>
            ) : data?.setting?.openingHours ? (
            <div className="space-y-2">
                <p className="text-sm md:text-base whitespace-pre-line text-white/90 leading-relaxed">{data.setting.openingHours}</p>
            </div>
            ) : (
            <div className="space-y-2">
                <p className="text-sm md:text-base text-white/90">Sunday to Tuesday: 9:00 AM - 10:00 PM</p>
                <p className="text-sm md:text-base text-white/90">Friday to Saturday: 9:00 AM - 10:00 PM</p>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
