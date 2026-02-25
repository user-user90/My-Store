"use client"
import React from 'react'
import useStore from '../_store/UseStore'
import Image from 'next/image'
import Link from 'next/link'
import { RiDeleteBin6Line } from 'react-icons/ri'

function CartPage({ closeCart }) {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);

  // Calculate Total Price
  const totalPrice = cart?.reduce((acc, item) => acc + item.price, 0);

  if (!cart) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]"> 
      {/* Scrollable area for products */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {cart?.length > 0 ? (
          <div className="space-y-6">
            {cart?.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b border-gray-100 pb-4 group">
                <Link
                  onClick={() => closeCart(false)}
                  href={`/product/${item?.slug}`} 
                  className="flex items-center gap-4 flex-1"
                >
                  {/* --- Image Section --- */}
                  <div className="relative w-20 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    {!item?.imageUrl ? (
                      <div className="flex items-center justify-center h-full text-xs text-gray-400">Loading...</div>
                    ) : (
                      <Image
                        src={item?.imageUrl[0]}
                        alt={item?.name}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition duration-300"
                      />
                    )}
                  </div>

                  {/* --- Info Section --- */}
                  <div className="flex flex-col">
                    <h2 className="font-bold text-gray-800 line-clamp-1 text-sm">{item?.name}</h2>
                    <p className="text-gray-500 text-xs mb-1">{item?.categoryName}</p>
                    <h3 className="text-blue-700 font-bold">${item?.price}</h3>
                  </div>
                </Link>

                {/* --- Remove Button --- */}
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove item"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="text-5xl text-gray-200">🛒</div>
            <p className="text-gray-500 font-medium">Your cart is empty!</p>
            <button 
              onClick={() => closeCart(false)}
              className="text-blue-600 text-sm font-bold underline"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>

      {/* --- Footer Section (Total & Checkout) --- */}
      {cart?.length > 0 && (
        <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Subtotal</span>
            <span className="text-xl font-extrabold text-gray-900">${totalPrice}</span>
          </div>
          <p className="text-xs text-gray-400 text-center">Shipping and taxes calculated at checkout.</p>
          
          <div className="space-y-2">
            <button className="w-full bg-blue-700 text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all active:scale-95 shadow-md">
              Checkout Now
            </button>
            <button 
              onClick={() => closeCart(false)}
              className="w-full text-gray-500 text-sm font-semibold py-2 hover:text-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage