'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import { toast } from 'sonner'
import { 
  Sparkles, 
  Layout, 
  ShoppingBag, 
  Save, 
  Image as ImageIcon, 
  MapPin,    
  MessageCircle,
  Camera,
  X
} from 'lucide-react'

// Importe as ações corretas do seu arquivo
import { getSiteConfig, updateSiteConfig, getProductById, createProduct } from '../products/actions'

export default function EditorMaster() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get('id')

  const [config, setConfig] = useState({
    heroTitle: '', heroSubtitle: '', heroImageUrl: '',
    featuredTitle: '', featuredSubtitle: '',
    footerAddress: '', footerWhatsapp: '', footerInstagram: '', footerEmail: ''
  })

  const [productData, setProductData] = useState({
    name: '', price: '', category: '', brand: '', imageUrl: ''
  })

  const [loading, setLoading] = useState(false)

  // Carregamento de Dados com tratamento de NULL para o TypeScript
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const siteData = await getSiteConfig()
        if (siteData) {
          setConfig({
            heroTitle: siteData.heroTitle || '',
            heroSubtitle: siteData.heroSubtitle || '',
            heroImageUrl: siteData.heroImageUrl || '',
            featuredTitle: siteData.featuredTitle || '',
            featuredSubtitle: siteData.featuredSubtitle || '',
            footerAddress: siteData.footerAddress || '',
            footerWhatsapp: siteData.footerWhatsapp || '',
            footerInstagram: siteData.footerInstagram || '',
            footerEmail: siteData.footerEmail || ''
          })
        }

        if (productId) {
          const prodData = await getProductById(productId)
          if (prodData) {
            setProductData({
              name: prodData.name || '',
              price: String(prodData.price) || '',
              category: prodData.category || '',
              brand: prodData.brand || '',
              imageUrl: prodData.imageUrl || ''
            })
          }
        }
      } catch (error) {
        toast.error("Erro ao carregar dados.")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [productId])

  const handleSaveConfig = async () => {
    const toastId = toast.loading("Atualizando visual...")
    const result = await updateSiteConfig(config)
    if (result.success) toast.success("Visual atualizado!", { id: toastId })
    else toast.error("Erro ao salvar.", { id: toastId })
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    const toastId = toast.loading("Salvando peça...")
    // Usando createProduct (ou a função que você exportou para salvar/editar)
    const result = await createProduct({ ...productData, id: productId || undefined })
    
    if (result.success) {
      toast.success("Vitrine atualizada!", { id: toastId })
      router.push('/admin/products')
    } else {
      toast.error("Erro ao salvar produto.", { id: toastId })
    }
  }

  if (loading && !config.heroTitle) return <div className="p-20 text-center font-serif italic text-stone-400">Carregando editor...</div>

  return (
    <div className="max-w-5xl mx-auto p-8 pb-32 space-y-12 animate-in fade-in duration-500">
      <header className="flex justify-between items-end border-b border-stone-100 pb-8">
        <div>
          <h1 className="font-serif text-4xl text-stone-900">Editor da Home</h1>
          <p className="text-stone-500 mt-2">Gerencie o visual do Ser Mulher</p>
        </div>
        <button onClick={handleSaveConfig} className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-rose-600 transition-all shadow-xl shadow-stone-200">
          <Save size={18} /> Salvar Configurações
        </button>
      </header>

      {/* --- SEÇÃO 1: HERO --- */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-rose-600">
          <Layout size={20} />
          <h2 className="font-bold uppercase text-xs tracking-widest">Banner Principal</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input 
              className="w-full p-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-rose-500 outline-none"
              placeholder="Título de Impacto"
              value={config.heroTitle}
              onChange={e => setConfig({...config, heroTitle: e.target.value})}
            />
            <textarea 
              className="w-full p-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-rose-500 outline-none h-32"
              placeholder="Descrição do Banner..."
              value={config.heroSubtitle}
              onChange={e => setConfig({...config, heroSubtitle: e.target.value})}
            />
          </div>
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result: any) => setConfig({ ...config, heroImageUrl: result.info.secure_url })}
          >
            {({ open }) => (
              <div onClick={() => open()} className="h-full min-h-[200px] bg-stone-50 border-2 border-dashed border-stone-200 rounded-[2rem] flex items-center justify-center cursor-pointer hover:border-rose-400 transition-all overflow-hidden group">
                {config.heroImageUrl ? (
                  <img src={config.heroImageUrl} className="w-full h-full object-cover" alt="Hero" />
                ) : (
                  <div className="text-center group-hover:scale-110 transition-transform text-stone-300">
                    <ImageIcon size={32} className="mx-auto" />
                    <p className="text-xs mt-2 font-bold uppercase">Trocar Imagem</p>
                  </div>
                )}
              </div>
            )}
          </CldUploadWidget>
        </div>
      </section>

      {/* --- SEÇÃO 2: PRODUTO EM DESTAQUE --- */}
      <section className="bg-rose-600 text-white p-10 rounded-[3rem] shadow-xl shadow-rose-200">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={28} />
          <h2 className="font-serif text-3xl">{productId ? 'Editar Peça' : 'Nova Peça na Vitrine'}</h2>
        </div>

        <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <input 
              required
              className="col-span-2 p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:bg-white/20"
              placeholder="Nome do Produto"
              value={productData.name}
              onChange={e => setProductData({...productData, name: e.target.value})}
            />
            <input 
              required
              type="number"
              className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:bg-white/20"
              placeholder="Preço (150.00)"
              value={productData.price}
              onChange={e => setProductData({...productData, price: e.target.value})}
            />
            <input 
              className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:bg-white/20"
              placeholder="Marca/Coleção"
              value={productData.brand}
              onChange={e => setProductData({...productData, brand: e.target.value})}
            />
            <div className="col-span-2 flex gap-3">
                {productId && (
                    <button type="button" onClick={() => router.push('/admin/editor')} className="flex-1 bg-stone-900 text-white p-4 rounded-2xl font-bold hover:bg-black transition-all">
                        Cancelar
                    </button>
                )}
                <button type="submit" className="flex-[2] bg-white text-rose-600 p-4 rounded-2xl font-bold hover:bg-stone-100 transition-all flex items-center justify-center gap-2">
                    <Sparkles size={18} /> {productId ? 'Atualizar Vitrine' : 'Publicar Produto'}
                </button>
            </div>
          </div>
          
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result: any) => setProductData({ ...productData, imageUrl: result.info.secure_url })}
          >
            {({ open }) => (
              <div onClick={() => open()} className="h-full min-h-[200px] bg-white/10 border-2 border-dashed border-white/20 rounded-3xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all">
                {productData.imageUrl ? (
                  <img src={productData.imageUrl} className="h-full w-full object-cover rounded-3xl" alt="Produto" />
                ) : (
                  <div className="text-center text-white/50">
                    <ImageIcon size={32} className="mx-auto" />
                    <p className="text-[10px] mt-2 font-bold uppercase tracking-widest">Foto do Produto</p>
                  </div>
                )}
              </div>
            )}
          </CldUploadWidget>
        </form>
      </section>

      {/* --- SEÇÃO 3: RODAPÉ --- */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-stone-400 mb-1"><MapPin size={14}/> <span className="text-[10px] font-bold uppercase tracking-widest">Localização</span></div>
          <input className="w-full p-3 rounded-xl bg-stone-50 border-none outline-rose-500 text-sm" value={config.footerAddress} onChange={e => setConfig({...config, footerAddress: e.target.value})} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-stone-400 mb-1"><MessageCircle size={14}/> <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span></div>
          <input className="w-full p-3 rounded-xl bg-stone-50 border-none outline-rose-500 text-sm" value={config.footerWhatsapp} onChange={e => setConfig({...config, footerWhatsapp: e.target.value.replace(/\D/g, "")})} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-stone-400 mb-1"><Camera size={14}/> <span className="text-[10px] font-bold uppercase tracking-widest">Instagram @</span></div>
          <input className="w-full p-3 rounded-xl bg-stone-50 border-none outline-rose-500 text-sm" value={config.footerInstagram} onChange={e => setConfig({...config, footerInstagram: e.target.value})} />
        </div>
      </section>
    </div>
  )
}