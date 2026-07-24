import "./index.css";
import "./App.css";
import { useState, useEffect } from "react";
import ScrollExpandMedia from "./components/ScrollExpandMedia";
import StaggeredMenu from "./components/StaggeredMenu";
import ScrollVelocity from "./components/ScrollVelocity";
import Plasma from "./components/Plasma";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import muhayaVideo from "./assets/muhaya-scrub.mp4";
import logoArText from "./assets/logo-ar-text.png";
import { VideoScrollContext } from "./context/VideoScrollContext";
import Preloader from "./components/Preloader";
const ACCENT = "#00c8b8";

const menuItems = [
  { label: "الرئيسية", ariaLabel: "الصفحة الرئيسية", link: "#" },
  { label: "عن المٌحيا", ariaLabel: "من نحن", link: "#about" },
  { label: "خدماتنا", ariaLabel: "خدماتنا", link: "#services" },
  { label: "اراء العملاء", ariaLabel: "الاراء", link: "#testimonials" },
  { label: "تواصل معنا", ariaLabel: "تواصل معنا", link: "#contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "FaceBook", link: "https://facebook.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

function SegmentFrame({ header, content }) {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        direction: "rtl",
        padding: "clamp(1.5rem, 4vw, 4rem)",
        paddingTop: "clamp(6rem, 12vh, 10rem)",
      }}
    >
      {header}
      <div className="flex-grow" />
      {content}
    </div>
  );
}

function MetricCard({ value, label, note }) {
  return (
    <div className="pointer-events-auto anim-item" data-anim="up">
      <p
        data-counter={value}
        className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-[#026059] via-[#026059] to-[#00c8b8] bg-clip-text text-transparent"
      >
        0
      </p>
      <p className="mt-2 text-white font-semibold text-base md:text-lg">
        {label}
      </p>
      {note && <p className="mt-1 text-sm text-white/60">{note}</p>}
    </div>
  );
}

function MetricGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
}

function ServiceCard({ title, note, accent, icon }) {
  return (
    <div
      className="pointer-events-auto flex items-start gap-4 anim-item"
      data-anim="up"
    >
      <div className="mt-1 text-[#00c8b8]">{icon}</div>
      <div className="text-right">
        <p className="text-lg md:text-xl font-semibold bg-gradient-to-br from-[#026059] via-[#026059] to-[#00c8b8] bg-clip-text text-transparent">
          {title}
        </p>
        <p className="mt-2 text-sm text-white/60">{note}</p>
      </div>
    </div>
  );
}

function ServiceGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );
}

function App() {
  const [isVideoPinned, setIsVideoPinned] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // إيقاف الـ Scroll أثناء اللودينج
  useEffect(() => {
    if (!appLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [appLoaded]);

  const segments = [
    {
      start: 0,
      end: 3.5,
      fadeIn: 1.2,
      content: (
        <SegmentFrame
          header={
            <div
              className="anim-item ml-auto w-full max-w-[38rem] text-right"
              data-anim="down"
            >
              <p className="text-xs tracking-widest text-[#00c8b8]/85">
                جوهر التجربة
              </p>
              <div className="mt-2 h-px w-24 bg-gradient-to-l from-[#00c8b8] via-white/70 to-transparent" />
              <h3 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                حيث الفخامة
                <br />
                <span className="text-[#00c8b8]">تلتقي بالاستثمار</span>
              </h3>
            </div>
          }
          content={
            <div className="pt-12">
              <MetricGrid className="anim-item" data-anim="up">
                <MetricCard
                  value="+500"
                  label="وحدة مُدارة"
                  note="تشغيل يومي بمعايير ثابتة"
                />
                <MetricCard
                  value="15+"
                  label="سنة خبرة"
                  note="فهم عميق للسوق المحلي"
                />
                <MetricCard
                  value="98%"
                  label="رضا العملاء"
                  note="تجربة تعكس جودة العلامة"
                />
              </MetricGrid>
            </div>
          }
        />
      ),
    },
    {
      start: 3.5,
      end: 6.8,
      fadeIn: 1.2,
      content: (
        <SegmentFrame
          header={
            <div
              className="anim-item ml-auto w-full max-w-[38rem] text-right"
              data-anim="down"
            >
              <p className="text-xs tracking-widest text-[#00c8b8]/85">
                منظومة واحدة
              </p>
              <div className="mt-2 h-px w-24 bg-gradient-to-l from-[#00c8b8] via-white/70 to-transparent" />
              <h3 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                إدارة متكاملة
                <br />
                <span className="text-[#00c8b8]">بمعايير خمس نجوم</span>
              </h3>
            </div>
          }
          content={
            <div className="pt-12">
              <ServiceGrid className="anim-item" data-anim="up">
                <ServiceCard
                  title="الشقق الفندقية"
                  note="إقامة فاخرة بتشغيل يومي منضبط"
                  icon={
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  }
                />
                <ServiceCard
                  title="إدارة العقارات"
                  note="تشغيل سلس يرفع جودة الأصل"
                  icon={
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  }
                />
                <ServiceCard
                  title="التطوير العقاري"
                  note="مشاريع نوعية بهوية واضحة"
                  icon={
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  }
                />
                <ServiceCard
                  title="فرص الاستثمار"
                  note="حلول منتقاة بعائد أقوى"
                  accent
                  icon={
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0a9 9 0 0118 0z"
                      />
                    </svg>
                  }
                />
              </ServiceGrid>
            </div>
          }
        />
      ),
    },
    {
      start: 6.8,
      end: 10.5,
      fadeIn: 1.2,
      content: (
        <SegmentFrame
          header={
            <div
              className="anim-item ml-auto w-full max-w-[38rem] text-right"
              data-anim="down"
            >
              <p className="text-xs tracking-widest text-[#00c8b8]/85">
                رؤية استثمارية
              </p>
              <div className="mt-2 h-px w-24 bg-gradient-to-l from-[#00c8b8] via-white/70 to-transparent" />
              <h3 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                استثمر بثقة
                <br />
                <span className="text-[#00c8b8]">في أرقى العناوين</span>
              </h3>
            </div>
          }
          content={
            <div className="pt-12">
              <MetricGrid className="anim-item" data-anim="up">
                <MetricCard
                  value="12%"
                  label="متوسط العائد"
                  note="أداء مدعوم بإدارة تشغيلية دقيقة"
                />
                <MetricCard
                  value="B2$"
                  label="أصول تحت الإدارة"
                  note="محافظ في مواقع عالية القيمة"
                />
              </MetricGrid>
            </div>
          }
        />
      ),
    },
  ];

  return (
    <>
      <Preloader isVideoLoaded={videoLoaded} onComplete={() => setAppLoaded(true)} />
      <VideoScrollContext.Provider value={{ isVideoPinned }}>
      <main className="relative min-h-screen bg-black" dir="rtl">
        <StaggeredMenu
          position="right"
          logoUrl={logoArText}
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={false}
          menuButtonColor="#ffffffff"
          openMenuButtonColor="#008887"
          changeMenuColorOnOpen={true}
          colors={["#0C5258", "#008887"]}
          accentColor="#008887"
          isFixed={true}
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
        />

        <ScrollExpandMedia
          mediaSrc={muhayaVideo}
          title=""
          date=""
          scrollToExpand=""
          segments={segments}
          expandDistance={1}
          scrubDistance={3}
          freezeChildrenWhilePinned={true}
          onPinChange={setIsVideoPinned}
          onVideoLoad={() => setVideoLoaded(true)}
          bgElement={
            <>
              <Plasma
                color="#0C5258"
                speed={1}
                direction="forward"
                scale={1}
                opacity={1}
                mouseInteractive={false}
                renderScale={0.45}
                maxDpr={1}
                targetFps={40}
                iterations={36}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 opacity-40">
                <ScrollVelocity
                  texts={[
                    "مجموعة المحياء لإدارة المرافق • مجموعة المٌحيا لإدارة المرافق • ",
                    "MUHAYA GROUP FACILITIES MANAGEMENT • MUHAYA GROUP FACILITIES MANAGEMENT • ",
                  ]}
                  velocity={28}
                  className="text-[#0C5258] custom-scroll-text"
                  numCopies={6}
                  damping={40}
                  stiffness={260}
                />
              </div>
            </>
          }
        ></ScrollExpandMedia>
        <div className="flex flex-col relative w-full z-20">
          <AboutSection />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
          <footer className="relative z-20 border-t border-white/10 bg-[#030606]/95 px-6 py-8 text-center text-sm text-white/60 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p>© 2026 مجموعة المٌحيا. جميع الحقوق محفوظة.</p>
              <div className="flex items-center justify-center gap-4 md:justify-end">
                <a href="#" className="transition hover:text-[#00c8b8]">
                  الرئيسية
                </a>
                <a href="#about" className="transition hover:text-[#00c8b8]">
                  عن المٌحيا
                </a>
                <a href="#services" className="transition hover:text-[#00c8b8]">
                  الخدمات
                </a>
                <a
                  href="#testimonials"
                  className="transition hover:text-[#00c8b8]"
                >
                  آراء العملاء
                </a>
                <a href="#contact" className="transition hover:text-[#00c8b8]">
                  تواصل معنا
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </VideoScrollContext.Provider>
    </>
  );
}

export default App;
