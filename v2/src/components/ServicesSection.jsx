import { motion } from "motion/react";
import BorderGlow from "../component/BorderGlow";

const services = [
  {
    id: "01",
    badge: "ضيافة فاخرة",
    title: "الشقق الفندقية",
    description: "مساكن فاخرة بخدمة كاملة تجمع بين ضيافة الخمس نجوم وراحة وخصوصية المنزل.",
    metric: "5★ تجربة راقية",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: "02",
    badge: "إدارة الأصول",
    title: "إدارة العقارات",
    description: "إدارة تشغيلية متكاملة تضمن استدامة أصولك، تحسين جودتها، وتحقيق أقصى عائد.",
    metric: "+500 وحدة مُدارة",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "03",
    badge: "معمار وأيقونات",
    title: "التطوير العقاري",
    description: "مشاريع أيقونية تعيد تعريف العيش الفاخر بتميز معماري فريد وتشطيبات راقية.",
    metric: "معايير أيقونية",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "04",
    badge: "عوائد ونمو",
    title: "فرص الاستثمار",
    description: "محافظ استثمارية منتقاة بعناية في مواقع متميزة تحقق نمواً مستداماً وعوائد استثنائية.",
    metric: "12% متوسط العائد",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0a9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative min-h-screen py-24 md:py-32! bg-transparent! z-50! overflow-hidden" dir="rtl">
      


      {/* Top & Bottom Radial Glow Highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00c8b8]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#00c8b8]/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Container with generous horizontal padding (screen edge spacing) */}
      <div className="w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 xl:px-24 relative z-10 flex flex-col items-center">
        
        {/* Header - Luxury Centered */}
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
              منظومة خدماتنا المتميزة
            </span>
          </div>
          
          {/* Headline */}
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white tracking-tight leading-tight text-center">
            حلول شاملة تُجسّد{" "}
            <span className="bg-gradient-to-r from-[#00c8b8] via-[#4ddcd0] to-white bg-clip-text text-transparent">
              الفخامة والتميز
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/60 max-w-2xl text-center font-light leading-relaxed my-2!">
            نقدم حزمة متكاملة من الخدمات العقارية والتشغيلية المصممة بعناية لتلائم تطلعات العملاء والمستثمرين الباحثين عن أعلى معايير الجودة والاستدامة.
          </p>
        </motion.div>

        {/* Services Grid with distinct top margin and space between cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full mt-4! px-8!">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="h-full"
            >
              <BorderGlow
                className="h-full rounded-3xl"
                glowColor="176 100 39"
                backgroundColor="transparent"
                colors={['#00c8b8', '#013a36', '#000000']}
                glowRadius={14}
                glowIntensity={0.25}
                edgeSensitivity={20}
                animated={false}
              >
                <div className="relative z-10 flex flex-col justify-between p-5! h-full group bg-[#090a0a]/80 backdrop-blur-xl border border-white/[0.08] rounded-3xl hover:bg-[#0c0e0e]/90 hover:border-[#00c8b8]/30 transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  
                  {/* Hover ambient top line glow */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00c8b8]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div>
                    {/* Header Row: ID Number & Badge */}
                    <div className="flex items-center justify-between mb-4!">
                      <span className="text-2xl font-black text-white/15 tracking-widest font-mono group-hover:text-[#00c8b8]/50 transition-colors duration-300">
                        {service.id}
                      </span>
                      <span className="text-[11px] font-medium px-2.5! py-1! rounded-full bg-[#00c8b8]/10 text-[#00c8b8] border border-[#00c8b8]/20 group-hover:bg-[#00c8b8]/20 transition-all duration-300">
                        {service.badge}
                      </span>
                    </div>

                    {/* Icon Box */}
                    <div className="relative flex items-center justify-center w-14 h-14 mb-6! rounded-2xl text-[#00c8b8] group-hover:scale-105 transition-transform duration-300">
                      {/* Glow Background */}
                      <div className="absolute inset-0 bg-[#00c8b8] opacity-[0.08] group-hover:opacity-[0.18] blur-xl rounded-2xl transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent rounded-2xl border border-white/10 group-hover:border-[#00c8b8]/40 transition-colors duration-300" />
                      
                      <div className="relative z-10 text-[#00c8b8] group-hover:drop-shadow-[0_0_10px_rgba(0,200,184,0.6)] transition-all duration-300">
                        {service.icon}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-3! tracking-tight group-hover:text-[#00c8b8] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light group-hover:text-white/70 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Card Footer: Metric & Action Arrow */}
                  <div className="pt-4! border-t border-white/5 flex items-center justify-center mt-4!">
                    <span className="text-xs font-semibold text-[#00c8b8]/90 tracking-wide">
                      {service.metric}
                    </span>
                  </div>

                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20! w-full max-w-4xl p-6! md:p-8! rounded-3xl bg-gradient-to-r from-white/[0.04] via-[#00c8b8]/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6! shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
        >
          <div className="flex flex-col text-center md:text-right gap-1">
            <h4 className="text-lg md:text-xl font-bold text-white">
              هل تبحث عن حلول عقارية مخصصة لمشروعك؟
            </h4>
            <p className="text-xs md:text-sm text-white/50 font-light">
              فريق مستشارينا على أهبة الاستعداد لتقديم حلول متكاملة تناسب طموحاتك الاستثمارية.
            </p>
          </div>
          
          <a
            href="#contact"
            className="px-6! py-3! rounded-2xl! bg-[#00c8b8] text-black font-semibold text-sm hover:bg-[#00e6d2] transition-all duration-300 shadow-[0_0_20px_rgba(0,200,184,0.3)] hover:shadow-[0_0_30px_rgba(0,200,184,0.5)] transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            تواصل معنا الآن
          </a>
        </motion.div>

      </div>
    </section>
  );
}
