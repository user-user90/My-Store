import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_Compenents/_header/NavBar";
import Footer from "./_Compenents/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vantix | L'Élégance du Streetwear & Sneakers Premium",
  description: "Découvrez Vantix, votre destination ultime pour les dernières tendances en sneakers et streetwear. Qualité premium, icônes intemporelles et style urbain redéfini.",
  keywords: ["Sneakers", "Streetwear", "Mode", "Vantix", "Baskets", "Nike Air Force 1", "Windrunner"],
  icons: {
    icon: "/teens3.jpeg", // سيقوم Next.js بالبحث عن هذا الملف في مجلد public
  }

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="bg-[#FAFAFA]">
          <NavBar />
          {children}
            <Toaster position="top-center"  />
          <Footer />
        </main>
      </body>
    </html>
  );
}
