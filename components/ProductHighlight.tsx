import Image from "next/image";
import Link from "next/link";

const products = [
    { id: 1, name: "Kit Impala Ju Paes", price: "R$ 89,90", image: "/produto1.jpg" },
    { id: 2, name: "Kit Giovana Baby", price: "R$ 75,00", image: "/produto2.jpg" },
    { id: 3, name: "Gloss Lip Bunny Triple", price: "R$ 58,00", image: "/produto3.jpg" },
    { id: 4, name: "Gloss Framboesa by Franciny Ehlke", price: "R$ 112,00", image: "/produto4.jpg" },
];

export function ProductHighlight() {
    return (
        <section className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6">

                {/* Título da Seção */}
                <div className="mb-12 text-center">
                    <h2 className="font-serif text-3xl lg:text-4xl text-stone-900 mb-4">
                        Os Mais Desejados
                    </h2>
                    <p className="text-stone-500 uppercase tracking-widest text-xs font-bold">
                        Cuidados que sua pele merece
                    </p>
                </div>

                {/* Grid de Produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            href="/produtos"
                            className="group flex flex-col"
                        >
                            {/* Container da Imagem */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 rounded-sm mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Overlay de "Ver Mais" que aparece no hover */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-tighter shadow-sm">
                                        Ver Detalhes
                                    </span>
                                </div>
                            </div>

                            {/* Informações do Produto */}
                            <h3 className="font-medium text-stone-900 text-sm mb-1 uppercase tracking-tight">
                                {product.name}
                            </h3>
                            <p className="text-stone-500 text-sm font-light">
                                {product.price}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Botão Ver Todos */}
                <div className="mt-16 text-center">
                    <Link
                        href="/produtos"
                        className="inline-block border border-stone-900 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-stone-900 hover:text-white transition-all"
                    >
                        Explorar Coleção Completa
                    </Link>
                </div>

            </div>
        </section>
    );
}