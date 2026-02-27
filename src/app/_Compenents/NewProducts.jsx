import Image from "next/image";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import MotionNewProducts from "../_framerMotion/MotionNewProducts";

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
          <div>
           <MotionNewProducts data={data} />
          </div>
      <div className="block md:hidden">
        <Link href={'/allproducts'} className="flex justify-center items-center gap-1 mt-4 hover:text-blue-400  ">Voir Tout <FaArrowRight /></Link>
      </div>
    </section>
  );
}

export default NewProducts;