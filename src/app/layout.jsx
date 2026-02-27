import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_Compenents/_header/NavBar";
import Footer from "./_Compenents/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // يسرع ظهور النص فوراً
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', // يسرع ظهور النص فوراً
});

export const metadata = {
  title: "Vantix | L'Élégance du Streetwear & Sneakers Premium",
  description: "Découvrez Vantix, votre destination ultime pour les dernières tendances en sneakers et streetwear. Qualité premium, icônes intemporelles et style urbain redéfini.",
  keywords: ["Sneakers", "Streetwear", "Mode", "Vantix", "Baskets", "Nike Air Force 1", "Windrunner"],
  icons: {
    icon: "/teens3.jpeg", 
  }
};

export default function RootLayout({ children }) {
  return (
    // تم تغيير اللغة للفرنسية لتحسين الـ SEO
    <html lang="fr"> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="bg-[#FAFAFA] min-h-screen flex flex-col">
          <NavBar />
          {/* تأكد أن محتوى الصفحة يأخذ المساحة المتبقية */}
          <div className="flex-grow">
            {children}
          </div>
          <Toaster position="top-center" />
          <Footer />
        </main>
      </body>
    </html>
  );
}