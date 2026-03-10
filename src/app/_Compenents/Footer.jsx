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
    <footer className="bg-white mt-32 border-t border-gray-300 text-gray-600 font-sans">
      {/* شريط الثقة - تصميم نظيف جداً */}
      <div className="bg-blue-50 py-12 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <RiTruckLine size={28} className="text-blue-600 opacity-80" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-800">Livraison Rapide</span>
            <p className="text-[12px] text-gray-600">Expédition partout au Maroc</p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <FaHandHoldingUsd size={28} className="text-blue-600 opacity-80" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-800">Paiement à la livraison</span>
            <p className="text-[12px] text-gray-600">Payez quand vous recevez</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <RiShieldCheckLine size={28} className="text-blue-600 opacity-80" />
            <span className="text-sm font-bold uppercase tracking-widest text-gray-800">Qualité Garantie</span>
            <p className="text-[12px] text-gray-600">Produits 100% authentiques</p>
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
            <p className="text-gray-500 text-sm max-w-[280px] text-center md:text-left leading-relaxed font-medium">
              Votre référence streetwear. Le style n'attend pas.
            </p>
            
            {/* Social Icons - Clean Style */}
            <div className="flex gap-4">
              <Link href="#" aria-label="Instagram" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#E4405F] hover:text-white transition-all duration-300 shadow-sm">
                <FaInstagram size={18} className="text-gray-600" />
              </Link>
              <Link href="#" aria-label="Facebook" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm">
                <FaFacebookF size={18} className="text-gray-600"  />
              </Link>
              <Link href="#" aria-label="WhatsApp" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-sm">
                <FaWhatsapp size={18} className="text-gray-600"  />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-col items-center gap-6">
             <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 border-b-2 border-blue-600 pb-1">Boutique</h4>
             <ul className="flex flex-col items-center gap-4">
              {[{id: 0, name: 'Accueil', action: scrollToTop}, ...links].map((link) => (
                <li key={link.id}>
                  {link.action ? (
                    <button onClick={link.action} className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors uppercase">
                      {link.name}
                    </button>
                  ) : (
                    <Link href={link.href} className="text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors uppercase">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Secure Payment Display */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-900 border-b-2 border-blue-600 pb-1">SÉCURITÉ</h4>
            <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
               <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full">
                <FaHandHoldingUsd size={22} className="text-blue-600" />
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Méthode Sûre</span>
                 <span className="text-[13px] font-black text-gray-800 uppercase italic">Cash on Delivery</span>
               </div>
            </div>
          </div>

        </div>
      </div>

  {/* Copyright Bar */}
<div className="bg-white py-8 border-t border-gray-100">
  <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.3em]">
      © {new Date().getFullYear()} Vantix Streetwear Studio
    </p>
    <div className="flex gap-8">
      <span className="text-[10px] text-gray-300 uppercase tracking-widest font-black italic underline decoration-blue-600 underline-offset-4">Concept by Vantix</span>
    </div>
  </div>
</div>
    </footer>
  )
}

export default Footer