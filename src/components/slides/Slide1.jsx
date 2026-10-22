import React from 'react';
import { useTranslation } from 'react-i18next';
import { logoImg, technosparkLogo } from '../../utils/images';

export default function Slide1() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col justify-between" id="slide-1-content">
      {/* Hero Header */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <img src={logoImg} alt="Horizon University" className="h-6 w-6 sm:h-8 sm:w-8 object-contain shrink-0" />
            <span className="text-[8.5px] sm:text-[10px] md:text-xs font-extrabold text-slate-700 uppercase tracking-wider sm:tracking-widest font-mono leading-normal">
              {t('slide1.headerDept')}
            </span>
          </div>
          <img src={technosparkLogo} alt="Technospark" className="h-6 sm:h-10 md:h-12 object-contain drop-shadow-sm shrink-0" />
        </div>
        <div className="w-full border-b-2 border-slate-900 mb-2 sm:mb-3"></div>
      </div>

      {/* Landing Page Title Banner */}
      <div className="flex-1 flex flex-col justify-center py-1 sm:py-2">
        <div className="max-w-4xl">
          <span className="text-horizon-700 font-extrabold text-[8.5px] sm:text-xs md:text-sm uppercase tracking-wider block mb-1">
            {t('slide1.eyebrow')}
          </span>
          <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-1 sm:mb-2">
            HORIZONU <span className="text-horizon-700 underline decoration-2 sm:decoration-4 underline-offset-2 sm:underline-offset-4">UNIFORM</span>
          </h1>
          <p className="text-[9.5px] sm:text-xs md:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
            {t('slide1.desc')}
          </p>
        </div>

        {/* 2-Column Bento Grid side-by-side on all screen sizes */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6 mt-3 sm:mt-5">
          {/* Box 1: Kasus & Objek */}
          <div className="bg-neo-bg border-2 border-slate-900 rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-5 shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md sm:rounded-lg bg-horizon-700 text-white border-2 border-slate-900 flex items-center justify-center font-bold text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2.5 shadow-neo-sm">
              <i className="fa-solid fa-school"></i>
            </div>
            <h3 className="text-[10px] sm:text-sm md:text-base font-extrabold text-slate-900 mb-0.5 sm:mb-1.5 leading-snug">
              {t('slide1.box1.title')}
            </h3>
            <p
              className="text-[8.5px] sm:text-[10.5px] md:text-xs text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('slide1.box1.desc') }}
            />
          </div>

          {/* Box 2: Akar Masalah */}
          <div className="bg-red-50 border-2 border-slate-900 rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-5 shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
            <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md sm:rounded-lg bg-red-600 text-white border-2 border-slate-900 flex items-center justify-center font-bold text-[10px] sm:text-xs md:text-sm mb-1.5 sm:mb-2.5 shadow-neo-sm">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 className="text-[10px] sm:text-sm md:text-base font-extrabold text-slate-900 mb-0.5 sm:mb-1.5 leading-snug">
              {t('slide1.box2.title')}
            </h3>
            <p
              className="text-[8.5px] sm:text-[10.5px] md:text-xs text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('slide1.box2.desc') }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
