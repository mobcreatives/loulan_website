import HeroSection from "./components/hero-section";
import RateYourExperience from "./components/rate-your-experience";
import Menu from "./components/menu/menu";
import Special from "./components/special/special";
import Featured from "./components/featured/featured";
import Opening from "./components/opening";
import Reservation from "./components/reservation/reservation";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RateYourExperience />
      <Menu />
      <Special />
      <Featured />
      <Opening />
      <Reservation />
    </main>
  );
}
