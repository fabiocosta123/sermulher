'use client'

import { useEffect, useState } from 'react'
import { Hero } from "./components/hero/Hero"

export default function Home() {  
  
  // Ativação do Service Worker para o PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => console.log('SerMulher PWA: Ativo!', reg.scope))
          .catch((err) => console.log('SerMulher PWA: Erro', err));
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
     
      <Hero />

      {/* Seção de Destaques */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-serif text-3xl text-stone-900 lg:text-4xl">
            Essenciais para sua <span className="italic text-rose-600">Rotina</span>
          </h2>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            Uma seleção curada de produtos que combinam alta tecnologia e cuidado artesanal.
          </p>
          
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100 transition-transform group-hover:scale-[1.02]">
                  <div className="flex h-full items-center justify-center text-stone-300 italic">
                    Produto {item}
                  </div>
                </div>
                <div className="mt-4 text-left">
                  <h3 className="font-medium text-stone-900">Nome do Cosmético</h3>
                  <p className="text-sm font-bold text-rose-600">R$ 89,90</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}