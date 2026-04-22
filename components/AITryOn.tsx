"use client";

import { useEffect, useRef, useState } from "react";
import { X, RefreshCw, Sparkles } from "lucide-react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

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
  const [aiRecommendation, setAiRecommendation] = useState("Carregando modelos de IA...");

  useEffect(() => {
    if (!isOpen) return;

    let faceLandmarker: FaceLandmarker;
    let animationFrameId: number;
    let stream: MediaStream | null = null;

    async function setupIA() {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        // 2. CARREGA O ARQUIVO NA PASTA PUBLIC
        faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: "/models/face_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numFaces: 1
        });

        // 3. Inicia a Câmera
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 1280, height: 720 },
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsLoading(false);
            setAiRecommendation("Analisando seu rosto em tempo real...");
            renderLoop(); // Inicia o processamento frame a frame
          };
        }
      } catch (err) {
        console.error("Erro na IA:", err);
        setAiRecommendation("Erro ao carregar os modelos de IA.");
      }
    }

    // Função que roda continuamente para "pintar" o rosto
    function renderLoop() {
      if (!faceLandmarker || !videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx && video.readyState >= 2) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Executa a detecção no frame atual
        const startTimeMs = performance.now();
        const results = faceLandmarker.detectForVideo(video, startTimeMs);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.faceLandmarks && results.faceLandmarks.length > 0) {
          const landmarks = results.faceLandmarks[0];

          // Se for Batom, aplica o efeito visual
          if (productType === "Batons") {
            applyLipstickEffect(ctx, landmarks, productColor);
          }
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    function applyLipstickEffect(ctx: CanvasRenderingContext2D, landmarks: any, color: string) {
      // Índices oficiais do MediaPipe para o contorno dos lábios
      const lipIndices = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
      
      ctx.beginPath();
      ctx.fillStyle = `${color}4D`; // 30% de opacidade para parecer natural
      ctx.filter = "blur(3px)"; // Suaviza as bordas do batom

      lipIndices.forEach((index, i) => {
        const point = landmarks[index];
        if (i === 0) ctx.moveTo(point.x * ctx.canvas.width, point.y * ctx.canvas.height);
        else ctx.lineTo(point.x * ctx.canvas.width, point.y * ctx.canvas.height);
      });

      ctx.closePath();
      ctx.fill();
    }

    setupIA();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      stream?.getTracks().forEach(t => t.stop());
      faceLandmarker?.close();
    };
  }, [isOpen, productType, productColor]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        
        {/* Status Bar */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 animate-ping'}`} />
            <div>
              <h2 className="text-white font-serif text-xl">Provador Virtual</h2>
              <p className="text-stone-400 text-[10px] uppercase tracking-widest">Processamento Neural Ativo</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white p-2 bg-white/10 rounded-full hover:bg-rose-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Video & Drawing Area */}
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-white z-10">
              <RefreshCw className="animate-spin text-rose-400" size={32} />
              <span className="text-[10px] uppercase tracking-widest">Sincronizando IA...</span>
            </div>
          )}
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>

        {/* Rodapé Dinâmico */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="flex items-start gap-4 border-l-2 border-rose-500/50 pl-6">
            <div className="bg-rose-500/20 p-2 rounded-lg">
              <Sparkles size={20} className="text-rose-300" />
            </div>
            <div className="max-w-md">
              <p className="text-white text-[10px] font-bold uppercase tracking-widest mb-1">Feedback da IA:</p>
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