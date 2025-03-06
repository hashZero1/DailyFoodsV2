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
  const [activePerson, setActivePerson] = useState(null);

  const filteredPeople =
    query === ""
      ? recipes
      : recipes.filter((recipe) =>
          recipe.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      <Combobox
        value={activePerson}
        onChange={(recipe) => {
          setActivePerson(recipe);
          setSearchData(recipe);

          // Attach to list of recipes
          if (!recipes.includes(recipe)) {
            setRecipe((existing) => [...existing, recipe]);
          }
        }}
        as="div"
        className="text-center mt-6 relative z-20"
      >
        <Combobox.Input
          className="px-4 py-2 lg:px-6 lg:py-4 w-[72%] lg:w-[40%] text-lg lg:text-xl bg-gray-50  rounded-full"
          placeholder="Search Recipe..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <Link onClick={() => searchRecipe()} to={`/search/:${searchData}`}>
          <button className="group/button relative inline-flex ml-4 h-14 w-16 items-center justify-center overflow-hidden rounded-full bg-red-500 font-medium text-white transition-all duration-300 hover:w-44">
            <p className="inline-flex whitespace-nowrap text-md opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">
              Search Recipe
            </p>
            <div className="absolute right-5 ">
              <svg
                viewBox="0 0 15 15"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-white"
              >
                <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"></path>
              </svg>
            </div>
          </button>
        </Link>
        <Combobox.Options className="absolute left-4 lg:left-[16.5em] text-left top-12 lg:top-[4em] h-80 overflow-y-scroll no-scrollbar z-40">
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
          {filteredPeople.map((recipe) => {
            return (
              <Combobox.Option
                key={recipe}
                onChange={() => setSearchData(recipe)}
                value={recipe}
                className={({ active }) =>
                  `relative min-w-[18.4em] lg:min-w-[40em] text-md bg-gray-100 lg:text-lg px-5 py-2 capitalize  ${
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
