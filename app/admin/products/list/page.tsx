'use client'
import { useEffect, useState } from 'react'
import { getProducts, deleteProduct } from '../actions'
import { toast } from 'sonner'

export default function ProductList() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState<any>(null)

    const confirmDelete = (product: any) => {
        setProductToDelete(product)
        setIsDeleteModalOpen(true)
    }

    // 3. Função que o botão do modal vai chamar
    const handleExecuteDelete = async () => {
        if (!productToDelete) return

        setIsDeleteModalOpen(false)
        const toastId = toast.loading("Removendo produto...")

        const result = await deleteProduct(productToDelete.id)
        if (result.success) {
            setProducts(products.filter(p => p.id !== productToDelete.id))
            toast.success(`${productToDelete.name} removido!`, { id: toastId })
        } else {
            toast.error("Erro ao excluir.", { id: toastId })
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este produto?")) return

        const toastId = toast.loading("Excluindo produto...")

        const result = await deleteProduct(id)

        if (result.success) {
            // Remove o produto da lista na tela sem precisar dar F5
            setProducts(products.filter(p => p.id !== id))
            toast.success("Produto removido do SerMulher!", { id: toastId })
        } else {
            toast.error("Erro ao excluir o produto.", { id: toastId })
        }
    }

    useEffect(() => {
        getProducts().then(data => {
            setProducts(data)
            setLoading(false)
        })
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-8">
            <header className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="font-serif text-3xl text-stone-900">Gerenciar Produtos</h1>
                    <p className="text-stone-500">Visualize e edite os itens da sua vitrine</p>
                </div>
                <a href="/admin/products" className="bg-rose-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-rose-700 transition-all">
                    + Novo Produto
                </a>
            </header>

            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-50 border-b border-stone-100">
                        <tr>
                            <th className="p-5 text-xs font-bold uppercase text-stone-400 tracking-widest">Produto</th>
                            <th className="p-5 text-xs font-bold uppercase text-stone-400 tracking-widest">Categoria</th>
                            <th className="p-5 text-xs font-bold uppercase text-stone-400 tracking-widest">Preço</th>
                            <th className="p-5 text-xs font-bold uppercase text-stone-400 tracking-widest text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-50">
                        {loading ? (
                            <tr><td colSpan={4} className="p-10 text-center text-stone-400">Carregando produtos...</td></tr>
                        ) : products.length === 0 ? (
                            <tr><td colSpan={4} className="p-10 text-center text-stone-400">Nenhum produto encontrado.</td></tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p.id} className="hover:bg-stone-50/50 transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-14 w-14 rounded-xl overflow-hidden bg-stone-100 border border-stone-100">
                                                <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-stone-900">{p.name}</p>
                                                <p className="text-xs text-stone-400 uppercase font-bold tracking-tighter">{p.brand}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5 text-sm text-stone-600 capitalize">
                                        {p.category}
                                    </td>
                                    <td className="p-5 text-sm font-bold text-stone-900">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => window.location.href = `/admin/products?edit=${p.id}`}
                                                className="p-2 hover:bg-rose-50 rounded-lg text-stone-400 hover:text-rose-600 transition-all"
                                            >
                                                ✏️
                                            </button>
                                            
                                            <button
                                                onClick={() => confirmDelete(p)} // Chama o modal em vez do alert
                                                className="p-2 hover:bg-red-50 rounded-lg text-stone-400 hover:text-red-600 transition-all"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-200">
                        <div className="text-center">
                            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <h3 className="text-xl font-serif text-stone-900 mb-2">Excluir Produto?</h3>
                            <p className="text-stone-500 text-sm mb-8">
                                Você está prestes a remover <b>{productToDelete?.name}</b>. Esta ação não pode ser desfeita.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-stone-200 text-stone-600 font-semibold hover:bg-stone-50 transition-all"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleExecuteDelete}
                                    className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-200"
                                >
                                    Sim, excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}