import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Prompter({ isOpen, onClose, currentSlide, totalSlides }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const scriptData = t(`speakerScripts.slide${currentSlide}`, { returnObjects: true }) || {};
  const prompterText = scriptData.text || '';
  const duration = scriptData.duration || '01:00';

  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 bg-slate-900 text-white border-t-4 border-horizon-700 shadow-2xl flex flex-col z-50 transition-all duration-300 animate-slide-up">
      <div className="bg-slate-800 px-8 py-2.5 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-red-300 uppercase tracking-wider">
          <i className="fa-solid fa-microphone-lines"></i>
          <span>{t('common.prompterHeader')}</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-300">
          <span className="font-mono font-bold text-white">Slide {currentSlide} / {totalSlides}</span>
          <span>
            {t('common.targetDurationLabel')} <strong className="text-amber-400 font-mono font-bold">{duration}</strong>
          </span>
          <button
            className="text-slate-400 hover:text-white text-base transition"
            onClick={onClose}
            title="Tutup (T)"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-8 py-4 text-[15px] leading-relaxed text-slate-100 font-sans">
        {prompterText ? (
          <p className="whitespace-pre-line">{prompterText}</p>
        ) : (
          <p className="text-slate-400 italic">Tidak ada naskah bacaan untuk slide ini.</p>
        )}
      </div>
    </div>
  );
}
