import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react"; // Importando o ícone

export function Navbar() {
  return (
   
    <nav className="fixed top-0 left-0 z-50 w-full bg-[#FDFBF9]/95 backdrop-blur-sm border-b border-stone-100 shadow-sm transition-all">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 h-20 lg:h-24">
        
        {/* LOGO */}
        <div className="flex items-center">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <Image
              src="/logo.png"
              alt="Ser Mulher Logo"
              width={160}
              height={50}
              className="h-auto w-auto"
              priority
            />
          </Link>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-x-10">
          {[
            { name: "Home", href: "/" },
            { name: "Produtos", href: "/produtos" },
            { name: "Sobre", href: "/sobre" },
            { name: "Contato", href: "/contato" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold tracking-[0.1em] uppercase text-stone-600 hover:text-stone-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CARRINHO */}
        <div className="flex items-center">
          <button className="relative p-2 text-stone-900 hover:text-stone-600 transition-colors group">
            <ShoppingBag size={24} strokeWidth={1.5} />
            <span className="absolute top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white group-hover:bg-rose-600 transition-colors">
              0
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
}