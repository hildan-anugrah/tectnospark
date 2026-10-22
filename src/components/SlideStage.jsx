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

export default function SlideStage({ currentSlide, isFullscreen, children }) {
  const [scale, setScale] = useState(1);
  const viewportRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const stageW = 1440;
      const stageH = 810;

      let availW = window.innerWidth;
      let availH = window.innerHeight;

      if (!document.fullscreenElement) {
        // Dock footer is 56px (h-14) + padding 32px
        availW = window.innerWidth - 32;
        availH = window.innerHeight - 88;
      }

      const sX = availW / stageW;
      const sY = availH / stageH;
      const newScale = Math.min(sX, sY, 1.25); // Cap scale at 1.25x for extreme ultrawides
      setScale(Math.max(0.2, newScale));
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
      className="w-full h-full flex items-center justify-center overflow-hidden relative"
    >
      <div
        id="slide-stage"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
        className={`w-[1440px] h-[810px] shrink-0 bg-white ${
          isFullscreen
            ? 'rounded-none border-none shadow-none'
            : 'rounded-2xl border-2 border-slate-900 shadow-neo-lg'
        } flex flex-col justify-between p-8 relative overflow-hidden transition-all duration-150`}
      >
        {renderActiveSlide()}
        {children}
      </div>
    </div>
  );
}
