"use client"; 

import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { AITryOn } from "@/components/AITryOn";

const categories = ["Todos", "Batons", "Perfumes", "Hidratantes", "Tinturas", "Serviços"];

const allProducts = [
  { id: 1, name: "Batom Matte Velvet", category: "Batons", price: "R$ 45,00", image: "/produto1.jpg", hasAI: true },
  { id: 2, name: "Perfume Essence Florale", category: "Perfumes", price: "R$ 280,00", image: "/produto2.jpg", hasAI: false },
  { id: 3, name: "Hidratante Facial Noite", category: "Hidratantes", price: "R$ 89,00", image: "/produto3.jpg", hasAI: false },
  { id: 4, name: "Tintura Louro Radiante", category: "Tinturas", price: "R$ 65,00", image: "/produto4.jpg", hasAI: true },
];

export default function ProdutosPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [onlyAI, setOnlyAI] = useState(false); // Novo estado para o filtro de IA
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Lógica de filtragem combinada (Categoria + Filtro de IA)
  const filteredProducts = allProducts.filter(p => {
    const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
    const matchAI = onlyAI ? p.hasAI : true;
    return matchCategory && matchAI;
  });

  const openAI = (product: any) => {
    setSelectedProduct(product);
    setIsAIModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF9] pb-20">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Cabeçalho da Página */}
        <header className="py-12 lg:py-20 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl text-stone-900 mb-6">Nossa Coleção</h1>
          <p className="text-stone-500 max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-bold">
            Curadoria exclusiva para realçar sua essência única.
          </p>
        </header>

        {/* Barra de Filtros e Toggle de IA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b border-stone-100 pb-8">
          
          {/* Categorias */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full border
                  ${activeCategory === cat 
                    ? 'bg-stone-900 border-stone-900 text-white' 
                    : 'bg-transparent border-stone-200 text-stone-400 hover:border-stone-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filtro Especial IA (Substituindo o ícone de filtro genérico) */}
          <button 
            onClick={() => setOnlyAI(!onlyAI)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300
              ${onlyAI 
                ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm' 
                : 'bg-white border-stone-200 text-stone-500 hover:bg-stone-50'}`}
          >
            <Sparkles size={14} className={onlyAI ? "animate-pulse" : ""} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {onlyAI ? "Mostrando apenas IA" : "Ver Provador Virtual"}
            </span>
          </button>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="group relative flex flex-col">
                
                {/* Container da Imagem */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm mb-4 shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* ÍCONE DE IA (Interativo) */}
                  {product.hasAI && (
                    <div className="absolute top-3 right-3 z-10">
                      <button 
                        onClick={() => openAI(product)}
                        className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-stone-100 group/ai transition-transform hover:scale-110"
                      >
                        <Sparkles size={16} className="text-stone-900" />
                        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-stone-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/ai:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter pointer-events-none">
                          Testar Agora
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-stone-900 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800">
                      Ver Detalhes
                    </button>
                  </div>
                </div>

                <h3 className="text-stone-900 font-bold text-sm tracking-tight uppercase mb-1">{product.name}</h3>
                <p className="text-stone-500 text-[11px] font-light italic mb-2">{product.category}</p>
                <p className="text-stone-900 font-medium text-sm">{product.price}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-stone-400">
              <p className="uppercase tracking-widest text-xs">Nenhum produto encontrado nesta categoria com IA.</p>
            </div>
          )}
        </div>
      </div>

      {/* COMPONENTE DE IA */}
      <AITryOn 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        productType={selectedProduct?.category || ""}
      />
    </main>
  );
}