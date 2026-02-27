"use client"
import { motion } from "framer-motion"

function HeroTitle() {
  return (
    <div>
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-6xl font-extrabold mb-5 text-gray-800"
    >
      La mode chic à
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="text-purple-700 block  lg:inline-block ml-0 lg:ml-4 my-2"
      >
          un prix imbattable !
      </motion.span>
    </motion.h1>
    {/* ## description */}
    <motion.p 
       initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
    className="max-w-md text-md md:text-lg text-gray-700 leading-relaxed ">
            Découvrez les dernières tendances de la mode avec une qualité exceptionnelle. 
            Nous vous proposons une sélection exclusive de vêtements pour affirmer 
            votre style au quotidien sans compromis.
          </motion.p>
    </div>
  )
}
export default HeroTitle;