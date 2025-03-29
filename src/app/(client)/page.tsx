import HeroSection from "./_components/hero-section";
import RateYourExperience from "./_components/rate-your-experience";
import Menu from "./_components/menu/menu";
import Featured from "./_components/featured/featured";
import Opening from "./_components/opening";
import Reservation from "./_components/reservation/reservation";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RateYourExperience />
      <Menu showMenuText />
      <Featured />
      <Opening />
      <Reservation />
    </>
  );
}
