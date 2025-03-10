import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const apikey = import.meta.env.VITE_API_KEY;

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [randomNumber, setRandomNumber] = useState();
  // for handle other api requests e.g. random recipe, homescreen recipe
  const [randomData, setRandom] = useState();
  const [bulkRecipe, setBulkRecipe] = useState();

  // const nums = new Set();
  // while(nums.size !== 8) {
  //     nums.add(Math.floor(Math.random() * 1100) + 400);
  // }
  // console.log([...nums])

  //for random recipes to display on home screen
  const randomFetch = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/random?apiKey=${apikey}&number=10`
      );
      const data = res.data;
      setRandom(data.recipes);
    } catch (e) {
      console.log(e.response.data.message);
    }
  }, []);

  useEffect(() => {
    randomFetch();
  }, [randomFetch]);

  // for home screen recipes
  useEffect(() => {
    async function FetchData() {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/informationBulk?ids=715,716,766,721,780,777,453,343,65665,5456,740&apiKey=${apikey}`
        );
        const data = res.data;
        setBulkRecipe(data);
      } catch (e) {
        console.log(e.response.data.message);
      }
    }
    FetchData();
  }, []);

  //for searching recipe
  const searchRecipe = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchData}&apiKey=${apikey}&addRecipeInformation=true`
      );
      console.log(response.data);
      setSearchData(response.data);
    } catch (e) {
      console.log("sorry item is not available");
    }
  };

  //give random recipe on click
  useEffect(() => {
    async function randomNum() {
      const number = Math.floor(Math.random() * 50000) + 1000;
      setRandomNumber(number);
      console.log(number);
    }
    randomNum();
  }, []);

  useEffect(() => {
    async function randomSearch() {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${randomNumber}/information?apiKey=${apikey}`
        );
        console.log(response.data);
        setRandomRecipe(response.data);
      } catch (e) {
        console.log("sorry item is not available");
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
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};
