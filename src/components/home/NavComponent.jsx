import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import { motion } from "framer-motion";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signOutUser,
} from "../../Firebase/Firebase.config";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import { Cart } from "./CartComponent";
import logo from "../../assets/logo.webp";

export default function NavComponent() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [toggle, setToggle] = useState(true);
  const { cartItems } = useContext(CartContext);

  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (err) {
      console.log(err);
    }
  };

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  return (
    <nav className="lg:w-11/12 pt-4 mx-auto lg:p-2">
      <div className="py-2 px-3 lg:py-3 lg:px-6">
        <div className="flex justify-between">
          <div className="flex items-center ">
            <Link to="/" className=" cursor-pointer w-[7.7em] lg:w-[10em] ">
              <img className="w-full" src={logo} alt="logo" />
            </Link>
          </div>
          <div className="ml-2 flex h-9 lg:h-12">
            <div
              className={`${
                cartItems.length
                  ? " bg-white"
                  : "ring-2 ring-gray-800 ring-inset"
              } flex rounded-lg cursor-pointer items-center  `}
            >
              {toggle ? (
                <motion.div
                  className="lg:py-1 hover:rounded-lg hover:text-red-600 hover:ring-0 hover:bg-white"
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 200 }}
                  onClick={() => setToggle(!toggle)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 lg:h-6 lg:w-6 m-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              ) : (
                <Cart toggle={toggle} handleToggle={setToggle} />
              )}
            </div>

            {currentUser ? (
              <UserProfile signOutHandler={signOutHandler} />
            ) : (
              <Link
                onClick={signInWithGoogle}
                className="px-2 lg:px-5 lg:py-4 bg-red-600 text-sm xl:text-base xl:px-10 xl:py-2 rounded-md font-semibold ml-2 flex cursor-pointer items-center gap-x-1 border-red-600  hover:bg-zinc-100 
              text-white hover:text-black transition-all"
                to="/"
              >
                SignIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
