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
    <footer className="bg-white mt-32 border-t border-gray-400">
      {/* شريط الثقة العلوي */}
      <div className="border-b border-gray-100 py-6 bg-[#F9F9F9]">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap justify-center md:justify-around gap-8 text-center">
          <div className="flex items-center gap-3">
            <RiTruckLine size={24} className="text-black" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Livraison Partout au Maroc</span>
          </div>
          <div className="flex items-center gap-3">
            <FaHandHoldingUsd size={24} className="text-black" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Paiement à la Livraison</span>
          </div>
          <div className="flex items-center gap-3">
            <RiShieldCheckLine size={24} className="text-black" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Produits Authentiques</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Logo & Social */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            <Link href="/" className="text-3xl font-black text-black tracking-tighter uppercase italic">
              Vantix
            </Link>
            <div className="flex gap-3">
              <a href="#" className="p-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="p-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="p-2.5 bg-[#25D366] text-white rounded-full hover:scale-110 transition-transform">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center gap-6">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Menu</h4>
             <ul className="flex flex-wrap justify-center gap-8">
              <li>
                <button onClick={scrollToTop} className="text-xs font-bold text-black hover:text-gray-500 transition uppercase">
                  Accueil
                </button>
              </li>
              {links.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-xs font-bold text-black hover:text-gray-500 transition uppercase">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* New Payment Concept: Cash On Delivery */}
          <div className="flex flex-col items-center lg:items-end gap-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 text-center lg:text-right">Mode de règlement</h4>
            <div className="flex items-center gap-2 border-2 border-black px-4 py-2 rounded-sm">
               <FaHandHoldingUsd size={20} className="text-black" />
               <span className="text-xs font-black uppercase tracking-tight">Paiement Cash à la livraison</span>
            </div>
            <p className="text-[10px] text-gray-400 font-medium">Payez seulement quand vous recevez</p>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 py-8">
        <div className="mx-auto max-w-7xl px-4 flex justify-center items-center">
          <p className="text-[9px] tracking-[0.4em] text-gray-300 uppercase font-light text-center">
            © {new Date().getFullYear()} Vantix Streetwear Studio. Concept by Vantix.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer