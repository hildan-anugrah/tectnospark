import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Slide8() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col justify-between" id="slide-8-content">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-3 mb-3 sm:mb-4 flex items-start gap-2.5 sm:gap-3">
        <div className="w-2 sm:w-2.5 h-10 sm:h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
        <div>
          <span className="text-horizon-700 text-[10px] sm:text-xs font-black tracking-wider uppercase font-mono">
            {t('slide8.badge')}
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {t('slide8.title')}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5">
            {t('slide8.subtitle')}
          </p>
        </div>
      </div>

      {/* 2 Equal Columns: 1 col on mobile, 2 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5 my-auto">
        {/* Card 1: Priorities */}
        <div className="bg-neo-bg border-2 border-slate-900 rounded-xl p-4 sm:p-5 shadow-neo flex flex-col justify-between">
          <div>
            <span className="bg-white border border-slate-900 text-horizon-700 text-[10px] sm:text-[10.5px] font-black px-2.5 py-0.5 rounded uppercase flex items-center gap-1.5 w-fit mb-2 sm:mb-3">
              <i className="fa-solid fa-list-check"></i> <span>{t('slide8.priorities.badge')}</span>
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2 sm:mb-3">
              {t('slide8.priorities.title')}
            </h3>
            <ul className="text-[11px] sm:text-xs text-slate-700 space-y-2 sm:space-y-3 leading-relaxed">
              <li dangerouslySetInnerHTML={{ __html: t('slide8.priorities.p1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('slide8.priorities.p2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('slide8.priorities.p3') }} />
            </ul>
          </div>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-300 text-[11px] sm:text-xs font-bold text-horizon-700">
            <span>{t('slide8.priorities.roadmap')}</span>
          </div>
        </div>

        {/* Card 2: Risks & Contingency */}
        <div className="bg-red-50 border-2 border-slate-900 rounded-xl p-4 sm:p-5 shadow-neo flex flex-col justify-between">
          <div>
            <span className="bg-white border border-slate-900 text-horizon-700 text-[10px] sm:text-[10.5px] font-black px-2.5 py-0.5 rounded uppercase flex items-center gap-1.5 w-fit mb-2 sm:mb-3">
              <i className="fa-solid fa-shield-virus"></i> <span>{t('slide8.risks.badge')}</span>
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2 sm:mb-3">
              {t('slide8.risks.title')}
            </h3>
            <ul className="text-[11px] sm:text-xs text-slate-700 space-y-2 sm:space-y-3 leading-relaxed">
              <li dangerouslySetInnerHTML={{ __html: t('slide8.risks.item1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('slide8.risks.item2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('slide8.risks.item3') }} />
            </ul>
          </div>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-red-300 text-[11px] sm:text-xs font-bold text-horizon-700">
            <span>{t('slide8.risks.tolerance')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
