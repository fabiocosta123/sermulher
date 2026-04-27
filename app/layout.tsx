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

export const metadata = {
  title: "Ser Mulher",
  description: "Provador Virtual e Cosméticos",
  manifest: "/manifest.json", 
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
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