import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"; 

export function Footer() {
  return (
    <footer className="w-full bg-[#FDFBF9] border-t border-stone-200 py-12 mt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* REDES SOCIAIS */}
          <div className="flex items-center space-x-8">
            <a 
              href="https://wa.me/5513998065641" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-stone-500 hover:text-green-600 transition-colors"
            >
              <MessageCircle size={20} strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
            </a>
            
            <a 
              href="https://www.instagram.com/sermulher.registro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-pink-600 transition-colors"
            >
              Instagram
            </a>

            <a 
              href="https://www.facebook.com/sermulherregistro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-blue-700 transition-colors"
            >
              Facebook
            </a>
          </div>

         <div className="flex items-center justify-center">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image 
                src="/logo.png" 
                alt="Ser Mulher Logo" 
                width={100} // Um pouco menor que na Navbar para ficar proporcional
                height={32}
                className="h-auto w-auto opacity-80" // Opacidade leve para ser discreto
              />
            </Link>
          </div>

          {/* LADO DIREITO: Créditos */}
          <div className="text-center md:text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
              Desenvolvido por <span className="text-stone-600 font-bold text-[11px]">Fábio Costa</span> — 2026
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}