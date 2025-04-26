"use client";

import { TextWithLine } from "@/components";
import React from "react";
import MasonryGallery from "./masnory-gallery";
import { AnimatedSection } from "@/components/animated-section";

export default function Gallery() {
  return (
    <main className="min-h-screen">
      <AnimatedSection
        className="px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 2xl:px-44 bg-[#0A1316] text-white py-10 space-y-14 flex justify-center"
        delay={0.2}
      >
        <div className="max-w-[1200px] flex flex-col items-center">
          <TextWithLine
            text="Gallery"
            className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[110px] before:h-[5px] before:-bottom-1"
          />
          <MasonryGallery />
        </div>
      </AnimatedSection>
    </main>
  );
}
