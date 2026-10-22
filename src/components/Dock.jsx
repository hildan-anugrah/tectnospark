import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Dock({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  isPrompterOpen,
  onTogglePrompter,
  isFullscreen,
  onToggleFullscreen,
  currentLanguage,
  onToggleLanguage,
  isExporting,
  exportProgress,
  onDownloadPptx
}) {
  const { t } = useTranslation();

  // Format timer seconds to MM:SS
  const formatTimer = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <footer className="bg-white border-t-2 border-slate-900 px-3 py-2 md:px-6 md:h-14 flex items-center justify-between shrink-0 z-20 gap-2">
      {/* Left items (Desktop: full title & timer; Mobile: compact badge & timer) */}
      <div className="flex items-center gap-2 md:gap-3 text-xs text-slate-700 shrink-0">
        <span className="bg-horizon-700 text-white text-[9px] md:text-[10px] font-extrabold tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 rounded border-2 border-slate-900 shadow-neo-sm uppercase">
          {t('common.technosparkBadge')}
        </span>
        <span className="hidden lg:inline text-xs">
          <strong className="text-slate-900">{t('common.appTitle')}</strong> • <span className="text-slate-600">{t('common.appSubtitle')}</span>
        </span>
        <div className="bg-amber-100 border-2 border-slate-900 px-2 py-0.5 rounded-md font-mono text-[11px] md:text-xs font-bold text-slate-900 shadow-neo-sm flex items-center gap-1.5 md:gap-2">
          <i className="fa-regular fa-clock text-horizon-700"></i>
          <span>{formatTimer(timerSeconds)}</span>
          <button onClick={onToggleTimer} className="text-slate-700 hover:text-slate-900 font-bold transition p-0.5" title="Play/Pause">
            <i className={`fa-solid ${isTimerRunning ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          <button onClick={onResetTimer} className="text-slate-500 hover:text-slate-900 transition p-0.5" title="Reset">
            <i className="fa-solid fa-rotate-left"></i>
          </button>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
        {/* Language Switch */}
        <button
          onClick={onToggleLanguage}
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-1 md:px-2.5 rounded-lg text-xs font-extrabold flex items-center gap-1 border-2 border-slate-900 shadow-neo-sm transition"
          title="Switch Language (ID / EN)"
        >
          <i className="fa-solid fa-globe text-horizon-700 text-xs"></i>
          <span>{currentLanguage.toUpperCase()}</span>
        </button>

        {/* Teleprompter Toggle */}
        <button
          onClick={onTogglePrompter}
          className={`${
            isPrompterOpen ? 'bg-red-100 border-horizon-700 text-horizon-700' : 'bg-slate-100 text-slate-800'
          } hover:bg-slate-200 px-2 py-1 md:px-2.5 rounded-lg text-xs font-bold flex items-center gap-1 border-2 border-slate-900 shadow-neo-sm transition`}
          title="Toggle Naskah Baca (T)"
        >
          <i className="fa-solid fa-microphone text-xs"></i>
          <span className="hidden sm:inline">{t('common.prompter')}</span>
        </button>

        {/* Download PPTX Button */}
        <button
          onClick={onDownloadPptx}
          disabled={isExporting}
          className="bg-horizon-700 hover:bg-horizon-800 text-white px-2.5 py-1 md:px-3.5 rounded-lg text-xs font-black flex items-center gap-1 md:gap-1.5 border-2 border-slate-900 shadow-neo-sm transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          title="Konversi & Unduh PPTX (100% Identik dari CSS)"
        >
          {isExporting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin text-xs"></i>
              <span className="hidden md:inline">{exportProgress || 'Generating...'}</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-download text-xs"></i>
              <span className="hidden sm:inline">{t('common.downloadPptx')}</span>
            </>
          )}
        </button>

        {/* Slide navigation buttons */}
        <div className="flex items-center gap-0.5 md:gap-1 shrink-0">
          <button
            onClick={onPrev}
            disabled={currentSlide === 1}
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 shadow-neo-sm flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
            title="Slide Sebelumnya (Panah Kiri / Geser Kanan)"
          >
            <i className="fa-solid fa-chevron-left text-[11px] md:text-xs"></i>
          </button>
          <span className="font-mono text-[11px] md:text-xs font-bold px-1.5 md:px-2 text-slate-800">
            {currentSlide}/{totalSlides}
          </span>
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides}
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 shadow-neo-sm flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed"
            title="Slide Berikutnya (Panah Kanan / Geser Kiri)"
          >
            <i className="fa-solid fa-chevron-right text-[11px] md:text-xs"></i>
          </button>
        </div>

        {/* Fullscreen Toggle (Hidden on mobile phones as requestFullscreen is often restricted or unnecessary) */}
        <button
          onClick={onToggleFullscreen}
          className="hidden md:flex w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-900 shadow-neo-sm items-center justify-center transition shrink-0"
          title="Mode Layar Penuh (F)"
        >
          <i className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-xs`}></i>
        </button>
      </div>
    </footer>
  );
}
