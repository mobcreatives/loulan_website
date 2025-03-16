import HeroSection from "./components/hero-section";
import RateYourExperience from "./components/rate-your-experience";
import Menu from "./components/menu/menu";
import Special from "./components/special/special";
import Featured from "./components/featured/featured";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <RateYourExperience />
      <Menu />
      <Special />
      <Featured />
    </main>
  );
}
