import { ShieldCheck, Sparkles, Heart, Clock } from "lucide-react";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Seção de Título */}
        <header className="text-center mb-16">
          <span className="text-rose-500 font-bold uppercase tracking-[0.3em] text-xs">Nossa Essência</span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mt-4 mb-6">
            História & Propósito
          </h1>
          <div className="h-1 w-20 bg-rose-200 mx-auto"></div>
        </header>

        {/* Narrativa Principal */}
        <section className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div className="space-y-6 text-stone-700 leading-relaxed text-lg">
            <p>
              Nossa jornada começou em <span className="font-semibold text-stone-900">julho de 2022</span>, 
              com a inauguração do nosso primeiro sonho: a <span className="text-rose-600">Ser Mulher Cosméticos e Perfumaria</span>.
            </p>
            <p>
              Movidos pela paixão de completar o universo da beleza em Registro, expandimos horizontes em 
              <span className="font-semibold text-stone-900"> março de 2023</span> com o nascimento do 
              <strong> Ser Mulher Espaço Beleza</strong> e do <strong>Ser Menina</strong>, um lugar dedicado 
              especialmente ao cuidado das nossas pequenas princesas.
            </p>
            <p className="border-l-4 border-rose-100 pl-4 italic text-stone-600">
              "Nossa missão é fazer parte da sua transformação e ajudar você a revelar a sua melhor versão."
            </p>
          </div>
          
          <div className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h3 className="font-serif text-2xl text-stone-900 mb-4">Compromisso com você</h3>
            <div className="flex gap-4">
              <ShieldCheck className="text-rose-400 shrink-0" />
              <p className="text-sm text-stone-600">
                <strong>Segurança e Higiene:</strong> Materiais esterilizados e embalados individualmente, 
                cuidando da saúde de clientes e colaboradores.
              </p>
            </div>
            <div className="flex gap-4">
              <Clock className="text-rose-400 shrink-0" />
              <p className="text-sm text-stone-600">
                <strong>Exclusividade:</strong> Atendimento monitorado e realizado apenas com horário agendado 
                para garantir sua privacidade.
              </p>
            </div>
            <div className="flex gap-4">
              <Heart className="text-rose-400 shrink-0" />
              <p className="text-sm text-stone-600">
                <strong>Excelência:</strong> Profissionais capacitados prontos para oferecer o melhor em 
                cosméticos e serviços de beleza.
              </p>
            </div>
          </div>
        </section>

        {/* Banner Final */}
        <div className="bg-stone-900 rounded-[2.5rem] p-12 text-center text-white overflow-hidden relative">
          <Sparkles className="absolute top-4 right-8 text-rose-500/20" size={120} />
          <h2 className="font-serif text-3xl mb-4 relative z-10">Onde a tecnologia encontra o cuidado</h2>
          <p className="text-stone-400 max-w-lg mx-auto relative z-10">
            De Registro para o mundo digital, unindo a nossa tradição no Espaço Beleza com a inovação do nosso Provador Virtual.
          </p>
        </div>
      </div>
    </main>
  );
}