"use server"
import { createClient } from "next-sanity";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function createOrder(orderData) {
  try {
    const result = await writeClient.create({
      _type: "order",
      userName: orderData.userName,
      phone: orderData.phone,
      totalPrice: Number(orderData.total),
      status: "pending", 
      items: orderData.items.map((item) => {
        // 1. إنشاء كائن العنصر
        const itemObject = {
          _key: Math.random().toString(36).substring(2, 9),
          _type: 'item', 
          name: item.name,
          price: Number(item.price),
        };

        // 2. استخراج الـ Reference بطريقة ذكية
        // نبحث عنه في item.image.asset._ref أو item.image.asset (حسب طريقة الجلب)
        const imageRef = item.image?.asset?._ref || item.image?.asset;

        if (imageRef && typeof imageRef === 'string') {
          itemObject.productImage = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageRef, // الآن نرسل الكود الفريد للصورة
            }
          };
        }
        
        return itemObject;
      }),
    });
    return { success: true };
  } catch (error) {
    console.error("Sanity Error Details:", error);
    return { success: false, error: error.message };
  }
}