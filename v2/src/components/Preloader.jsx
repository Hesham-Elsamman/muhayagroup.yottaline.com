import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader({ videoUrl, onVideoReady, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const resolvedRef = useRef(false);
  const controllerRef = useRef(null);
  const onVideoReadyRef = useRef(onVideoReady);

  // Keep the latest callback ref updated
  onVideoReadyRef.current = onVideoReady;

  const forceDone = useCallback(() => {
    setProgress(100);
    setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => onComplete?.(), 1200);
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    if (minTimePassed && videoReady) forceDone();
  }, [minTimePassed, videoReady, forceDone]);

  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!videoUrl) return;

    resolvedRef.current = false;
    controllerRef.current = new AbortController();

    const loadVideo = async () => {
      try {
        const res = await fetch(videoUrl, {
          signal: controllerRef.current.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const total = Number(res.headers.get('content-length')) || 0;
        const reader = res.body.getReader();
        const chunks = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          received += value.byteLength;
          setProgress(total > 0
            ? Math.min(99, Math.round((received / total) * 100))
            : (p) => Math.min(p + 2, 90)
          );
        }

        if (resolvedRef.current) return;
        resolvedRef.current = true;

        const blob = new Blob(chunks, { type: 'video/mp4' });
        const blobUrl = URL.createObjectURL(blob);
        setProgress(100);
        onVideoReadyRef.current(blobUrl);
        setVideoReady(true);
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (resolvedRef.current) return;
        resolvedRef.current = true;

        console.warn('[MuhayaPreloader] fetch failed — using direct src:', err);
        onVideoReadyRef.current(videoUrl);
        setProgress(100);
        setVideoReady(true);
      }
    };

    loadVideo();
    return () => controllerRef.current?.abort();
  }, [videoUrl]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (resolvedRef.current) return;
      resolvedRef.current = true;
      controllerRef.current?.abort();
      console.warn('[MuhayaPreloader] fetch timeout — falling back to direct src');
      onVideoReadyRef.current(videoUrl);
      setProgress(100);
      setVideoReady(true);
    }, 20000);
    return () => clearTimeout(t);
  }, [videoUrl]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          exit={{ y: '-100%', opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#030606] flex flex-col items-center justify-center overflow-hidden"
          dir="ltr"
        >
          {/* Architectural SVG Animation */}
          <div className="relative w-40 h-40 md:w-48 md:h-48 mb-12">
            <motion.svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[#00c8b8]"
              initial="hidden"
              animate="visible"
            >
              {/* Outer Diamond */}
              <motion.polygon
                points="50,5 95,50 50,95 5,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { 
                    pathLength: 1, 
                    opacity: 0.3,
                    transition: { duration: 3, ease: "linear", repeat: Infinity }
                  }
                }}
              />
              {/* Inner Isometric Cube */}
              <motion.polygon
                points="50,15 85,35 85,65 50,85 15,65 15,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { 
                    pathLength: 1, 
                    opacity: 1,
                    transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
                  }
                }}
              />
              <motion.polyline
                points="50,15 50,50 85,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { 
                    pathLength: 1, 
                    opacity: 1,
                    transition: { duration: 2.5, ease: "easeInOut", delay: 0.5, repeat: Infinity, repeatType: "reverse" }
                  }
                }}
              />
              <motion.polyline
                points="15,35 50,50 50,85"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.75"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: { 
                    pathLength: 1, 
                    opacity: 1,
                    transition: { duration: 2.5, ease: "easeInOut", delay: 1, repeat: Infinity, repeatType: "reverse" }
                  }
                }}
              />
            </motion.svg>
            
            {/* Pulsing Center Glow */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00c8b8] rounded-full shadow-[0_0_15px_#00c8b8]"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 2, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="text-[#00c8b8] font-mono text-4xl md:text-5xl font-extralight tracking-[0.1em] drop-shadow-[0_0_10px_rgba(0,200,184,0.3)]">
              {progress}%
            </div>
            
            {/* Progress line */}
            <div className="w-64 md:w-80 h-px bg-white/10 relative overflow-hidden rounded-full">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00c8b8]/10 via-[#00c8b8] to-[#00c8b8]/10"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            <motion.div 
              className="text-white/40 text-xs md:text-sm tracking-[0.5em] font-light uppercase"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Muhaya Group
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
