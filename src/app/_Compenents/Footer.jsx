import Link from "next/link"

const links = [
  { id: 1, name: "Men", href: "/Men" },
  { id: 2, name: "Women", href: "/Women" },
  { id: 3, name: "Teens", href: "/Teens" },
]

function Footer() {
  return (
    <footer className="bg-gray-100 mt-32 border-t border-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Logo Section */}
          <Link href="/" className="text-2xl font-bold text-black">
            MY<span className="text-blue-600">Store</span>
          </Link>

          {/* Links Section */}
          <ul className="flex flex-wrap justify-center gap-6 lg:gap-8">
            <li>
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-300">
                Home
              </Link>
            </li>
            {links.map((link) => (
              <li key={link.id}>
                <Link 
                  href={link.href} 
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-900 py-4">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-center items-center gap-2">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} <span className="text-white font-semibold">MYStore</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer