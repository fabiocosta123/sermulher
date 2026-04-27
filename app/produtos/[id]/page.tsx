"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useMemo } from "react";
import { ShoppingBag, Sparkles, ChevronLeft, ShieldCheck, Truck, Palette } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { AITryOn } from "@/components/AITryOn";
import { PRODUCT_MOCK } from "@/types/product"; // 1. Importação dos dados reais

export default function ProdutoDetalhe() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // 2. Busca o produto real no Mock usando useMemo para performance
  const product = useMemo(() => {
    return PRODUCT_MOCK.find((p) => p.id === id);
  }, [id]);

  if (!product) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-2xl font-serif mb-4">Produto não encontrado</h2>
        <button onClick={() => router.push('/produtos')} className="text-rose-600 underline">
          Voltar para a loja
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF9] pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* BREADCRUMBS */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 text-xs font-bold uppercase tracking-widest"
        >
          <ChevronLeft size={16} />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* IMAGEM DO PRODUTO */}
          <div className="relative aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Swatch de Cor Flutuante */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-stone-100">
              <div 
                className="w-10 h-10 rounded-full border border-black/5 shadow-inner" 
                style={{ backgroundColor: product.color }}
              />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-tighter text-stone-400">Tom Selecionado</p>
                <p className="text-xs font-bold text-stone-800 uppercase">{product.subtone}</p>
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="flex flex-col">
            <span className="text-rose-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">
              {product.category} | {product.brand}
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl text-stone-900 mb-6 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-2xl font-bold text-stone-900 mb-8">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-2 py-2 px-4 bg-stone-100 rounded-lg w-fit">
                <Palette size={14} className="text-stone-600" />
                <span className="text-xs font-medium text-stone-600">Subtom: <b className="uppercase">{product.subtone}</b></span>
              </div>
              
              <p className="text-stone-500 leading-relaxed font-light">
                Desenvolvido com a tecnologia da <b>{product.brand}</b>, este item da linha <b>{product.category}</b> 
                foi selecionado especificamente para harmonizar com subtons <b>{product.subtone}s</b>, 
                garantindo um resultado natural e radiante.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-stone-100">
                <div className="flex items-center gap-3 text-stone-400">
                  <ShieldCheck size={20} className="text-emerald-500" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Original & Local</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400">
                  <Truck size={20} className="text-rose-400" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Entrega em Registro</span>
                </div>
              </div>
            </div>

            {/* AÇÕES */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-stone-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-stone-800 transition-all shadow-xl active:scale-[0.98]"
              >
                <ShoppingBag size={18} />
                Adicionar à Sacola
              </button>

              {/* Botão de IA dinâmico: Ativa se for categoria que suporta IA */}
              {['Batons', 'Tinturas', 'Blush'].includes(product.category) && (
                <button 
                  onClick={() => setIsAIModalOpen(true)}
                  className="flex-1 bg-white border-2 border-rose-200 text-rose-600 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-rose-50 transition-all shadow-md"
                >
                  <Sparkles size={18} className="animate-pulse" />
                  Provador Virtual
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL IA */}
      <AITryOn 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        productType={product.category}
      />
    </main>
  );
}