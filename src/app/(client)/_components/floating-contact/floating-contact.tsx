"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { TSettingResponse } from "@/app/dashboard/settings/types";
import { API_ROUTES } from "@/config/routes";
import { useAuthAxios } from "@/config/auth-axios";
import { KEYS } from "@/config/constants";

export default function FloatingContact() {
  const { _axios } = useAuthAxios();

  // Fetch the settings data
  const { data, isLoading, isError } = useQuery<TSettingResponse>({
    queryKey: KEYS.SETTINGS.GET,
    queryFn: async () => {
      try {
        const response = await _axios.get<TSettingResponse>(API_ROUTES.SETTINGS);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch settings");
      }
    },
  });

  if (isLoading) {
    return null; // Don't show anything while loading
  }

  if (isError) {
    return null; // Don't show anything if there's an error
  }

  return (
    <section className="fixed left-10 sm:left-24 md:left-36 lg:left-52 bottom-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-primary rounded-full size-16 cursor-pointer font-semibold text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)]">
            Contact
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-90 bg-[#0A1316] border-[#0A1316]">
          <div className="text-white space-y-4">
            <h4 className="font-medium leading-none mb-5">
              Restaurant Contact
            </h4>
            <div>
              <p className="font-semibold">Restaurant Name:</p>
              <p>Loulan Chinese Restaurant</p>
            </div>
            <div>
              <p className="font-semibold">Contact Number:</p>
              <p>
                <a 
                  href={`tel:${data?.setting?.phone || '+1234567890'}`} 
                  className="text-blue-400"
                >
                  {data?.setting?.phone || "(123) 456-7890"}
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold">Contact Email:</p>
              <p>
                <a
                  href={`mailto:${data?.setting?.email || 'info@chineserestaurant.com.np'}`}
                  className="text-blue-400"
                >
                  {data?.setting?.email || "info@chineserestaurant.com.np"}
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data?.setting?.address || 'Thamel, Kathmandu')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  {data?.setting?.address || "Thamel, Kathmandu"}
                </a>
              </p>
            </div>
          
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
}
