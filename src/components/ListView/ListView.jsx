import React, { memo } from "react";
import DOMPurify from "dompurify";
import DetailsPageComponent from "../home/DetailsPageComponent";
import ErrorScreen from "../skeletons/ErrorScreen";
import { useLocation } from "react-router-dom";

const Product = ({
  notify,
  id,
  title,
  description,
  diet,
  productImage,
  addItemToCart,
}) => {
  return (
    <div className="xl:max-w-[90%] 2xl:max-w-[90rem] mx-auto relative">
      <button
        onClick={() => {
          addItemToCart(id);
          notify();
        }}
        className="z-10 absolute h-12 w-12 m-2 -top-4 -right-4 text-gray-50 p-2 bg-red-600 text-red hover:bg-gray-800 hover:text-white transition-all rounded-full cursor-pointer "
        aria-label="add-recipe"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
      <div className="my-5 p-2 flex flex-col justify-center lg:flex-row rounded-xl  transition-all  hover:shadow-md  border-b">
        <div className="flex justify-center items-center mr-0 mb-4 lg:mb-0 lg:mr-6 lg:w-[40%] 2xl:w-[30%]">
          <img className="w-full rounded-xl" src={productImage} alt={title} />
        </div>
        <div className=" flex flex-col justify-around">
          <div>
            <h3 className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-xl xl:text-2xl">
              {title}
            </h3>
            <div className="py-2">
              <span className="rounded-full mr-1 bg-green-600 capitalize py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm  text-center">
                {diet[0]}
              </span>
              <span className="rounded-full bg-gray-700 capitalize py-0.5 px-2.5 border border-transparent text-sm text-white transition-all shadow-sm  text-center">
                {diet[1]}
              </span>
            </div>
            <p
              className="text-gray-500 py-2 leading-normal font-md"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description.slice(0, 210) + "...."),
              }}
            />
          </div>
          <div>
            <button
              className="px-6 py-1 lg:px-6 lg:py-3 bg-[#171717] text-white font-semibold hover:bg-gray-200 hover:text-red-500 transition-all rounded-lg"
              aria-label="details-page"
            >
              <DetailsPageComponent recipe={id} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListView = ({ bulkRecipe, addItemToCart, notify, searchData }) => {
  const location = useLocation();
  const { pathname } = location;
  const dataToRender = pathname === "/" ? bulkRecipe : searchData.results;
  return (
    <div>
      {dataToRender ? (
        <div className=" mx-4 flex flex-wrap m-8">
          {dataToRender?.map((product) => (
            <Product
              key={product.id}
              id={product}
              title={product.title}
              addItemToCart={addItemToCart}
              notify={notify}
              description={product.summary}
              diet={product.diets}
              productImage={product.image}
            />
          ))}
        </div>
      ) : (
        <ErrorScreen />
      )}
    </div>
  );
};

export default memo(ListView);
