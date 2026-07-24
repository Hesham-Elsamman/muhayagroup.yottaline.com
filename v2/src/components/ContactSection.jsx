import { motion } from "motion/react";

const contactCards = [
  {
    label: "اتصل بنا",
    value: "+966 50 000 0000",
    href: "tel:+966500000000",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.3a2 2 0 011.9 1.3l1.2 3.8a2 2 0 01-.4 1.9L7.7 12.7a15.1 15.1 0 006.6 6.6l1.7-1.7a2 2 0 011.9-.4l3.8 1.2a2 2 0 011.3 1.9V19a2 2 0 01-2 2h-1C7.8 21 3 16.2 3 10.5V5z" />
      </svg>
    ),
  },
  {
    label: "البريد الإلكتروني",
    value: "info@muhayagroup.com",
    href: "mailto:info@muhayagroup.com",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9A2.5 2.5 0 0118.5 19h-13A2.5 2.5 0 013 16.5v-9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "الموقع",
    value: "الرياض - المملكة العربية السعودية",
    href: "#",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.7-6-11a6 6 0 1112 0c0 5.3-6 11-6 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative min-h-screen pt-16 md:pt-20 pb-0 bg-transparent z-50 overflow-hidden" dir="rtl">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[680px] h-[320px] rounded-full bg-[#00c8b8]/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[420px] h-[300px] rounded-full bg-[#00c8b8]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-20 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#071615] via-[#071918] to-[#020505] p-5 md:p-12 lg:p-16  overflow-hidden"
        >

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div className="max-w-2xl text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00c8b8]/30 bg-white/[0.03] px-4 py-2 text-xs font-medium tracking-[0.2em] text-[#00c8b8] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#00c8b8]" />
                تواصل معنا
              </div>

              <h2 className="mt-6 text-3xl md:text-5xl font-bold leading-tight text-white">
                لنبدأ مشروعًا
                <span className="block bg-gradient-to-r from-[#00c8b8] via-[#4ddcd0] to-white bg-clip-text text-transparent">
                  يترك أثرًا لا يُنسى
                </span>
              </h2>

              <p className="mt-5 text-base md:text-lg leading-relaxed text-white/70">
                سواء كنتم تبحثون عن إدارة فاخرة، فرص استثمارية أو شراكة طويلة الأمد، فنحن جاهزون لتقديم الحلول الملائمة لكم بكل احترافية واهتمام.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-start">
                <a
                  href="tel:+966500000000"
                  className="rounded-2xl bg-[#00c8b8] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#00e6d2] text-center"
                >
                  احجز استشارة
                </a>
                <a
                  href="mailto:info@muhayagroup.com"
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#00c8b8]/40 hover:bg-white/[0.08] text-center"
                >
                  راسلنا الآن
                </a>
              </div>
            </div>

            <div className="w-full max-w-xl rounded-[1.5rem] border border-white/10 bg-black/20 p-3 md:p-6 backdrop-blur-xl">
              <div className="grid gap-3">
                {contactCards.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-right transition-all duration-300 hover:border-[#00c8b8]/30 hover:bg-white/[0.06] overflow-hidden"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00c8b8]/10 text-[#00c8b8]">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                        <p className="mt-1 text-sm text-white/60 break-all" dir="ltr" style={{ textAlign: 'right' }}>{item.value}</p>
                      </div>
                    </div>
                    <span className="text-[#00c8b8] shrink-0 mr-2 md:mr-4">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
