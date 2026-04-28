"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ShoppingBag, Eye } from "lucide-react";
import { AITryOn } from "@/components/AITryOn";
import { useCart } from "@/contexts/CartContext";
import Link from 'next/link';
import { PRODUCT_MOCK } from "@/types/product"; // 1. Importação correta e única

const categories = ["Todos", "Batons", "Perfumes", "Hidratantes", "Tinturas", "Blush"];

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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          {filteredProducts.map((product) => {
            const hasAI = ["Batons", "Tinturas", "Blush"].includes(product.category);

            return (
              <div key={product.id} className="group relative flex flex-col">
                {/* O Link agora envolve a imagem e as informações principais */}
                <Link href={`/produtos/${product.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-2xl mb-3 shadow-sm">
                    <Image
                      src={`/${product.image}`}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Botão de IA - Mantemos separado para não disparar o Link de detalhes */}
                    {hasAI && (
                      <div className="absolute top-2 right-2 z-20">
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Impede que o clique no botão abra os detalhes
                            openAI(product);
                          }}
                          className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-stone-100"
                        >
                          <Sparkles size={16} className="text-rose-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Textos do Card - Visíveis sempre */}
                  <div className="px-1">
                    <h3 className="text-stone-900 font-bold text-xs md:text-sm uppercase truncate">
                      {product.name}
                    </h3>
                    <p className="text-stone-500 text-[10px] italic mb-1">{product.category}</p>
                    <p className="text-rose-600 font-bold text-sm">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </Link>

                {/* Botão de Adicionar Rápido - Fixo abaixo do card no Mobile */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="mt-3 w-full bg-stone-900 text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest active:bg-rose-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  Adicionar
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <AITryOn
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        productType={selectedProduct?.category || ""}
        productColor={selectedProduct?.color || "#be123c"}
      />
    </main>
  );
}