'use client'
import { useState, useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { toast } from 'sonner'
import { getSiteConfig, updateSiteConfig } from '../products/actions'

export default function SiteSettings() {
  const [config, setConfig] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImageUrl: '',
    featuredTitle: '',
    featuredSubtitle: ''
  })

  // Carrega as configurações atuais ao abrir a página
  useEffect(() => {
    getSiteConfig().then((data) => {
      if (data) setConfig({
        heroTitle: data.heroTitle || '',
        heroSubtitle: data.heroSubtitle || '',
        heroImageUrl: data.heroImageUrl || '',
        featuredTitle: data.featuredTitle || '',
        featuredSubtitle: data.featuredSubtitle || ''
      })
    })
  }, [])

  const handleSave = async () => {
    const toastId = toast.loading("Atualizando site...")
    const result = await updateSiteConfig(config)

    if (result.success) {
      toast.success("Site atualizado com sucesso!", { id: toastId })
    } else {
      toast.error("Erro ao atualizar.", { id: toastId })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-stone-900">Configurações do Site</h1>
        <p className="text-stone-500">Personalize o visual da sua vitrine principal</p>
      </header>

      <div className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">

        {/* Edição do Hero */}
        <section className="space-y-6">
          <h2 className="text-lg font-semibold text-rose-600 border-b border-rose-100 pb-2">Seção Hero (Principal)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase">Título Principal</label>
                <input
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
                  value={config.heroTitle}
                  onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
                  placeholder="Ex: A Essência da sua Beleza"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-500 uppercase">Subtítulo / Descrição</label>
                <textarea
                  className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none h-32"
                  value={config.heroSubtitle}
                  onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                  placeholder="Fale um pouco sobre a marca..."
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-stone-500 uppercase text-center block">Imagem de Fundo</label>
              <CldUploadWidget
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={(result: any) => setConfig({ ...config, heroImageUrl: result.info.secure_url })}
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="w-full h-48 rounded-2xl border-2 border-dashed border-stone-200 overflow-hidden bg-stone-50 hover:border-rose-300 transition-all group"
                  >
                    {config.heroImageUrl ? (
                      <img src={config.heroImageUrl} className="w-full h-full object-cover" alt="Hero Preview" />
                    ) : (
                      <div className="text-stone-400 group-hover:text-rose-500">
                        <span className="text-2xl block">🖼️</span>
                        <p className="text-xs font-medium">Trocar Imagem do Hero</p>
                      </div>
                    )}
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-6 border-t border-stone-100">
          <h2 className="text-lg font-semibold text-rose-600 border-b border-rose-100 pb-2">Seção de Destaques (Vitrine)</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Título da Vitrine</label>
              <input
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none"
                value={config.featuredTitle}
                onChange={(e) => setConfig({ ...config, featuredTitle: e.target.value })}
                placeholder="Ex: Essenciais para sua Rotina"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-500 uppercase">Subtítulo da Vitrine</label>
              <textarea
                className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-rose-500 outline-none h-24"
                value={config.featuredSubtitle}
                onChange={(e) => setConfig({ ...config, featuredSubtitle: e.target.value })}
                placeholder="Descreva a curadoria dos produtos..."
              />
            </div>
          </div>
        </section>

        <div className="pt-6 border-t border-stone-100">
          <button
            onClick={handleSave}
            className="w-full bg-stone-900 text-white font-bold py-4 rounded-2xl hover:bg-rose-600 transition-all shadow-lg shadow-stone-200"
          >
            Salvar Todas as Alterações
          </button>
        </div>
      </div>
    </div>
  )
}