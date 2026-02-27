"use client"
import React from 'react'
import useStore from '../_store/UseStore'
import Image from 'next/image'
import Link from 'next/link'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function CartPage({ closeCart }) {
  // --- 1. استدعاء البيانات والدوال من المتجر ---
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const addOrder = useStore((state) => state.addOrder); 
  const router = useRouter();

  // --- 2. حساب السعر الإجمالي ---
  const totalPrice = cart?.reduce((acc, item) => acc + item.price, 0);

  // --- 3. منطق إتمام الطلب (Checkout Logic) ---
  const handleCheckout = () => {
    // التأكد من أن السلة ليست فارغة
    if (!cart || cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }

    // إنشاء كائن الطلب الجديد بتنسيق احترافي
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, // رقم طلب فريد
      date: new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      total: totalPrice,
      status: "Processing",
      items: [...cart], // أخذ نسخة كاملة من المنتجات الموجودة في السلة حالياً
    };

    try {
      // تنفيذ عملية الإضافة (ستقوم addOrder تلقائياً بتفريغ السلة بناءً على كود Store الذي كتبناه)
      addOrder(newOrder); 
      
      // إغلاق نافذة السلة الجانبية
      closeCart(false); 
      
      // توجيه المستخدم لصفحة الطلبات لرؤية النتيجة
      router.push('/orders');
    } catch (error) {
      console.error("Erreur lors de la commande:", error);
      alert("Une erreur est survenue lors de la validation de votre commande.");
    }
  };

  // حماية ضد الأخطاء إذا كانت السلة غير معرفة بعد
  if (!cart) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]"> 
      {/* ... باقي كود الـ HTML الخاص بك كما هو دون تغيير ... */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {cart?.length > 0 ? (
          <div className="space-y-3">
            {cart?.map((item,index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2 group">
                <Link
                  onClick={() => closeCart(false)}
                  href={`/product/${item?.slug}`} 
                  className="flex items-center gap-2 flex-1"
                >
                  <div className="relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item?.imageUrl[0]}
                      alt={item?.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-bold text-gray-800 line-clamp-1 text-sm">{item?.name}</h2>
                    <p className="text-gray-500 text-xs mb-1">{item?.categoryName}</p>
                    <h3 className="text-blue-700 font-bold">{item?.price} €</h3>
                  </div>
                </Link>

                <button 
                  onClick={() => {
                    removeFromCart(item._id)
                     toast.error(`${item?.name} supprimé du panier`,{
    style:{
      background:"red",
      color:"white"
    }
  })
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
             {/* حالة السلة الفارغة */}
             <div className="text-5xl">🛒</div>
             <p className="text-gray-500">Votre panier est vide !</p>
          </div>
        )}
      </div>

      {/* الجزء السفلي المحتوي على زر الدفع */}
      {cart?.length > 0 && (
        <div className="p-5 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Total</span>
            <span className="text-xl font-extrabold">{totalPrice} €</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md"
          >
            Commander maintenant
          </button>
        </div>
      )}
    </div>
  )
}

export default CartPage;