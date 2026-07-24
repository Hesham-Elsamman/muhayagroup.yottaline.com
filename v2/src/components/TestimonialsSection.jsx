import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import CircularGallery from "../component/CircularGallery";
import BorderGlow from "../component/BorderGlow";
import hotelLobby from "../assets/Hotel-Lobby.png";
import reception from "../assets/reception.png";
import girlImage from "../assets/girl.png";
import manImage from "../assets/man.png";

const testimonials = [
  {
    id: 1,
    name: "محمد الدعيع",
    title: "مالك منتجع سياحي",
    rating: 5,
    content:
      "تجربة احترافية من البداية حتى النهاية. الفريق ملتزم بأعلى معايير الجودة والخدمة.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    name: "فاطمة العوهلي",
    title: "مستثمرة عقارية",
    rating: 5,
    content:
      "الإدارة المتكاملة أعطت أصولي قيمة حقيقية. العوائد تتجاوز التوقعات بكل المقاييس.",
    image: girlImage,
  },
  {
    id: 3,
    name: "علي الحرملي",
    title: "رئيس فندق خمس نجوم",
    rating: 5,
    content:
      "الشراكة مع مجموعة المحياء جلبت مستويات جديدة من التطور والاحترافية للعملية.",
    image: manImage,
  },
];

const galleryImages = [
  {
    image: hotelLobby,
    text: "فندق فاخر",
  },
  {
    image: reception,
    text: "استقبال فندقي",
  },
  {
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop",
    text: "غرفة فندقية",
  },
  {
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
    text: "حمامات سباحة",
  },
];

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full!"
    >
      <BorderGlow
        className="h-full! rounded-3xl!"
        glowColor="0 200 184"
        backgroundColor="transparent"
        colors={["#00c8b8", "#013a36", "#000000"]}
        glowRadius={14}
        glowIntensity={0.25}
        edgeSensitivity={18}
        animated={true}
      >
        <div className="relative! z-10! p-7! md:p-8! h-full! bg-gradient-to-br! from-[#0a1a19]! to-[#090a0a]/90! backdrop-blur-xl! border! border-[#00c8b8]/15! rounded-3xl! hover:border-[#00c8b8]/40! transition-all! duration-500! overflow-hidden! shadow-[0_20px_40px_rgba(0,0,0,0.6)]! flex! flex-col! hover:shadow-[0_30px_60px_rgba(0,200,184,0.15)]! hover:bg-gradient-to-br! hover:from-[#0a2422]! hover:to-[#090a0a]!">
          {/* Stars Rating */}
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-[#00c8b8]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="text-white/85! text-sm! md:text-base! font-light! leading-relaxed! mb-6! flex-grow! text-right!">
            "{testimonial.content}"
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00c8b8]/20 to-transparent mb-4" />

          {/* Client Info */}
          <div className="flex! items-center! gap-4! pt-2!">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-14! h-14! rounded-full! object-cover! border! border-[#00c8b8]/40! flex-shrink-0! ring-2! ring-[#00c8b8]/20!"
            />
            <div className="flex! flex-col! text-right!">
              <p className="font-semibold! text-white! text-sm! md:text-base!">
                {testimonial.name}
              </p>
              <p className="text-[#00c8b8]! text-xs! md:text-sm! font-light!">
                {testimonial.title}
              </p>
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleMouseDown = (e) => {
    setDragStart(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (isTransitioning) return;
    const dragEnd = e.clientX;
    const diff = dragStart - dragEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const visibleTestimonials = testimonials.map((t, i) => ({
    ...t,
    visible: i === currentIndex,
  }));

  return (
    <section
      id="testimonials"
      className="relative min-h-screen py-24 md:py-32! bg-transparent! z-50! overflow-hidden"
      dir="rtl"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-[600px] h-[300px] bg-[#00c8b8]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-[#00c8b8]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto p-8! sm:p-12! lg:p-10! xl:p-24! relative z-10 flex flex-col items-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center flex flex-col items-center gap-4 w-full max-w-3xl mb-20 md:mb-28"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4! py-1.5 rounded-lg bg-white/[0.03] border border-[#00c8b8]/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,200,184,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00c8b8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00c8b8]"></span>
            </span>
            <span className="text-xs font-medium text-[#00c8b8] tracking-wide">
              آراء عملائنا
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-center">
            ثقة وجودة{" "}
            <span className="bg-gradient-to-r from-[#00c8b8] via-[#4ddcd0] to-white bg-clip-text text-transparent">
              يشهد عليها عملاؤنا
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/60 max-w-2xl text-center font-light leading-relaxed my-2!">
            تجارب حقيقية من شركائنا الموثوقين يتحدثون عن التزامنا بالتميز
            والخدمة الاستثنائية.
          </p>
        </motion.div>

        {/* Gallery Section with Images */}
        <div className="hidden! md:block! w-full! mb-20! md:mb-28! px-4! md:px-0!">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative! w-full! max-w-5xl! mx-auto! h-96! md:h-[480px]! lg:h-[550px]!"
          >
            <div className="absolute! -inset-2! md:-inset-4! bg-gradient-to-r! from-[#00c8b8]/20! via-[#00c8b8]/10! to-transparent! rounded-3xl! blur-2xl! -z-10! opacity-0! md:opacity-100!" />
            <div className="relative! w-full! h-full! rounded-3xl! overflow-hidden!">
              <CircularGallery
                items={galleryImages}
                bend={4}
                textColor="#ffffff"
                borderRadius={0.08}
                font="bold 24px 'Segoe UI', -apple-system, sans-serif"
                scrollSpeed={2.5}
                scrollEase={0.08}
              />
            </div>
          </motion.div>
        </div>

        {/* Testimonials Slider */}
        <div className="w-full!" ref={sectionRef}>
          {/* Desktop View - Grid */}
          <div className="hidden! md:grid! md:grid-cols-3! gap-6! lg:gap-8! px-4! md:px-8! w-full! max-w-6xl! mx-auto!">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          {/* Mobile View - Slider */}
          <div className="md:hidden! w-full! px-4! mx-auto!">
            <motion.div
              className="flex! justify-center! cursor-grab! active:cursor-grabbing!"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onTouchStart={(e) => setDragStart(e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const touchEnd = e.changedTouches[0].clientX;
                if (dragStart === 0) return;
                const diff = dragStart - touchEnd;
                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    handleNext();
                  } else {
                    handlePrev();
                  }
                }
              }}
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="w-full! max-w-sm!">
                <TestimonialCard
                  testimonial={testimonials[currentIndex]}
                  index={0}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
