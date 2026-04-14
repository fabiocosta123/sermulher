import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/app/components/products/ProductCard'

export default async function ProductsPage() {
  // Buscamos os produtos ativos do seu banco Neon
  const products = await prisma.product.findMany({
    //where: { active: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen bg-[#FDFBF9] pt-28 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <header className="mb-12">
          <span className="text-rose-500 font-bold tracking-[0.3em] text-[10px] uppercase block mb-2">
            Curadoria Exclusiva
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900">
            Nossos <span className="italic text-rose-600">Produtos</span>
          </h1>
        </header>

        {/* Grid de Exibição */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
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
        ) : (
          <div className="py-20 text-center border-2 border-dashed border-stone-200 rounded-3xl">
            <p className="text-stone-400 font-serif text-xl italic">
              Estamos preparando novidades incríveis para você. 🌸
            </p>
          </div>
        )}
      </div>
    </div>
  )
}