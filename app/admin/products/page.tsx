'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import { createProduct, getProductById } from './actions' 
import { toast } from 'sonner';

export default function NewProduct() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-stone-500">Carregando formulário...</div>}>
      <ProductFormContent />
    </Suspense>
  )
}

function ProductFormContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const editId = searchParams.get('edit') // Captura o ?edit=ID da URL

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    hexColor: '#e11d48',
    finish: '',
    skinTone: '',
    price: '',
    imageUrl: ''
  })

  // Efeito para carregar dados se estiver no modo edição
  useEffect(() => {
    if (editId) {
      const loadProduct = async () => {
        const product = await getProductById(editId)
        if (product) {
          setFormData({
            name: product.name,
            brand: product.brand,
            category: product.category,
            hexColor: product.hexColor,
            finish: product.finish || '',
            skinTone: product.skinTone || '',
            price: product.price.toString(),
            imageUrl: product.imageUrl || ''
          })
        }
      }
      loadProduct()
    }
  }, [editId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.imageUrl) {
      toast.error("Falta a foto do produto! 📸")
      return
    }

    const toastId = toast.loading(editId ? "Atualizando produto..." : "Salvando no SerMulher...")

    // Passamos o editId para a action saber que é um Update
    const result = await createProduct({ ...formData, id: editId })

    if (result.success) {
      toast.success(editId ? "Atualizado com sucesso!" : "Cadastrado com sucesso!", { id: toastId })
      
      // Se for edição, volta para a lista. Se for novo, limpa.
      if (editId) {
        router.push('/admin/products/list')
      } else {
        setFormData({ name: '', brand: '', category: '', hexColor: '#e11d48', finish: '', skinTone: '', price: '', imageUrl: '' })
      }
    } else {
      toast.error("Ops! Algo deu errado ao salvar.", { id: toastId })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="font-serif text-3xl text-stone-900 mb-8 text-center">
        {editId ? 'Editar Produto' : 'Painel de Inventário'} <span className="text-rose-600">SerMulher</span>
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">

        {/* COLUNA ESQUERDA: Upload de Imagem */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Foto do Produto</label>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result) => {
              const info = result.info as any;
              setFormData({ ...formData, imageUrl: info.secure_url });
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-full h-80 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center bg-stone-50 hover:bg-rose-50 hover:border-rose-300 transition-all overflow-hidden"
              >
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <span className="text-3xl mb-2 block">📸</span>
                    <p className="text-sm font-medium text-stone-600">Carregar Imagem</p>
                  </div>
                )}
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* COLUNA DIREITA: Dados Técnicos */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase">Nome</label>
            <input
              required
              value={formData.name} // IMPORTANTE: Valor vinculado
              className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              placeholder="Ex: Batom Matte Velvet"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Marca</label>
              <input
                required
                value={formData.brand}
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Preço</label>
              <input
                required
                type="number" step="0.01"
                value={formData.price}
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-500 uppercase">Categoria</label>
            <select
              required
              value={formData.category}
              className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none bg-white"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Selecione...</option>
              <option value="batom">Batom</option>
              <option value="sombra">Sombra</option>
              <option value="esmalte">Esmalte</option>
              <option value="skincare">Skincare</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Acabamento</label>
              <input
                value={formData.finish}
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="Ex: Matte"
                onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Cor Principal</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={formData.hexColor}
                  className="h-11 w-11 rounded-lg border border-stone-200 cursor-pointer"
                  onChange={(e) => setFormData({ ...formData, hexColor: e.target.value })}
                />
                <input
                  className="flex-1 p-2.5 rounded-xl border border-stone-200 text-sm uppercase bg-stone-50"
                  value={formData.hexColor}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
           {editId && (
             <button
              type="button"
              onClick={() => router.push('/admin/products/list')}
              className="flex-1 bg-stone-100 text-stone-600 font-bold py-4 rounded-2xl hover:bg-stone-200 transition-all"
             >
              Cancelar
             </button>
           )}
          <button
            type="submit"
            className="flex-[2] bg-stone-900 text-white font-bold py-4 rounded-2xl hover:bg-rose-600 transition-all shadow-lg active:scale-[0.98]"
          >
            {editId ? 'Salvar Alterações' : 'Finalizar Cadastro'}
          </button>
        </div>
      </form>
    </div>
  )
}