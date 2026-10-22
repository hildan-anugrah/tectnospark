import React, { useState, useEffect, useRef } from 'react';
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';

export default function SlideStage({
  currentSlide,
  isFullscreen,
  onTouchStart,
  onTouchEnd,
  children
}) {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const viewportRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Mobile portrait detection (width under 768px and taller than wide)
      const mobileMode = w < 768 && h > w;
      setIsMobile(mobileMode);

      if (mobileMode) {
        setScale(1);
        return;
      }

      // Widescreen 16:9 stage scaling for tablet, desktop, or landscape mobile
      const stageW = 1440;
      const stageH = 810;

      let availW = w;
      let availH = h;

      if (!document.fullscreenElement) {
        // Dock footer is 56px + padding 32px
        availW = w - 32;
        availH = h - 88;
      }

      const sX = availW / stageW;
      const sY = availH / stageH;
      const newScale = Math.min(sX, sY, 1.25); // Cap scale at 1.25x for extreme ultrawides
      setScale(Math.max(0.3, newScale));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    document.addEventListener('fullscreenchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('fullscreenchange', handleResize);
    };
  }, [isFullscreen]);

  const renderActiveSlide = () => {
    switch (currentSlide) {
      case 1: return <Slide1 />;
      case 2: return <Slide2 />;
      case 3: return <Slide3 />;
      case 4: return <Slide4 />;
      case 5: return <Slide5 />;
      case 6: return <Slide6 />;
      case 7: return <Slide7 />;
      case 8: return <Slide8 />;
      case 9: return <Slide9 />;
      default: return <Slide1 />;
    }
  };

  return (
    <div
      ref={viewportRef}
      id="presentation-viewport"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="w-full h-full flex items-center justify-center overflow-hidden relative"
    >
      <div
        id="slide-stage"
        style={
          isMobile
            ? { width: '100%', height: '100%' }
            : {
                width: '1440px',
                height: '810px',
                transform: `scale(${scale})`,
                transformOrigin: 'center center'
              }
        }
        className={`${
          isMobile
            ? 'w-full h-full max-w-full rounded-xl border-2 border-slate-900 shadow-neo p-4 overflow-y-auto'
            : isFullscreen
            ? 'w-[1440px] h-[810px] shrink-0 bg-white rounded-none border-none shadow-none p-8 overflow-hidden'
            : 'w-[1440px] h-[810px] shrink-0 bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg p-8 overflow-hidden'
        } bg-white flex flex-col justify-between relative transition-all duration-150`}
      >
        {renderActiveSlide()}
        {children}
      </div>
    </div>
  );
}
