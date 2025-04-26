import HeroSection from "./_components/hero-section";
import RateYourExperience from "./_components/rate-your-experience";
import Featured from "./_components/featured/featured";
import Opening from "./_components/opening";
import Reservation from "./_components/reservation/reservation";
import AnimatedSection from "./_components/animated-section";

export default function Home() {
  return (
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
  );
}
