import Menu from "../_components/menu/menu";
import Special from "../_components/special/special";
import TrendingFood from "./_components/trending-foods";

export default function MenuPage() {
  return (
    <main>
      <Menu />
      <Special />
      <TrendingFood />
    </main>
  );
}
