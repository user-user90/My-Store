// app/sitemap.js
import { client } from "@/lib/sanity";

export default async function sitemap() {
  const baseUrl = "https://vantix-store.vercel.app";

  // 1. جلب كل الفئات والمنتجات من Sanity
  const query = `*[_type in ["product", "category"]] {
    "slug": slug.current,
    "type": _type,
    _updatedAt
  }`;
  
  const data = await client.fetch(query);

  // 2. تجهيز الروابط الديناميكية
  const dynamicRoutes = data.map((item) => ({
    url: `${baseUrl}/${item.type === 'category' ? 'category' : 'product'}/${item.slug}`,
    lastModified: item._updatedAt,
    changeFrequency: 'weekly',
    priority: item.type === 'category' ? 0.8 : 0.6,
  }));

  // 3. الروابط الثابتة (الرئيسية، كل المنتجات)
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/allproducts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...dynamicRoutes];
}