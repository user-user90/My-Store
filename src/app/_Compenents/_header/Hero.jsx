import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import HeroTitle from "@/app/_framerMotion/HeroTitle";

const getHeroImage = async () => {
  const query = ` *[_type == "heroImage"][0]{
    "imgUrl1":media1.asset->url,
    "imgUrl2":media2.asset->url
  }`;
  return await client.fetch(query);
};

async function Hero() {
  const data = await getHeroImage();

  return (
    <section className="mx-auto max-w-2xl lg:max-w-7xl px-7 pt-8 lg:pt-16">
      <div className="mb-8 flex flex-col lg:flex-row justify-between items-center md:mb-16 gap-8">
        {/* ## TITLE && P */}
        <div className="mb-6 flex flex-col w-full lg:w-2/4 mx-4 pt-10 lg:pt-30">
          <HeroTitle />
        </div>

        {/* ## Images */}
        <div className="flex w-full lg:w-3/5 justify-center lg:justify-end pr-4 mb-16 md:mb-0">
          
          {/* ## Image 1 (The LCP Element) */}
          <div className="relative top-12 left-12 -ml-12 z-10">
            <Image
              src={data?.imgUrl1}
              width={500}
              height={500}
              // تحسينات الأداء القصوى
              priority={true}
              fetchPriority="high"
              sizes="(max-width: 768px) 340px, 500px"
              alt="Mode Streetwear Homme Vantix"
              className="rounded-lg object-contain object-center"
            />
          </div>

          {/* ## Image 2 */}
          <div>
            <Image
              src={data?.imgUrl2}
              width={500}
              height={500}
              // منع الـ Lazy Loading إذا كانت تظهر في الشاشة الأولى
              priority={true}
              sizes="(max-width: 768px) 340px, 500px"
              alt="Mode Streetwear Femme Vantix"
              className="rounded-lg object-contain object-center"
            />
          </div>
        </div>
      </div>

      {/* ## Links Category - تحسين الـ Accessibilité والـ Contrast */}
      <div className="flex flex-col lg:flex-row items-center gap-4 mt-8 lg:mt-0 ml-0 lg:ml-6">
        <nav 
          aria-label="Catégories principales" 
          className="flex w-full md:w-auto overflow-hidden rounded-lg border border-gray-900 bg-white shadow-xl"
        >
          <Link 
            href="/Homme" 
            className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-900 font-bold transition duration-100 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 py-3 px-6 border-r border-gray-900"
          >
            Hommes
          </Link>
          <Link 
            href="/Femme" 
            className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-900 font-bold transition duration-100 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 py-3 px-6 border-r border-gray-900"
          >
            Femmes
          </Link>
          <Link 
            href="/Ados" 
            className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-900 font-bold transition duration-100 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 py-3 px-6"
          >
            Ados
          </Link>
        </nav>
      </div>
    </section>
  );
}

export default Hero;