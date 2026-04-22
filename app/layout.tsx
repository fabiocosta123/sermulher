
import "./globals.css";
import { Navbar } from "../components/Navbar"
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Footer } from "@/components/Footer";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "SerMulher | Beleza em Evidência",
  description: "Produtos formulados para realçar a sua melhor versão.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#FDFBF9] text-stone-900`}>
        <Navbar />


        <div className="pt-24 lg:pt-28">
          {children}
        </div>

        <Footer />

      </body>
    </html>
  );
}