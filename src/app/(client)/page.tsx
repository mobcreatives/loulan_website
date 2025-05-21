import Head from "next/head";
import HeroSection from "./_components/hero-section";
import RateYourExperience from "./_components/rate-your-experience";
import Featured from "./_components/featured/featured";
import Opening from "./_components/opening";
import Reservation from "./_components/reservation/reservation";
import AnimatedSection from "./_components/animated-section";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Loulan Restaurant and Bar | Chinese & Korean Cuisine in Thamel, Kathmandu</title>
        <meta
          name="description"
          content="Loulan Restaurant and Bar offers authentic Chinese and Korean cuisine in the heart of Thamel, Kathmandu. Open daily from 10 AM to 1 AM. View our menus, make a reservation, browse our gallery, or contact us for more information."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Loulan Restaurant and Bar | Chinese & Korean Cuisine in Thamel, Kathmandu" />
        <meta property="og:description" content="Loulan Restaurant and Bar offers authentic Chinese and Korean cuisine in the heart of Thamel, Kathmandu. Open daily from 10 AM to 1 AM. View our menus, make a reservation, browse our gallery, or contact us for more information." />
        <meta property="og:type" content="restaurant" />
        <meta property="og:url" content="https://www.loulanrestaurant.com.np/" />
        <meta property="og:image" content="https://www.loulanrestaurant.com.np/og-image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Loulan Restaurant and Bar | Chinese & Korean Cuisine in Thamel, Kathmandu" />
        <meta name="twitter:description" content="Loulan Restaurant and Bar offers authentic Chinese and Korean cuisine in the heart of Thamel, Kathmandu. Open daily from 10 AM to 1 AM. View our menus, make a reservation, browse our gallery, or contact us for more information." />
        <meta name="twitter:image" content="https://www.loulanrestaurant.com.np/og-image.jpg" />
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Loulan Restaurant and Bar",
              "image": "https://www.loulanrestaurant.com.np/og-image.jpg",
              "servesCuisine": ["Chinese", "Korean"],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Thamel",
                "addressLocality": "Kathmandu",
                "addressCountry": "NP"
              },
              "openingHours": "Mo-Su 10:00-01:00",
              "url": "https://www.loulanrestaurant.com.np/",
              "telephone": "+977-XXXXXXXXX"
            }),
          }}
        />
      </Head>
      <main>
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
          <Reservation />
        </AnimatedSection>
      </main>
    </>
  );
}
