import React from 'react';
import { useTranslation } from 'react-i18next';
import { logoImg, technosparkLogo } from '../../utils/images';

export default function Slide1() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col justify-between" id="slide-1-content">
      {/* Hero Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3 gap-2">
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden">
          <img src={logoImg} alt="Horizon University" className="h-7 w-7 sm:h-8 sm:w-8 object-contain shrink-0" />
          <span className="text-[10px] sm:text-xs font-extrabold text-slate-700 uppercase tracking-wider sm:tracking-widest font-mono truncate">
            {t('slide1.headerDept')}
          </span>
        </div>
        <img src={technosparkLogo} alt="Technospark" className="h-8 sm:h-11 md:h-12 object-contain drop-shadow-sm shrink-0" />
      </div>

      {/* Big Landing Page Title Banner */}
      <div className="my-auto py-2 sm:py-4">
        <div className="max-w-4xl">
          <span className="text-horizon-700 font-extrabold text-xs sm:text-sm uppercase tracking-wider block mb-1">
            {t('slide1.eyebrow')}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-2 sm:mb-3">
            HORIZONU <span className="text-horizon-700 underline decoration-4 underline-offset-4">UNIFORM</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
            {t('slide1.desc')}
          </p>
        </div>

        {/* Hero Bento Grid (Neo-Brutalism Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-6">
          {/* Box 1: Kasus & Objek */}
          <div className="bg-neo-bg border-2 border-slate-900 rounded-xl p-4 sm:p-5 shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-horizon-700 text-white border-2 border-slate-900 flex items-center justify-center font-bold text-xs sm:text-sm mb-2.5 sm:mb-3 shadow-neo-sm">
              <i className="fa-solid fa-school"></i>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1 sm:mb-1.5">
              {t('slide1.box1.title')}
            </h3>
            <p
              className="text-xs text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('slide1.box1.desc') }}
            />
          </div>

          {/* Box 2: Akar Masalah */}
          <div className="bg-red-50 border-2 border-slate-900 rounded-xl p-4 sm:p-5 shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-600 text-white border-2 border-slate-900 flex items-center justify-center font-bold text-xs sm:text-sm mb-2.5 sm:mb-3 shadow-neo-sm">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1 sm:mb-1.5">
              {t('slide1.box2.title')}
            </h3>
            <p
              className="text-xs text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('slide1.box2.desc') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
