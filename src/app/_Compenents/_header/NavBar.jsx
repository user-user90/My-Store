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
  { id: 1, name: "Men", href: "/Men" },
  { id: 2, name: "Women", href: "/women" },
  { id: 3, name: "Teens", href: "/Teens" },
];

function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // Mobile Nav State
  const [showCart, setShowCart] = useState(false); // Cart Sidebar State
  const [showSearch, setShowSearch] = useState(false); // حالة البحث
  const cart = useStore((state) => state.cart);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  return (
    <header className="border-b border-gray-300 bg-white sticky top-0 z-50">
      <nav className="flex justify-between items-center mx-6 md:mx-12 lg:mx-16 py-3">
        
        {/* --- Logo --- */}
        <Link href={'/'} className="text-3xl font-extrabold shrink-0">
          MY<span className="font-bold text-blue-700">Store</span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <ul className="hidden md:flex items-center justify-center gap-6">
          <li>
            <Link 
              href={"/"} 
              className={`${pathname === "/" ? "border-b-2 pb-2 border-purple-800 " : "text-gray-700"} font-semibold hover:text-violet-800 transition duration-300`}
            >
              Home
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
          <button onClick={() => setShowSearch(true)} className="text-2xl font-bold p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <IoSearchOutline />
          </button>

          <button onClick={() => setShowCart(true)} className="relative p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
            <RiShoppingBagLine className="text-2xl" />
            <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-blue-800 rounded-full translate-x-1 -translate-y-1">
              {mounted ? cart.length : 0}
            </span>
          </button>

          {/* زر القائمة للهاتف - رفعت الـ z-index ليظهر فوق القائمة عند فتحها */}
          <button className="md:hidden text-3xl z-[110]" onClick={() => setOpen(!open)}>
            {open ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </nav>

      {/* --- Mobile Sidebar Menu (تخرج من اليمين) --- */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-white z-[100] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col p-8 pt-20 gap-6 text-xl font-bold ${open ? "translate-x-0" : "translate-x-full"}`}>
          <Link href="/" onClick={() => setOpen(false)} className={pathname === "/" ? "border-b-2 pb-2 border-purple-800 w-fit" : ""}>Home</Link>
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
      <div className={`fixed inset-y-0 right-0 z-[100] w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${showCart ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-200 rounded-full transition">
              <RiCloseLine size={28} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CartPage closeCart={() => setShowCart(false)} />
          </div>
        </div>
      </div>

      {/* --- Backdrop (الخلفية المظلمة) --- */}
      {(open || showCart) && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]"
          onClick={() => { setOpen(false); setShowCart(false); }}
        />
      )}
    </header>
  );
}

export default NavBar;