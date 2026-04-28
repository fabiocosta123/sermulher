import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { CartSidebar } from "@/components/CartSidebar";
import { InstallPrompt } from "@/components/InstallPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export const metadata = {
  title: "Ser Mulher",
  description: "Provador Virtual e Cosméticos",
  icons: {
    icon: "/cliente-icon.png?v=1", 
    shortcut: "/icon.png?v=1",
    apple: "/icon-512x512.png?v=1",
  },
  manifest: "/manifest.json",   
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ser Mulher",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-stone-50 text-stone-900 antialiased">
        <CartProvider>
          
          <CartSidebar />

          <Header />

          
          <main className="min-h-screen pt-20 lg:pt-24">
            {children}
            <InstallPrompt />
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}