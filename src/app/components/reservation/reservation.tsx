import { TextWithLine } from "@/components";
import ButtonWithBorder from "@/components/buttons/button-with-border";
import React from "react";

export default function Reservation() {
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
          <form className="font-epilogue space-y-6 text-[clamp(0.875rem,0.85rem+0.125vw,1rem)] w-100 md:w-150 xl:w-200">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="number-of-guest"
                id="number-of-guest"
                placeholder="No. of Guests"
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
              />
              <div className="grid md:grid-cols-2 gap-4 ">
                <input
                  type="text"
                  name="date"
                  id="date"
                  placeholder="Date"
                  className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
                />
                <input
                  type="text"
                  name="time"
                  id="time"
                  placeholder="Time"
                  className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
                />
              </div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fullname"
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
              />
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
              />
            </div>
            <div className="flex justify-end lg:px-4">
              <ButtonWithBorder text="Submit" className="w-full lg:w-fit" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
