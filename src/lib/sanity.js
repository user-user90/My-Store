import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // استخدام المتغير البيئي
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
apiVersion: "2024-03-11", // تاريخ اليوم
  useCdn: false, // 💡 عطل الـ CDN تماماً
  perspective: 'published', 
});