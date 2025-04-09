"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components";

export default function FloatingContact() {
  return (
    <section className="fixed left-3 bottom-4">
      <Popover>
        <PopoverTrigger asChild>
          <button className="bg-primary rounded-full size-16 cursor-pointer font-semibold text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)]">
            Contact
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-90 bg-[#0A1316] border-[#0A1316]">
          <div className="text-white space-y-4">
            <h4 className="font-medium leading-none mb-5">Restaurant Contact</h4>
            <div>
              <p className="font-semibold">Restaurant Name:</p>
              <p>Loulan Chinese Restaurant</p>
            </div>
            <div>
              <p className="font-semibold">Contact Number:</p>
              <p>(123) 456-7890</p>
            </div>
            <div>
              <p className="font-semibold">Contact Email:</p>
              <p>info@chineserestaurant.com.np</p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p>Thamel, Kathmandu</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
}
