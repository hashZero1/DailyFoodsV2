// import { ToastContainer } from "react-toastify";
// import { motion } from "framer-motion";
// import DetailsPageComponent from "./DetailsPageComponent";
// import { CartContext } from "../../context/CartContext";
// import { useContext } from "react";
// import DOMPurify from "dompurify";

// const time = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className="w-6 h-6 inline-block"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//     />
//   </svg>
// );

// const RecipeComponent = ({ bulkRecipe }) => {
//   const { addItemToCart, notify } = useContext(CartContext);

//   return (
//     <section className="mt-5">
//       <div className="flex flex-wrap justify-center">
//         {bulkRecipe?.map((dt) => (

//           <div class="relative flex flex-col justify-between m-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full md:w-[40%] lg:w-96">
//             <div>
//               <button
//                 onClick={() => {
//                   addItemToCart(dt);
//                   notify();
//                 }}
//                 className="z-10 absolute h-12 w-12 m-2 -top-4 -right-4 text-gray-50 p-2 bg-red-600 text-red hover:bg-gray-800 hover:text-white transition-all rounded-full cursor-pointer "
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//               <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
//                 <img src={dt.image} alt={dt.title} />
//               </div>
//               <div class="p-4">
//                 <div class="mb-4 flex ">
//                   <span className="rounded-full mr-1 bg-gray-500 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm  text-center">
//                     {dt.diets[0]}
//                   </span>
//                   <span className="rounded-full bg-gray-500 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm  text-center">
//                     {dt.diets[1]}
//                   </span>
//                 </div>
//                 <h6 class="mb-2 text-slate-700 text-xl font-bold">
//                   {dt.title}
//                 </h6>
//                 <p
//                   class="text-gray-500 leading-normal font-md"
//                   dangerouslySetInnerHTML={{
//                     __html: DOMPurify.sanitize(
//                       dt.summary.slice(0, 120) + "...."
//                     ),
//                   }}
//                 />
//               </div>
//             </div>

//             <div class=" p-4">
//               <button className="px-6 py-1 lg:px-4 lg:py-1 bg-[#171717] text-white font-semibold hover:bg-gray-800 hover:text-white transition-all rounded-lg">
//                 <DetailsPageComponent recipe={dt} />
//               </button>
//             </div>
//           </div>
//         ))}
//         <ToastContainer />
//       </div>
//     </section>
//   );
// };

// export default RecipeComponent;
