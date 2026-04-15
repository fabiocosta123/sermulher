'use client'

import { useEffect, useState } from 'react'
import { Hero } from "./components/hero/Hero"
import { getProducts, getSiteConfig } from './admin/products/actions'
import { ProductCard } from '@/app/components/products/ProductCard'

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
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    price: Number(product.price), 
                    imageUrl: product.imageUrl || '',
                    category: product.category,
                    slug: product.id 
                  }}
                />
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