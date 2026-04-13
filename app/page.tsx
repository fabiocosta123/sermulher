'use client'

import { useEffect, useState } from 'react'
import { Hero } from "./components/hero/Hero"
import { getProducts, getSiteConfig } from './admin/products/actions' // Importe o getSiteConfig

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [config, setConfig] = useState<any>(null) // Adicione este estado
  const [loading, setLoading] = useState(true)

  // 1. Ativação do Service Worker para o PWA
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

  // 2. Busca dos produtos E das configurações do site
  useEffect(() => {
    async function loadData() {
      try {
        // Buscamos os dois em paralelo para ganhar velocidade
        const [productsData, configData] = await Promise.all([
          getProducts(),
          getSiteConfig()
        ])
        
        setProducts(productsData)
        setConfig(configData)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Agora o config existe e o Hero pode usar os dados do banco */}
      <Hero
        title={config?.heroTitle}
        subtitle={config?.heroSubtitle}
        imageUrl={config?.heroImageUrl}
      />

      {/* Seção de Destaques Dinâmica */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-serif text-3xl text-stone-900 lg:text-4xl">
            {config?.featuredTitle || "Essenciais para sua Rotina"}
          </h2>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto">
            {config?.featuredSubtitle || "Uma seleção curada de produtos que combinam alta tecnologia e cuidado artesanal."}
          </p>

          {loading ? (
            <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse bg-stone-100 aspect-[3/4] rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4 flex flex-wrap justify-center">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer text-left">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-rose-100/40">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div
                      className="absolute bottom-3 right-3 h-4 w-4 rounded-full border border-white/50 shadow-sm"
                      style={{ backgroundColor: product.hexColor }}
                    />
                  </div>

                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      {product.brand}
                    </p>
                    <h3 className="font-medium text-stone-900 group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm font-bold text-stone-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                      </p>
                      {product.finish && (
                        <span className="text-[10px] text-stone-400 italic">• {product.finish}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="mt-12 py-20 border-2 border-dashed border-stone-100 rounded-3xl">
              <p className="text-stone-400">Aguardando as novidades da temporada...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}