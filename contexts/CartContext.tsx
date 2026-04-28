"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/types/product';
import { Toast } from '@/components/Toast'; // Importe o seu componente Toast

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  
  const [showToast, setShowToast] = useState(false);

  
  useEffect(() => {
    const savedCart = localStorage.getItem("ser-mulher-cart");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ser-mulher-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // --- LÓGICA PARA DISPARAR O TOAST ---
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); 
    setIsCartOpen(true); 
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter(p => p.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => prev.map(item => {
      if (item.id === productId) {
        const currentQty = item.quantity || 1;
        const newQty = Math.max(1, currentQty + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const totalItemsCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart, 
      totalItems: totalItemsCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
      
      {/*  RENDERIZA O TOAST  */}
      <Toast 
        message="Item adicionado com sucesso! ✨" 
        visible={showToast} 
      />
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de um CartProvider");
  return context;
};