import SearchSuggestions from "../search/SearchSuggestionComponent";
import NavComponent from "./NavComponent";
import Lottie from "lottie-react";
import animation from "../../assets/animation.json";
import animationpan from "../../assets/animationpan.json";
import hero from "../../assets/hero.webp";

const HeroComponent = () => {
  return (
    <section
      className="min-h-svh "
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${hero})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <NavComponent />
      <div className="mt-32 p-2 md:mt-0 2xl:mt-10 py-10 mx-auto w-full lg:w-[50%]">
        <h1 className="text-center text-5xl lg:text-7xl 2xl:text-[6.2rem] text-gray-50 font-bold uppercase">
          Hey there! 👀
        </h1>
        <h2 className="text-center tracking-widest text-2xl lg:text-xl 2xl:text-3xl text-red-50 mb-8 mt-6 md:mb-4 2xl:mb-10 lg:mt-4 2xl:mt-6">
          What are you planning on making today? 😋
        </h2>
        <hr />
      </div>

      <SearchSuggestions />
      <div className="w-full mt-12 md:w-[80%] lg:w-[42%] 2xl:w-[38%] mx-auto lg:-mt-12">
        <Lottie animationData={animationpan} />
      </div>
    </section>
  );
};

export default HeroComponent;
