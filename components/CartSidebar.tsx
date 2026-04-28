"use client";

import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus, MessageCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useCart();

  // Cálculo do total 
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);

  // mensagem do WhatsApp
  const handleWhatsAppCheckout = () => {
    const phone = "5513998065641";
    const itemsList = cart
      .map((item) => {
        const qty = item.quantity ?? 1;
        return `• ${item.name} (${qty}x) - R$ ${(item.price * qty).toFixed(2)}`;
      })
      .join("\n");

    const message = encodeURIComponent(
      `Olá! Gostaria de finalizar meu pedido na Ser Mulher:\n\n${itemsList}\n\n*Total: R$ ${total.toFixed(2)}*\n\nComo posso proceder com o pagamento?`
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Painel Lateral */}
      <div className="relative w-full max-w-md bg-[#FDFBF9] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

        {/* Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-rose-50 p-2 rounded-full">
              <ShoppingBag size={20} className="text-rose-600" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900">Sua Sacola</h2>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
            <X size={24} className="text-stone-400" />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center gap-4">
              <ShoppingBag size={48} className="text-stone-200" />
              <p className="text-stone-400 italic font-light">Sua sacola está vazia...</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* Miniatura */}
                <div className="w-20 h-24 bg-white rounded-xl border border-stone-100 overflow-hidden relative flex-shrink-0">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundColor: item.color }} />
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 rounded-full shadow-inner border border-white" style={{ backgroundColor: item.color }} />
                  </div>
                </div>

                {/* Infos e Controles */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-tighter text-rose-500 font-bold">{item.category}</span>
                      <h3 className="font-semibold text-sm text-stone-800 leading-tight mb-1">{item.name}</h3>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between">
                    {/* Controle de Quantidade */}
                    <div className="flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-stone-50 text-stone-600 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-xs font-bold text-stone-800 min-w-[24px] text-center">
                        {item.quantity ?? 1}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-stone-50 text-stone-600 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-stone-900 text-sm">
                      R$ {(item.price * (item.quantity ?? 1)).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-stone-500 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-stone-900 font-serif">
                R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] group"
            >
              <MessageCircle size={20} />
              Finalizar via WhatsApp
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mt-4 text-[10px] text-stone-400 text-center uppercase tracking-widest">
              Atendimento personalizado Ser Mulher
            </p>
          </div>
        )}
      </div>
    </div>
  );
}