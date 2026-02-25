"use client"
import useStore from '@/app/_store/UseStore'
import React from 'react'

function AddCart({ product}) {
  const addCart = useStore((state) => state.addCart)

  const handelAddCart=()=>{
  addCart(product)
  console.log("add")
  }

  return (
    <div className='flex flex-col lg:flex-row gap-3'>
        <button 
          onClick={handelAddCart} // هنا نقوم باستدعاء دالة الإضافة
          className="bg-purple-800 w-full py-2 text-white font-bold active:scale-95 transition duration-200 rounded-md shadow-md hover:bg-purple-900"
        >
          Add to Cart
        </button>
        <button className="bg-gray-300 w-full py-2 font-semibold text-gray-800 active:scale-95 transition duration-200 rounded-md ">
          Checkout Now
        </button>
    </div>
  )
}

export default AddCart