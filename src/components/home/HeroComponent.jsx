import SearchSuggestions from "../search/SearchSuggestionComponent";
import NavComponent from "./NavComponent";
import Lottie from "lottie-react";
import animation from "../../assets/animation.json";

const HeroComponent = () => {
  return (
    <section
      className="min-h-svh "
      style={{
        background:
          "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(/hero.jpg) ",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <NavComponent />
      <div className="mt-10 py-10 mx-auto w-full lg:w-[50%]">
        <h1 className="text-center text-[6.8rem] text-gray-50 font-bold uppercase">
          Hey there! 👀
        </h1>
        <h2 className="text-center tracking-widest text-2xl lg:text-3xl text-red-50  mb-10">
          What are you planning on making today? 😋
        </h2>
        <hr />
      </div>

      <SearchSuggestions />
      {/* <div className="w-[35%] mx-auto -mt-14">
        <Lottie animationData={animation} />
      </div> */}
    </section>
  );
};

export default HeroComponent;
