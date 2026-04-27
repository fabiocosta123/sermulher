import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { CartSidebar } from "@/components/CartSidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "Ser Mulher | Beleza em Evidência",
  description: "Produtos formulados para realçar a sua melhor versão.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-stone-50 text-stone-900 antialiased">
        <CartProvider>
          {/* O componente da Sidebar precisa estar aqui para ser controlado pelo contexto */}
          <CartSidebar />
          
          <Header />
          
          {/* Ajustado pt-16 para mobile e lg:pt-24 para acompanhar sua Navbar alta */}
          <main className="min-h-screen pt-20 lg:pt-24"> 
            {children}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}