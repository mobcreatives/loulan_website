"use client";

import {
  FacebookIconComponent,
  InstagramIconComponent,
  LinkedInIconComponent,
  TwitterIconComponent,
} from "@/components";
import { APP_ROUTES, API_ROUTES } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TSettingResponse } from "@/app/dashboard/settings/types";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";

export default function Footer() {
  const { _axios } = useAuthAxios();

  // Fetch the settings data
  const { data, isLoading, isError } = useQuery<TSettingResponse>({
    queryKey: KEYS.SETTINGS.GET,
    queryFn: async () => {
      try {
        const response = await _axios.get<TSettingResponse>(
          API_ROUTES.SETTINGS
        );
        return response.data;
      } catch {
        throw new Error("Failed to fetch settings");
      }
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching settings.</div>;
  }

  return (
<footer className="bg-[#121A1D] text-[#797B78] flex justify-center px-6 sm:px-10 md:px-16 lg:px-20 2xl:px-44 py-12">
  <div className="w-full max-w-[1200px] grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-10 items-center">
    {/* Intro Section (Left) */}
    <div className="space-y-5 w-full">
      <Link href={APP_ROUTES.HOME}>
        <p className="w-25">
          <Image
            className="size-full object-cover"
            src={"/images/logo.png"}
            alt="a minimalistic logo for Loulan"
            width={40}
            height={40}
          />
        </p>
      </Link>
      <p className="text-[clamp(0.75rem,0.725rem+0.125vw,0.875rem)] w-full sm:w-100">
        {data?.setting?.description || "Loading description..."}
      </p>
      <div className="flex items-center -mt-3 space-x-4">
        {data?.setting?.facebookUrl && (
          <a href={data.setting.facebookUrl} target="_blank" rel="noopener noreferrer" className="size-12">
            <FacebookIconComponent />
          </a>
        )}
        {data?.setting?.twitterUrl && (
          <a href={data.setting.twitterUrl} target="_blank" rel="noopener noreferrer" className="size-12">
            <TwitterIconComponent />
          </a>
        )}
        {data?.setting?.instagramUrl && (
          <a href={data.setting.instagramUrl} target="_blank" rel="noopener noreferrer" className="size-12">
            <InstagramIconComponent />
          </a>
        )}
      </div>
    </div>

    {/* Opening Hours Section (Center) */}
    <div className="w-full text-[clamp(0.75rem,0.725rem+0.125vw,0.875rem)] space-y-4 text-center">
      <h4 className="text-white text-[clamp(0.75rem,0.7rem+0.25vw,1rem)] font-semibold">
        Opening Hours
      </h4>
      <div className="space-y-2">
        {data?.setting?.openingHours ? (
          <p className="text-xs whitespace-pre-line">{data.setting.openingHours}</p>
        ) : (
          <>
            <p>Sa - We: 09:00am - 10:00pm</p>
            <p>Thu - We: 09:00am - 10:00pm</p>
            <p>Friday Closed</p>
          </>
        )}
      </div>
    </div>

    {/* Contact Us Section (Right) */}
    <div className="w-full text-[clamp(0.75rem,0.725rem+0.125vw,0.875rem)] space-y-4 text-left">
      <h4 className="text-white text-[clamp(0.75rem,0.7rem+0.25vw,1rem)] font-semibold">
        Contact Us
      </h4>
      <div className="space-y-4">
        <p>
          {data?.setting?.address || "543 Country Club Ave, NC 27587, London, UK"}
          <br />
          {data?.setting?.phone || "+1257 6541120"}
        </p>
      </div>
    </div>
  </div>
</footer>

  );
}
