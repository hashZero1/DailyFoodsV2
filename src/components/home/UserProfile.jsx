import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import avatarImg from "../../assets/man.webp";

export default function UserProfile({ signOutHandler }) {
  const { currentUser } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);

  const reload = () => window.location.reload();
  return (
    <div className="relative px-1 border ml-5 bg-gray-50 rounded-full">
      <button type="button" onClick={() => setToggle(!toggle)}>
        <img
          className="w-10 h-10 rounded-full cursor-pointer"
          src={avatarImg}
          alt="User dropdown"
        />
      </button>

      {toggle ? (
        <div
          id="userDropdown"
          className="z-10 absolute mt-2 -right-5 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-54 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-3 py-3 text-sm text-gray-50 ">
            <h1> {currentUser.displayName}</h1>
            <span className="block text-gray-400 truncate text-sm font-medium">
              {currentUser.email}
            </span>
          </div>

          <div className="py-1">
            <Link
              className="block m-2 rounded-md px-4 py-2 text-sm font-semibold bg-red-500 text-white hover:bg-red-700 "
              onClick={() => {
                signOutHandler();
                reload();
              }}
              to="/"
            >
              SignOut
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
