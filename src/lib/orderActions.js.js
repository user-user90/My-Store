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
      status: "pending", // لتطابق القائمة التي وضعناها بالفرنسية
      items: orderData.items.map((item) => {
        // 1. بناء الكائن الأساسي للعنصر
        const itemObject = {
          _key: Math.random().toString(36).substring(2, 9),
          _type: 'item', // ضروري جداً ليتعرف Sanity على نوع الكائن داخل المصفوفة
          name: item.name,
          price: Number(item.price),
        };

        // 2. إرسال الصورة (التعديل هنا)
        // تأكد أن item.image يحتوي على الـ asset._ref من الـ Frontend
        if (item.image?.asset?._ref) {
          itemObject.productImage = {
            _type: 'image',
            asset: {
              _type: "reference",
              _ref: item.image.asset._ref // هذا هو الرابط الفعلي للصورة المخزنة في Sanity
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