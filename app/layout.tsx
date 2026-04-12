import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/layout/Navbar"; 
import { Toaster } from 'sonner';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

        <Toaster position="top-center" richColors/>
      </body>
    </html>
  );
}