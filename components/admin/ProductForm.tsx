'use client'

import { createProduct } from "@/app/actions/product-actions"

export default function ProductForm() {
  return (
    <form action={createProduct} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Cadastrar Novo Produto</h2>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium text-gray-700">Nome do Produto</label>
        <input 
          id="name"
          name="name" 
          type="text" 
          required 
          className="border rounded-md p-2 focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="font-medium text-gray-700">Preço (R$)</label>
        <input 
          id="price"
          name="price" 
          type="number" 
          step="0.01" 
          required 
          className="border rounded-md p-2 focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="font-medium text-gray-700">Categoria</label>
        <select 
          id="category"
          name="category" 
          required 
          className="border rounded-md p-2 focus:ring-2 focus:ring-pink-500 outline-none bg-white"
        >
          <option value="">Selecione uma categoria...</option>
          <option value="artesanato">Artesanato</option>
          <option value="cosmeticos">Cosméticos</option>
          <option value="servicos">Serviços</option>
          <option value="outros">Outros</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-medium text-gray-700">Descrição (Opcional)</label>
        <textarea 
          id="description"
          name="description" 
          rows={3}
          className="border rounded-md p-2 focus:ring-2 focus:ring-pink-500 outline-none"
        />
      </div>

      <button 
        type="submit" 
        className="mt-4 bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
      >
        Salvar Produto
      </button>
    </form>
  )
}