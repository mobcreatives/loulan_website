import {
  FacebookIconComponent,
  InstagramIconComponent,
  LinkedInIconComponent,
  TwitterIconComponent,
} from "@/components";
import { APP_ROUTES } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#121A1D] text-[#797B78] flex justify-center px-6 sm:px-10 md:px-16 lg:px-20 2xl:px-44 py-12">
      <div className="w-full max-w-[1200px] flex justify-between xl:items-center gap-x-5 flex-col xl:flex-row">
        <div className="space-y-5">
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
          <p className="text-[clamp(0.75rem,0.725rem+0.125vw,0.875rem)] w-100">
            Lorem ipsum dolor sit amet consectetur. Tristique cursus morbi nibh
            nec et vulputate. Turpis tortor nisi imperdiet quis accumsan. Ligula
            netus amet leo ultricies. Neque venenatis magnis amet eget sagittis
            leo enim.
          </p>
          <div className="flex items-center -mt-3">
            <p className="size-12">
              <FacebookIconComponent />
            </p>
            <p className="size-12">
              <TwitterIconComponent />
            </p>
            <p className="size-12">
              <InstagramIconComponent />
            </p>
            <p className="size-12">
              <LinkedInIconComponent />
            </p>
          </div>
        </div>
        <div className="flex gap-x-8 mt-8 xl:mt-0 flex-col gap-y-5 lg:flex-row lg:justify-between ">
          <div className="text-[clamp(0.75rem,0.725rem+0.125vw,0.875rem)] space-y-4">
            <h4 className="text-white text-[clamp(0.75rem,0.7rem+0.25vw,1rem)] font-semibold">
              Opening Restaurant
            </h4>
            <div className="space-y-2">
              <p>Sa - We: 09:00am - 10:00pm</p>
              <p>Thu - We: 09:00am - 10:00pm</p>
              <p>Friday Closed</p>
            </div>
          </div>
          {/* <div className="text-[clamp(0.75rem,0.725rem+0.125vw,0.875rem)] space-y-4">
            <h4 className="text-white text-[clamp(0.75rem,0.7rem+0.25vw,1rem)] font-semibold">
              User Link
            </h4>
            <div className="space-y-2">
              <p>About Us</p>
              <p>Contact Us</p>
              <p>Order Delivery</p>
              <p>Payment and Tax</p>
              <p>Terms and Services</p>
            </div>
          </div> */}
          <div className="text-[clamp(0.75rem,0.725rem+0.125vw,0.875rem)] space-y-4">
            <h4 className="text-white text-[clamp(0.75rem,0.7rem+0.25vw,1rem)] font-semibold">
              Contact Us
            </h4>
            <div className="space-y-4">
              <p>
                543 Country Club Ave, <br />
                NC 27587, London, UK <br />
                +1257 6541120
              </p>
              <div className="bg-white p-1.5 rounded-[8px] flex items-center w-85 min-[750px]:w-60 min-[850px]:w-70">
                <input
                  className="w-full focus:outline-none placeholder:text-[#6A6A6A] placeholder:text-[clamp(0.875rem,0.825rem+0.25vw,1.125rem)] pl-2"
                  type="text"
                  name="subscribe"
                  id="subscribe"
                  placeholder="Email"
                />
                <button
                  type="submit"
                  className="bg-primary py-1.5 px-3 rounded-[8px] text-black text-[clamp(0.875rem,0.825rem+0.25vw,1.125rem)]"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
