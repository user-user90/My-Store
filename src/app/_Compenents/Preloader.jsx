"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Performances: التأكد من تنظيف الذاكرة وتحديد وقت منطقي لا يؤثر على TBT
    const timer = setTimeout(() => setLoading(false), 2500);
    
    // منع التمرير (Scrolling) أثناء التحميل لتحسين CLS والوصول
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          // Accessibilité: تعريف العنصر كـ "حالة تحميل" لقارئات الشاشة
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Chargement de Vantix"
          
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          // Performances: 'will-change-transform' تسرع المعالجة عبر كارت الشاشة (GPU)
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white will-change-transform touch-none"
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
            
            <motion.div 
              // Performances: استخدام transform (scaleX) بدلاً من width لتحسين الأداء (Composite Layers)
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-[2px] bg-white mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}