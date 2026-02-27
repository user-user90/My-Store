'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';

function ImageMotion({product}) {
  return (
    <motion.div
                initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 ,delay:0.6}}
    >
        
             <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className=" w-[200px] h-[200px]  lg:h-[300px] lg:w-[300px] object-contain object-center transition duration-700 ease-in-out group-hover:scale-110 "
                />
    </motion.div>
  )
}

export default ImageMotion