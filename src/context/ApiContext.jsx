import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apikey = import.meta.env.VITE_API_KEY;

export const ApiContext = createContext();

const notifyToast = (e) => {
  toast(e, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const ApiProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);
  // for handle api requests e.g. random recipe, homescreen recipe
  const [randomData, setRandom] = useState();
  const [bulkRecipe, setBulkRecipe] = useState();

  //for random recipes to display on home screen
  const randomFetch = async () => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${apikey}&number=10`
      );
      const data = res.data;
      setRandom(data.recipes);
    } catch (e) {
      notifyToast(e.response?.data?.message || "An error occurred");
    }
  };

  const fetchData = async () => {
    try {
      const bulkIds = "715,716,766,721,780,777,453,343,65665,5456,740";
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${bulkIds}&apiKey=${apikey}`
      );
      setBulkRecipe(res.data);
    } catch (e) {
      notifyToast(e.response?.data?.message || "An error occurred");
    }
  };

  //for Recipe Search
  const searchRecipe = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchData}&apiKey=${apikey}&addRecipeInformation=true`
    );
    setSearchData(response.data);
  };

  // Generate a random number for a recipe ID
  const generateNumber = () => {
    setRandomNumber(Math.floor(Math.random() * 50000) + 1000);
  };

  useEffect(() => {
    randomFetch();
    fetchData();
    generateNumber();
  }, []);

  useEffect(() => {
    if (!randomNumber) return; // Prevent API call if randomNumber is not set

    async function randomSearch() {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${randomNumber}/information?apiKey=${apikey}`
        );
        setRandomRecipe(response.data);
      } catch (e) {
        notifyToast("Sorry, item not available");
      }
    }
    randomSearch();
  }, [randomNumber]);

  const values = {
    randomData,
    bulkRecipe,
    searchData,
    setSearchData,
    searchRecipe,
    randomRecipe,
    setRandomRecipe,
    generateNumber,
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};
