"use client";

import { TextWithLine } from "@/components";
import React from "react";
import Head from "next/head";
import { AnimatedSection } from "@/components/animated-section";

export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Loulan Chinese Korean Restaurant & Bar</title>
        <meta
          name="description"
          content="Discover Loulan Chinese Korean Restaurant & Bar in Thamel, Kathmandu. Experience authentic Chinese and Korean cuisines in a semi-fine dining setting."
        />
        <meta
          property="og:title"
          content="About Us | Loulan Chinese Korean Restaurant & Bar"
        />
        <meta
          property="og:description"
          content="Discover Loulan Chinese Korean Restaurant & Bar in Thamel, Kathmandu. Experience authentic Chinese and Korean cuisines in a semi-fine dining setting."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.loulanrestaurant.com.np/about"
        />
        <meta
          property="og:image"
          content="https://www.loulanrestaurant.com.np/og-image.jpg"
        />
      </Head>
      <main className="min-h-screen">
        <AnimatedSection
          className="px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 2xl:px-44 bg-[#0A1316] text-white py-10 space-y-14 flex justify-center"
          delay={0.2}
        >
          <div className="max-w-[900px] flex flex-col items-center">
            <TextWithLine
              text="About Us"
              className="font-fredoka text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[110px] before:h-[5px] before:-bottom-1"
            />
            <div className="mt-8 text-lg leading-relaxed text-center space-y-6">
              <p>
                <span className="font-bold text-primary">
                  Loulan Chinese Korean Restaurant & Bar
                </span>{" "}
                is a semi-fine dining destination nestled in the vibrant heart of
                Thamel, Kathmandu. We specialize in authentic Chinese and Korean
                cuisines, offering a culinary journey that blends tradition with
                innovation.
              </p>
              <p>
                Our menu features a diverse range of dishes, from the bold
                flavors of Sichuan cuisine to the comforting tastes of Korean
                jjigae. Highlights include our{" "}
                <span className="font-semibold">Spicy Stuffed Wings</span>, a
                popular appetizer known for its flavorful stuffing and spicy kick{" "}
        
              </p>
              <p>
                At Loulan, we&apos;re committed to providing an exceptional dining
                experience. Our chefs use only the finest ingredients to craft
                each dish, ensuring authenticity and quality. Whether you&apos;re
                joining us for a family gathering, a night out with friends, or a
                special celebration, Loulan is the perfect place to create
                lasting memories.
              </p>
              <p>
                We are open daily from 9:00 AM to 10:00 PM, welcoming guests for
                lunch, dinner, and late-night cravings. We invite you to discover
                Loulan and become part of our story.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-center">
              
              <div className="text-primary font-bold text-xl">
                Experience the Taste of Tradition &amp; Innovation
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}
