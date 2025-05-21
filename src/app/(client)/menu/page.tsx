"use client";

import { TextWithLine } from "@/components";
import { useSearchParams } from "next/navigation";
import FoodList from "../_components/menu/food-list";
import { motion } from "framer-motion";
import Head from "next/head";

export default function MenuPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  return (
    <>
      <Head>
        <title>Menu | Loulan Restaurant and Bar</title>
        <meta name="description" content="Explore the menu at Loulan Restaurant and Bar in Thamel, Kathmandu. Authentic Chinese & Korean cuisine, delicious dishes, and more." />
        <meta property="og:title" content="Menu | Loulan Restaurant and Bar" />
        <meta property="og:description" content="Explore the menu at Loulan Restaurant and Bar in Thamel, Kathmandu. Authentic Chinese & Korean cuisine, delicious dishes, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.loulanrestaurant.com.np/menu" />
        <meta property="og:image" content="https://www.loulanrestaurant.com.np/og-image.jpg" />
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="px-6 sm:px-10 md:px-16 lg:px-28 xl:px-36 2xl:px-44 py-10 space-y-14"
        >
          <div className="space-y-3 flex flex-col items-center">
            <TextWithLine
              text="Discover Menu"
              className="font-fredoka text-white text-[clamp(2.125rem,2.0325rem+0.3896vw,2.5rem)] font-bold before:w-[170px] before:h-[5px] before:-bottom-1"
            />
          </div>
          <FoodList categoryId={categoryId ? parseInt(categoryId) : undefined} />
        </motion.section>
      </motion.main>
    </>
  );
}
