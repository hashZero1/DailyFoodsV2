import React from "react";
import DOMPurify from "dompurify";
import DetailsPageComponent from "../home/DetailsPageComponent";
import ErrorScreen from "../skeletons/ErrorScreen";
import path from "path";
import { useLocation } from "react-router-dom";

const Product = ({
  key,
  id,
  title,
  description,
  diet,
  productImage,
  addItemToCart,
  notify,
}) => {
  return (
    <div class="relative flex flex-col justify-between m-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full md:w-[40%] xl:w-96">
      <div>
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
        <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
          <img className="w-full object-cover" src={productImage} alt={title} />
        </div>
        <div class="p-4">
          <div class="mb-4 flex flex-wrap md:flex-nowrap">
            <span className="rounded-full mr-1 bg-green-600 capitalize py-0.5 px-2.5 h-[22px] border border-transparent text-xs text-white mb-1 md:mb-0 transition-all shadow-sm  text-center">
              {diet[0]}
            </span>
            <span className="rounded-full bg-gray-700 capitalize py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm  text-center">
              {diet[1]}
            </span>
          </div>
          <h6 class="mb-2 text-slate-700 text-xl font-bold">{title}</h6>
          <p
            class="text-gray-500 leading-normal font-md"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description.slice(0, 120) + "...."),
            }}
          />
        </div>
      </div>

      <div class=" p-4">
        <button
          className="px-6 py-1 lg:px-6 lg:py-3 bg-[#171717] text-white font-semibold hover:bg-gray-200 hover:text-red-500 transition-all rounded-lg"
          aria-label="details-page"
        >
          <DetailsPageComponent recipe={id} />
        </button>
      </div>
    </div>
  );
};
const GridView = ({ bulkRecipe, addItemToCart, notify, searchData }) => {
  const location = useLocation();
  const { pathname } = location;
  const dataToRender = pathname === "/" ? bulkRecipe : searchData.results;

  return (
    <div>
      {dataToRender ? (
        <div className="flex flex-wrap justify-center">
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

export default GridView;
