import { client } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { RiLayoutGridFill } from 'react-icons/ri'

const getData = async (category) => {
    const query = `*[_type == "product" && category->name == $category]{
        _id,
        name,
        price,
        "imageUrl": media[0].asset->url,
        "categoryName": category->name,
        "slug": slug.current
    }`
    const data = await client.fetch(query, { category });
    return data;
}

async function CategoryPage({ params }) {
    const { category } = await params;
    const data = await getData(category);

    return (
        <section className=" bg-white">
            {/* --- Hero / Header Section  TOP--- */}
            <div className=" border-b border-gray-100 py-12 lg:py-8 transition-all">
                <div className="mx-auto max-w-7xl px-8 lg:px-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <nav className="flex mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">
                                <Link href="/" className="hover:opacity-70">Accueil</Link>
                                <span className="mx-2 text-gray-300">/</span>
                                <span className="text-gray-400">Catégorie</span>
                            </nav>
                            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 capitalize">
                                {category}<span className="text-blue-700">.</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 font-medium">
                            <RiLayoutGridFill className="text-blue-700" size={20} />
                            <span>Affichage de {data?.length} pièces uniques</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Product Grid --- Center */}
            <div className="mx-auto max-w-7xl px-8 lg:px-16 py-12">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {data?.map((item) => (
                        <div key={item._id} className="group relative">
                            {/* Image Wrapper */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue-50">
                                <Image 
                                    src={item.imageUrl} 
                                    alt={item.name}
                                    fill
                                    priority

                                    className="object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
                                />
                                {/* Quick View Button Overlay */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <Link 
                                        href={`/product/${item.slug}`}
                                        className="w-full bg-white/90 backdrop-blur-md py-3 text-center rounded-xl text-sm font-bold text-gray-900 shadow-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                                    >
                                        Voir Détails
                                    </Link>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="mt-5 space-y-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-tight truncate max-w-[70%]">
                                        <Link href={`/product/${item.slug}`}>
                                            {item.name}
                                        </Link>
                                    </h3>
                                    <span className="text-md font-black text-blue-700">
                                        {item.price} €
                                    </span>
                                </div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-tighter">
                                    {item.categoryName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Empty State --- */}
                {data?.length === 0 && (
                    <div className="text-center ">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="text-2xl font-bold text-gray-900">Aucun article trouvé</h2>
                        <p className="text-gray-500 mt-2">Nous n'avons trouvé aucun produit dans la catégorie {category}.</p>
                        <Link href="/" className="mt-6 inline-block bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition">
                            Retour à l'accueil
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

export default CategoryPage;