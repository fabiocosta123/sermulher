'use client'
import { useState } from 'react'

export default function NewProduct() {
  const [formData, setFormData] = useState({
    name: '', brand: '', category: '', hexColor: '#000000',
    finish: '', skinTone: '', price: '', imageUrl: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui faremos o fetch para sua API que usa o Prisma
    console.log("Enviando produto:", formData)
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-stone-100">
      <h1 className="font-serif text-2xl text-stone-900 mb-6">Cadastrar Novo Produto</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-xs font-bold text-stone-500 uppercase">Nome do Produto</label>
          <input 
            className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="text-xs font-bold text-stone-500 uppercase">Preço (R$)</label>
          <input 
            type="number" step="0.01"
            className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
        </div>

        <div>
          <label className="text-xs font-bold text-stone-500 uppercase">Cor (HEX)</label>
          <div className="flex gap-2">
            <input 
              type="color" 
              className="h-12 w-12 rounded border border-stone-200 cursor-pointer"
              onChange={(e) => setFormData({...formData, hexColor: e.target.value})}
            />
            <input 
              className="flex-1 p-3 rounded-lg border border-stone-200 text-sm uppercase"
              value={formData.hexColor}
              readOnly
            />
          </div>
        </div>

        {/* Adicione os outros campos (Finish, SkinTone, etc) seguindo este padrão */}

        <button className="col-span-2 mt-6 bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 transition-all">
          Salvar Produto
        </button>
      </form>
    </div>
  )
}