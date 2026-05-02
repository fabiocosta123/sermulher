import { Plus, Pencil, Trash2, Camera } from 'lucide-react';
import { IMAGE_GUIDELINES } from "@/lib/upload";
import { prisma } from "@/lib/prisma"; // Certifique-se de que o caminho está correto
import Link from 'next/link';

export default async function ProdutosAdminPage() {
  // Busca os dados reais do banco de dados Neon
  const produtos = await prisma.product.findMany({
    orderBy: {
      name: 'asc'
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Gerenciar Produtos</h1>
          <p className="text-sm text-stone-500">Adicione ou edite os itens do seu catálogo</p>
        </div>
        {/* Link para a página ou modal onde você colocará o ProductForm */}
        <Link 
          href="/admin/produtos/novo" 
          className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors"
        >
          <Plus size={20} />
          Novo Produto
        </Link>
      </div>

      {/* Card de Informação sobre Fotos */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
        <Camera className="text-blue-500 mt-1" size={20} />
        <div>
          <h3 className="text-sm font-semibold text-blue-800">Guia de Imagens</h3>
          <p className="text-xs text-blue-600">
            Tamanho ideal: <strong>{IMAGE_GUIDELINES.PRODUCT.dimensions}</strong>. 
            Proporção: <strong>{IMAGE_GUIDELINES.PRODUCT.aspectRatio}</strong>.
          </p>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Produto</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Categoria</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600">Preço</th>
              <th className="px-6 py-4 text-sm font-semibold text-stone-600 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {produtos.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-stone-500">
                  Nenhum produto cadastrado ainda.
                </td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr key={produto.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-800">{produto.name}</td>
                  <td className="px-6 py-4 text-stone-500">{produto.category}</td>
                  <td className="px-6 py-4 text-stone-800">
                    {/* Convertendo Decimal do Prisma para número para usar toLocaleString */}
                    {Number(produto.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="p-2 text-stone-400 hover:text-blue-600 transition-colors">
                      <Pencil size={18} />
                    </button>
                    <button className="p-2 text-stone-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}