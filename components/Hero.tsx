import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">


          <div>
            <h1 className="font-serif text-4xl font-normal leading-tight sm:text-5xl lg:text-7xl">
              Sua beleza em <span className="text-rose-600 italic">evidência</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-stone-600 max-w-lg mx-auto lg:mx-0">
              Tecnologia avançada e ativos botânicos para o seu ritual diário de autocuidado.
            </p>

            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start">
              <Link
                href="/produtos"
                className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg hover:shadow-rose-200/50"
              >
                Comprar Agora
              </Link>
            </div>
          </div>

          {/* LADO DIREITO: BANNER PRINCIPAL */}
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/bannerPrincipal.jpg"
              alt="Modelo SerMulher"
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
}