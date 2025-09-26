"use client";

import { TextWithLine } from "@/components";
import React from "react";
import Head from "next/head";
import { AnimatedSection } from "@/components/animated-section";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/config/constants";
import { _axios } from "@/config/axios";
import { API_ROUTES } from "@/config/routes";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AboutEditor from "./_components/about-editor";

type TAbout = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
} | null;

export default function About() {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { data: about } = useQuery<{ message: string; about: TAbout }>({
    queryKey: KEYS.ABOUT.GET,
    queryFn: async () => {
      const res = await _axios.get(API_ROUTES.ABOUT);
      return res.data;
    },
  });

  // Editor is rendered only when editing to avoid any SSR window access

  const { mutateAsync: saveAbout, isPending } = useMutation({
    mutationFn: async (content: string) => {
      const res = await _axios.patch(API_ROUTES.ABOUT, { content });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: KEYS.ABOUT.GET });
      setIsEditing(false);
    },
  });
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
            <div className="mt-8 text-lg leading-relaxed text-center space-y-6 w-full">
              {isEditing && isAdmin ? (
                <AboutEditor
                  initialHTML={about?.about?.content}
                  isPending={isPending}
                  onCancel={() => setIsEditing(false)}
                  onSave={async (html) => {
                    await saveAbout(html);
                  }}
                />
              ) : (
                <>
                  {about?.about?.content ? (
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: about.about.content }}
                    />
                  ) : (
                    <p>About content coming soon.</p>
                  )}
                  {isAdmin && (
                    <div className="mt-6 flex justify-end w-full">
                      <Button
                        className="btn-gold"
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      >
                        Edit About
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="mt-10 flex flex-col items-center">
              
              
            </div>
          </div>
        </AnimatedSection>
      </main>
    </>
  );
}
