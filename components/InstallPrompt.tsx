"use client";

import { useState, useEffect } from "react";
import { X, Share, PlusSquare, DownloadCloud } from "lucide-react";

export function InstallPrompt() {
  const [isShown, setIsShown] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Verifica se já está instalado
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // 2. Detectar iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // 3. Lógica para Android/Chrome 
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Mostrar o prompt após 5 segundos para não ser invasivo
      setTimeout(() => setIsShown(true), 5000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS, mostra o convite manualmente após um tempo
    if (ios) {
      setTimeout(() => setIsShown(true), 8000);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsShown(false);
    }
  };

  if (!isShown) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:right-8 md:w-80">
      <div className="bg-white/80 backdrop-blur-xl border border-stone-100 p-6 rounded-3xl shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <button 
          onClick={() => setIsShown(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <DownloadCloud size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-tight">Ser Mulher App</h4>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-medium">Experiência Completa</p>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed mb-6 font-light">
          Instale nosso aplicativo para acessar o <b>Provador Virtual</b> com mais rapidez e receber ofertas exclusivas em Registro.
        </p>

        {isIOS ? (
          /* Instrução específica para iPhone */
          <div className="space-y-4 pt-2 border-t border-stone-50">
            <p className="text-[10px] text-stone-400 uppercase font-bold flex items-center gap-2">
              Como instalar no seu iPhone:
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs text-stone-700 bg-stone-50 p-2 rounded-xl">
                <Share size={16} className="text-blue-500" />
                <span>Toque em <b>Compartilhar</b></span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-700 bg-stone-50 p-2 rounded-xl">
                <PlusSquare size={16} />
                <span>Selecione <b>Tela de Início</b></span>
              </div>
            </div>
          </div>
        ) : (
          /* Botão direto para Android/Windows */
          <button
            onClick={handleInstallClick}
            className="w-full bg-stone-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg active:scale-95"
          >
            Instalar Agora
          </button>
        )}
      </div>
    </div>
  );
}