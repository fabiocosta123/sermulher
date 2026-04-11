export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF9] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="font-serif text-4xl font-normal leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
              A ciência por trás da sua <br />
              <span className="italic">melhor versão.</span>
            </h1>
            <p className="mt-6 text-lg text-stone-600">
              Produtos formulados para realçar a beleza natural de cada mulher. 
              Tecnologia avançada e ativos botânicos para o seu ritual diário.
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start">
              <button className="rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-stone-800 active:scale-95">
                Comprar Agora
              </button>
              <button className="rounded-full border border-stone-200 bg-white px-8 py-4 text-sm font-semibold text-stone-900 transition-all hover:bg-stone-50">
                Conhecer a Linha
              </button>
            </div>
          </div>
          
          {/* Espaço para Imagem com Estilo Mobile-App */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-stone-200 shadow-2xl">
              <div className="flex h-full items-center justify-center text-stone-400">
                
                
              </div>
            </div>
            {/* Badge Flutuante Estilo App */}
            <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-xl lg:block hidden">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-500">Novo Lançamento</p>
              <p className="font-serif text-lg text-stone-900">Sérum Iluminador V6</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}