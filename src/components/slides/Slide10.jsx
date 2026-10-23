import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Slide10() {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: 'fa-database',
      color: 'bg-horizon-700',
      titleKey: 'slide10.p1Title',
      descKey: 'slide10.p1Desc',
      bgClass: 'bg-neo-bg'
    },
    {
      icon: 'fa-boxes-stacked',
      color: 'bg-red-600',
      titleKey: 'slide10.p2Title',
      descKey: 'slide10.p2Desc',
      bgClass: 'bg-red-50'
    },
    {
      icon: 'fa-qrcode',
      color: 'bg-horizon-700',
      titleKey: 'slide10.p3Title',
      descKey: 'slide10.p3Desc',
      bgClass: 'bg-neo-bg'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-between" id="slide-10-content">
      {/* Header */}
      <div>
        <div className="flex items-start gap-2.5 sm:gap-3 pb-2">
          <div className="w-2 sm:w-2.5 h-10 sm:h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
          <div>
            <span className="text-horizon-700 text-[8.5px] sm:text-xs font-black tracking-wider uppercase font-mono block">
              {t('slide10.badge')}
            </span>
            <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {t('slide10.title')}
            </h2>
            <p className="text-[9px] sm:text-xs text-slate-600 font-medium mt-0.5 leading-normal">
              {t('slide10.subtitle')}
            </p>
          </div>
        </div>
        <div className="w-full border-b-2 border-slate-900 mb-2 sm:mb-4"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center gap-3 sm:gap-5">
        {/* Hero Welcoming Card */}
        <div className="bg-white border-2 border-slate-900 rounded-xl p-3 sm:p-5 shadow-neo flex items-center gap-3 sm:gap-5">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl bg-horizon-700 text-white border-2 border-slate-900 flex items-center justify-center font-black text-xl sm:text-3xl shrink-0 shadow-neo-sm">
            <i className="fa-solid fa-comments"></i>
          </div>
          <div>
            <span className="inline-flex items-center justify-center bg-amber-100 border border-slate-900 text-slate-900 text-[8px] sm:text-[9.5px] md:text-[10px] font-black px-2 py-0.5 rounded uppercase leading-none mb-1">
              OPEN FLOOR DISCUSSION
            </span>
            <h3 className="text-sm sm:text-lg md:text-xl font-black text-slate-900 tracking-tight leading-tight">
              {t('slide10.heroTitle')}
            </h3>
            <p className="text-[8.5px] sm:text-xs md:text-sm text-slate-600 font-medium leading-relaxed mt-0.5">
              {t('slide10.heroDesc')}
            </p>
          </div>
        </div>

        {/* 3 Inquiry Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-5">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className={`${p.bgClass} border-2 border-slate-900 rounded-xl p-3 sm:p-4 shadow-neo flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 transition-all`}
            >
              <div>
                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg ${p.color} text-white border-2 border-slate-900 flex items-center justify-center font-bold text-xs sm:text-sm mb-2 shadow-neo-sm`}>
                  <i className={`fa-solid ${p.icon}`}></i>
                </div>
                <h4 className="text-[10.5px] sm:text-xs md:text-sm font-extrabold text-slate-900 mb-1 leading-snug">
                  {t(p.titleKey)}
                </h4>
                <p className="text-[8.5px] sm:text-[10.5px] md:text-xs text-slate-600 leading-relaxed">
                  {t(p.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="text-center py-1 sm:py-1.5">
          <span className="text-[9px] sm:text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            • {t('slide10.footerNote')} •
          </span>
        </div>
      </div>
    </div>
  );
}
