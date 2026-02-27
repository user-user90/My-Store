import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_Compenents/_header/NavBar";
import Footer from "./_Compenents/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap', 
});

export const metadata = {
  title: "Vantix | L'Élégance du Streetwear & Sneakers Premium",
  description: "Découvrez Vantix, votre destination ultime pour les dernières tendances en sneakers et streetwear.",
  keywords: ["Sneakers", "Streetwear", "Mode", "Vantix", "Baskets", "Nike Air Force 1"],
  icons: {
    icon: "/teens3.jpeg", 
  },
  // إضافة تلميحات للمتصفح لتسريع جلب الصور من سانيتي
  alternates: {
    canonical: 'https://vantix-store.netlify.app',
  },
  other: {
    'preconnect': 'https://cdn.sanity.io',
    'dns-prefetch': 'https://cdn.sanity.io',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      {/* إضافة الـ Head يدوياً لتحسين الـ Preconnect بشكل أقوى */}
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* تم حذف tag الـ main الزائد لتحسين الـ DOM Size وجعل الهيكلية أنظف */}
        <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
          <Toaster position="top-center" />
          <Footer />
        </div>
      </body>
    </html>
  );
}