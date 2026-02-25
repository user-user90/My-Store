import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

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
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5  text-gray-800">
            Top Fashion <span className="text-purple-700 text-4xl lg:text-6xl ml-0 lg:ml-4">for a top Price!</span>
          </h1>
          {/* ## description */}
          <p className="max-w-md text-md md:text-lg text-gray-700 leading-relaxed ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus
            animi quidem repudiandae a magnam sit fugiat repellendus vitae,
            ipsum dicta natus odio quae architecto autem consequatur? Et cumque
            mollitia facilis.
          </p>
         
        </div>
          {/* ## Images */}
        <div className="flex w-full lg:w-3/5 justify-center lg:justify-end pr-4 mb-16 md:mb-0 ">
        {/* ## image 1 */}
          <div className="relative top-12 left-12 -ml-12 z-10">
            <Image
              src={data?.imgUrl1}
              width={400}
              height={400}
              priority
              alt="Fashion 1"
              className="rounded-lg object-cover "
            />
          </div>
          {/* ## image 2 */}
          <div>
            <Image
              src={data?.imgUrl2}
              width={400}
              height={400}
              priority
              alt="Fashion 2"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
       
      </div>
       {/* ## links Category*/}
      
<div className="flex flex-col lg:flex-row items-center gap-4 mt-8 lg:mt-0 ml-0 lg:ml-6">
  <div className="flex w-full md:w-auto overflow-hidden rounded-lg border border-gray-400 bg-white shadow-sm">
    <Link 
      href="/Men" 
      className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-700 transition duration-100 hover:bg-gray-100 active:bg-gray-200 py-2 px-6 border-r border-gray-400"
    >
      Men
    </Link>
    <Link 
      href="/Women" 
      className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-700 transition duration-100 hover:bg-gray-100 active:bg-gray-200 py-2 px-6 border-r border-gray-400"
    >
      Women
    </Link>
    <Link 
      href="/Teens" 
      className="flex w-1/3 items-center text-sm lg:text-lg justify-center text-gray-700 transition duration-100 hover:bg-gray-100 active:bg-gray-200 py-2 px-6"
    >
      Teens
    </Link>
  </div>
</div>
    </section>
  );
}

export default Hero;
