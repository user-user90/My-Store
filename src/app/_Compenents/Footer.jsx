"use client"
import Link from "next/link"
import { FaInstagram, FaFacebookF, FaWhatsapp, FaHandHoldingUsd } from "react-icons/fa"
import { RiTruckLine, RiShieldCheckLine } from "react-icons/ri"

const links = [
  { id: 1, name: "Hommes", href: "/Homme" },
  { id: 2, name: "Femmes", href: "/Femme" },
  { id: 3, name: "Ados", href: "/Ados" },
]

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="bg-white mt-32 border-t border-gray-300 text-gray-700 font-sans">
      {/* شريط الثقة - تم تصحيح العناوين هنا لتجنب خطأ التسلسل */}
      <div className="bg-blue-50 py-12 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <RiTruckLine size={28} className="text-blue-700" />
            {/* تم التغيير من h3 إلى span للحفاظ على ترتيب العناوين المنطقي */}
            <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Livraison Rapide</span>
            <p className="text-[12px] text-gray-700 font-medium">Expédition partout au Maroc</p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <FaHandHoldingUsd size={28} className="text-blue-700" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Paiement à la livraison</span>
            <p className="text-[12px] text-gray-700 font-medium">Payez quand vous recevez</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <RiShieldCheckLine size={28} className="text-blue-700" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Qualité Garantie</span>
            <p className="text-[12px] text-gray-700 font-medium">Produits 100% authentiques</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-16 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-16">
          
          {/* Brand Identity */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <Link href="/" className="text-3xl font-black tracking-tighter uppercase text-gray-900 italic">
              Vantix
            </Link>
            <p className="text-gray-600 text-sm max-w-[280px] text-center md:text-left leading-relaxed font-semibold">
              Votre référence streetwear. Le style n'attend pas.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <Link href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#E4405F] hover:text-white transition-all duration-300 shadow-sm border border-gray-200">
                <FaInstagram size={18} />
              </Link>
              <Link href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm border border-gray-200">
                <FaFacebookF size={18} />
              </Link>
              <Link href="#" aria-label="WhatsApp" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm border border-gray-200">
                <FaWhatsapp size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-col items-center gap-6">
             {/* تم التغيير من h4 إلى p مع الحفاظ على الستايل */}
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 border-b-2 border-blue-600 pb-1">Boutique</p>
             <ul className="flex flex-col items-center gap-4">
              {[{id: 0, name: 'Accueil', action: scrollToTop}, ...links].map((link) => (
                <li key={link.id}>
                  {link.action ? (
                    <button onClick={link.action} className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase">
                      {link.name}
                    </button>
                  ) : (
                    <Link href={link.href} className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Secure Payment Display */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 border-b-2 border-blue-600 pb-1">SÉCURITÉ</p>
            <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl shadow-md">
               <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                <FaHandHoldingUsd size={22} className="text-blue-700" />
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">Méthode Sûre</span>
                 <span className="text-[13px] font-black text-gray-900 uppercase italic">Cash on Delivery</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Vantix Streetwear Studio
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black italic underline decoration-blue-600 underline-offset-4">Concept by Vantix</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer