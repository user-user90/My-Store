'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';

function ImageMotion({product}) {
  return (
    <motion.div 
      className='flex items-center justify-center' // تأكد من توسيط الصورة داخل الحاوية
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 , delay: 0.2 }}
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={300}
        height={300}
        // استخدام auto يرضي محرك Next.js ويحافظ على الأبعاد
        style={{ width: '100%', height: 'auto' }} 
        // أضفنا aspect-square لضمان جمالية العرض للأحذية والملابس
        className="max-w-[200px] lg:max-w-[300px] aspect-square object-contain object-center transition duration-700 ease-in-out group-hover:scale-110"
      />
    </motion.div>
  )
}

export default ImageMotion;