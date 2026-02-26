import { client } from '@/lib/sanity';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { RiArrowRightUpLine } from 'react-icons/ri';

const getProduct = async () => {
  const query = `*[_type=="product"]{
    _id,
    name,
    price,
    "slug":slug.current,
    "categoryName":category->name,
    "imageUrl":media[0].asset->url, 
  }`;
  const data = await client.fetch(query)
  return data
}

async function AllProducts() {
  const data = await getProduct()

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-16">
        
        {/* --- Section Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Our <span className="text-blue-700">Collection</span>
            </h1>
            <p className="mt-3 text-lg text-gray-500 max-w-md">
              Explore our diverse range of high-quality products designed for your lifestyle.
            </p>
          </div>
          
          {/* Quick Info Badge */}
          <div className="bg-gray-50 px-4 py-2 rounded-full border border-gray-200 w-fit">
             <span className="text-sm font-bold text-gray-600">{data.length} Products Found</span>
          </div>
        </div>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              
              {/* Image Card */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-100 px-1">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="h-full w-full object-cover object-center transition duration-700 ease-in-out group-hover:scale-110"
                />
                
                {/* Hover Action Button */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link 
                    href={`/product/${product.slug}`}
                    className="bg-white p-4 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <RiArrowRightUpLine size={24} className="text-blue-700" />
                  </Link>
                </div>
              </div>

              {/* Product Content */}
              <div className="mt-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                      {product.categoryName}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                      <Link href={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xl font-black text-gray-900">${product.price}</span>
                  </div>
                </div>
                
                {/* View Detail Link (Desktop Only Hint) */}
                <Link 
                  href={`/product/${product.slug}`}
                  className="mt-4 text-sm font-bold text-gray-400 group-hover:text-blue-700 flex items-center gap-2 transition-colors"
                >
                  View Details <div className="h-[1px] w-4 bg-current"></div>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- Empty State (If no products) --- */}
        {data.length === 0 && (
          <div className="text-center py-40">
            <h2 className="text-2xl font-bold text-gray-400">No products found at the moment.</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProducts;