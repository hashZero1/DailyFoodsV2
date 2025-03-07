import { useState } from "react";
import ToggleView from "./ToggleView";
import ListView from "./ListView";
import GridView from "./GridView";

const RecipeLayout = ({ bulkRecipe }) => {
  const [layout, setLayout] = useState(true);

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
          <GridView bulkRecipe={bulkRecipe} />
        ) : (
          <ListView bulkRecipe={bulkRecipe} />
        )}
      </div>
    </div>
  );
};

export default RecipeLayout;
