import { TextWithLine } from "@/components";
import ButtonWithBorder from "@/components/buttons/button-with-border";
import Image from "next/image";

export default function Booking() {
  return (
    <section className="flex flex-col items-center text-white pt-12 pb-15">
      <TextWithLine
        text="Table Booking"
        className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
      />
      <div className="flex flex-col md:flex-row gap-15 mt-10">
        <div className="space-y-5">
          <p className="text-center font-bold font-epilogue text-[clamp(1.375rem,1.0625rem+1vw,1.625rem)] uppercase">
            Choose A table
          </p>
          <div className="flex md:flex-col items-center justify-center gap-5">
            <button
              className="focus:outline-hidden cursor-pointer h-30 space-y-2"
              type="button"
            >
              <Image
                src="/images/rectangle-table.png"
                className="size-full object-cover"
                alt="a plate of freshly cooked barbecue/bbq"
                height={1080}
                width={1920}
              />
              <p className="font-bold font-epilogue text-[clamp(1.375rem,1.0625rem+1vw,1.625rem)] uppercase">
                RT1
              </p>
            </button>
            <button
              className="focus:outline-hidden cursor-pointer h-30 space-y-2 md:mt-10"
              type="button"
            >
              <Image
                src="/images/round-table.png"
                className="size-full object-cover"
                alt="a plate of freshly cooked barbecue/bbq"
                height={1080}
                width={1920}
              />
              <p className="font-bold font-epilogue text-[clamp(1.375rem,1.0625rem+1vw,1.625rem)] uppercase">
                R01
              </p>
            </button>
          </div>
        </div>
        <form className="font-epilogue space-y-8 text-[clamp(0.875rem,0.85rem+0.125vw,1rem)] w-100 mt-3">
          <div className="flex flex-col gap-y-6">
            <input
              type="text"
              name="number-of-guest"
              id="number-of-guest"
              placeholder="No. of Guests"
              className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
            />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Fullname"
              className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
            />
            <div className="grid grid-cols-2 gap-4 ">
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
              name="phone"
              id="phone"
              placeholder="Phone Number"
              className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              className="bg-white h-12 rounded-[8px] placeholder-[#555555] px-4 font-semibold focus:outline-[#FFD700]"
            />
          </div>
          <div className="flex justify-end lg:px-4">
            <ButtonWithBorder text="Submit" className="w-full" />
          </div>
        </form>
      </div>
    </section>
  );
}
