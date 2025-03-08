import React from "react";
import Lottie from "lottie-react";
import errorAnim from "../../assets/error.json";
const ErrorScreen = () => {
  return (
    <div className="h-[50%] w-full mt-20 p-2">
      <h1 className="text-3xl lg:text-5xl my-20 text-center text-gray-300 font-black ">
        API seem to be exhausted! Try again tomorrow
      </h1>
      <Lottie
        className="w-[90%] lg:w-[60%] 2xl:w-[80%] mx-auto"
        animationData={errorAnim}
      />
    </div>
  );
};

export default ErrorScreen;
