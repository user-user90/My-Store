import { client } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

const getData = async (category) => {
    const query = `*[_type == "product" && category->name == $category]{
        _id,
        name,
        price,
        "imageUrl": media[0].asset->url,
        "categoryName": category->name,
        "slug": slug.current
    }`
    // يجب إضافة return هنا
    const data = await client.fetch(query, { category });
    return data;
}

async function CategoryPage({ params }) {
    const { category } = await params;
    const data = await getData(category);

    return (
        <section className="mx-8 lg:mx-16 mt-32 mb-20">
            {/* جعلنا العنوان ديناميكي ليظهر اسم القسم */}
            <div className="flex justify-between items-center mb-10 border-b pb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                    Products for <span className="text-blue-600">{category}</span>
                </h2>
                <span className="text-gray-500">{data?.length} Products</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {data?.map((item) => (
                    <Link 
                        key={item._id} 
                        href={`/product/${item.slug}`} 
                        className="group shadow-md border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden"
                    >
                        {/* ## IMAGE */}
                        <div className="aspect-square overflow-hidden bg-gray-100">
                            <Image 
                                src={item.imageUrl} 
                                alt={item.name}
                                width={400} 
                                height={400}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* ## Title & Price */}
                        <div className="p-4">
                            <h3 className="font-bold text-gray-800 text-lg truncate">{item.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm text-gray-500">{item.categoryName}</p>
                                <h4 className="font-bold text-blue-700">${item.price}</h4>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* في حال كان القسم فارغاً */}
            {data?.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl">No products found in this category.</p>
                </div>
            )}
        </section>
    )
}

export default CategoryPage;