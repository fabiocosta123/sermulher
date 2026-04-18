'use client'
import { useState } from 'react'

interface ProductGridProps {
  initialProducts: any[]; 
  whatsappNumber: string | null; // Adicione isso aqui!
}

export default function ProductGrid({ initialProducts, whatsappNumber }:  ProductGridProps ) {
  const [filter, setFilter] = useState('todos')

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'shampoos', name: 'Shampoos' },
    { id: 'perfumes', name: 'Perfumes' },
    { id: 'cremes', name: 'Cremes' },
  ]

  const filtered = filter === 'todos' 
    ? initialProducts 
    : initialProducts.filter(p => p.category === filter)

  return (
    <div className="space-y-12">
      {/* Botões de Filtro */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-8 py-2 rounded-full border transition-all text-sm font-medium ${
              filter === cat.id 
              ? 'bg-rose-600 border-rose-600 text-white shadow-lg' 
              : 'border-stone-200 text-stone-500 hover:border-rose-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-[3/4] overflow-hidden rounded-[2rem] bg-stone-100 mb-4 relative">
              <img 
                src={product.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                alt={product.name}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-900">
                {product.category}
              </div>
            </div>
            <h3 className="font-serif text-xl text-stone-900 mb-1">{product.name}</h3>
            <p className="text-stone-400 text-sm mb-2">{product.brand}</p>
            <p className="text-rose-600 font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
            </p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-stone-400 italic py-20">Nenhum produto encontrado nesta categoria.</p>
      )}
    </div>
  )
}