import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Slide3() {
  const { t } = useTranslation();

  const cols = [
    { key: 'col1', isHighlight: false },
    { key: 'col2', isHighlight: false },
    { key: 'col3', isHighlight: true },
    { key: 'col4', isHighlight: false }
  ];

  return (
    <div className="h-full flex flex-col justify-between" id="slide-3-content">
      {/* Header */}
      <div>
        <div className="flex items-start gap-2.5 sm:gap-3 pb-2">
          <div className="w-2 sm:w-2.5 h-10 sm:h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
          <div>
            <span className="text-horizon-700 text-[8.5px] sm:text-xs font-black tracking-wider uppercase font-mono block">
              {t('slide3.badge')}
            </span>
            <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {t('slide3.title')}
            </h2>
            <p className="text-[9px] sm:text-xs text-slate-600 font-medium mt-0.5 leading-normal">
              {t('slide3.subtitle')}
            </p>
          </div>
        </div>
        <div className="w-full border-b-2 border-slate-900 mb-2 sm:mb-4"></div>
      </div>

      {/* Grid: 2x2 on mobile portrait, 4 cols on desktop/landscape */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {cols.map(({ key, isHighlight }) => (
            <div
              key={key}
              className={`${
                isHighlight ? 'bg-red-50' : 'bg-neo-bg'
              } border-2 border-slate-900 rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 md:p-4 shadow-neo flex flex-col justify-between`}
            >
              <div>
                <span className="inline-flex items-center justify-center bg-white border border-slate-900 text-horizon-700 text-[8px] sm:text-[9.5px] md:text-[10px] font-black px-2 py-0.5 rounded uppercase leading-none">
                  {t(`slide3.${key}.step`)}
                </span>
                <h3 className="text-[10px] sm:text-xs md:text-sm font-extrabold text-slate-900 mt-1 sm:mt-1.5 md:mt-2 mb-1 sm:mb-1.5 md:mb-2 leading-snug">
                  {t(`slide3.${key}.title`)}
                </h3>
                <ul className={`text-[8.5px] sm:text-[10.5px] md:text-xs ${isHighlight ? 'text-slate-700' : 'text-slate-600'} space-y-1 sm:space-y-1.5 md:space-y-2 leading-relaxed`}>
                  <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide3.${key}.p1`).replace(/^[•\-\*]\s*/, '')}` }} />
                  <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide3.${key}.p2`).replace(/^[•\-\*]\s*/, '')}` }} />
                  <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide3.${key}.p3`).replace(/^[•\-\*]\s*/, '')}` }} />
                </ul>
              </div>
              <div className={`mt-2 sm:mt-3 pt-1.5 sm:pt-2 border-t ${isHighlight ? 'border-red-300' : 'border-slate-300'} text-[8.5px] sm:text-[10px] md:text-[11px] font-bold text-horizon-700 leading-normal`}>
                <span>{t(`slide3.${key}.flow`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
