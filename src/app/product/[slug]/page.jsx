import { client } from "@/lib/sanity"
import GaleryImage from "../_compenents/GaleryImage";
import AddCart from "../_compenents/AddCart";



export const dynamic = 'force-dynamic';
export const revalidate = 0;
const getData = async (slug)=>{
const query = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  price,
  // 1. نترك هذا لعرض الصور في المتصفح (المعرض)
  "imageUrl": media[].asset->url,
  
  // 2. هذا هو "المفتاح السحري" لظهور الصور في لوحة التحكم (Sanity Studio)
  // نحن نجلب أول كائن صورة كامل (Object) من المصفوفة
  "image": media[0], 

  "slug": slug.current,
  description,
  "categoryName": category->name
}`;
const data = await client.fetch(query, { slug }, { 
  cache: 'no-store', // منع التخزين في Vercel
  next: { revalidate: 0 } 
});
return data

}

async function ProductPage({params}) {
    const {slug}= await params
    const data = await getData(slug)
    console.log(data)
  return (
    <section>
        <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-4 md:px-8 lg:px-16 gap-10">
        {/* ## image */}
        <div>
         <GaleryImage img={data.imageUrl} />
        </div>
        {/* ## info title && desc && price */}
        <div>
            <div className="border-b border-gray-400 pb-2">
            {/* ## title */}
            <h2 className="text-3xl lg:text-5xl text-gray-800 font-bold mb-1 mt-10 lg:mt-22">{data?.name}</h2>
            {/* ## Price */}
            <span className=" text-2xl text-purple-800 font-extrabold">${data?.price}</span>
            </div>
            {/* ## description */}
            <p className="leading-relaxed text-gray-600 my-8">{data?.description}</p>
            <div className="">
            {/* ## add cart */}
            <AddCart product={data} />
            </div>
        </div>
        </div>
    </section>
  )
}

export default ProductPage