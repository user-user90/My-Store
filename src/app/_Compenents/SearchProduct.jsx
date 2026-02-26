"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import useStore from "../_store/UseStore";
import { client } from "@/lib/sanity"; // تأكد من مسار الـ client

function SearchProducts({ closMenu }) {
  // ## LOCAL STATE TO STORE ALL PRODUCTS FROM SANITY
  const [product, setProducts] = useState([]);

  // ## ZUSTAND STORE HOOKS
  const { searchProduct, searchProductItem } = useStore();

  // ## FETCH DATA FROM SANITY
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        _id,
        name,
        price,
        "slug": slug.current,
        "imageUrl": media[0].asset->url
      }`;
      const data = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // ## FILTERING LOGIC: SEARCH PRODUCTS BY NAME
  const filterProduct = product?.filter((item) => {
    return item?.name?.toLowerCase().includes(searchProduct.toLowerCase());
  });

  return (
    /* ## FULL SCREEN BACKDROP OVERLAY */
    <header
      onClick={() => {
        searchProductItem(""); 
        if (closMenu) closMenu(); 
      }}
      className="fixed inset-0 flex justify-center items-start pt-20 bg-black/50 backdrop-blur-sm transition-opacity px-6 z-[100]"
    >
      {/* ## SEARCH MODAL CONTAINER */}
      <div
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-4xl bg-white shadow-2xl border border-gray-100 overflow-y-auto rounded-xl flex flex-col max-h-[500px]"
      >
        
        {/* ## SEARCH INPUT HEADER */}
        <div className="sticky top-0 bg-white z-50 p-4 border-b border-gray-100 flex items-center">
          <BsSearch className="absolute left-8 text-gray-400" />
          <input
            type="text"
            autoFocus
            value={searchProduct}
            placeholder="Search for products..."
            className="w-full pl-12 pr-4 py-2 bg-gray-50 rounded-lg outline-none focus:ring-1 focus:ring-purple-600 transition-all text-gray-700"
            onChange={(e) => searchProductItem(e.target.value)}
          />
        </div>

        {/* ## SEARCH RESULTS AREA */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filterProduct?.length > 0 ? (
              filterProduct.map((item) => (
                /* ## PRODUCT CARD LINK */
                <Link
                  href={`/product/${item.slug}`} // تم التعديل ليتناسب مع مسار سانيتي
                  key={item._id}
                  onClick={() => {
                    searchProductItem(""); 
                    if (closMenu) closMenu(); 
                  }}
                  className="flex items-center gap-4 p-3 border border-transparent hover:border hover:border-purple-300 rounded-xl transition-all  group"
                >
                  {/* ## PRODUCT IMAGE CONTAINER */}
                  <div className="relative bg-gray-50 rounded-lg w-16 h-16 flex-shrink-0 overflow-hidden">
                    <Image
                      alt={item?.name || "Product"}
                      src={item?.imageUrl}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>

                  {/* ## PRODUCT DETAILS */}
                  <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-gray-800 line-clamp-1">
                      {item?.name}
                    </h2>
                    <p className="text-sm font-semibold text-purple-800 mt-1">
                      ${item?.price}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              /* ## NO RESULTS EMPTY STATE */
              <div className="col-span-full flex flex-col justify-center items-center text-gray-400 py-16">
                <BsSearch size={40} className="mb-4 opacity-20" />
                <h3 className="text-lg">{searchProduct}    لم يتم العتور على بنوته الزوينه    </h3>
                <p className="text-sm">Try searching for something else</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default SearchProducts;