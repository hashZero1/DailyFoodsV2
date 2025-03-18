import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import uuid from "react-uuid";
import { AuthContext } from "../../context/AuthContext";
import DetailsPageComponent from "./DetailsPageComponent";

export const Cart = ({ toggle, handleToggle }) => {
  const { cartItems, deleteItemCart } = useContext(CartContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <button
        className="px-2 lg:px-4 h-full hover:rounded-lg cursor-pointer hover:text-red-600 hover:ring-0 hover:bg-white"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        onClick={() => handleToggle(!toggle)}
        aria-label="list-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {toggle ? (
        <main
          className={
            " fixed overflow-hidden bg-gray-800/40  z-40 bg-opacity-25 inset-0 transform ease-in-out " +
            (toggle
              ? " transition-opacity  opacity-100 duration-500 translate-x-0  "
              : " transition-all  delay-500 opacity-0 translate-x-full  ")
          }
        >
          <section
            className={
              " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
              (toggle ? " translate-x-0 " : " translate-x-full ")
            }
          >
            <button
              className="p-4 m-4 bg-gray-200 cursor-pointer hover:bg-red-500 rounded-full hover:text-red-100 hover:ring-0 "
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              onClick={() => handleToggle(!toggle)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="relative w-screen max-w-lg pb-10 flex flex-col space-y-2 px-4 overflow-y-scroll no-scrollbar h-full">
              {cartItems.length === 0 ? (
                <>
                  <div
                    key={uuid()}
                    className="p-2 mt-2 font-black text-2xl text-gray-400"
                  >
                    {currentUser ? (
                      <h1>Hi, {currentUser.displayName} 👀</h1>
                    ) : (
                      "Your list is empty."
                    )}
                  </div>
                  <p className="p-2 text-xl">
                    Your favorite recipe is just around the corner! Don't
                    wait—start saving your favorite recipes now so you can whip
                    them up and enjoy them later.
                    <br /> Happy cooking!
                  </p>
                </>
              ) : (
                <div className="pt-10 px-5 w-full xl:w-full">
                  {cartItems.map((item) => {
                    const { id, title, image } = item;

                    return (
                      <div
                        className="flex flex-col mx-2 my-4 p-2 bg-white shadow-md rounded-xl"
                        key={id}
                      >
                        <div className="flex flex-col-reverse ">
                          <div className="w-[30%] ">
                            <img
                              className="w-full rounded-xl object-fill"
                              src={image}
                              alt={image || "not-available"}
                            />
                          </div>
                          <div className="my-2 w-full">
                            <h3 className="mb-2 text-xl font-semibold">
                              {title}
                            </h3>
                          </div>
                        </div>
                        <div className="m-4 flex justify-evenly">
                          <button
                            className=" w-full p-0 py-2 bg-red-600 text-white font-semibold hover:bg-gray-200 cursor-pointer hover:text-black rounded-xl hover:border-0"
                            aria-label="details-page"
                          >
                            <DetailsPageComponent recipe={item} />
                          </button>

                          <button
                            onClick={() => deleteItemCart(item)}
                            className="ml-4 w-full bg-gray-200 text-black cursor-pointer font-semibold hover:bg-black hover:text-white rounded-xl hover:border-0"
                            aria-label="delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
          <section
            className=" w-screen h-full cursor-pointer "
            onClick={() => {
              handleToggle(false);
            }}
          ></section>
        </main>
      ) : null}
    </>
  );
};
