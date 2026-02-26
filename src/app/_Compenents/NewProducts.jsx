import Image from "next/image";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const getProduct = async () => {
  const query = `*[_type=="product"][0...4]{
  _id,
    name,
    price,
    "slug":slug.current,
    "categoryName":category->name,
    "imageUrl":media[0].asset->url, 
}`;
  const data = await client.fetch(query);
  return data;
};

async function NewProducts() {
  const data = await getProduct();
  return (
    <section className=" mx-8 lg:mx-16 mt-32">
      <div className="flex  items-end justify-between md:items-center mb-4">
        <h2 className=" text-[20px]  md:text-2xl font-extrabold">Our Newest products</h2>
        <Link href={"/allproducts"} className="hidden md:flex  items-center gap-2 text-gray-600  hover:border-b border-gray-400">
          See All <FaArrowRight />
        </Link>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {data?.map((item) => (
          <Link key={item?._id} href={`/product/${item?.slug}`} className="shadow-md border border-gray-300 bg-gray-100 hover:opacity-80 transition-all duration-500 hover:border hover:border-purple-500-500 rounded-t-lg">
            {/* ## IMAGE*/}
            <div className="flex items-center justify-center ">
              <Image src={item?.imageUrl} width={300} alt={item?.name} height={300}
              className="w-[300px]  h-[300px] object-contain hover:scale-105 transition-all duration-500 py-3"
              />
            </div>
            {/* ## title & price */}
            <div className="flex justify-between items-center my-2 mx-6">
                <h3 className="font-bold text-gray-800">{item?.name}</h3>
                <h4 className="text-sm font-bold text-blue-700">${item?.price} USD</h4>
            </div>
          </Link>
        ))}
      </div>
      <div className="block md:hidden">
        <Link href={'/allproducts'} className="flex justify-center items-center gap-1 mt-4 hover:text-blue-400  ">See All <FaArrowRight /></Link>
      </div>
    </section>
  );
}

export default NewProducts;
