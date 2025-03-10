import { useContext } from "react";
import { ApiContext } from "../../context/ApiContext";
import { CartContext } from "../../context/CartContext";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const time = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 inline-block"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);

const RandomizedRecipe = () => {
  const { randomRecipe } = useContext(ApiContext);
  const { addItemToCart, notify } = useContext(CartContext);

  return (
    <div className="p-2 mt-20">
      <div className="flex items-center max-w-[90rem] mx-auto ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 md:size-10 ml-5"
        >
          <path
            className="fill-gray-500 "
            d="M9.375 3a1.875 1.875 0 0 0 0 3.75h1.875v4.5H3.375A1.875 1.875 0 0 1 1.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0 1 12 2.753a3.375 3.375 0 0 1 5.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 1 0-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3ZM11.25 12.75H3v6.75a2.25 2.25 0 0 0 2.25 2.25h6v-9ZM12.75 12.75v9h6.75a2.25 2.25 0 0 0 2.25-2.25v-6.75h-9Z"
          />
        </svg>
        <h1 className="text-gray-400 p-4  text-2xl lg:text-4xl font-black capitalize">
          today's recipe for you
        </h1>
      </div>
      <hr className="max-w-[88rem] border-2 mx-auto" />
      <div className="flex justify-center mt-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          key={randomRecipe.id}
          className=" w-full md:max-w-md lg:max-w-4xl m-2 lg:m-0 2xl:m-2 bg-opacity-50 bg-white rounded-lg shadow-sm"
        >
          <div className="flex p-2 lg:p-3 relative">
            <button aria-label="add-recipe">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  addItemToCart(randomRecipe);
                  notify();
                }}
                className="absolute h-9 w-9 lg:h-10 lg:w-10 m-2 top-0 right-0 text-gray-50 p-2 bg-red-600 text-red hover:bg-gray-800 hover:text-white transition-all rounded-full cursor-pointer "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="rounded-lg w-[50%] lg:w-80">
              <img
                className="w-full h-full object-contain rounded-lg"
                src={randomRecipe.image}
                alt={randomRecipe.title}
              />
            </div>
            <div className="min-h-min px-2 lg:p-5">
              <h5 className="mb-2 text-lg lg:text-xl font-bold tracking-normal text-gray-700">
                {randomRecipe.title ? randomRecipe.title : "Not available"}
              </h5>
              <p className="my-2 lg:my-4 h-10 overflow-y-auto no-scrollbar font-normal text-gray-700 dark:text-gray-600">
                {time} {randomRecipe.readyInMinutes} minutes
              </p>
              <div className="text-gray-700">
                <b className="mt-5">Total servings</b>
                <p>{randomRecipe.servings}</p>
              </div>
            </div>
          </div>
        </motion.div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RandomizedRecipe;
