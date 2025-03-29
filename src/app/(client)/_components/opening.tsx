import { TextWithLine } from "@/components";
import { APP_ROUTES } from "@/config/routes";
import Link from "next/link";
import React from "react";

export default function Opening() {
  return (
    <section className="bg-[url('/images/opening-bg.png')] bg-cover bg-no-repeat bg-center text-white my-16">
      <div className="bg-[#000000cb] flex justify-center px-6 sm:px-10 md:px-16 lg:px-40 2xl:px-44 py-12">
        <div className="flex items-center flex-col gap-y-12 md:flex-row md:gap-y-0 w-full justify-between max-w-[1200px]">
          <div className="space-y-2">
            <TextWithLine
              text="RESERVATION"
              className="before:w-[50px] before:left-0 before:translate-x-0 before:-bottom-0.5 before:h-[2px] text-xs"
            />
            <p className="text-[clamp(2.25rem,2.1266rem+0.5195vw,2.75rem)] font-bold">
              Working Hours
            </p>
            <div className="text-[clamp(0.875rem,0.8442rem+0.1299vw,1rem)] space-x-3">
              <Link href={APP_ROUTES.BOOKING}>
                <button
                  type="button"
                  className="uppercase bg-primary text-black px-4 pb-1.5 pt-2 rounded-[4px] cursor-pointer focus:outline-none"
                >
                  Book A Table
                </button>
              </Link>
              <button
                type="button"
                className="uppercase text-white px-4 pb-1.5 pt-2 rounded-[4px] cursor-pointer focus:outline-none"
              >
                contact us
              </button>
            </div>
          </div>
          <div className="bg-[#121A1D] p-12 text-center space-y-11">
            <div className="space-y-1">
              <p className="font-semibold text-sm">Sunday to Tuesday</p>
              <p className="text-xs">9:00 AM - 10:00 PM</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-sm">Friday to Saturday</p>
              <p className="text-xs">9:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
