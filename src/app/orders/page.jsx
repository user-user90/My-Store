"use client"
import React, { useState, useEffect } from 'react'
import useStore from '../_store/UseStore'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/lib/orderActions.js' 
import Image from 'next/image'
import { RiShieldCheckLine, RiLoader4Line } from 'react-icons/ri'

function OrdersPage() {
  const cart = useStore((state) => state.cart)
  const addOrder = useStore((state) => state.addOrder)
  const clearCart = useStore((state) => state.clearCart) 
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  useEffect(() => { setIsClient(true) }, [])

  const totalPrice = cart?.reduce((acc, item) => acc + item.price, 0)

  const handleFinalSubmit = async (e) => {
    e.preventDefault()
    if (!cart || cart.length === 0) return alert("Votre panier est vide")

    setLoading(true)

    // --- تعديل هام: تجهيز بيانات المنتجات بشكل صحيح لـ Sanity ---
    const cleanedItems = cart.map(item => ({
      name: item.name,
      price: item.price,
      image: item.image // نرسل كائن الصورة الأصلي الذي يحتوي على المرجع (asset)
    }))

    const orderDetails = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('fr-FR'),
      total: totalPrice,
      items: cleanedItems, // نستخدم المصفوفة النظيفة هنا
      userName: formData.name,
      email: formData.email,
      phone: formData.phone
    }
    try {
      const result = await createOrder(orderDetails)
      if (result.success) {
        addOrder(orderDetails) 
        clearCart() 
        router.push('/successful') 
              console.log("البيانات المرسلة:", orderDetails);

      } else {
        alert("Erreur: " + result.error)
      }
    } catch (err) {
      alert("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  if (!isClient) return null
 
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
     

        {/* القسم الأيسر: مراجعة المنتجات */}
        <div className="bg-gray-100/50 p-8 rounded-2xl border border-dashed border-gray-300">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Résumé du Panier</h2>
          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm">
                  <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    {/* تأكد من استخدام imageUrl[0] للعرض في الصفحة فقط */}
                    <Image src={item.imageUrl[0]} alt={item?.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm line-clamp-1 text-black">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.categoryName}</p>
                  </div>
                  <p className="font-bold text-blue-600">{item.price} €</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-10">Votre panier est vide</p>
            )}
          </div>

          <div className="border-t border-gray-300 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total</span>
              <span>{totalPrice} €</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Livraison</span>
              <span className="text-green-600 font-bold">Gratuite</span>
            </div>
            <div className="flex justify-between text-xl font-black pt-2 border-t border-gray-300 text-gray-900">
              <span>Total</span>
              <span>{totalPrice} €</span>
            </div>
          </div>
        </div>
           {/* القسم الأيمن: فورم البيانات */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Détails de Livraison</h2>
          <form onSubmit={handleFinalSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Nom Complet</label>
              <input
                required
                type="text"
                placeholder="Votre nom et prénom"
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">E-mail</label>
              <input
                required
                type="email"
                placeholder="exemple@mail.com"
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">Numéro de Téléphone</label>
              <input
                required
                type="tel"
                placeholder="+212 600 000 000"
                className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-black"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300  shadow-lg shadow-blue-100"
              >
                {loading ? <RiLoader4Line className="animate-spin size-6" /> : "Confirmer la Commande"}
              </button>
            </div>
          </form>
          <div className="mt-6 flex items-center gap-2 text-green-600 text-sm font-medium">
            <RiShieldCheckLine size={20} />
            Paiement sécurisé à la livraison
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage