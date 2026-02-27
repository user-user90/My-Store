"use client"
import useStore from '@/app/_store/UseStore'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

function AddCart({ product}) {
  const addCart = useStore((state) => state.addCart)
  const router =useRouter()

  const handelAddCart=()=>{
  addCart(product)
  // ###
  toast.success(`${product?.name} ajouté au panier`,{
    style:{
      background:"green",
      color:"white"
    }
  })
  }

  return (
    <div className='flex flex-col lg:flex-row gap-3'>
        <button 
        aria-label='add cart product'
          onClick={handelAddCart} // هنا نقوم باستدعاء دالة الإضافة
          className="bg-purple-800 w-full py-2 text-white font-bold active:scale-95 transition duration-200 rounded-md shadow-md hover:bg-purple-900"
        >
          Ajouter au Panier
        </button>
      
    </div>
  )
}

export default AddCart