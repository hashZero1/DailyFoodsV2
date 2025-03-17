import NavComponent from "../home/NavComponent";
import FooterComponent from "../home/FooterComponent";
import RecipeLayout from "../ListView/Index";

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

const SearchResult = () => {
  return (
    <div className="px-2 lg:px-0">
      <NavComponent />
      <div className=" xl:max-w-[90%] 2xl:max-w-[90rem] mx-auto mt-20 -mb-30">
        <h1 className="text-2xl md:text-4xl font-black text-gray-400">
          Search Results
        </h1>
      </div>
      <RecipeLayout />
      <FooterComponent />
    </div>
  );
};

export default SearchResult;
