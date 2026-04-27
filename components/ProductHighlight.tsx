"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Eye } from "lucide-react";


const products = [
  { id: "p1", name: "Kit Impala Ju Paes", price: 89.90, image: "/produto1.jpg", category: "Unhas", brand: "Impala", color: "#f3e5f5" },
  { id: "p2", name: "Kit Giovana Baby", price: 75.00, image: "/produto2.jpg", category: "Cuidados", brand: "Giovana Baby", color: "#e3f2fd" },
  { id: "p3", name: "Gloss Lip Bunny Triple", price: 58.00, image: "/produto3.jpg", category: "Maquiagem", brand: "Bunny", color: "#fce4ec" },
  { id: "p4", name: "Gloss Framboesa by Franciny Ehlke", price: 112.00, image: "/produto4.jpg", category: "Maquiagem", brand: "Franciny Ehlke", color: "#ff80ab" },
];

export function ProductHighlight() {
  const { addToCart } = useCart();

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Título da Seção */}
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-stone-900 mb-4">
            Os Mais Desejados
          </h2>
          <p className="text-stone-500 uppercase tracking-widest text-xs font-bold">
            Cuidados que sua pele merece
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col">
              {/* Container da Imagem */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay de Ações */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                  <Link 
                    href={`/produtos/${product.id}`}
                    className="w-32 bg-white py-2 text-[10px] font-bold uppercase tracking-tighter shadow-sm text-center hover:bg-stone-900 hover:text-white transition-colors"
                  >
                    <Eye size={14} />
                    Detalhes
                  </Link>
                  <button 
                    onClick={() => addToCart(product as any)}
                    className="w-32 bg-rose-600 text-white py-2 text-[10px] font-bold uppercase tracking-tighter shadow-sm flex items-center justify-center gap-2 hover:bg-rose-700 transition-colors"
                  >
                    <ShoppingBag size={12} />
                    Adicionar
                  </button>
                </div>
              </div>

              {/* Informações do Produto */}
              <h3 className="font-medium text-stone-900 text-sm mb-1 uppercase tracking-tight">
                {product.name}
              </h3>
              <p className="text-rose-600 text-sm font-bold">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          ))}
        </div>

        {/* Botão Ver Todos */}
        <div className="mt-16 text-center">
          <Link
            href="/produtos"
            className="inline-block border border-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-900 hover:text-white transition-all"
          >
            Explorar Coleção Completa
          </Link>
        </div>
      </div>
    </section>
  );
}