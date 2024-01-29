import React from "react";
import "../Popular/Popular.css";
import { useProductContext } from "../../Context/ProductContext";
import Item from "../Item/Item";

const NewCollections = () => {
  const { allProducts } = useProductContext();
  // console.log(allProducts);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-6">
          Customers also purchased
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {allProducts.slice(0, 8).map((product) => (
            <Item key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewCollections;
