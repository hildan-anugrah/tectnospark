import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Slide8() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col justify-between" id="slide-8-content">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-2 sm:pb-3 mb-2 sm:mb-4 flex items-start gap-2 sm:gap-3">
        <div className="w-2 sm:w-2.5 h-8 sm:h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
        <div>
          <span className="text-horizon-700 text-[8.5px] sm:text-xs font-black tracking-wider uppercase font-mono">
            {t('slide8.badge')}
          </span>
          <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {t('slide8.title')}
          </h2>
          <p className="text-[9px] sm:text-xs text-slate-600 font-medium mt-0.5 truncate max-w-[240px] sm:max-w-none">
            {t('slide8.subtitle')}
          </p>
        </div>
      </div>

      {/* 2 Equal Columns side-by-side on all screens */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-5 my-auto">
        {/* Card 1: Priorities */}
        <div className="bg-neo-bg border-2 border-slate-900 rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-5 shadow-neo flex flex-col justify-between">
          <div>
            <span className="bg-white border border-slate-900 text-horizon-700 text-[8px] sm:text-[9.5px] md:text-[10.5px] font-black px-1.5 sm:px-2.5 py-0.5 rounded uppercase flex items-center gap-1 w-fit mb-1.5 sm:mb-2.5">
              <i className="fa-solid fa-list-check text-[8px] sm:text-[10px]"></i> <span>{t('slide8.priorities.badge')}</span>
            </span>
            <h3 className="text-[10.5px] sm:text-sm md:text-base font-extrabold text-slate-900 mb-1 sm:mb-2 leading-snug">
              {t('slide8.priorities.title')}
            </h3>
            <ul className="text-[8.5px] sm:text-[11px] md:text-xs text-slate-700 space-y-1 sm:space-y-2 md:space-y-3 leading-relaxed">
              <li dangerouslySetInnerHTML={{ __html: t('slide8.priorities.p1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('slide8.priorities.p2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('slide8.priorities.p3') }} />
            </ul>
          </div>
          <div className="mt-2 sm:mt-3 md:mt-4 pt-1.5 sm:pt-2.5 md:pt-3 border-t border-slate-300 text-[8.5px] sm:text-[11px] md:text-xs font-bold text-horizon-700">
            <span>{t('slide8.priorities.roadmap')}</span>
          </div>
        </div>

        {/* Card 2: Risks & Contingency */}
        <div className="bg-red-50 border-2 border-slate-900 rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-5 shadow-neo flex flex-col justify-between">
          <div>
            <span className="bg-white border border-slate-900 text-horizon-700 text-[8px] sm:text-[9.5px] md:text-[10.5px] font-black px-1.5 sm:px-2.5 py-0.5 rounded uppercase flex items-center gap-1 w-fit mb-1.5 sm:mb-2.5">
              <i className="fa-solid fa-shield-virus text-[8px] sm:text-[10px]"></i> <span>{t('slide8.risks.badge')}</span>
            </span>
            <h3 className="text-[10.5px] sm:text-sm md:text-base font-extrabold text-slate-900 mb-1 sm:mb-2 leading-snug">
              {t('slide8.risks.title')}
            </h3>
            <ul className="text-[8.5px] sm:text-[11px] md:text-xs text-slate-700 space-y-1 sm:space-y-2 md:space-y-3 leading-relaxed">
              <li dangerouslySetInnerHTML={{ __html: t('slide8.risks.item1') }} />
              <li dangerouslySetInnerHTML={{ __html: t('slide8.risks.item2') }} />
              <li dangerouslySetInnerHTML={{ __html: t('slide8.risks.item3') }} />
            </ul>
          </div>
          <div className="mt-2 sm:mt-3 md:mt-4 pt-1.5 sm:pt-2.5 md:pt-3 border-t border-red-300 text-[8.5px] sm:text-[11px] md:text-xs font-bold text-horizon-700">
            <span>{t('slide8.risks.tolerance')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
