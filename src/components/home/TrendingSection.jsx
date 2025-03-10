import { useContext, useState } from "react";
import { Tab } from "@headlessui/react";
import { ApiContext } from "../../context/ApiContext";
import { MainPageSkeleton } from "../skeletons/MainPageSkeleton";
import RecipeLayout from "../ListView/Index";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const headings = ["Trending Recipe", "Most Searched Recipe"];

const TrendingSection = () => {
  const { bulkRecipe, randomData } = useContext(ApiContext);
  const [loading, isLoading] = useState(true);

  setTimeout(() => {
    isLoading(false);
  }, 1000);

  return (
    <Tab.Group>
      <Tab.List className="relative xl:max-w-[90%] 2xl:max-w-[90rem] px-2 xl:px-0 mx-auto mt-10 md:mt-32 flex items-center  text-gray-50">
        <div className=" w-full flex justify-center">
          {headings.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "py-4 w-full md:py-6 cursor-pointer text-md md:text-2xl xl:text-3xl leading-5",
                  "bg-black text-white",
                  selected
                    ? "bg-red-600 text-white"
                    : "text-blue-100  hover:bg-gray-400 opacity-85 border-0 hover:text-gray-800"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </div>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <div className="flex flex-wrap justify-center">
            {loading ? (
              <MainPageSkeleton cards={10} />
            ) : (
              <RecipeLayout bulkRecipe={bulkRecipe} />
            )}
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div className="flex flex-wrap justify-center">
            {loading ? (
              <MainPageSkeleton cards={10} />
            ) : (
              <RecipeLayout bulkRecipe={randomData} />
            )}
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TrendingSection;
