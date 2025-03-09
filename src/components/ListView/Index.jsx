import { useContext, useState } from "react";
import ToggleView from "./ToggleView";
import ListView from "./ListView";
import GridView from "./GridView";
import { CartContext } from "../../context/CartContext";
import { ApiContext } from "../../context/ApiContext";
import NavComponent from "../home/NavComponent";

const RecipeLayout = ({ bulkRecipe, dt }) => {
  const [layout, setLayout] = useState(true);
  const { addItemToCart, notify } = useContext(CartContext);
  const { searchData } = useContext(ApiContext);

  const handleToggle = () => {
    const newState = !layout;
    setLayout(newState);
  };
  return (
    <div className="mt-20">
      <div>
        <ToggleView handleToggle={handleToggle} layout={layout} />
      </div>
      <div className="mt-11">
        {layout ? (
          <GridView
            bulkRecipe={bulkRecipe}
            searchData={searchData}
            addItemToCart={addItemToCart}
            notify={notify}
          />
        ) : (
          <ListView
            searchData={searchData}
            bulkRecipe={bulkRecipe}
            addItemToCart={addItemToCart}
            notify={notify}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeLayout;
