export function Footer({ config }: { config: any }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-stone-800 pb-12">
          
          {/* LOGO E SOBRE */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl text-white italic">SerMulher</h2>
            <p className="text-sm leading-relaxed max-w-xs">
              Realçando a beleza natural com tecnologia e essência botânica.
            </p>
          </div>

          {/* CONTATO DINÂMICO */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-500">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>{config?.footerAddress || "Registro, SP"}</li>
              <li>{config?.footerEmail || "contato@sermulher.com"}</li>
              {config?.footerWhatsapp && (
                <li>
                  <a href={`https://wa.me/${config.footerWhatsapp}`} className="hover:text-white transition-colors">
                    WhatsApp: Click aqui
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* REDES SOCIAIS */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-500">Redes Sociais</h3>
            <div className="flex gap-4">
              {config?.footerInstagram && (
                <a href={`https://instagram.com/${config.footerInstagram}`} className="hover:text-rose-400 transition-colors">
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-[10px] uppercase tracking-tighter text-stone-500">
          © {currentYear} SerMulher Cosméticos - Fábio Costa Dev. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}