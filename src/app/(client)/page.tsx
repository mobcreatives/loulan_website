import HeroSection from "./_components/hero-section";
import RateYourExperience from "./_components/rate-your-experience";
import Featured from "./_components/featured/featured";
import Opening from "./_components/opening";
import Reservation from "./_components/reservation/reservation";
import FloatingReview from "./_components/floating-review/floating-review";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RateYourExperience />
      <Featured />
      <Opening />
      <Reservation />
      <FloatingReview />
    </>
  );
}
