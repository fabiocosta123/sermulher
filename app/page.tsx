import { prisma } from '../lib/prisma'
import { getSiteConfig } from './admin/products/actions'
import ProductGrid from './components/products/ProductGrid'

// Isso impede o cache de entregar uma página vazia/quebrada
export const revalidate = 0;

export default async function HomePage() {
  const [config, productsRaw] = await Promise.all([
    getSiteConfig(),
    prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })
  ])

  // Limpeza de dados para o Componente Client (Resolve o erro do Decimal)
  const products = productsRaw.map(p => ({
    ...p,
    price: Number(p.price),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }))

  const site = config || {
    heroTitle: 'Ser Mulher',
    heroSubtitle: 'Cosméticos e Perfumaria',
    heroImageUrl: '',
    featuredTitle: 'Nossa Vitrine',
    footerAddress: 'Registro, SP',
    footerWhatsapp: '',
    footerInstagram: 'sermulher_cosmeticos',
    footerEmail: ''
  }

  return (
    <main className="min-h-screen bg-stone-50">
      
      {/* SEÇÃO HERO - Ajustada para não "atropelar" o conteúdo */}
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-stone-900 overflow-hidden">
        {site.heroImageUrl && (
          <img 
            src={site.heroImageUrl} 
            className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
            alt="Banner Ser Mulher"
          />
        )}
        
        {/* O z-10 garante que o texto fique ACIMA da imagem */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl space-y-6">
          <h1 className="font-serif text-5xl md:text-8xl tracking-tight leading-tight drop-shadow-md">
            {site.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl font-light text-stone-200 max-w-2xl mx-auto leading-relaxed">
            {site.heroSubtitle}
          </p>
        </div>
      </section>

      {/* VITRINE DE PRODUTOS */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-20">
        <header className="flex flex-col items-center text-center mb-16 space-y-4">
          <span className="text-rose-600 font-bold uppercase text-[10px] tracking-[0.3em]">Curadoria Exclusiva</span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900">
            {site.featuredTitle || 'Destaques'}
          </h2>
          <div className="w-12 h-1 bg-rose-300 rounded-full"></div>
        </header>

        <ProductGrid 
          initialProducts={products} 
          whatsappNumber={site.footerWhatsapp}
        />
      </section>

      {/* RODAPÉ */}
      <footer className="bg-white border-t border-stone-100 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-stone-50 pb-16">
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-stone-900">Ser Mulher</h3>
            <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
              {site.footerAddress}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Atendimento</h4>
            <p className="text-stone-900 font-medium">{site.footerWhatsapp}</p>
            <p className="text-stone-500 text-sm">{site.footerEmail}</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400">Redes Sociais</h4>
            <a 
              href={`https://instagram.com/${site.footerInstagram}`}
              target="_blank"
              className="block text-rose-600 hover:text-rose-700 transition-colors font-medium"
            >
              @{site.footerInstagram}
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}