import { TextWithLine } from "@/components";
import ButtonWithBorder from "@/components/buttons/button-with-border";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-[url('/images/hero-image.png')] bg-center bg-cover bg-no-repeat h-[79dvh] md:h-[83.5dvh] flex items-center justify-center">
      <div className="bg-[#000000cb] size-full flex flex-col items-center justify-center text-white space-y-2">
        <TextWithLine
          text="Hello, New Friend"
          className="before:h-[3px] before:w-[60px] before:-top-2 font-medium"
        />
        <h3 className="text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold">
          Reserve Your Table
        </h3>
        <div className="mt-2 flex gap-x-5 items-center ">
          <Link href="/booking">
            <ButtonWithBorder text="Book a Table" />
          </Link>
          <Link href="/menu">
            <button
              className="capitalize text-black py-2 px-4 font-medium font-fredoka bg-primary flex items-center gap-x-3 hover:[&>p>svg]:translate-x-0.5 rounded-full text-[clamp(0.75rem,0.7192rem+0.1299vw,0.875rem)] cursor-pointer"
              type="button"
            >
              <span>Explore Menu</span>
              <p className="bg-black rounded-full p-2">
                <ArrowRightIcon
                  className="text-white transition-transform duration-300"
                  size={16}
                  aria-hidden="true"
                />
              </p>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
