"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, Sparkles, ShoppingCart } from "lucide-react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { PRODUCT_MOCK, Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";

const LIP_INDICES = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];

interface AITryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productType: string;
  productColor?: string;
}

const getSkinSubtone = (r: number, g: number, b: number): "frio" | "quente" | "neutro" => {
  const yellowRange = (r + g) / 2;
  if (yellowRange > b + 30) return "quente";
  if (b > (r + g) / 2.5) return "frio";
  return "neutro";
};

export function AITryOn({ isOpen, onClose, productType, productColor = "#be123c" }: AITryOnProps) {
  const { addToCart } = useCart();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [aiRecommendation, setAiRecommendation] = useState("Iniciando escaneamento facial...");
  const [appliedColor, setAppliedColor] = useState(productColor);
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const colorRef = useRef(appliedColor);
  const typeRef = useRef(productType);
  const analysisStatus = useRef<"idle" | "analyzing" | "finished">("idle");
  const frameCounter = useRef(0);
  const isMounted = useRef(true);

  useEffect(() => { colorRef.current = appliedColor; }, [appliedColor]);
  useEffect(() => { typeRef.current = productType; }, [productType]);

  const drawLipstick = useCallback((ctx: CanvasRenderingContext2D, landmarks: any, color: string, video: HTMLVideoElement) => {
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
    ctx.globalCompositeOperation = "multiply";
    ctx.beginPath();
    ctx.globalAlpha = 0.6; 
    ctx.fillStyle = color;
    ctx.filter = "blur(3px)";

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

  useEffect(() => {
    isMounted.current = true;
    if (!isOpen) return;

    analysisStatus.current = "idle";
    frameCounter.current = 0;

    const originalInfo = console.info;
    console.info = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes("XNNPACK")) return;
      originalInfo(...args);
    };

    let faceLandmarker: FaceLandmarker;
    let animationFrameId: number;
    let stream: MediaStream | null = null;
    let isProcessing = false;

    const setupIA = async () => {
      try {
        const filesetResolver = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
          baseOptions: { modelAssetPath: "/models/face_landmarker.task", delegate: "GPU" },
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
        if (isMounted.current) setAiRecommendation("Erro de Câmera.");
      }
    };

    const renderLoop = () => {
      if (!isMounted.current || !faceLandmarker || !videoRef.current || !canvasRef.current || isProcessing) {
        animationFrameId = requestAnimationFrame(renderLoop);
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (ctx && video.readyState >= 3 && video.videoWidth > 0) {
        if (canvas.width !== video.offsetWidth || canvas.height !== video.offsetHeight) {
          canvas.width = video.offsetWidth;
          canvas.height = video.offsetHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        try {
          isProcessing = true;
          const timestamp = Math.floor(performance.now());
          const results = faceLandmarker.detectForVideo(video, timestamp);

          if (results?.faceLandmarks?.length > 0) {
            const landmarks = results.faceLandmarks[0];

            if (analysisStatus.current === "idle") {
              analysisStatus.current = "analyzing";
              setAiRecommendation("Analisando subtom da pele...");
            }

            if (analysisStatus.current === "analyzing") {
              frameCounter.current += 1;
              if (frameCounter.current > 45) {
                const point = landmarks[234];
                const px = Math.min(Math.max(Math.floor(point.x * canvas.width), 0), canvas.width - 1);
                const py = Math.min(Math.max(Math.floor(point.y * canvas.height), 0), canvas.height - 1);
                const pixelData = ctx.getImageData(px, py, 1, 1).data;
                const subtone = getSkinSubtone(pixelData[0], pixelData[1], pixelData[2]);
                
                const normalizedType = typeRef.current.toLowerCase().replace(/s$/, ""); 
                const recommended = PRODUCT_MOCK.find(p => {
                  const pCat = p.category.toLowerCase().replace(/s$/, "");
                  return p.subtone === subtone && pCat === normalizedType;
                });

                if (recommended) {
                  setAppliedColor(recommended.color);
                  setRecommendedProduct(recommended);
                  setAiRecommendation(`Subtom ${subtone} detectado. Sugerimos: ${recommended.name}!`);
                } else {
                  const fallback = PRODUCT_MOCK.find(p => p.category.toLowerCase().replace(/s$/, "") === normalizedType);
                  if (fallback) {
                    setAppliedColor(fallback.color);
                    setRecommendedProduct(fallback);
                    setAiRecommendation(`Subtom ${subtone} detectado. Harmoniza com ${fallback.name}.`);
                  }
                }
                analysisStatus.current = "finished";
              }
            }

            if (typeRef.current === "Batons") {
              drawLipstick(ctx, landmarks, colorRef.current, video);
            }
          }
        } catch (e) {
          // Silent catch
        } finally {
          isProcessing = false;
        }
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    setupIA();

    return () => {
      isMounted.current = false;
      console.info = originalInfo;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (faceLandmarker) faceLandmarker.close();
    };
  }, [isOpen, drawLipstick]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <div className="relative w-full h-[100dvh] md:max-w-4xl md:h-[80vh] bg-stone-900 md:rounded-3xl overflow-hidden shadow-2xl">
        
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
        </div>

        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-4">
            {analysisStatus.current === "finished" ? (
              <div 
                className="w-10 h-10 rounded-full border-2 border-white shadow-xl animate-bounce"
                style={{ backgroundColor: appliedColor }} 
              />
            ) : (
              <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
            )}
            <div>
              <h2 className="text-white font-serif text-lg leading-none">Provador Virtual</h2>
              <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest">{productType}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="absolute bottom-8 left-0 w-full px-6 z-20 flex flex-col gap-4 items-center">
          {/* Card de Recomendação */}
          <div className="bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 w-full max-w-lg flex items-center gap-4 shadow-2xl">
             <div className="bg-rose-500/20 p-2 rounded-xl">
                <Sparkles size={20} className="text-rose-300" />
             </div>
             <p className="text-white text-sm font-light italic leading-snug">{aiRecommendation}</p>
          </div>

          {/* Botão de Compra Dinâmico */}
          {analysisStatus.current === "finished" && recommendedProduct && (
            <button
              onClick={() => {
                addToCart(recommendedProduct);
                onClose();
              }}
              className="w-full max-w-lg bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 transform transition active:scale-95 animate-in slide-in-from-bottom-4 duration-500"
            >
              <ShoppingCart size={20} />
              Comprar {recommendedProduct.name}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}