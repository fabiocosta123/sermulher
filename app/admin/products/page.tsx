'use client'
import { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    hexColor: '#e11d48', // Padrão rose-600
    finish: '',
    skinTone: '',
    price: '',
    imageUrl: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui chamaremos a Server Action em breve
    console.log("Dados prontos para o Prisma:", formData)
    alert("Produto pronto para ser salvo!")
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="font-serif text-3xl text-stone-900 mb-8 text-center">
        Painel de Inventário <span className="text-rose-600">SerMulher</span>
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
              className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
              placeholder="Ex: Batom Matte Velvet"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Marca</label>
              <input 
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Preço</label>
              <input 
                type="number" step="0.01"
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-500 uppercase">Categoria</label>
            <select 
              className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none bg-white"
              onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
                placeholder="Ex: Matte"
                onChange={(e) => setFormData({...formData, finish: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Cor Principal</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={formData.hexColor}
                  className="h-11 w-11 rounded-lg border border-stone-200 cursor-pointer"
                  onChange={(e) => setFormData({...formData, hexColor: e.target.value})}
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

        <button 
          type="submit"
          className="col-span-1 md:col-span-2 mt-4 bg-stone-900 text-white font-bold py-4 rounded-2xl hover:bg-rose-600 transition-all shadow-lg active:scale-[0.98]"
        >
          Finalizar Cadastro
        </button>
      </form>
    </div>
  )
}