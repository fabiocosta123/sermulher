import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/app/components/layout/Navbar"; 
import { Footer } from "@/app/components/layout/Footer";
import { getSiteConfig } from "./admin/products/actions";
import { Toaster } from 'sonner';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "SerMulher | Cosméticos & Beleza",
  description: "A ciência por trás da sua melhor versão. Produtos de beleza premium e skincare.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SerMulher",
  },
};

export const viewport: Viewport = {
  themeColor: "#FDFBF9", // Cor de fundo do site para a barra do navegador
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, 
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig()
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FDFBF9] text-stone-900 font-sans">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        {/* Footer */}
        <Footer config={config} />

        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}