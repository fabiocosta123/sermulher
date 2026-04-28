import { Scissors, Sparkles, User, Palette, Heart, GraduationCap, Star, Gem } from "lucide-react";
import Image from "next/image";

interface ServiceCategory {
  title: string;
  icon: any;
  image: string;
  items: string[];
  highlight?: string;
}

const services: ServiceCategory[] = [
  {
    title: "Cabeleireiro",
    icon: <Scissors size={20} />,
    image: "Tintura.jpg",
    items: ["Cortes", "Corte Bordado", "Hidratação", "Cronograma Capilar", "Penteados", "Tranças", "Química em Geral", "Luzes"]
  },
  {
    title: "Unhas",
    icon: <Gem size={20} />,
    image: "unhas.jpg",
    items: ["Manicure e Pedicure (Fem/Masc)", "Alongamento de Unhas", "Esmaltação em Gel", "Podologia", "SPA dos Pés", "Plano mensal com material incluso"]
  },
  {
    title: "Sobrancelhas",
    icon: <Sparkles size={20} />,
    image: "Sobrancelha.jpg",
    items: ["Henna", "Design de Sobrancelhas", "Manutenção do Design"]
  },
  {
    title: "Depilação",
    icon: <User size={20} />,
    image: "Servicos.jpg",
    items: ["Depilação em Geral"],
    highlight: "Trabalhamos com cera marroquina (reduz 80% do incômodo)"
  },
  {
    title: "Estética Facial",
    icon: <Star size={20} />,
    image: "Servicos.jpg",
    items: ["Micropigmentação (Sobrancelhas/Labial)", "Limpeza de Pele", "Peeling Químico", "Microagulhamento"]
  },
  {
    title: "Estética Corporal",
    icon: <Heart size={20} />,
    image: "Servicos.jpg",
    items: ["Massagem Relaxante / Ventosa / Pedras Quentes", "Massagem Modeladora", "Drenagem Linfática", "Auriculoterapia", "Microagulhamento"]
  },
  {
    title: "Maquiagem",
    icon: <Palette size={20} />,
    image: "Servicos.jpg",
    items: ["Social", "Beauty", "Artística"]
  },
  {
    title: "Eventos Especiais",
    icon: <Star size={20} className="text-amber-500" />,
    image: "Servicos.jpg",
    items: ["Dia da Noiva", "Dia de Debutante", "Dia de Formatura"]
  }
];

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Cabeçalho */}
        <header className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">Nossos Serviços</h1>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Excelência em cada detalhe. Conheça nossa gama completa de cuidados para o seu bem-estar e beleza.
          </p>
        </header>

        {/* Grade de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow group">
              {/* Imagem do Serviço */}
              <div className="relative h-64 w-full bg-stone-200 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                <Image
                  src={`/${service.image}`} 
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 text-rose-500">
                  {service.icon}
                  <h2 className="font-serif text-2xl text-stone-900">{service.title}</h2>
                </div>

                <ul className="space-y-2 mb-6">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="text-stone-600 text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-200 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {service.highlight && (
                  <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                    <p className="text-rose-700 text-xs font-medium leading-tight italic">
                      ✨ {service.highlight}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Card de Cursos */}
          <div className="lg:col-span-1 bg-stone-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-center items-center text-center">
            <GraduationCap size={48} className="text-rose-400 mb-4" />
            <h2 className="font-serif text-3xl mb-4">Cursos e Workshops</h2>
            <p className="text-stone-400 text-sm mb-6">
              Capacitação profissional e automaquiagem com quem entende do assunto.
            </p>
            <a
              href="https://wa.me/5513998065641"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-stone-500 hover:text-green-600 transition-colors"
            >

              <span className="text-[10px] font-bold uppercase tracking-widest">Saiba Mais</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}