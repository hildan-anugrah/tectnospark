import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import SlideStage from './components/SlideStage';
import Dock from './components/Dock';
import Prompter from './components/Prompter';
import { exportToPptx } from './utils/pptxExport';

// Import all slides for export container
import Slide1 from './components/slides/Slide1';
import Slide2 from './components/slides/Slide2';
import Slide3 from './components/slides/Slide3';
import Slide4 from './components/slides/Slide4';
import Slide5 from './components/slides/Slide5';
import Slide6 from './components/slides/Slide6';
import Slide7 from './components/slides/Slide7';
import Slide8 from './components/slides/Slide8';
import Slide9 from './components/slides/Slide9';

const TOTAL_SLIDES = 9;

export default function App() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isPrompterOpen, setIsPrompterOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState('');
  const [currentLang, setCurrentLang] = useState(i18n.language || 'id');

  // English i18n clone for PPTX export
  const enI18nRef = useRef(null);
  if (!enI18nRef.current) {
    enI18nRef.current = i18n.cloneInstance({ lng: 'en' });
  }

  // Handle URL route changes (/en, /id)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const targetLang = path.startsWith('/en') ? 'en' : 'id';
      if (i18n.language !== targetLang) {
        i18n.changeLanguage(targetLang);
        setCurrentLang(targetLang);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 1));
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setIsPrompterOpen((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch Swipe Navigation for Mobile
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Detect horizontal swipe
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        // Swipe Left -> Next Slide
        setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES));
      } else {
        // Swipe Right -> Prev Slide
        setCurrentSlide((prev) => Math.max(prev - 1, 1));
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        const viewport = document.getElementById('presentation-viewport');
        if (viewport && viewport.requestFullscreen) {
          await viewport.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Fullscreen error:', err);
    }
  };

  const toggleLanguage = () => {
    const nextLang = currentLang === 'id' ? 'en' : 'id';
    i18n.changeLanguage(nextLang);
    setCurrentLang(nextLang);
    window.history.pushState(null, '', '/' + nextLang);
  };

  const handleDownloadPptx = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress('Starting PPTX conversion...');
    try {
      await exportToPptx(setExportProgress);
    } catch (err) {
      alert('Error generating PPTX presentation: ' + err.message);
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  return (
    <div className="bg-[#F3F4F6] text-slate-900 font-sans h-screen w-screen overflow-hidden flex flex-col select-none">
      {/* Main Presentation Viewport */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-3 md:p-4 overflow-hidden relative">
        <SlideStage
          currentSlide={currentSlide}
          isFullscreen={isFullscreen}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Prompter Drawer inside Stage for Fullscreen & Mobile visibility */}
          <Prompter
            isOpen={isPrompterOpen}
            onClose={() => setIsPrompterOpen(false)}
            currentSlide={currentSlide}
            totalSlides={TOTAL_SLIDES}
          />
        </SlideStage>
      </main>

      {/* Bottom Dock Toolbar */}
      {!isFullscreen && (
        <Dock
          currentSlide={currentSlide}
          totalSlides={TOTAL_SLIDES}
          onPrev={() => setCurrentSlide((prev) => Math.max(prev - 1, 1))}
          onNext={() => setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES))}
          timerSeconds={timerSeconds}
          isTimerRunning={isTimerRunning}
          onToggleTimer={() => setIsTimerRunning((prev) => !prev)}
          onResetTimer={() => {
            setIsTimerRunning(false);
            setTimerSeconds(0);
          }}
          isPrompterOpen={isPrompterOpen}
          onTogglePrompter={() => setIsPrompterOpen((prev) => !prev)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          currentLanguage={currentLang}
          onToggleLanguage={toggleLanguage}
          isExporting={isExporting}
          exportProgress={exportProgress}
          onDownloadPptx={handleDownloadPptx}
        />
      )}

      {/* Hidden English Export Container for 100% Pixel-Perfect PPTX Generation */}
      <div
        id="export-stage-container"
        style={{
          position: 'fixed',
          top: '-99999px',
          left: '-99999px',
          width: '1440px',
          height: '810px',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: -1
        }}
      >
        <I18nextProvider i18n={enI18nRef.current}>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide1 />
          </div>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide2 />
          </div>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide3 />
          </div>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide4 />
          </div>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide5 />
          </div>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide6 />
          </div>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide7 />
          </div>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide8 />
          </div>
          <div className="export-slide-panel w-[1440px] h-[810px] bg-white rounded-2xl border-2 border-slate-900 shadow-neo-lg flex flex-col justify-between p-8" style={{ display: 'none' }}>
            <Slide9 />
          </div>
        </I18nextProvider>
      </div>
    </div>
  );
}
