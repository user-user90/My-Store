"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const links = [
  { id: 1, name: "Men",href:"/Men" },
  { id: 2, name: "Women",href:"/women" },
  { id: 3, name: "Teens",href:"/Teens"},
];
function NavBar() {
  const pathname =usePathname()
  return (
    <header className="border-b border-gray-300">
      <nav className="flex justify-between text-center items-center mx-6 md:mx-12  lg:mx-16 py-3">
        <Link href={'/'} className="text-3xl font-extrabold ">MY<span className=" font-bold text-blue-700">Store</span> </Link>
        {/* ## Links navBar */}
        <ul className="flex items-center justify-center gap-6">
          <li><Link href={"/"} className="text-gray-400 font-semibold hover:text-violet-800 transition duration-300">Home</Link></li>
          {links?.map((link) => (
            <li key={link?.id}>
              {pathname === link.href ?(
                <Link href={link?.href} className="text-gray-400 font-semibold hover:text-violet-800 transition duration-300">{link?.name}</Link>
              ):(
                <Link href={link?.href} className="text-gray-400 font-semibold hover:text-violet-800 transition duration-300">{link?.name}</Link>
              )}
            </li>
          ))}
        </ul>
        {/* ## Login */}
        <div>
           <span>x</span>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
