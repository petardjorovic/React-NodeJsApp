import React from "react";
import { Link } from "react-router-dom";

function SingleProductCardComponent({ product }) {
  return (
    <div className="w-[300px] h-[450px] border border-slate-900 rounded-md bg-gray-300 dark:bg-gray-700 dark:border-slate-200">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="object-cover w-full h-[180px] bg-white rounded-t-md"
      />
      <div className="flex flex-col items-center gap-[30px] py-[30px]">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <Link
          to={"/singleProduct/" + product.id}
          className="px-6 py-3 bg-red-500 rounded-lg"
        >
          Show More
        </Link>
      </div>
    </div>
  );
}

export default SingleProductCardComponent;
