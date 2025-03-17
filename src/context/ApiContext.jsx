import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const apikey = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.spoonacular.com/recipes";

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
// Create API client with error handling
const apiClient = {
  get: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      notifyToast(errorMessage);
      throw error;
    }
  },
};

export const ApiProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [randomNumber, setRandomNumber] = useState(null);
  const [randomData, setRandom] = useState();
  const [bulkRecipe, setBulkRecipe] = useState();

  //for random recipes to display on home screen
  const randomFetch = useCallback(async () => {
    try {
      const data = await apiClient.get(
        `${API_BASE_URL}/random?apiKey=${apiKey}&number=10`
      );
      setRandom(data.recipes);
    } catch (error) {
      // Error already handled in apiClient
    }
  }, []);

  // Fetch bulk recipes for home screen
  const fetchBulkRecipes = useCallback(async () => {
    try {
      const bulkIds = "715,716,766,721,780,777,453,343,65665,5456,740";
      const data = await apiClient.get(
        `${API_BASE_URL}/informationBulk?ids=${bulkIds}&apiKey=${apikey}`
      );
      setBulkRecipe(data);
    } catch (error) {}
  }, []);

  // Search recipes
  const searchRecipe = useCallback(async (query) => {
    if (!query) return;

    try {
      const data = await apiClient.get(
        `${API_BASE_URL}/complexSearch?query=${query}&apiKey=${apikey}&addRecipeInformation=true`
      );
      setSearchData(data);
    } catch (error) {}
  }, []);

  // Fetch a single random recipe by ID
  const fetchRandomRecipeById = useCallback(async (id) => {
    if (!id) return;

    try {
      const data = await apiClient.get(
        `${API_BASE_URL}/${id}/information?apiKey=${apikey}`
      );
      setRandomRecipe(data);
    } catch (error) {
      notifyToast("Sorry, item not available");
    }
  }, []);

  // Generate random number for random recipe
  const generateRandomNumber = useCallback(() => {
    const number = Math.floor(Math.random() * 50000) + 1000;
    setRandomNumber(number);
  }, []);

  // To execute on first render
  useEffect(() => {
    randomFetch();
    fetchBulkRecipes();
    generateRandomNumber();
  }, [generateRandomNumber, fetchBulkRecipes, randomFetch]);

  useEffect(() => {
    if (randomNumber) {
      fetchRandomRecipeById(randomNumber);
    }
  }, [randomNumber, fetchRandomRecipeById]);

  const values = {
    randomData,
    bulkRecipe,
    searchData,
    setSearchData,
    searchRecipe,
    randomRecipe,
    setRandomRecipe,
    generateRandomNumber,
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

// import { createContext, useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const apikey = import.meta.env.VITE_API_KEY;

// export const ApiContext = createContext();

// const toastNotification = (e) => {
//   toast(e, {
//     position: "bottom-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
// };

// export const ApiProvider = ({ children }) => {
//   const [searchData, setSearchData] = useState([]);
//   const [randomRecipe, setRandomRecipe] = useState([]);
//   const [randomNumber, setRandomNumber] = useState();
//   // for handle other api requests e.g. random recipe, homescreen recipe
//   const [randomData, setRandom] = useState();
//   const [bulkRecipe, setBulkRecipe] = useState();

//   //for random recipes to display on home screen
//   const randomFetch = useCallback(async () => {
//     try {
//       const res = await axios.get(
//         `https://api.spoonacular.com/recipes/random?apiKey=${apikey}&number=10`
//       );
//       const data = res.data;
//       setRandom(data.recipes);
//     } catch (e) {
//       toastNotification(e.response.data.message);
//     }
//   }, []);

//   useEffect(() => {
//     randomFetch();
//   }, [randomFetch]);

//   // for home screen recipes
//   useEffect(() => {
//     async function FetchData() {
//       try {
//         const res = await axios.get(
//           `https://api.spoonacular.com/recipes/informationBulk?ids=715,716,766,721,780,777,453,343,65665,5456,740&apiKey=${apikey}`
//         );
//         const data = res.data;
//         setBulkRecipe(data);
//       } catch (e) {
//         toastNotification(e.response.data.message);
//       }
//     }
//     FetchData();
//   }, []);

//   //for searching recipe
//   const searchRecipe = async () => {
//     const response = await axios.get(
//       `https://api.spoonacular.com/recipes/complexSearch?query=${searchData}&apiKey=${apikey}&addRecipeInformation=true`
//     );
//     setSearchData(response.data);
//   };

//   //give random recipe on click

//   useEffect(() => {
//     async function randomNum() {
//       const number = Math.floor(Math.random() * 50000) + 1000;
//       setRandomNumber(number);
//     }
//     randomNum();
//   }, []);

//   useEffect(() => {
//     async function randomSearch() {
//       try {
//         const response = await axios.get(
//           `https://api.spoonacular.com/recipes/${randomNumber}/information?apiKey=${apikey}`
//         );
//         setRandomRecipe(response.data);
//       } catch (e) {
//         toastNotification("Sorry Item not Available");
//       }
//     }
//     randomSearch();
//   }, [randomNumber]);

//   const values = {
//     randomData,
//     bulkRecipe,
//     searchData,
//     setSearchData,
//     searchRecipe,
//     randomRecipe,
//     setRandomRecipe,
//   };

//   return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
// };
