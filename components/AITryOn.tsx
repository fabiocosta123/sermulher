"use client";

import { useEffect, useRef, useState } from "react";
import { X, RefreshCw, Sparkles } from "lucide-react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { PRODUCT_MOCK } from "@/types/product";

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
  const [appliedColor, setAppliedColor] = useState(productColor);

  // REFS: A chave para o silêncio e estabilidade
  const colorRef = useRef(appliedColor);
  const typeRef = useRef(productType);
  const analysisStatus = useRef<"idle" | "analyzing" | "finished">("idle");
  const isMounted = useRef(true);

  useEffect(() => { colorRef.current = appliedColor; }, [appliedColor]);
  useEffect(() => { typeRef.current = productType; }, [productType]);

  useEffect(() => {
    isMounted.current = true;
    if (!isOpen) return;

    let faceLandmarker: FaceLandmarker;
    let animationFrameId: number;
    let stream: MediaStream | null = null;

    async function setupIA() {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: "/models/face_landmarker.task",
            delegate: "GPU" // Se falhar, ele usa CPU silenciosamente se tratarmos o log
          },
          runningMode: "VIDEO",
          numFaces: 1
        });

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        });

        if (videoRef.current && isMounted.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsLoading(false);
            renderLoop();
          };
        }
      } catch (err) {
        if (isMounted.current) setAiRecommendation("Câmera ou IA indisponível.");
      }
    }

    function renderLoop() {
      if (!isMounted.current || !faceLandmarker || !videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (ctx && video.readyState >= 2 && video.videoWidth > 0) {
        try {
          // Detectamos o rosto
          const results = faceLandmarker.detectForVideo(video, performance.now());

          if (results && results.faceLandmarks) {
            if (canvas.width !== video.clientWidth) {
              canvas.width = video.clientWidth;
              canvas.height = video.clientHeight;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (results.faceLandmarks.length > 0) {
              const landmarks = results.faceLandmarks[0];

              // --- INTEGRAÇÃO COM PRODUCT_MOCK ---
              if (analysisStatus.current === "idle") {
                analysisStatus.current = "analyzing";
                setAiRecommendation("Analisando subtons da pele...");

                setTimeout(() => {
                  if (!isMounted.current) return;
                  
                  // Simula detecção de subtom frio
                  const detectedSubtone = "frio"; 
                  const recommended = PRODUCT_MOCK.find(
                    p => p.subtone === detectedSubtone && p.category === typeRef.current
                  );

                  if (recommended) {
                    setAiRecommendation(`Análise concluída! Sugerimos o ${recommended.name}.`);
                    setAppliedColor(recommended.color);
                  }
                  analysisStatus.current = "finished";
                }, 4000);
              }

              if (typeRef.current === "Batons") {
                applyLipstickEffect(ctx, landmarks, colorRef.current, video);
              }
            }
          }
        } catch (e) {
          // O catch vazio é essencial aqui: ele impede que o erro de delegate CPU 
          // suba para o console do Turbopack durante a troca de estados do React.
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    function applyLipstickEffect(ctx: CanvasRenderingContext2D, landmarks: any, color: string, video: HTMLVideoElement) {
      const lipIndices = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
      const { width: w, height: h } = ctx.canvas;
      const videoAspect = video.videoWidth / video.videoHeight;
      const canvasAspect = w / h;
      let scaleX = w, scaleY = h, offsetX = 0, offsetY = 0;

      if (canvasAspect > videoAspect) {
        scaleY = w / videoAspect; offsetY = (h - scaleY) / 2;
      } else {
        scaleX = h * videoAspect; offsetX = (w - scaleX) / 2;
      }

      ctx.save();
      ctx.beginPath();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = color;
      ctx.filter = "blur(3px)";
      lipIndices.forEach((index, i) => {
        const p = landmarks[index];
        const px = p.x * scaleX + offsetX;
        const py = p.y * scaleY + offsetY;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    setupIA();

    return () => {
      isMounted.current = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      stream?.getTracks().forEach(t => t.stop());
      if (faceLandmarker) faceLandmarker.close();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        
        {/* Topo */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500' : 'bg-emerald-500 animate-ping'}`} />
            <h2 className="text-white font-serif text-xl tracking-tight">Provador Virtual</h2>
          </div>
          <button onClick={onClose} className="text-white p-2 bg-white/10 rounded-full hover:bg-rose-500 transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Câmera */}
        <div className="relative w-full h-full">
          {isLoading && <RefreshCw className="absolute inset-0 m-auto animate-spin text-rose-400" size={32} />}
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>

        {/* Barra de Consultoria */}
        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-start gap-4 border-l-2 border-rose-500 pl-4">
            <Sparkles size={20} className="text-rose-400 mt-1" />
            <div>
              <p className="text-white text-[10px] font-bold uppercase mb-1">IA Ser Mulher:</p>
              <p className="text-stone-200 text-sm italic">"{aiRecommendation}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}