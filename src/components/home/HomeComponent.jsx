import FooterComponent from "./FooterComponent";
import NavComponent from "./NavComponent";
import TrendingSection from "./TrendingSection";
import RandomizedRecipe from "./RandomizedRecipe";
import HeroComponent from "./HeroComponent";

const HomeComponent = () => {
  return (
    <main className="">
      <HeroComponent />
      <TrendingSection />
      <RandomizedRecipe />
      <FooterComponent />
    </main>
  );
};
export default HomeComponent;
