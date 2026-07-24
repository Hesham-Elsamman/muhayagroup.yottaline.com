import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Preloader({ isVideoLoaded, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let minTimePassed = false;
    let windowLoaded = document.readyState === 'complete';

    const minTimer = setTimeout(() => {
      minTimePassed = true;
      checkDone();
    }, 2500);

    const forceDone = () => {
      if (!isCancelled) {
        setProgress(100);
        setTimeout(() => {
          if (!isCancelled) {
            setIsLoaded(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 1200);
          }
        }, 600);
      }
    };

    const checkDone = () => {
      if (minTimePassed && windowLoaded && isVideoLoaded) {
        forceDone();
      }
    };

    if (!windowLoaded) {
      const handleLoad = () => {
        windowLoaded = true;
        checkDone();
      };
      window.addEventListener('load', handleLoad);
    }

    const fallbackTimer = setTimeout(() => {
      // بعد 15 ثانية ننهي اللودر إجبارياً لتجنب تعليق المستخدم
      forceDone();
    }, 15000);

    const interval = setInterval(() => {
      setProgress(p => Math.floor(Math.min(p + (Math.random() * 4) + 1, 95)));
    }, 200);

    // Call checkDone manually in case dependencies update
    checkDone();

    return () => {
      isCancelled = true;
      clearTimeout(minTimer);
      clearTimeout(fallbackTimer);
      clearInterval(interval);
    };
  }, [isVideoLoaded, onComplete]);

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
