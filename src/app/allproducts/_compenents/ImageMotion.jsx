'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';

function ImageMotion({ product, index }) {
  // أول صورتين تظهران للمستخدم تأخذان أولوية عالية لتحسين سكور LCP
  const isPriority = index < 2; 

  return (
    <motion.div 
      className='flex items-center justify-center w-full'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }} // تقليل التأخير لتسريع استجابة الصفحة
    >
      <Image
        src={product.imageUrl}
        alt={product.name || "Produit Vantix"}
        width={300}
        height={300}
        priority={isPriority} 
        // الحل السحري لمشكلة "Image larger than needed":
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
        style={{ width: '100%', height: 'auto' }} 
        className="max-w-[200px] lg:max-w-[300px] aspect-square object-contain object-center transition duration-700 ease-in-out group-hover:scale-110"
      />
    </motion.div>
  )
}

export default ImageMotion;