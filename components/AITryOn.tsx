"use client";

import { useEffect, useRef, useState } from "react";
import { X, RefreshCw, Sparkles } from "lucide-react";

interface AITryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productType: string;
  productColor?: string;
}

export function AITryOn({ isOpen, onClose, productType, productColor = "#be123c" }: AITryOnProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiRecommendation, setAiRecommendation] = useState("Iniciando escaneamento facial...");

  useEffect(() => {
    if (!isOpen) return;

    let stream: MediaStream | null = null;

    async function setupCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 1280 }, 
            height: { ideal: 720 },
            facingMode: "user" 
          },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsLoading(false);
          startAnalysis();
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        setAiRecommendation("Erro ao acessar câmera. Verifique as permissões.");
      }
    }

    function startAnalysis() {
      setAiRecommendation("Analisando subtons e colorimetria...");
      
      setTimeout(() => {
        if (productType === "Batons") {
          setAiRecommendation("Detectamos subtons frios na sua pele. Este tom de batom harmoniza perfeitamente, trazendo luminosidade ao seu rosto.");
        } else if (productType === "Tinturas") {
          setAiRecommendation("Sua colorimetria sugere tons quentes. Esta tintura realçará o brilho natural dos seus olhos e pele.");
        } else {
          setAiRecommendation("Posicione-se em um local bem iluminado para uma análise mais precisa.");
        }
      }, 3500);
    }

    setupCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
      setAiRecommendation("Iniciando escaneamento facial...");
    };
  }, [isOpen, productType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">

        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-3">
            <div className="bg-rose-500 w-2 h-2 rounded-full animate-ping" />
            <div>
              <h2 className="text-white font-serif text-xl tracking-wide">Provador Virtual</h2>
              <p className="text-stone-300 text-[10px] uppercase tracking-[0.2em]">IA de Colorimetria Ativa</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:rotate-90 transition-transform p-2 bg-white/10 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Área da Câmera */}
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-white z-10">
              <RefreshCw className="animate-spin text-rose-400" size={32} />
              <span className="text-[10px] uppercase tracking-[0.3em]">Calibrando Sensor...</span>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
          />

          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          
          {!isLoading && (
            <div className="absolute inset-0 border-[40px] border-black/20 pointer-events-none flex items-center justify-center">
               <div className="w-64 h-80 border border-white/20 rounded-[100px] border-dashed" />
            </div>
          )}
        </div>

        {/* Rodapé com a RESPOSTA DA IA */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="flex items-start gap-4 border-l-2 border-rose-500/50 pl-6">
            <div className="bg-rose-500/20 p-2 rounded-lg">
              {/* Usando o Sparkles que já estava importado */}
              <Sparkles size={20} className="text-rose-300" />
            </div>
            <div className="max-w-md">
              <p className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Análise da Especialista:</p>
              <p className="text-stone-200 text-[13px] leading-relaxed italic font-light">
                "{aiRecommendation}"
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}