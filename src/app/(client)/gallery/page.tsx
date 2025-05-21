"use client";

import { TextWithLine } from "@/components";
import React from "react";
import MasonryGallery from "./masnory-gallery";
import { AnimatedSection } from "@/components/animated-section";
import Head from "next/head";

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Gallery | Loulan Restaurant and Bar</title>
        <meta name="description" content="View the gallery of Loulan Restaurant and Bar in Thamel, Kathmandu. Explore our ambiance, dishes, and more through our photo collection." />
        <meta property="og:title" content="Gallery | Loulan Restaurant and Bar" />
        <meta property="og:description" content="View the gallery of Loulan Restaurant and Bar in Thamel, Kathmandu. Explore our ambiance, dishes, and more through our photo collection." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.loulanrestaurant.com.np/gallery" />
        <meta property="og:image" content="https://www.loulanrestaurant.com.np/og-image.jpg" />
      </Head>
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
    </>
  );
}
