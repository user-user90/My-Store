"use client"
import useStore from "@/app/_store/UseStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; 
import { RiShoppingBagLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import CartPage from "../Cart";
import { IoSearchOutline } from "react-icons/io5";
import SearchProducts from "../SearchProduct";

const links = [
  { id: 1, name: "Hommes", href: "/Homme" },
  { id: 2, name: "Femmes", href: "/Femme" },
  { id: 3, name: "Ados", href: "/Ados" },
  
];

function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); 
  const [showCart, setShowCart] = useState(false); 
  const [showSearch, setShowSearch] = useState(false); 
  const cart = useStore((state) => state.cart);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  return (
    <header className="border-b border-gray-300 bg-white sticky top-0 z-[100]">
      <nav className="flex justify-between items-center mx-6 md:mx-12 lg:mx-16 py-3">
        
        {/* --- Logo --- */}
        <Link href={'/'} className="text-3xl font-extrabold shrink-0">
          Vantix
        </Link>

        {/* --- Desktop Navigation --- */}
        <ul className="hidden md:flex items-center justify-center gap-6">
          <li>
            <Link 
              href={"/"} 
              className={`${pathname === "/" ? "border-b-2 pb-2 border-purple-800 " : "text-gray-700"} font-semibold hover:text-violet-800 transition duration-300`}
            >
              Accueil
            </Link>
          </li>
            <li>
            <Link 
              href={"/allproducts"} 
              className={`${pathname === "/allproducts" ? "border-b-2 pb-2 border-purple-800 " : "text-gray-700"} font-semibold hover:text-violet-800 transition duration-300`}
            >
              Collection
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.id}>
              <Link 
                href={link.href} 
                className={`${pathname === link.href ? "border-b-2 pb-2 border-purple-800 " : "text-gray-700"} font-semibold hover:text-violet-800 transition duration-300`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons Area */}
        <div className="flex items-center gap-3">
          <button
          aria-label="search product"
          onClick={() => setShowSearch(true)} className="text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <IoSearchOutline />
          </button>

          <button 
          aria-label="open cart"
          onClick={() => setShowCart(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <RiShoppingBagLine className="text-2xl" />
            <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-blue-800 rounded-full translate-x-1 -translate-y-1">
              {mounted ? cart.length : 0}
            </span>
          </button>

          <button 
          aria-label="open menu"
            className={`md:hidden text-3xl transition-all ${showCart ? "z-[40]" : "z-[150]"}`} 
            onClick={() => setOpen(!open)}
          >
            {open ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </nav>

      {/* --- Backdrop --- */}
      {(open || showCart) && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
          onClick={() => { setOpen(false); setShowCart(false); }}
        />
      )}

      {/* --- Mobile Sidebar Menu --- */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white z-[120] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col p-8 pt-20 gap-6 text-xl font-bold ${open ? "translate-x-0" : "translate-x-full"}`}>
          <Link href="/" onClick={() => setOpen(false)} className={pathname === "/" ? "border-b-2 pb-2 border-purple-800 w-fit" : ""}>Accueil</Link>
                    <Link href="/allproducts" onClick={() => setOpen(false)} className={pathname === "/allproducts" ? "border-b-2 pb-2 border-purple-800 w-fit" : ""}>Products</Link>

          {links.map((link) => (
            <Link 
              key={link.id} 
              href={link.href} 
              onClick={() => setOpen(false)}
              className={pathname === link.href ? "border-b-2 pb-2 border-purple-800 w-fit" : ""}
            >
              {link.name}
            </Link>
          ))}
      </div>

      {/* --- Search Modal --- */}
      {showSearch && <SearchProducts closMenu={() => setShowSearch(false)} />}

      {/* --- Cart Sidebar --- */}
      <div className={`fixed inset-y-0 right-0 z-[130] w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold">Panier</h2>
            <button
            aria-label="Fermer le menu"
             onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-200 rounded-full transition">
              <RiCloseLine size={28} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CartPage closeCart={() => setShowCart(false)} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;