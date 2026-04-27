"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Sparkles, ShoppingCart, Loader2 } from "lucide-react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { PRODUCT_MOCK, Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

// --- CONSTANTES E UTILITÁRIOS ---
const LIP_INDICES = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];

/**
 * Calcula o subtom baseado no equilíbrio entre canais quentes e frios
 */
const calculateSubtone = (r: number, g: number, b: number): "frio" | "quente" | "neutro" => {
  const balance = r - b;
  if (balance > 12) return "quente";
  if (balance < -2) return "frio";
  return "neutro";
};

interface AITryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productType: string;
  productColor?: string;
}

export function AITryOn({ isOpen, onClose, productType, productColor = "#be123c" }: AITryOnProps) {
  const { addToCart } = useCart();
  
  // Refs para performance e controle de ciclo de vida
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const analysisStatus = useRef<"idle" | "analyzing" | "finished">("idle");
  const frameCounter = useRef(0);
  const isMounted = useRef(true);

  // Estados da UI
  const [isLoading, setIsLoading] = useState(true);
  const [aiRecommendation, setAiRecommendation] = useState("Iniciando escaneamento facial...");
  const [appliedColor, setAppliedColor] = useState(productColor);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  /**
   * Desenha o batom com efeito de blend realista
   */
  const drawLipstick = useCallback((ctx: CanvasRenderingContext2D, landmarks: any, color: string, video: HTMLVideoElement) => {
    const { width: w, height: h } = ctx.canvas;
    const videoAspect = video.videoWidth / video.videoHeight;
    const canvasAspect = w / h;
    
    let scaleX = w, scaleY = h, offsetX = 0, offsetY = 0;
    if (canvasAspect > videoAspect) {
      scaleY = w / videoAspect;
      offsetY = (h - scaleY) / 2;
    } else {
      scaleX = h * videoAspect;
      offsetX = (w - scaleX) / 2;
    }

    ctx.save();
    ctx.globalCompositeOperation = "multiply";
    ctx.beginPath();
    ctx.globalAlpha = 0.65; 
    ctx.fillStyle = color;
    ctx.filter = "blur(2.5px)";

    LIP_INDICES.forEach((index, i) => {
      const p = landmarks[index];
      if (!p) return;
      const px = p.x * scaleX + offsetX;
      const py = p.y * scaleY + offsetY;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    });

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, []);

  /**
   * Lógica principal de análise e recomendação
   */
  const performAIVision = useCallback((landmarks: any, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (analysisStatus.current !== "analyzing") return;

    frameCounter.current += 1;
    
    // Aguarda 45 frames para estabilizar a luz da câmera
    if (frameCounter.current > 45) {
      const point = landmarks[234]; // Ponto da bochecha lateral
      const px = Math.floor(point.x * canvas.width);
      const py = Math.floor(point.y * canvas.height);

      // Amostragem de área 5x5 para evitar ruído de pixels isolados
      const size = 5;
      const imageData = ctx.getImageData(px - 2, py - 2, size, size).data;
      
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i]; g += imageData[i+1]; b += imageData[i+2];
      }
      
      const count = imageData.length / 4;
      const subtone = calculateSubtone(r / count, g / count, b / count);
      const normalizedType = productType.toLowerCase().replace(/s$/, "");

      // FILTRAGEM DINÂMICA: Busca todos os produtos que combinam
      const matches = PRODUCT_MOCK.filter(p => 
        p.subtone === subtone && 
        p.category.toLowerCase().replace(/s$/, "") === normalizedType
      );

      // SORTEIO: Se houver vários, escolhe um aleatório para variar a experiência
      const selected = matches.length > 0 
        ? matches[Math.floor(Math.random() * matches.length)]
        : PRODUCT_MOCK.find(p => p.category.toLowerCase().replace(/s$/, "") === normalizedType);

      if (selected) {
        setAppliedColor(selected.color);
        setRecommendedProduct(selected);
        setAiRecommendation(`Análise concluída! Identificamos subtom ${subtone}. O ${selected.name} é a escolha perfeita para você.`);
      }

      analysisStatus.current = "finished";
    }
  }, [productType]);

  useEffect(() => {
    isMounted.current = true;
    if (!isOpen) return;

    analysisStatus.current = "idle";
    frameCounter.current = 0;

    let faceLandmarker: FaceLandmarker;
    let animationFrameId: number;
    let stream: MediaStream | null = null;

    const init = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        
        faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: { modelAssetPath: "/models/face_landmarker.task", delegate: "GPU" },
          runningMode: "VIDEO",
          numFaces: 1
        });

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: 1280, height: 720 },
        });

        if (videoRef.current && isMounted.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsLoading(false);
            loop();
          };
        }
      } catch (err) {
        setAiRecommendation("Erro ao acessar câmera ou carregar IA.");
      }
    };

    const loop = () => {
      if (!isMounted.current || !videoRef.current || !canvasRef.current || !faceLandmarker) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (ctx && video.readyState >= 3) {
        if (canvas.width !== video.offsetWidth) {
          canvas.width = video.offsetWidth;
          canvas.height = video.offsetHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const results = faceLandmarker.detectForVideo(video, performance.now());

        if (results?.faceLandmarks?.[0]) {
          const landmarks = results.faceLandmarks[0];

          if (analysisStatus.current === "idle") {
            analysisStatus.current = "analyzing";
            setAiRecommendation("Escaneando sua pele para recomendação personalizada...");
          }

          performAIVision(landmarks, ctx, canvas);

          if (productType === "Batons") {
            // Usa a cor recomendada pela IA se já terminou, senão a cor padrão
            drawLipstick(ctx, landmarks, analysisStatus.current === "finished" ? appliedColor : productColor, video);
          }
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    init();

    return () => {
      isMounted.current = false;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (faceLandmarker) faceLandmarker.close();
    };
  }, [isOpen, productType, productColor, appliedColor, drawLipstick, performAIVision]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative w-full h-[100dvh] md:max-w-4xl md:h-[85vh] bg-stone-900 md:rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Camada de Vídeo e Canvas */}
        <div className="absolute inset-0">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale-[0.2]" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none" />
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900 z-50">
              <Loader2 className="text-rose-500 animate-spin mb-4" size={48} />
              <p className="text-stone-400 font-light tracking-widest uppercase text-xs">Carregando Vision AI...</p>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 bg-gradient-to-b from-black/90 to-transparent">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full border-2 border-white/50 transition-all duration-700 ${analysisStatus.current === 'finished' ? 'scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : ''}`}
                 style={{ backgroundColor: appliedColor }} />
            <div>
              <h2 className="text-white font-serif text-xl">Ser Mulher</h2>
              <p className="text-rose-400 text-[10px] font-bold uppercase tracking-tighter">Smart Mirror Analysis</p>
            </div>
          </div>
          <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Painel Inferior */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 space-y-4">
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-rose-500/20 p-2 rounded-lg">
              <Sparkles className="text-rose-300" size={20} />
            </div>
            <p className="text-white text-sm font-light leading-snug">{aiRecommendation}</p>
          </div>

          {analysisStatus.current === "finished" && recommendedProduct && (
            <button
              onClick={() => { addToCart(recommendedProduct); onClose(); }}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg"
            >
              <ShoppingCart size={20} />
              Adicionar {recommendedProduct.name} à Sacola
            </button>
          )}
        </div>
      </div>
    </div>
  );
}