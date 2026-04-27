"use client";

import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart } = useCart();

  // Cálculo do total somando os preços do mock
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex justify-end">
      {/* Backdrop (Fundo escuro com desfoque) */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Painel Lateral */}
      <div className="relative w-full max-w-md bg-[#FDFBF9] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header da Sidebar */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-rose-50 p-2 rounded-full">
              <ShoppingBag size={20} className="text-rose-600" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900">Sua Sacola</h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={24} className="text-stone-400" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <ShoppingBag size={48} className="text-stone-200" />
              <p className="text-stone-400 italic font-light">Sua sacola está vazia...</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-rose-600 text-sm font-bold uppercase tracking-widest hover:underline"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                {/* Miniatura do Produto */}
                <div className="w-20 h-24 bg-white rounded-xl border border-stone-100 overflow-hidden relative flex-shrink-0 shadow-sm">
                   <div 
                    className="absolute inset-0 opacity-10" 
                    style={{ backgroundColor: item.color }} 
                   />
                   <div className="flex items-center justify-center h-full">
                      <div 
                        className="w-8 h-8 rounded-full shadow-inner border border-white"
                        style={{ backgroundColor: item.color }}
                      />
                   </div>
                </div>
                
                {/* Infos do Produto */}
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-[10px] uppercase tracking-tighter text-rose-500 font-bold mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-sm text-stone-800 leading-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-400 mb-2">{item.brand}</p>
                  <p className="font-bold text-stone-900">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>

                {/* Botão Remover */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="self-center p-2 text-stone-300 hover:text-rose-500 transition-colors"
                  title="Remover item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Rodapé com Total e Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0,02)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-stone-900 font-serif">
                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            
            <button className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] group">
              Finalizar Pedido
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="mt-6 flex flex-col items-center gap-2">
              <p className="text-[10px] text-stone-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                Pagamento Seguro via Fluxus Pay
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}