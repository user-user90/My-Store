"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // سيختفي الأنميشن بعد 2.5 ثانية
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white"
        >
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic"
            >
              Vantix<span className="text-gray-500">.</span>
            </motion.h1>
            
            {/* خط تحميل سفلي */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-[2px] bg-white mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 