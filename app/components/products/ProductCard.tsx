'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    imageUrl: string
    category: string
    slug: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-stone-100 hover:shadow-xl transition-all duration-500">
      {/* Imagem do Produto */}
      <Link href={`/product/${product.slug}`} className="block aspect-[4/5] overflow-hidden">
        <Image
          src={product.imageUrl || '/placeholder-pro-img.jpg'}
          alt={product.name}
          width={400}
          height={500}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </Link>

      {/* Info do Produto */}
      <div className="p-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-rose-500 font-bold">
          {product.category}
        </span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-1 text-stone-800 font-serif text-lg leading-tight group-hover:text-rose-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-light text-stone-900">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          
          <button className="bg-stone-900 text-white p-3 rounded-full hover:bg-rose-600 transition-colors shadow-lg">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}