import { Drawer } from "vaul";

export default function DetailsPageComponent({ recipe }) {
  const Nameless = () => {
    const anslyzedIns = recipe.analyzedInstructions[0]?.steps;
    return anslyzedIns?.map((dt) => (
      <li className="ml-5" key={dt.number}>
        {dt.step}
      </li>
    ));
  };

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="border-0 hover:border-0 px-2 cursor-pointer">
          Show Details
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/50" />
        <Drawer.Content className="bg-zinc-100 z-30 text-gray-700 flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
          <div className="pt-2 lg:p-4 bg-white overflow-y-scroll no-scrollbar rounded-t-[10px] flex-1">
            <div className="mx-auto w-24 h-1.5 shrink-0 rounded-full bg-red-400 mb-8 cursor-grab" />
            <div className="flex flex-col justify-center p-4 lg:p-10 max-w-[90rem] mx-auto rounded-t-[10px]">
              <div className="flex flex-col lg:flex-row  lg:text-lg ">
                <div className="lg:mr-10 mb-5 lg:mb-0 ">
                  <img
                    className="w-full rounded-xl"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                </div>
                <div>
                  <Drawer.Title className="font-bold text-xl lg:text-4xl text-gray-800">
                    {recipe.title}
                  </Drawer.Title>
                  <div className="flex mt-6">
                    <div className="text-xl text-gray-700 font-semibold mr-10">
                      <p>Total servings</p>
                      <p className="text-green-100 mt-2 font-bold bg-green-500 w-12 h-12 flex items-center justify-center rounded-full">
                        {recipe.servings}
                      </p>
                    </div>
                    <div className=" text-gray-700 capitalize">
                      <p className="text-xl font-semibold">DishTypes</p>
                      <div className="">
                        <p>{recipe.dishTypes[0]}</p>
                        <p>{recipe.dishTypes[1]}</p>
                        <p>{recipe.dishTypes[2]}</p>
                        <p>{recipe.dishTypes[3]}</p>
                        <p>{recipe.dishTypes[4]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" text-justify">
                <h2 className="font-black text-gray-400 mb-2 text-xl lg:text-4xl mt-5 lg:mt-8">
                  Instructions :
                </h2>
                <p className=" leading-relaxed tracking-wide lg:text-lg ">
                  {!recipe.instructions ? "Not Available" : recipe.instructions}
                </p>
                <h3 className="mb-2 font-black text-gray-400 mt-8 text-lg lg:text-2xl">
                  Step by Steps Intructions :
                </h3>
                <ul className="leading-relaxed tracking-wide lg:text-lg list-disc ">
                  {!recipe.analyzedInstructions ? (
                    "Not Available"
                  ) : (
                    <Nameless />
                  )}
                </ul>
              </div>
            </div>
            {/* <div className="mx-auto w-40 h-1.5 shrink-0 rounded-full bg-zinc-300  my-2" /> */}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
