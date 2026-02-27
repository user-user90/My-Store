"use client"
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

function MotionNewProducts({ data }) {
  // إعدادات حركة الظهور التدريجي (Stagger) لإضفاء لمسة احترافية
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="py-8">
      {/* --- HEADER --- */}
      <div className="flex items-end justify-between md:items-center mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[20px] md:text-2xl font-extrabold text-gray-900"
        >
          Nos nouveautés
        </motion.h2>
        <Link 
          href={"/allproducts"} 
          className="hidden md:flex items-center gap-2 text-gray-600 hover:text-purple-600 hover:border-b border-purple-600 transition-all font-medium"
        >
          Voir Tout <FaArrowRight className="text-sm" />
        </Link>
      </div>

      {/* --- GRID --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
      >
        {data && data.length > 0 ? (
          data.map((item,index) => (
            <div key={index}>
              <Link
                href={`/product/${item?.slug}`}
                className="group shadow-md border border-gray-300 bg-gray-100 hover:shadow-xl transition-all duration-500 hover:border-purple-500 rounded-t-lg block overflow-hidden"
              >
                {/* {IMAGE CONTAINER} */}
                <motion.div
                   initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 ,delay:0.8}}
                className="relative flex items-center justify-center bg-gray-100 overflow-hidden">
                  <Image
                    src={item?.imageUrl}
                    width={300}
                    alt={item?.name}
                    height={300}
                    
                    className="w-[300px] h-[300px] object-contain group-hover:scale-110 transition-transform duration-500 py-4"
                  />
                </motion.div >
                
                {/* {INFO CONTAINER} */}
                <div className="flex justify-between items-center py-4 px-6 bg-gray-100">
                  <h3 className="line-clamp-1 font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                    {item?.name}
                  </h3>
                  <h4 className="text-sm font-bold text-blue-700 shrink-0 ml-2">
                    {item?.price} €
                  </h4>
                </div>
              </Link>
            </div>
          ))
        ) : (
          /* --- SKELETON LOADING --- */
          [1, 2, 3, 4].map((index) => (
            <div key={index} className="shadow-md border border-gray-200 bg-gray-100 rounded-t-lg animate-pulse">
              {/* محاكاة الصورة */}
              <div className="w-full h-[300px] bg-gray-200 rounded-t-lg"></div>
              {/* محاكاة النصوص */}
              <div className="flex justify-between items-center py-4 px-6">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          ))
        )}
      </motion.div>
    </div>
  );
}

export default MotionNewProducts;