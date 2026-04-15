'use client'
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  Eye, 
  ArrowLeft,
  Sparkles
} from "lucide-react";


export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = pathname === "/admin" || pathname === "/admin/login";

  if (isPublicRoute) {
    return (
      <div className="min-h-screen bg-stone-50 font-sans antialiased text-slate-900">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans antialiased text-slate-900">
      
      {/* SIDEBAR FIXA */}
      <aside className="w-72 bg-white border-r border-stone-200 flex flex-col sticky top-0 h-screen">
        
        {/* LOGO */}
        <div className="p-8">
          <h2 className="font-serif text-2xl text-rose-600 font-bold tracking-tight">SerMulher</h2>
          <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-1 font-bold">
            Admin Suite
          </p>
        </div>

        {/* NAVEGAÇÃO PRINCIPAL */}
        <nav className="flex-1 px-4 space-y-2">

          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
              pathname === '/admin/dashboard' ? 'bg-rose-50 text-rose-600' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Dashboard</span>
          </Link>
          
          {/* SPARKLES PARA O EDITOR  */}
          <Link 
            href="/admin/editor" 
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
              pathname === '/admin/editor' ? 'bg-rose-50 text-rose-600' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Editor da Home</span>
          </Link>

          {/* USANDO LAYOUT DASHBOARD PARA UMA VISÃO GERAL  */}
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
              pathname === '/admin/products' ? 'bg-rose-50 text-rose-600' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Catálogo de Produtos</span>
          </Link>

          <div className="pt-4 pb-2 px-4">
            <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">Ações Rápidas</p>
          </div>

          {/* USANDO O EYE PARA VER O SITE PÚBLICO */}
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-50 rounded-2xl transition-all group"
          >
            <Eye size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">Ver Loja Ao Vivo</span>
          </Link>

          {/* USANDO O SETTINGS PARA CONFIGURAÇÕES DE CONTA/ADMIN */}
          <Link 
            href="/admin/settings" 
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group ${
              pathname === '/admin/settings' ? 'bg-rose-50 text-rose-600' : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Settings size={20} className="group-hover:rotate-45 transition-transform" />
            <span className="font-medium">Configurações</span>
          </Link>
        </nav>

        {/* FOOTER DA SIDEBAR */}
        <div className="p-6 border-t border-stone-100 space-y-3">
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100">
            <p className="text-[10px] text-stone-500 font-medium italic">Painel Administrativo</p>
            <p className="text-xs font-bold text-stone-900 truncate">Fábio Costa Silva</p>
          </div>
          
          <Link 
            href="/admin" 
            className="flex items-center gap-2 text-xs text-stone-400 hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Sair do Painel
          </Link>
        </div>
      </aside>

      {/* CONTEÚDO DINÂMICO */}
      <main className="flex-1 overflow-y-auto">
        <div className="min-h-full">
          {children}
        </div>
      </main>

    </div>
  );
}