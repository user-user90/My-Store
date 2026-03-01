"use client"
import Link from 'next/link'
import { motion } from 'framer-motion' // تأكد من تثبيته: npm install framer-motion

function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-white">
      {/* الجزء العلوي: الرقم 404 مع تأثير حركي */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[120px] md:text-[160px] font-black text-gray-100 leading-none select-none"
      >
        404
      </motion.h1>

      {/* المحتوى الرئيسي */}
      <div className="relative -mt-16 md:-mt-20">
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 relative inline-block px-4">
          Page Introuvable
          {/* الخط الأصفر المميز لستايل موقعك */}
          <span className="absolute bottom-1 left-0 w-full h-3 bg-amber-400 -z-10 rounded-sm opacity-60"></span>
        </h2>
        
        <p className="text-gray-500 max-w-md mx-auto mb-10 font-medium text-lg">
          Oups ! Il semble que le produit ou la page que vous recherchez n'existe plus.
        </p>

        {/* أزرار التوجيه */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="w-full sm:w-auto bg-purple-800 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-purple-100 hover:bg-purple-900 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Retour à l'accueil
          </Link>
          
          <Link 
            href="/allproducts"
            className="w-full sm:w-auto bg-gray-100 text-gray-800 px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-all active:scale-95"
          >
            Voir la collection
          </Link>
        </div>
      </div>

      {/* لمسة فنية اختيارية في الخلفية */}
      <div className="mt-16 text-gray-300 animate-bounce">
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  )
}

export default NotFound;