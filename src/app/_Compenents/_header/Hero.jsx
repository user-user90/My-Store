import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import HeroTitle from "@/app/_framerMotion/HeroTitle";
import imageUrlBuilder from "@sanity/image-url";

// إعداد أداة بناء روابط الصور من Sanity
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const getHeroImage = async () => {
  const query = `*[_type == "heroImage"][0]{
    "image1": media1.asset,
    "image2": media2.asset
  }`;
  // استخدام cache لتحسين سرعة استجابة السيرفر
  return await client.fetch(query, {}, { next: { revalidate: 3600 } });
};

async function Hero() {
  const data = await getHeroImage();

  return (
    <section className="mx-auto max-w-2xl lg:max-w-7xl px-7 pt-8 lg:pt-16">
      <div className="mb-8 flex flex-col lg:flex-row justify-between items-center md:mb-16 gap-8">
        
        {/* العنوان والوصف */}
        <div className="mb-6 flex flex-col w-full lg:w-2/4 mx-4 pt-10 lg:pt-30">
          <HeroTitle />
        </div>

        {/* حاوية الصور */}
        <div className="flex w-full lg:w-3/5 justify-center lg:justify-end pr-4 mb-16 md:mb-0">
          
          {/* الصورة الأولى - العنصر الأهم للأداء (LCP) */}
          <div className="relative top-12 left-12 -ml-12 z-10">
            {data?.image1 && (
              <Image
                src={urlFor(data.image1).url()}
                width={450} 
                height={550}
                priority={true} // تحميل ذو أولوية
                fetchPriority="high" // أولوية قصوى للمتصفح
                decoding="sync" // عرض فوري
                sizes="(max-width: 768px) 300px, 450px" // أهم تعديل لتقليل الحجم
                alt="Mode Streetwear Homme Vantix"
                className="rounded-lg object-contain object-center"
              />
            )}
          </div>

          {/* الصورة الثانية */}
          <div className="relative">
            {data?.image2 && (
              <Image
                src={urlFor(data.image2).url()}
                width={450}
                height={550}
                priority={true}
                sizes="(max-width: 768px) 300px, 450px"
                alt="Mode Streetwear Femme Vantix"
                className="rounded-lg object-contain object-center"
              />
            )}
          </div>
        </div>
      </div>

      {/* الروابط */}
      <nav aria-label="Catégories principales" className="flex flex-col lg:flex-row items-center gap-4 mt-8 lg:mt-0 ml-0 lg:ml-6">
        <div className="flex w-full md:w-auto overflow-hidden rounded-lg border border-gray-900 bg-white shadow-xl">
          <Link 
            href="/Homme" 
            className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-900 font-black transition duration-100 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 py-3 px-6 border-r border-gray-900"
          >
            Hommes
          </Link>
          <Link 
            href="/Femme" 
            className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-900 font-black transition duration-100 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 py-3 px-6 border-r border-gray-900"
          >
            Femmes
          </Link>
          <Link 
            href="/Ados" 
            className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-900 font-black transition duration-100 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 py-3 px-6"
          >
            Ados
          </Link>
        </div>
      </nav>
    </section>
  );
}

export default Hero;