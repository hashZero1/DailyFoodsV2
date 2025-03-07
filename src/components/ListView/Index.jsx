import { useContext, useState } from "react";
import ToggleView from "./ToggleView";
import ListView from "./ListView";
import GridView from "./GridView";
import { CartContext } from "../../context/CartContext";

const RecipeLayout = ({ bulkRecipe }) => {
  const [layout, setLayout] = useState(true);
  const { addItemToCart, notify } = useContext(CartContext);

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
            addItemToCart={addItemToCart}
            notify={notify}
          />
        ) : (
          <ListView
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
