'use client'
import { useEffect, useState } from 'react'

export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsVisible(false)
    }
    setDeferredPrompt(null)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md animate-in slide-in-from-bottom-10">
      <div className="bg-stone-900 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-stone-800">
        <div className="flex items-center gap-3">
          <div className="bg-rose-600 w-10 h-10 rounded-xl flex items-center justify-center text-lg">
            🌸
          </div>
          <div>
            <p className="text-sm font-bold">App SerMulher</p>
            <p className="text-[10px] text-stone-400 uppercase tracking-widest">Instale na sua tela inicial</p>
          </div>
        </div>
        <button 
          onClick={handleInstall}
          className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
        >
          INSTALAR
        </button>
      </div>
    </div>
  )
}