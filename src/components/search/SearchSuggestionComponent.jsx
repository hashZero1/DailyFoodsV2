import { Combobox } from "@headlessui/react";
import { useContext, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import { Link } from "react-router-dom";

const SearchSuggestions = () => {
  const { searchData, setSearchData, searchRecipe } = useContext(ApiContext);
  const [query, setQuery] = useState("");
  const [recipes, setRecipe] = useState(() => [
    "pasta",
    "cauliflower",
    "vegetarian",
    "cuisine",
    "coffeebean",
    "tomato",
    "cheese",
    "egg",
    "meat",
    "paneer",
    "chicken",
    "sandwich",
    "seafood",
    "biryani",
    "potato",
    "rice",
    "taco",
    "rolls",
    "pancake",
  ]);
  const [activeRecipe, setActiveRecipe] = useState(null);

  const filteredRecipe =
    query === ""
      ? recipes
      : recipes.filter((recipe) =>
          recipe.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      <Combobox
        value={activeRecipe}
        onChange={(recipe) => {
          setActiveRecipe(recipe);
          setSearchData(recipe);

          // Attach to list of recipes
          if (!recipes.includes(recipe)) {
            setRecipe((existing) => [...existing, recipe]);
          }
        }}
        as="div"
        className="text-center -mt-4 2xl:mt-6 relative z-20"
      >
        <Combobox.Input
          className="px-4 py-2 lg:px-6 lg:py-3 2xl:py-4 w-[72%] lg:w-[40%] text-lg lg:text-xl bg-gray-50  rounded-full"
          placeholder="Search Recipe..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <Link onClick={searchRecipe} to={`/search/:${searchData}`}>
          <button
            className="group/button relative inline-flex ml-4 h-13 2xl:h-14 w-16 items-center justify-center overflow-hidden rounded-full bg-red-500 font-medium text-white transition-all duration-300 hover:w-48 cursor-pointer"
            aria-label="search"
          >
            <p className="inline-flex whitespace-nowrap text-md opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">
              Search Recipe
            </p>
            <div className="absolute right-5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </Link>
        <Combobox.Options className="absolute left-0 right-20 text-left top-12 lg:top-[4em] w-[70%] md:w-[65%] lg:w-[35%] mx-auto h-80 overflow-y-scroll yes-scrollbar z-40 rounded-xl">
          {query !== "" && (
            <Combobox.Option
              onChange={() => setSearchData(query)}
              value={query}
              className={({ active, selected }) => {
                return `px-4 py-2 bg-gray-50 pointer-default ${
                  active && selected
                    ? "bg-blue-50"
                    : active
                    ? "bg-blue-50"
                    : selected
                    ? "bg-blue-500 text-white"
                    : ""
                }`;
              }}
            >
              Create new recipe: {query}
            </Combobox.Option>
          )}
          {filteredRecipe.map((recipe) => {
            return (
              <Combobox.Option
                key={recipe}
                onChange={() => setSearchData(recipe)}
                value={recipe}
                className={({ active }) =>
                  `relative  text-md bg-gray-100 lg:text-lg px-5 py-2 capitalize  ${
                    active
                      ? "bg-red-500 cursor-pointer text-white"
                      : "text-gray-900"
                  }`
                }
              >
                {recipe}
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default SearchSuggestions;
