"use client";

import { useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion";
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
    let earlyMarked = false;

    const loadImages = async () => {
      console.log(`Starting to load ${numFrames} images...`);
      
      // Determine a small threshold so we can enable scrolling early
      const readyThreshold = Math.max(5, Math.ceil(numFrames * 0.15));

      const imagePromises = Array.from({ length: numFrames }, (_, i) => {
        const img = new Image();
        const filename = i.toString().padStart(3, "0");
        img.src = `/sequence/${filename}.png`;

        return new Promise<HTMLImageElement>((resolve, reject) => {
          img.onload = () => {
            if (isMounted) {
              loaded++;
              // Map incremental progress to 0-90% so final jump to 100% feels faster
              const progress = Math.round((loaded + failed) / numFrames * 90);
              setLoadedCount(loaded);
              setLoadProgress(progress);
              console.log(`✓ Loaded: ${filename}.png (${loaded}/${numFrames})`);
            }
            // If we've reached the small ready threshold, enable scroll early
            if (!earlyMarked && isMounted && (loaded + failed) >= readyThreshold) {
              earlyMarked = true;
              setLoadProgress(100);
              setIsLoaded(true);
              console.log('Early images ready, enabling scroll');
            }

            resolve(img);
          };
          
          img.onerror = (e) => {
            if (isMounted) {
              failed++;
              const progress = Math.round((loaded + failed) / numFrames * 90);
              setFailedCount(failed);
              setLoadProgress(progress);
              console.error(`✗ Failed: ${filename}.png (${failed} failures)`);
            }
            // Still resolve with the image object even on error
            // so Promise.all doesn't fail
            // If error contributes to reaching the ready threshold, enable early
            if (!earlyMarked && isMounted && (loaded + failed) >= readyThreshold) {
              earlyMarked = true;
              setLoadProgress(100);
              setIsLoaded(true);
              console.log('Early images ready (with failures), enabling scroll');
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
        if (isMounted && !earlyMarked) {
          setIsLoaded(true);
          console.log('Images ready, enabling scroll');
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 gap-4">
          <div className="text-xl font-light">Loading Experience</div>
          <div className="w-48 h-[1px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-white/50 transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="text-xs font-mono">{loadProgress}%</div>
          <div className="text-xs font-mono text-white/10">
            {loadedCount} / {numFrames} loaded
            {failedCount > 0 && ` (${failedCount} failed)`}
          </div>
        </div>
      )}
    </div>
  );
}