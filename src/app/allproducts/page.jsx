import { client } from '@/lib/sanity';
import React from 'react'
import Link from 'next/link';
import { RiArrowRightUpLine } from 'react-icons/ri';
import ImageMotion from './_compenents/ImageMotion';

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
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Notre <span className="text-blue-700">Collection</span>
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-md">
              Explorez notre gamme diversifiée de produits de haute qualité conçus pour votre style de vie.
            </p>
          </div>
          
          <div className="bg-gray-50 px-4 py-2 rounded-full border border-gray-200 w-fit">
              <span className="text-sm font-bold text-gray-600">{data.length} Produits Trouvés</span>
          </div>
        </header>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((product) => (
            <article key={product._id} className="group relative flex flex-col">
              
              {/* Image Card */}
              <div className="relative overflow-hidden rounded-xl bg-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-100 px-1 flex items-center justify-center">
                
                {/* رابط الصورة: مخفي عن قارئ الشاشة لتجنب التكرار ومزود بـ tabIndex="-1" */}
                <Link 
                  href={`/product/${product.slug}`} 
                  tabIndex="-1" 
                  aria-hidden="true"
                  className="w-full h-full"
                >
                  <ImageMotion product={product} />
                </Link>

                {/* Hover Action Button: تم إضافة aria-label وصورته واضحة للمحركات */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                  <Link 
                    href={`/product/${product.slug}`}
                    aria-label={`Voir les détails de ${product.name}`}
                    className="bg-white p-4 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center min-w-[56px] min-h-[56px]"
                  >
                    <RiArrowRightUpLine size={24} className="text-blue-700" />
                  </Link>
                </div>
              </div>

              {/* Product Content */}
              <div className="mt-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                  <div className="max-w-[100%]">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                      {product.categoryName}
                    </p>
                    <div className="flex flex-col gap-1">
                      {/* العنوان H3 منطقي تحت H1 الصفحة */}
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                        <Link href={`/product/${product.slug}`} className="hover:text-blue-700 transition-colors">
                          {product?.name}
                        </Link>
                      </h3>
                      <span className="text-xl font-black text-gray-900">{product?.price} €</span>
                    </div>
                  </div>
                </div>
                
                {/* View Detail Link: تم تحسين مساحة الضغط (min-h-12) وإضافة اسم فريد */}
                <Link 
                  href={`/product/${product.slug}`}
                  aria-label={`Afficher plus d'informations sur ${product.name}`}
                  className="mt-auto pt-4 text-sm font-bold text-gray-600 group-hover:text-blue-700 flex items-center gap-2 transition-colors min-h-[48px]"
                >
                  Voir Détails <div className="h-[1px] w-4 bg-current" aria-hidden="true"></div>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* --- Empty State --- */}
        {data.length === 0 && (
          <div className="text-center py-40">
            <h2 className="text-2xl font-bold text-gray-400">Aucun produit trouvé pour le moment.</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProducts;