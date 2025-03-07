import React from "react";
import DOMPurify from "dompurify";
import DetailsPageComponent from "../home/DetailsPageComponent";

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
    <div className="xl:max-w-[90%] 2xl:max-w-[90rem] mx-auto">
      <div className="my-5 p-2 flex rounded-xl    transition-all  hover:shadow-md  ">
        <div className="flex justify-center items-center mr-6 lg:w-[40%] 2xl:w-[30%]">
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
            <button className="px-6 py-1 lg:px-6 lg:py-3 bg-[#171717] text-white font-semibold hover:bg-gray-200 hover:text-red-500 transition-all rounded-lg">
              <DetailsPageComponent recipe={id} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListView = ({ bulkRecipe, addItemToCart, notify }) => {
  return (
    <div className=" mx-4 flex flex-wrap m-8">
      {bulkRecipe.map((product) => (
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
  );
};

export default ListView;
