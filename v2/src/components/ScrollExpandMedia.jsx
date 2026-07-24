import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const getAnimState = (element) => {
  const mode = element.dataset.anim || 'up';

  if (mode === 'left') {
    return {
      from: { opacity: 0, x: -40, y: 18 },
      to: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: -18, y: -14 },
    };
  }

  if (mode === 'right') {
    return {
      from: { opacity: 0, x: 40, y: 18 },
      to: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 18, y: -14 },
    };
  }

  if (mode === 'down') {
    return {
      from: { opacity: 0, x: 0, y: -34 },
      to: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, x: 0, y: -16 },
    };
  }

  return {
    from: { opacity: 0, x: 0, y: 28 },
    to: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -16 },
  };
};

/**
 * @typedef {{ start: number, end: number, content: import('react').ReactNode }} ScrubSegment
 */

/**
 * ScrollExpandMedia
 *
 * Phase 1 – Scroll to expand video from 300×400 to full screen.
 * Phase 2 – Scroll to scrub the video (currentTime).
 * Phase 3 – children appear below the pin after the video ends.
 */
const ScrollExpandMedia = ({
  mediaSrc,
  posterSrc,
  bgImageSrc,
  bgElement,
  title,
  date,
  scrollToExpand,
  textBlend,
  segments = [],
  expandDistance = 1,   // in viewport heights
  scrubDistance,        // in viewport heights (auto if omitted)
  children,
  freezeChildrenWhilePinned = true,
  onPinChange,          // (pinned: boolean) => void
  onVideoLoad,
}) => {
  /* ── refs ─────────────────────────────────────────────────────────────── */
  const sectionRef          = useRef(null);
  const pinRef              = useRef(null);
  const videoRef            = useRef(null);
  const mediaBoxRef         = useRef(null);
  const bgRef               = useRef(null);
  const bgElementWrapperRef = useRef(null);
  const overlayRef          = useRef(null);
  const titleLeftRef        = useRef(null);
  const titleRightRef       = useRef(null);
  const dateRef             = useRef(null);
  const hintRef             = useRef(null);
  const childrenRef         = useRef(null);
  const segmentRefs         = useRef([]);
  const segmentWrapperRef   = useRef(null);   // hides ALL segments during Phase 1
  const gsapCtx             = useRef(null);

  const firstWord   = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  /* ── GSAP setup ────────────────────────────────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const buildTimeline = (duration) => {
      gsapCtx.current?.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());

      gsapCtx.current = gsap.context(() => {
        const isMobile   = window.innerWidth < 768;
        const scrubVh    = scrubDistance ?? Math.max(1.5, duration * 0.35);
        const totalVh    = expandDistance + scrubVh;
        const expandFrac = expandDistance / totalVh;

        /* ── initial position: centre the 300×400 box in pixels ────────── */
        const initLeft = (window.innerWidth  - 300) / 2;
        const initTop  = (window.innerHeight - 400) / 2;

        gsap.set(mediaBoxRef.current, {
          position: 'absolute',
          left: initLeft,
          top:  initTop,
          width:  300,
          height: 400,
          borderRadius: 16,
          willChange: 'transform, width, height, left, top, border-radius',
        });

        if (childrenRef.current && freezeChildrenWhilePinned) {
          gsap.set(childrenRef.current, {
            opacity: 0,
            y: 40,
            visibility: 'hidden',
            pointerEvents: 'none',
            willChange: 'opacity, transform',
          });
        }

        /* start video in grayscale */
        if (videoRef.current)
          gsap.set(videoRef.current, { filter: 'grayscale(1) brightness(0.85)' });

        /* ── pinned master timeline ─────────────────────────────────────── */
        let _wasPinned = false;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * totalVh}`,
            pin: pinRef.current,
            pinSpacing: false,
            scrub: 0.4,
            anticipatePin: 1,
            onUpdate: (self) => {
              // إيقاف الأنيميشنات فقط بعد اكتمال Phase 1 (expand) وبدء scrub الفيديو
              const shouldStop = self.progress > expandFrac + 0.02;
              if (shouldStop !== _wasPinned) {
                _wasPinned = shouldStop;
                onPinChange?.(shouldStop);
              }
            },
          },
        });

        /* Phase 1 – expand to full screen */
        tl.to(mediaBoxRef.current, {
          left:         0,
          top:          0,
          width:        window.innerWidth,
          height:       window.innerHeight,
          borderRadius: 0,
          boxShadow:    'none',
          ease:         'none',
          duration:     expandFrac,
        }, 0);

        /* fade out bg */
        if (bgRef.current) {
          tl.to(bgRef.current, { opacity: 0, ease: 'none', duration: expandFrac }, 0);
          tl.set(bgRef.current, { display: 'none' }, expandFrac);
        }

        /* fade out and hide bg element (stops WebGL animations to prevent lag) */
        if (bgElementWrapperRef.current) {
          tl.to(bgElementWrapperRef.current, { opacity: 0, ease: 'none', duration: expandFrac }, 0);
          tl.set(bgElementWrapperRef.current, { display: 'none' }, expandFrac);
        }

        /* desaturate → full colour as video expands */
        if (videoRef.current)
          tl.to(videoRef.current,
            { filter: 'grayscale(0) brightness(1)', ease: 'none', duration: expandFrac }, 0);

        /* fade overlay */
        if (overlayRef.current)
          tl.to(overlayRef.current,
            { opacity: 0.1, ease: 'none', duration: expandFrac }, 0);

        /* slide + fade title words apart */
        const drift = isMobile ? 40 : 30;
        if (titleLeftRef.current)
          tl.to(titleLeftRef.current,
            { xPercent: -drift, ease: 'none', duration: expandFrac }, 0);
        if (titleRightRef.current)
          tl.to(titleRightRef.current,
            { xPercent:  drift, ease: 'none', duration: expandFrac }, 0);
        if (dateRef.current)
          tl.to(dateRef.current,
            { xPercent: -drift, opacity: 0, ease: 'none', duration: expandFrac }, 0);
        if (hintRef.current)
          tl.to(hintRef.current,
            { xPercent:  drift, opacity: 0, ease: 'none', duration: expandFrac }, 0);

        const fadeTargets = [titleLeftRef.current, titleRightRef.current].filter(
          (el) => el !== null,
        );
        if (fadeTargets.length) {
          tl.to(
            fadeTargets,
            { opacity: 0, ease: 'none', duration: expandFrac * 0.35 },
            expandFrac * 0.65,
          );
        }

        /* Phase 2 – scrub video */
        const proxy = { t: 0 };
        const scrubDuration = 1 - expandFrac;

        tl.to(proxy, {
          t: 1,
          ease: 'none',
          duration: scrubDuration,
          onUpdate() {
            const v = videoRef.current;
            if (!v?.duration) return;
            const target = proxy.t * v.duration; // current video time in seconds
            if (Math.abs(v.currentTime - target) > 0.04) v.currentTime = target;
          },
        }, expandFrac);

        /* Add segment animations to the timeline */
        const vDur = videoRef.current?.duration || 10;
        
        segmentRefs.current.forEach((el, i) => {
          if (!el) return;
          const s = segments[i];
          const dur = s.end === 9999 ? vDur : Math.min(s.end, vDur);
          
          if (s.start >= vDur) return; // Completely out of bounds
          
          const tStart = expandFrac + (s.start / vDur) * scrubDuration;
          const tEnd   = expandFrac + (dur / vDur) * scrubDuration;
          
          const fadeInDur = ((s.fadeIn ?? 0.4) / vDur) * scrubDuration;
          const fadeOutDur = ((s.fadeOut ?? 0.4) / vDur) * scrubDuration;

          const animItems = el.querySelectorAll('.anim-item');
          const counterItems = el.querySelectorAll('[data-counter]');

          // Initialize states
          gsap.set(el, { opacity: 0, pointerEvents: 'none' });
          if (animItems.length > 0) {
            animItems.forEach(item => {
              gsap.set(item, getAnimState(item).from);
            });
          }
          counterItems.forEach(item => {
            const targetVal = item.dataset.counter;
            const numStr = String(targetVal).replace(/[^0-9]/g, '');
            const suffix = String(targetVal).replace(/[0-9]/g, '');
            gsap.set(item, { innerText: '0' + suffix });
          });

          // Fade In Segment wrapper immediately when it's time
          tl.to(el, { opacity: 1, pointerEvents: 'auto', duration: 0.01 }, tStart);
          
          // Animate Items (staggered)
          if (animItems.length > 0) {
            const step = animItems.length > 1 ? Math.min(0.12, fadeInDur / (animItems.length + 1)) : 0;
            const itemDuration = Math.max(0.38, fadeInDur - step * Math.max(animItems.length - 1, 0));

            animItems.forEach((item, index) => {
              tl.to(item, {
                ...getAnimState(item).to,
                duration: itemDuration,
                ease: 'power3.out',
              }, tStart + index * step);
            });
          } else {
             tl.to(el, { opacity: 1, duration: fadeInDur, ease: 'power2.out' }, tStart);
          }

          // Animate counters
          counterItems.forEach(item => {
            const targetVal = item.dataset.counter;
            const numStr = String(targetVal).replace(/[^0-9]/g, '');
            const suffix = String(targetVal).replace(/[0-9]/g, '');
            const num = Number(numStr);
            const obj = { val: 0 };
            
            tl.to(obj, {
              val: num,
              duration: Math.min(1.5, fadeInDur * 0.8),
              ease: 'power2.out',
              onUpdate: () => {
                item.innerText = Math.round(obj.val) + suffix;
              }
            }, tStart);
          });

          // Fade OUT
          if (dur < vDur) {
            // Fade out the wrapper
            tl.to(el, { opacity: 0, pointerEvents: 'none', duration: fadeOutDur, ease: 'power2.inOut' }, tEnd - fadeOutDur);
            // reset anim items
            if (animItems.length > 0) {
              animItems.forEach((item, index) => {
                tl.to(item, {
                  ...getAnimState(item).exit,
                  duration: fadeOutDur,
                  ease: 'power2.in',
                }, tEnd - fadeOutDur + index * 0.02);
              });
            }
          }
        });

        /* Show segment wrapper only after Phase 1 completes */
        if (segmentWrapperRef.current) {
          gsap.set(segmentWrapperRef.current, { opacity: 0, pointerEvents: 'none' });
          tl.to(segmentWrapperRef.current,
            { opacity: 1, pointerEvents: 'auto', ease: 'none', duration: 0.01 },
            expandFrac
          );
          /* hide again if scrolled back into Phase 1 */
          tl.to(segmentWrapperRef.current,
            { opacity: 0, pointerEvents: 'none', ease: 'none', duration: 0.01 },
            0
          );
        }

        /* Phase 3 – children reveal */
        if (childrenRef.current) {
          gsap.fromTo(childrenRef.current,
            { opacity: 0, y: 40, visibility: 'hidden', pointerEvents: 'none' },
            {
              opacity: 1,
              y: 0,
              visibility: 'visible',
              pointerEvents: 'auto',
              ease: 'power2.out',
              duration: 0.6,
              scrollTrigger: {
                trigger: childrenRef.current,
                start: 'top 85%',
                once: true,
              },
            });
        }
      }, sectionRef);
    };

    /* build once duration is known */
    const onMeta = () => buildTimeline(video.duration || 10);

    if (video.readyState >= 1 && isFinite(video.duration)) {
      onMeta();
    } else {
      video.addEventListener('loadedmetadata', onMeta);
    }

    return () => {
      video.removeEventListener('loadedmetadata', onMeta);
      gsapCtx.current?.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandDistance, scrubDistance]);

  /* ── render ─────────────────────────────────────────────────────────────── */
  return (
    <div ref={sectionRef} className="relative w-full bg-black">

      {/* ── Pinned viewport ───────────────────────────────────────────────── */}
      <div
        ref={pinRef}
        className="sticky top-0 w-full overflow-hidden bg-black will-change-transform"
        style={{ height: '100dvh', contain: 'layout paint size' }}
      >
        {/* background image */}
        {bgImageSrc && (
          <div ref={bgRef} className="absolute inset-0 z-0">
            <img
              src={bgImageSrc}
              alt=""
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        )}

        {/* custom background element (e.g. LightRays) */}
        {bgElement && (
          <div ref={bgElementWrapperRef} className="absolute inset-0 z-[1] pointer-events-none">
            {bgElement}
          </div>
        )}

        {/* ── media box (positioned & sized entirely by GSAP) ────────────── */}
        <div className="absolute inset-0 z-10">
          <div
            ref={mediaBoxRef}
            className="overflow-hidden"
            style={{
              position: 'absolute',
              width:  300,
              height: 400,
              /* centred by gsap.set once mounted */
              borderRadius: 16,
              boxShadow: '0 0 50px rgba(0,0,0,0.35)',
              willChange: 'transform, width, height, left, top, border-radius',
            }}
          >
            <video
              ref={videoRef}
              src={mediaSrc}
              poster={posterSrc}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className="w-full h-full object-cover"
              onCanPlayThrough={() => {
                if (onVideoLoad) onVideoLoad();
              }}
            />

            {/* dark overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 bg-black/50 pointer-events-none"
            />

            {/* segment overlays — opacity driven by scroll scrub */}
            <div
              ref={segmentWrapperRef}
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: 0 }}
            >
              {segments.map((seg, i) => (
                <div
                  key={i}
                  ref={el => { segmentRefs.current[i] = el; }}
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  style={{ opacity: 0 }}
                >
                  {seg.content}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── title & hints ─────────────────────────────────────────────── */}
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3
            text-center pointer-events-none${textBlend ? ' mix-blend-difference' : ''}`}
        >
          {date && (
            <p ref={dateRef} className="text-2xl text-blue-200">{date}</p>
          )}
          {title && (
            <div className="flex flex-col items-center gap-2">
              <h2
                ref={titleLeftRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-100"
              >
                {firstWord}
              </h2>
              {restOfTitle && (
                <h2
                  ref={titleRightRef}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-100"
                >
                  {restOfTitle}
                </h2>
              )}
            </div>
          )}
          {scrollToExpand && (
            <p ref={hintRef} className="mt-4 text-sm md:text-base text-blue-100/90">
              {scrollToExpand}
            </p>
          )}
        </div>
      </div>

      {/* ── Spacer for video scrub duration ──────────────────────────────── */}
      <div 
        style={{ height: `${(expandDistance + (scrubDistance || 1.5)) * 100}vh` }} 
        className="pointer-events-none relative z-0" 
      />

      {/* ── Children (appear over the pinned video) ──────────────────────── */}
      {children && (
        <div
          ref={childrenRef}
          className="relative z-20 w-full bg-black shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default ScrollExpandMedia;
