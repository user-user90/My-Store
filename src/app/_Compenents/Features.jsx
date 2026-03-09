"use client";
import { motion } from "framer-motion";
import { LiaShippingFastSolid, LiaWalletSolid, LiaHeadsetSolid } from "react-icons/lia";

const features = [
  {
    id: 1,
    title: "Livraison Rapide",
    description: "Expédition rapide et sécurisée dans toutes les villes du Maroc.",
    icon: <LiaShippingFastSolid size={40} className="" />,
  },
  {
    id: 2,
    title: "Paiement à la Livraison",
    description: "Commandez en toute confiance et payez uniquement à la réception.",
    icon: <LiaWalletSolid size={40} className="text-green-600" />,
  },
  {
    id: 3,
    title: "Support 24/7",
    description: "Notre équipe est disponible à tout moment pour vous aider via WhatsApp.",
    icon: <LiaHeadsetSolid size={40} className="" />,
  },
];

// إعدادات ظهور العناصر بالتتابع (Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
};

export default function Features() {
  return (
    <section className="pt-20 bg-transparent ">
      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 "
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group flex flex-col items-center text-center p-8 rounded-3xl  bg-[#F9F9F9] border border-violet-300 hover:border-black/5 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* أيقونة مع أنيميشن بسيط عند الـ Hover على الكارت */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-6 p-4 bg-white rounded-2xl shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-300"
              >
                <div className="group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </motion.div>

              <h3 className="text-xl font-black tracking-tight text-black mb-3 uppercase">
                {feature.title}
              </h3>
              
              <p className="text-gray-700 text-sm leading-relaxed max-w-[250px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}