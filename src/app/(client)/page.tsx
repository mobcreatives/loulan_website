"use client";

import HeroSection from "./_components/hero-section";
import RateYourExperience from "./_components/rate-your-experience";
import Featured from "./_components/featured/featured";
import Opening from "./_components/opening";
import Reservation from "./_components/reservation/reservation";
import AnimatedSection from "./_components/animated-section";
import { useAuth } from "@/context/auth-context";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@/config/routes";
import { useAuthAxios } from "@/config/auth-axios";
import { TResponse } from "@/global/types";
import { TReservationDetails } from "@/app/dashboard/reservations/types";

export default function Home() {
  const { isAdmin } = useAuth();
  const { _axios } = useAuthAxios();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await _axios.get<TResponse<TReservationDetails, "reservations">>(API_ROUTES.RESERVATIONS);
      return { totalReservations: response.data.reservations?.length || 0 };
    },
    enabled: isAdmin,
  });
  return (
    <>
      <main>
        {isAdmin && (
          <div className="bg-primary text-black rounded-lg p-6 mb-8 max-w-md mx-auto text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Admin Stats</h2>
            <p className="text-lg">Total Reservations: <span className="font-semibold">{isLoading ? 'Loading...' : (stats?.totalReservations ?? 0)}</span></p>
          </div>
        )}
        <h1 className="sr-only">Loulan Chinese Restaurant and Bar | Authentic Chinese & Korean Cuisine in Kathmandu</h1>
        <AnimatedSection className="hero-section" delay={0.2}>
          <HeroSection />
        </AnimatedSection>

        <AnimatedSection className="about-section" delay={0.4}>
          <RateYourExperience />
        </AnimatedSection>

        <AnimatedSection className="menu-preview" delay={0.6}>
          <Featured />
        </AnimatedSection>

        <AnimatedSection className="testimonials" delay={0.8}>
          <Opening />
        </AnimatedSection>

        <AnimatedSection delay={1}>
          {!isAdmin && <Reservation />}
        </AnimatedSection>
      </main>
    </>
  );
}
