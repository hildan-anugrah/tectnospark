import React from 'react';
import { useTranslation } from 'react-i18next';
import { logoImg, technosparkLogo } from '../../utils/images';

export default function Slide11() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col justify-between" id="slide-11-content">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 pb-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <img src={logoImg} alt="Horizon University" className="h-6 w-6 sm:h-8 sm:w-8 object-contain shrink-0" />
            <span className="text-[8.5px] sm:text-[10px] md:text-xs font-extrabold text-slate-700 uppercase tracking-wider sm:tracking-widest font-mono leading-normal">
              {t('slide11.closingDept')}
            </span>
          </div>
          <img src={technosparkLogo} alt="Technospark" className="h-6 sm:h-10 md:h-12 object-contain drop-shadow-sm shrink-0" />
        </div>
        <div className="w-full border-b-2 border-slate-900 mb-2 sm:mb-4"></div>
      </div>

      {/* Main Closing Hero Banner */}
      <div className="flex-1 flex flex-col justify-center items-center text-center py-2 sm:py-4">
        <span className="inline-flex items-center justify-center bg-red-100 border border-slate-900 text-horizon-700 text-[8px] sm:text-xs font-black px-3 py-1 rounded-full uppercase leading-none mb-2 sm:mb-3 shadow-neo-sm">
          {t('slide11.badge')}
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none mb-2 sm:mb-3">
          {t('slide11.mainHeading')}
        </h1>

        <p className="text-[10px] sm:text-sm md:text-base text-slate-600 font-semibold max-w-2xl leading-relaxed mb-4 sm:mb-6">
          {t('slide11.tagline')}
        </p>

        {/* 3 Summary Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-5 w-full text-left">
          {/* Card 1: HorizonU Uniform */}
          <div className="bg-neo-bg border-2 border-slate-900 rounded-xl p-3 sm:p-4 shadow-neo flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-horizon-700 text-white border-2 border-slate-900 flex items-center justify-center font-bold text-xs mb-2 shadow-neo-sm">
                <i className="fa-solid fa-cube"></i>
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1 leading-snug">
                {t('slide11.box1Title')}
              </h3>
              <p
                className="text-[8.5px] sm:text-[10.5px] md:text-xs text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('slide11.box1Desc') }}
              />
            </div>
          </div>

          {/* Card 2: Team Nirwana */}
          <div className="bg-white border-2 border-slate-900 rounded-xl p-3 sm:p-4 shadow-neo flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-900 text-white border-2 border-slate-900 flex items-center justify-center font-bold text-xs mb-2 shadow-neo-sm">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1 leading-snug">
                {t('slide11.box2Title')}
              </h3>
              <p
                className="text-[8.5px] sm:text-[10.5px] md:text-xs text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('slide11.box2Desc') }}
              />
            </div>
          </div>

          {/* Card 3: Measured Impact */}
          <div className="bg-red-50 border-2 border-slate-900 rounded-xl p-3 sm:p-4 shadow-neo flex flex-col justify-between">
            <div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600 text-white border-2 border-slate-900 flex items-center justify-center font-bold text-xs mb-2 shadow-neo-sm">
                <i className="fa-solid fa-award"></i>
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1 leading-snug">
                {t('slide11.box3Title')}
              </h3>
              <p
                className="text-[8.5px] sm:text-[10.5px] md:text-xs text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('slide11.box3Desc') }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="border-t border-slate-300 pt-2 flex items-center justify-between text-[8px] sm:text-[10px] font-mono text-slate-500">
        <span>HorizonU Uniform • Nirwana Development Team</span>
        <span>{t('slide11.closingTech')}</span>
      </div>
    </div>
  );
}
