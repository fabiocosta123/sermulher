import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Scissors, 
  Type, 
  Palette, 
  Image as ImageIcon 
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { name: 'Produtos', icon: <ShoppingBag size={20} />, href: '/admin/produtos' },
    { name: 'Serviços', icon: <Scissors size={20} />, href: '/admin/servicos' },
    { name: 'Banners & Fotos', icon: <ImageIcon size={20} />, href: '/admin/banners' },
    { name: 'Textos & Sobre', icon: <Type size={20} />, href: '/admin/textos' },
    { name: 'Cores & Estilo', icon: <Palette size={20} />, href: '/admin/estilo' },
  ];

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col fixed h-full">
        <div className="p-6 border-b border-stone-100">
          <h2 className="text-xl font-bold text-stone-800 tracking-tight">
            Ser Mulher <span className="text-sm font-normal text-stone-400">Admin</span>
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-3 text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-lg transition-colors group"
            >
              <span className="text-stone-400 group-hover:text-stone-900">
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-100 text-xs text-stone-400">
          Logado como: Fábio Costa
        </div>
      </aside>

      {/* Área de Conteúdo */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}