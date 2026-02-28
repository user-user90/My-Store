import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./_Compenents/_header/NavBar";
import Footer from "./_Compenents/Footer";
import { Toaster } from "react-hot-toast";

// إعداد الخطوط بشكل يمنع تحميل اللغات غير المستخدمة (حل مشكلة Preload not used)
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
  alternates: {
    canonical: 'https://vantix-store.netlify.app',
  },
};

export default function RootLayout({ children }) {
  return (
    // إضافة suppressHydrationWarning هنا لحل مشكلة cz-shortcut-listen والإضافات
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* تحسين الاتصال بـ Sanity - تم إضافة crossorigin لضمان عمل الـ Preconnect بشكل صحيح */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body
        // استخدام suppressHydrationWarning على الـ body أيضاً لضمان استقرار الـ UI
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <div className="bg-[#FAFAFA] min-h-screen flex flex-col">
          <NavBar />
          {/* الـ main هنا مهم للـ SEO والـ Accessibility */}
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