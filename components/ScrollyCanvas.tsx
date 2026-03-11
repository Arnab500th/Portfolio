"use client";

import { useScroll, useMotionValueEvent, useSpring, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollyCanvas({ numFrames }: { numFrames: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const { scrollYProgress } = useScroll();

  // Remap scroll progress so the sequence finishes earlier (less scrolling required)
  // Finish frames near scrollYProgress ~0.36 so they sync with the overlay text.
  const fastProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  // Smooth scroll progress
  const smoothProgress = useSpring(fastProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    let isMounted = true;
    let loaded = 0;
    let failed = 0;

    const loadImages = async () => {
      console.log(`Starting to load ${numFrames} images...`);

      const imagePromises = Array.from({ length: numFrames }, (_, i) => {
        const img = new Image();
        const filename = i.toString().padStart(3, "0");
        img.src = `/sequence_webp/${filename}.webp`;

        return new Promise<HTMLImageElement>((resolve, reject) => {
          img.onload = () => {
            if (isMounted) {
              loaded++;
              // Map incremental progress straight to 100% because we wait for all images
              const progress = Math.round((loaded + failed) / numFrames * 100);
              setLoadedCount(loaded);
              setLoadProgress(progress);
              console.log(`✓ Loaded: ${filename}.webp (${loaded}/${numFrames})`);
            }
            resolve(img);
          };

          img.onerror = (e) => {
            if (isMounted) {
              failed++;
              const progress = Math.round((loaded + failed) / numFrames * 100);
              setFailedCount(failed);
              setLoadProgress(progress);
              console.error(`✗ Failed: ${filename}.webp (${failed} failures)`);
            }
            resolve(img);
          };
        });
      });

      const loadedImages = await Promise.all(imagePromises);

      if (!isMounted) return;

      console.log(`Loading complete: ${loaded} loaded, ${failed} failed out of ${numFrames} total`);

      setImages(loadedImages);
      setLoadProgress(100);

      // Small delay to ensure canvas is ready and first frame renders
      setTimeout(() => {
        if (isMounted) {
          setIsLoaded(true);
          console.log('All images ready, enabling scroll');
        }
      }, 200);
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [numFrames]);

  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "auto" });

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoaded]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Handle High DPI
    const dpr = window.devicePixelRatio || 1;

    // Canvas dimensions are handled by resize listener, 
    // but we need the logical size for aspect ratio calcs
    const canvasWidth = canvas.width / dpr;
    const canvasHeight = canvas.height / dpr;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Use better image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(smoothProgress, "change", (latest: number) => {
    if (!isLoaded || images.length === 0) return;
    const frameIndex = Math.min(
      numFrames - 1,
      Math.floor(latest * (numFrames - 1))
    );
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;

        // Re-render current frame immediately on resize
        if (isLoaded && images.length > 0) {
          const currentProgress = smoothProgress.get();
          const frameIndex = Math.min(
            numFrames - 1,
            Math.floor(currentProgress * (numFrames - 1))
          );
          renderFrame(frameIndex);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images]);

  // Render first frame when loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      renderFrame(0);
    }
  }, [isLoaded, images]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
      <canvas
        ref={canvasRef}
        className="block h-full w-full object-cover"
      />
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black backdrop-blur-md"
        >
          {/* Logo / Central Element */}
          <div className="relative flex items-center justify-center w-20 h-20 md:w-32 md:h-32 mb-8 md:mb-12">
            {/* Outer rotating pulse */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-white/10 border-t-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            />
            {/* Inner pulsing core */}
            <motion.div
              animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            />
          </div>

          <div className="flex flex-col items-center gap-6 w-full max-w-sm px-8">
            {/* Loading text with animated dots */}
            <div className="flex items-center gap-2 text-base md:text-xl font-light text-white/90 tracking-widest uppercase">
              Initializing
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
              >
                ...
              </motion.span>
            </div>

            {/* Premium Progress Bar */}
            <div className="w-full relative h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-white shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Metrics */}
            <div className="flex justify-between w-full text-xs font-mono text-white/50">
              <span>{Math.round(loadProgress)}%</span>
              <span className="flex gap-2">
                <span>{loadedCount}/{numFrames}</span>
                {failedCount > 0 && <span className="text-red-400 capitalize">({failedCount} failed)</span>}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}