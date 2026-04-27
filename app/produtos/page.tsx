"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ShoppingBag, Eye } from "lucide-react";
import { AITryOn } from "@/components/AITryOn";
import { useCart } from "@/contexts/CartContext"; 
import Link from 'next/link';
import { PRODUCT_MOCK } from "@/types/product"; // 1. Importação correta e única

const categories = ["Todos", "Batons", "Perfumes", "Hidratantes", "Tinturas", "Serviços", "Blush"];

export default function ProdutosPage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [onlyAI, setOnlyAI] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // 2. Lógica de filtro usando o PRODUCT_MOCK oficial
  const filteredProducts = PRODUCT_MOCK.filter(p => {
    const matchCategory = activeCategory === "Todos" || p.category === activeCategory;
    
    // Define quais categorias suportam IA (ajuste conforme seu AITryOn)
    const canUseAI = ["Batons", "Tinturas", "Blush"].includes(p.category);
    const matchAI = onlyAI ? canUseAI : true;
    
    return matchCategory && matchAI;
  });

  const openAI = (product: any) => {
    setSelectedProduct(product);
    setIsAIModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#FDFBF9] pb-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Cabeçalho */}
        <header className="py-12 lg:py-20 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl text-stone-900 mb-6">Nossa Coleção</h1>
          <p className="text-stone-500 max-w-2xl mx-auto uppercase tracking-widest text-[10px] font-bold">
            Curadoria exclusiva para realçar sua essência única.
          </p>
        </header>

        {/* Barra de Filtros */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 border-b border-stone-100 pb-8">
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
            filteredProducts.map((product) => {
              // Verifica se este produto específico suporta IA
              const hasAI = ["Batons", "Tinturas", "Blush"].includes(product.category);

              return (
                <div key={product.id} className="group relative flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm mb-4 shadow-sm">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Botão de IA flutuante */}
                    {hasAI && (
                      <div className="absolute top-3 right-3 z-10">
                        <button
                          onClick={() => openAI(product)}
                          className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-stone-100 group/ai transition-transform hover:scale-110"
                        >
                          <Sparkles size={16} className="text-stone-900" />
                          <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-stone-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover/ai:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-tighter">
                            Testar Agora
                          </span>
                        </button>
                      </div>
                    )}

                    {/* Overlay com Ações - Agora com Link dinâmico usando product.id do MOCK */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2 bg-gradient-to-t from-black/20 to-transparent">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product); // Sem 'as any', pois agora os tipos batem
                        }}
                        className="w-full bg-rose-600 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-rose-700 flex items-center justify-center gap-2 transition-colors"
                      >
                        <ShoppingBag size={14} />
                        Adicionar
                      </button>

                      <Link
                        href={`/produtos/${product.id}`} // <--- Aqui o ID será b1, t1, etc.
                        className="w-full bg-stone-900 text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 flex items-center justify-center gap-2 text-center transition-colors"
                      >
                        <Eye size={14} />
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>

                  {/* Textos do Card */}
                  <h3 className="text-stone-900 font-bold text-sm tracking-tight uppercase mb-1">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-stone-500 text-[11px] font-light italic">{product.category}</p>
                    <div className="w-3 h-3 rounded-full border border-stone-200" style={{ backgroundColor: product.color }} />
                  </div>
                  <p className="text-rose-600 font-bold text-sm mt-2">
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center text-stone-400">
              <p className="uppercase tracking-widest text-xs">Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </div>

      <AITryOn
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        productType={selectedProduct?.category || ""}
      />
    </main>
  );
}