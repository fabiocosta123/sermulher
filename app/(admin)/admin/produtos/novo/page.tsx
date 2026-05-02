import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NovoProdutoPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 py-8">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/produtos" 
          className="p-2 hover:bg-stone-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} className="text-stone-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Novo Produto</h1>
          <p className="text-sm text-stone-500">Preencha os dados para o catálogo</p>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
        <ProductForm />
      </div>
    </div>
  );
}