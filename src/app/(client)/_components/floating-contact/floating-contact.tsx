"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components";

export default function FloatingContact() {
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
              {/* Link for phone call */}
              <p>
                <a href="tel:+1234567890" className="text-blue-400">
                  (123) 456-7890
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold">Contact Email:</p>
              {/* Link for email */}
              <p>
                <a
                  href="mailto:info@chineserestaurant.com.np"
                  className="text-blue-400"
                >
                  info@chineserestaurant.com.np
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              {/* Link for Google Maps */}
              <p>
                <a
                  href="https://maps.app.goo.gl/dLLh33CwwPd6hyi68"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  Thamel, Kathmandu
                </a>
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
}
