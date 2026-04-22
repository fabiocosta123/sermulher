"use client";

import { useEffect, useRef, useState } from "react";
import { X, Camera, RefreshCw } from "lucide-react";

interface AITryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productType: string; // "Batons" | "Tinturas" etc.
  productColor?: string; // Ex: "#FF0000"
}

export function AITryOn({ isOpen, onClose, productType, productColor = "#be123c" }: AITryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    let stream: MediaStream | null = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
      }
    }

    setupCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-stone-900 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header do Modal */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/50 to-transparent">
          <div>
            <h2 className="text-white font-serif text-xl tracking-wide">Provador Virtual</h2>
            <p className="text-stone-300 text-[10px] uppercase tracking-[0.2em]">IA de Colorimetria Analisando...</p>
          </div>
          <button onClick={onClose} className="text-white hover:rotate-90 transition-transform p-2">
            <X size={24} />
          </button>
        </div>

        {/* Área da Câmera */}
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-white">
              <RefreshCw className="animate-spin text-stone-400" size={32} />
              <span className="text-xs uppercase tracking-widest">Iniciando IA...</span>
            </div>
          )}
          
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* O Canvas onde a IA "desenha" a cor do batom ou tintura */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />
        </div>

        {/* Rodapé com Dicas da IA */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-4 border-l-2 border-white/30 pl-4">
            <div className="bg-white/10 p-2 rounded-full">
              <Camera size={20} className="text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest">Dica da Especialista:</p>
              <p className="text-stone-300 text-[11px]">
                {productType === "Batons" 
                  ? "Este tom combina perfeitamente com subtons de pele frios."
                  : "Posicione-se em um local bem iluminado para melhor precisão."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}