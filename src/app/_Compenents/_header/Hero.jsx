import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import HeroTitle from "@/app/_framerMotion/HeroTitle";

const getHeroImage = async () => {
  const query = ` *[_type == "heroImage"][0]{
  "imgUrl1":media1.asset->url,
  "imgUrl2":media2.asset->url
}
  `;
  const data = await client.fetch(query);
  return data;
};

async function Hero() {
  const data = await getHeroImage();
  return (
    <section className="mx-auto max-w-2xl lg:max-w-7xl px-7 pt-8 lg:pt-16">
      <div className="mb-8 flex flex-col lg:flex-row  justify-between items-center md:mb-16 gap-8">
        {/* ## TITLE && P */}
        <div className="mb-6 flex flex-col w-full   lg:w-2/4 mx-4 pt-10 lg:pt-30">
        {/* ## title */}
         <HeroTitle/>
          {/* ## description */}
          
         
         
        </div>
          {/* ## Images */}
        <div className="flex w-full lg:w-3/5 justify-center lg:justify-end pr-4 mb-16 md:mb-0 ">
        {/* ## image 1 */}
          <div className="relative top-12 left-12 -ml-12 z-10">
            <Image
              src={data?.imgUrl1}
              width={500}
              height={500}
              priority
              alt="Mode 1"
              className="rounded-lg object-contain object-center"
            />
          </div>
          {/* ## image 2 */}
          <div>
            <Image
              src={data?.imgUrl2}
              width={500}
              height={500}
              priority
              alt="Mode 2"
              className="rounded-lg object-contain object-center"
            />
          </div>
        </div>
       
      </div>
        {/* ## links Category*/}
      
<div className="flex flex-col lg:flex-row items-center gap-4 mt-8 lg:mt-0 ml-0 lg:ml-6">
  <div className="flex w-full md:w-auto overflow-hidden rounded-lg border border-gray-400 bg-white shadow-sm">
    <Link 
      href="/Homme" 
      className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-700 transition duration-100 hover:bg-gray-100 active:bg-gray-200 py-2 px-6 border-r border-gray-400"
    >
      Hommes
    </Link>
    <Link 
      href="/Femme" 
      className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-700 transition duration-100 hover:bg-gray-100 active:bg-gray-200 py-2 px-6 border-r border-gray-400"
    >
      Femmes
    </Link>
    <Link 
      href="/Ados" 
      className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-700 transition duration-100 hover:bg-gray-100 active:bg-gray-200 py-2 px-6"
    >
      Ados
    </Link>
  </div>
</div>
    </section>
  );
}

export default Hero;