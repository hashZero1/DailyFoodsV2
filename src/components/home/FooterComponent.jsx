import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";

const FooterComponent = () => {
  return (
    <footer className=" mt-20 bg-[#171717]">
      <div className="w-full max-w-(--breakpoint-xl) mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 cursor-pointer w-[7em] h-[35px] lg:w-[8em] lg:h-[42px]"
          >
            <img className="w-full" src={logo} alt="logo" />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a
                href="mailto:animesh8492@gmail.com"
                className="hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="#" className="hover:underline">
            DailyFoods v2.0
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default FooterComponent;
