import { createContext, useContext } from 'react';

/**
 * VideoScrollContext
 *
 * isVideoPinned: true  → الفيديو في مرحلة expand أو scrub — أوقف جميع الأنيميشنات الثقيلة
 * isVideoPinned: false → الحالة الأولية قبل بدء التفاعل
 */
export const VideoScrollContext = createContext({
  isVideoPinned: false,
});

export const useVideoScroll = () => useContext(VideoScrollContext);
