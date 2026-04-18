import Image from 'next/image';

interface HeroProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

export function Hero({ title, subtitle, imageUrl }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF9] py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          
          {/* LADO ESQUERDO: TEXTOS */}
          <div className="z-10 max-w-xl text-center lg:text-left">
            <h1 className="font-serif text-4xl font-normal leading-tight text-stone-900 sm:text-5xl lg:text-7xl">
              {title || "Sua beleza em evidência"}
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              {subtitle || "Produtos formulados para realçar a beleza natural de cada mulher. Tecnologia avançada e ativos botânicos para o seu ritual diário."}
            </p>

            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start">
              <button className="rounded-full bg-rose-600 px-10 py-4 text-sm font-bold text-white shadow-lg shadow-rose-200 transition-all hover:bg-rose-700 hover:shadow-rose-300 active:scale-95">
                Comprar Agora
              </button>
              <button className="rounded-full border border-stone-200 bg-white px-10 py-4 text-sm font-semibold text-stone-900 transition-all hover:bg-stone-50 hover:border-stone-300">
                Conhecer a Linha
              </button>
            </div>
          </div>

          {/* LADO DIREITO: IMAGEM DINÂMICA */}
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-3xl bg-stone-100 shadow-2xl">
            {imageUrl ? (
              <Image 
                src={imageUrl} 
                alt={title || "Banner SerMulher"} 
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000' hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-stone-400 italic">
                Nenhuma imagem configurada
              </div>
            )}
            
            {/* Overlay sutil para acabamento */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
}