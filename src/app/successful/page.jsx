"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { RiCheckboxCircleFill } from 'react-icons/ri'

function SuccessfulPage() {
  const [orderNumber, setOrderNumber] = useState("");

  // توليد الرقم فقط عند العميل بعد التحميل الأول
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 10000);
    setOrderNumber(`#ORD-${randomNum}`);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <RiCheckboxCircleFill className="text-green-500 text-8xl" />
        </motion.div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">
          Commande Confirmée !
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Merci pour votre confiance. Votre commande a été enregistrée avec succès. Notre équipe vous contactera sous peu pour la livraison.
        </p>

        <div className="space-y-3">
          <Link 
            href="/" 
            className="block w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 rounded-xl transition duration-300 shadow-lg shadow-purple-100"
          >
            Continuer mes achats
          </Link>
        </div>

        {/* يظهر الرقم فقط إذا كان جاهزاً لتجنب التضارب */}
        {orderNumber && (
          <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest">
            Numéro de commande : {orderNumber}
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default SuccessfulPage