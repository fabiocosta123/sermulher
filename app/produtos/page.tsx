"use client"; 

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Filter } from "lucide-react";

const categories = ["Todos", "Batons", "Perfumes", "Hidratantes", "Tinturas", "Serviços"];

const allProducts = [
  { id: 1, name: "Batom Matte Velvet", category: "Batons", price: "R$ 45,00", image: "/produto1.jpg", hasAI: true },
  { id: 2, name: "Perfume Essence Florale", category: "Perfumes", price: "R$ 280,00", image: "/produto2.jpg", hasAI: false },
  { id: 3, name: "Hidratante Facial Noite", category: "Hidratantes", price: "R$ 89,00", image: "/produto3.jpg", hasAI: false },
  { id: 4, name: "Tintura Louro Radiante", category: "Tinturas", price: "R$ 65,00", image: "/produto4.jpg", hasAI: true },
  
];

export default function ProdutosPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = activeCategory === "Todos" 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FDFBF9] pb-20">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Cabeçalho da Página */}
        <header className="py-12 lg:py-20 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl text-stone-900 mb-6">Nossa Coleção</h1>
          <p className="text-stone-500 max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold">
            Curadoria exclusiva para realçar sua essência única.
          </p>
        </header>

        {/* Barra de Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all border-b-2 
                ${activeCategory === cat ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative flex flex-col">
              
              {/* Container da Imagem */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm mb-4 shadow-sm">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* ÍCONE DE IA (Discreto) */}
                {product.hasAI && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-stone-100 group/ai cursor-help">
                      <Sparkles size={16} className="text-stone-900" />
                      {/* Tooltip discreto */}
                      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-stone-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/ai:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">
                        Teste com IA
                      </span>
                    </div>
                  </div>
                )}

                {/* Botão de compra rápido no hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-stone-900 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800">
                    Ver Detalhes
                  </button>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-stone-900 font-bold text-sm tracking-tight uppercase mb-1">{product.name}</h3>
              <p className="text-stone-500 text-sm font-light italic mb-2">{product.category}</p>
              <p className="text-stone-900 font-medium text-sm">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}