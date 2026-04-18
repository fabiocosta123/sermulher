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
  X,
  ChevronDown
} from 'lucide-react'

import { getSiteConfig, updateSiteConfig, getProductById, createProduct } from '../products/actions'

export default function EditorMaster() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const productId = searchParams.get('id')

  // 1. Estados de Configuração (Tratando null-safety para o TS)
  const [config, setConfig] = useState({
    heroTitle: '', heroSubtitle: '', heroImageUrl: '',
    featuredTitle: '', featuredSubtitle: '',
    footerAddress: '', footerWhatsapp: '', footerInstagram: '', footerEmail: ''
  })

  // 2. Estados do Produto com a nova gestão de categorias
  const [productData, setProductData] = useState({
    name: '', price: '', category: '', brand: '', imageUrl: ''
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true)
      const [siteData, prodData] = await Promise.all([
        getSiteConfig(),
        productId ? getProductById(productId) : null
      ])

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

      if (prodData) {
        setProductData({
          name: prodData.name || '',
          price: String(prodData.price) || '',
          category: prodData.category || '',
          brand: prodData.brand || '',
          imageUrl: prodData.imageUrl || ''
        })
      }
      setLoading(false)
    }
    loadInitialData()
  }, [productId])

  const handleSaveConfig = async () => {
    const toastId = toast.loading("Sincronizando visual...")
    const result = await updateSiteConfig(config)
    if (result.success) toast.success("Home atualizada!", { id: toastId })
    else toast.error("Erro ao salvar visual.", { id: toastId })
  }

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!productData.category) return toast.error("Selecione uma categoria!")
    
    const toastId = toast.loading("Salvando peça...")
    const result = await createProduct({ ...productData, id: productId || undefined })
    if (result.success) {
      toast.success("Produto pronto na vitrine!", { id: toastId })
      router.push('/admin/products')
    } else {
      toast.error("Erro ao salvar produto.", { id: toastId })
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-8 pb-32 space-y-12 animate-in fade-in duration-500">
      <header className="flex justify-between items-end border-b border-stone-100 pb-8">
        <div>
          <h1 className="font-serif text-4xl text-stone-900 tracking-tight">Editor da Home</h1>
          <p className="text-stone-500 mt-2">Personalize a vitrine do Ser Mulher</p>
        </div>
        <button onClick={handleSaveConfig} className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-rose-600 transition-all shadow-xl shadow-stone-200">
          <Save size={18} /> Salvar Tudo
        </button>
      </header>

      {/* --- SEÇÃO: HERO --- */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-rose-600">
          <Layout size={20} />
          <h2 className="font-bold uppercase text-[10px] tracking-widest">Banner de Entrada</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input className="w-full p-4 rounded-2xl bg-stone-50 border-none outline-rose-500" placeholder="Título" value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} />
            <textarea className="w-full p-4 rounded-2xl bg-stone-50 border-none outline-rose-500 h-32" placeholder="Subtítulo" value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} />
          </div>
          <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(res: any) => setConfig({...config, heroImageUrl: res.info.secure_url})}>
            {({ open }) => (
              <div onClick={() => open()} className="h-full min-h-[200px] bg-stone-50 border-2 border-dashed border-stone-200 rounded-3xl flex items-center justify-center cursor-pointer hover:border-rose-400 overflow-hidden">
                {config.heroImageUrl ? <img src={config.heroImageUrl} className="w-full h-full object-cover" /> : <ImageIcon className="text-stone-300" size={32} />}
              </div>
            )}
          </CldUploadWidget>
        </div>
      </section>

      {/* --- SEÇÃO: NOVO PRODUTO (FOCO EM CATEGORIAS) --- */}
      <section className="bg-rose-600 text-white p-10 rounded-[3rem] shadow-2xl shadow-rose-200/50">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag size={28} />
          <h2 className="font-serif text-3xl">{productId ? 'Editar Peça' : 'Adicionar à Vitrine'}</h2>
        </div>

        <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <input required className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none" placeholder="Nome do Produto" value={productData.name} onChange={e => setProductData({...productData, name: e.target.value})} />
            
            <div className="grid grid-cols-2 gap-4">
              <input required type="number" step="0.01" className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none" placeholder="Preço" value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} />
              
              {/* SELECT DE CATEGORIAS */}
              <div className="relative">
                <select 
                  required
                  className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white outline-none appearance-none cursor-pointer pr-10"
                  value={productData.category}
                  onChange={e => setProductData({...productData, category: e.target.value})}
                >
                  <option value="" className="text-stone-900">Categoria</option>
                  <option value="shampoos" className="text-stone-900">Shampoos</option>
                  <option value="perfumes" className="text-stone-900">Perfumes</option>
                  <option value="cremes" className="text-stone-900">Cremes</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
              </div>
            </div>

            <input className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none" placeholder="Marca (Opcional)" value={productData.brand} onChange={e => setProductData({...productData, brand: e.target.value})} />
            
            <button type="submit" className="w-full bg-white text-rose-600 p-5 rounded-2xl font-bold hover:bg-stone-100 transition-all flex items-center justify-center gap-2 shadow-lg">
              <Sparkles size={20} /> {productId ? 'Salvar Alterações' : 'Publicar na Home'}
            </button>
          </div>

          <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={(res: any) => setProductData({...productData, imageUrl: res.info.secure_url})}>
            {({ open }) => (
              <div onClick={() => open()} className="h-full min-h-[250px] bg-white/10 border-2 border-dashed border-white/20 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-white/20 transition-all overflow-hidden">
                {productData.imageUrl ? <img src={productData.imageUrl} className="w-full h-full object-cover" /> : <><ImageIcon className="text-white/20" size={48} /><p className="text-[10px] mt-4 font-bold uppercase tracking-widest text-white/30">Foto do Produto</p></>}
              </div>
            )}
          </CldUploadWidget>
        </form>
      </section>

      {/* --- SEÇÃO: RODAPÉ --- */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-400">
        <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl">
          <MapPin size={18} />
          <input className="bg-transparent outline-none w-full text-sm text-stone-600" placeholder="Endereço" value={config.footerAddress} onChange={e => setConfig({...config, footerAddress: e.target.value})} />
        </div>
        <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl">
          <MessageCircle size={18} />
          <input className="bg-transparent outline-none w-full text-sm text-stone-600" placeholder="WhatsApp" value={config.footerWhatsapp} onChange={e => setConfig({...config, footerWhatsapp: e.target.value.replace(/\D/g, "")})} />
        </div>
        <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-2xl">
          <Camera size={18} />
          <input className="bg-transparent outline-none w-full text-sm text-stone-600" placeholder="Instagram" value={config.footerInstagram} onChange={e => setConfig({...config, footerInstagram: e.target.value})} />
        </div>
      </section>
    </div>
  )
}