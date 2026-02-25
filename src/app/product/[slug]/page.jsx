import { client } from "@/lib/sanity"
import GaleryImage from "../_compenents/GaleryImage";
import AddCart from "../_compenents/AddCart";

const getData = async (slug)=>{
const query = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  price,
  "imageUrl": media[].asset->url,
  "slug": slug.current,
  description,
  "categoryName": category->name
}`;
const data = await client.fetch(query,{slug})
return data

}

async function ProductPage({params}) {
    const {slug}= await params
    const data = await getData(slug)
    console.log(data)
  return (
    <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-4 md:mx-8 lg:mx-16 gap-10">
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