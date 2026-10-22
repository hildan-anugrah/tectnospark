import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Slide9() {
  const { t } = useTranslation();

  const metrics = [
    { key: 'm1', isHighlight: true, numColor: 'text-horizon-700' },
    { key: 'm2', isHighlight: false, numColor: 'text-slate-900' },
    { key: 'm3', isHighlight: false, numColor: 'text-slate-900' }
  ];

  return (
    <div className="h-full flex flex-col justify-between" id="slide-9-content">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-3 mb-3 sm:mb-4 flex items-start gap-2.5 sm:gap-3">
        <div className="w-2 sm:w-2.5 h-10 sm:h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
        <div>
          <span className="text-horizon-700 text-[10px] sm:text-xs font-black tracking-wider uppercase font-mono">
            {t('slide9.badge')}
          </span>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {t('slide9.title')}
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5">
            {t('slide9.subtitle')}
          </p>
        </div>
      </div>

      {/* 3 Metrics Grid: 1 col on mobile, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 my-auto">
        {metrics.map(({ key, isHighlight, numColor }) => (
          <div
            key={key}
            className={`${
              isHighlight ? 'bg-red-50' : 'bg-neo-bg'
            } border-2 border-slate-900 rounded-xl p-4 sm:p-6 shadow-neo flex flex-col justify-between text-center`}
          >
            <div>
              <span className="bg-white border border-slate-900 text-horizon-700 text-[10px] sm:text-[10.5px] font-black px-2.5 py-0.5 rounded uppercase inline-block">
                {t(`slide9.${key}.badge`)}
              </span>
              <div className={`text-3xl sm:text-4xl md:text-5xl font-black ${numColor} my-1.5 sm:my-2 tracking-tight`}>
                {t(`slide9.${key}.value`)}
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 mb-1.5 sm:mb-2">
                {t(`slide9.${key}.title`)}
              </h3>
              <ul className="text-[11px] sm:text-xs text-slate-600 text-left space-y-1 sm:space-y-1.5 leading-relaxed">
                <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide9.${key}.p1`).replace(/^[•\-\*]\s*/, '')}` }} />
                <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide9.${key}.p2`).replace(/^[•\-\*]\s*/, '')}` }} />
                <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide9.${key}.p3`).replace(/^[•\-\*]\s*/, '')}` }} />
              </ul>
            </div>
            <div className={`mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t ${isHighlight ? 'border-red-300 text-horizon-700' : 'border-slate-300 text-slate-800'} text-[11px] sm:text-xs font-bold`}>
              <span>{t(`slide9.${key}.impact`)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
