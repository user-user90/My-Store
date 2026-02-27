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
      userName: orderData.userName, // تأكد أنها تطابق السكيمة
      phone: orderData.phone,       // تأكد أنها تطابق السكيمة
      totalPrice: Number(orderData.total),
      status: "Processing",
      items: orderData.items.map((item) => {
        const itemObject = {
          _key: Math.random().toString(36).substring(2, 9),
          name: item.name,
          price: Number(item.price),
        };

        // إرسال الصورة فقط إذا كانت موجودة
        if (item.image?.asset?._ref) {
          itemObject.productImage = {
            _type: 'image',
            asset: {
              _type: "reference",
              _ref: item.image.asset._ref
            }
          };
        }
        return itemObject;
      }),
    });
    return { success: true };
  } catch (error) {
    console.error("Sanity Error:", error);
    return { success: false, error: error.message };
  }
}