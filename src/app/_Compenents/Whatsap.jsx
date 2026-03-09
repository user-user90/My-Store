"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // 1. تفعيل المكون فقط بعد اكتمال التحميل في المتصفح
  useEffect(() => {
    setMounted(true);
  }, []);

  const hiddenRoutes = ["/order", "/checkout", "/admin", "/studio"];

  // 2. إذا لم يكتمل الـ Mount، نرجع null (هذا يمنع السيرفر من محاولة رندر الزر)
  if (!mounted) return null;

  // 3. التحقق من المسارات بعد التأكد من الـ Mount
  if (hiddenRoutes.includes(pathname)) return null;

  const phoneNumber = "2126XXXXXXXX"; 
  const message = "Bonjour Vantix, je souhaite me renseigner sur un produit.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <AnimatePresence>
      <motion.a
        key="whatsapp-btn" // مفتاح فريد للفريمر موشن
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
        <FaWhatsapp size={28} className="relative z-10" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap font-medium relative z-10 text-sm">
           Contactez-nous
        </span>
      </motion.a>
    </AnimatePresence>
  );
}