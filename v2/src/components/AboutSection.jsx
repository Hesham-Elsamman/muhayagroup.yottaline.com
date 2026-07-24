import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import WorldMap from "./ui/world-map";
import LightRays from "./LightRays";

function AnimatedCounter({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.round(latest) + suffix;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-black relative z-50 overflow-hidden pt-32 pb-20!">
      {/* Gradient ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[800px] bg-[#00c8b8] opacity-[0.15] blur-[140px] pointer-events-none" />

      {/* LightRays Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <LightRays 
          raysOrigin="top-center"
          raysColor="#00c8b8"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={3}
          pulsating={true}
          fadeDistance={1.5}
          saturation={1.2}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0}
          distortion={0.1}
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 flex flex-col items-center w-full gap-12 md:gap-16">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 pt-12 md:gap-5 max-w-4xl w-full">
          {/* Top small text */}
          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00c8b8]" />
            <p className="text-xs font-medium text-[#00c8b8] tracking-wider">عن المٌحيا</p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#00c8b8]" />
          </div>
          
          {/* Title */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide leading-tight">
            مجموعة المٌحيا
          </h2>
          
          {/* Description */}
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed text-center font-light mt-2">
            نحن مجموعة المٌحيا نقدم حلولاً إدارية متكاملة بمعايير عالية الجودة. نؤمن أن التفاني والالتزام بالتفاصيل هما الطريق نحو التميز والنجاح المستمر.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="w-full max-w-3xl flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 px-4 md:px-8">
          {/* +15 (Right in RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0 }}
            className="text-center flex flex-col gap-3"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-[#00c8b8] tracking-tighter">
              <AnimatedCounter value={15} prefix="+" />
            </h3>
            <p className="text-white/60 text-sm md:text-base">سنوات خبرة</p>
          </motion.div>

          {/* +500 (Center) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center flex flex-col gap-3"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-[#00c8b8] tracking-tighter">
              <AnimatedCounter value={500} prefix="+" />
            </h3>
            <p className="text-white/60 text-sm md:text-base">وحدة مُدارة</p>
          </motion.div>

          {/* 98% (Left in RTL) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center flex flex-col gap-3"
          >
            <h3 className="text-4xl md:text-6xl font-bold text-[#00c8b8] tracking-tighter">
              <AnimatedCounter value={98} suffix="%" />
            </h3>
            <p className="text-white/60 text-sm md:text-base">رضا العملاء</p>
          </motion.div>
        </div>

        {/* World Map Container */}
        <div className="w-full max-w-[1000px] flex flex-col items-center gap-6 pb-20">
          <div className="w-full rounded-2xl border border-white/5 bg-[#030303] overflow-hidden relative p-1 shadow-[0_0_40px_rgba(0,200,184,0.03)]">
            {/* Inner subtle gradient on the map container */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#00c8b8]/[0.02] pointer-events-none" />
            <WorldMap
              lineColor="#00c8b8"
              dots={[
                {
                  start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
                  end: { lat: 51.5074, lng: -0.1278 }, // London
                },
                {
                  start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
                  end: { lat: 35.6895, lng: 139.6917 }, // Tokyo
                },
                {
                  start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
                  end: { lat: 40.7128, lng: -74.0060 }, // New York
                },
                {
                  start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
                  end: { lat: -33.8688, lng: 151.2093 }, // Sydney
                },
                {
                  start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
                  end: { lat: 1.3521, lng: 103.8198 }, // Singapore
                },
                {
                  start: { lat: 24.7136, lng: 46.6753 }, // Riyadh
                  end: { lat: 48.8566, lng: 2.3522 }, // Paris
                }
              ]}
            />
          </div>
          <p className="text-center text-[11px] md:text-xs text-white/40 tracking-wide mt-2">
            حضور عالمي - انطلاقاً من الرياض
          </p>
        </div>
      </div>
    </section>
  );
}
