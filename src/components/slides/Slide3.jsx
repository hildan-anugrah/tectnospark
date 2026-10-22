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
      <div className="border-b-2 border-slate-900 pb-3 mb-5 flex items-start gap-3">
        <div className="w-2.5 h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
        <div>
          <span className="text-horizon-700 text-xs font-black tracking-wider uppercase font-mono">
            {t('slide3.badge')}
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {t('slide3.title')}
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            {t('slide3.subtitle')}
          </p>
        </div>
      </div>

      {/* 4 Columns Grid */}
      <div className="grid grid-cols-4 gap-4 my-auto">
        {cols.map(({ key, isHighlight }) => (
          <div
            key={key}
            className={`${
              isHighlight ? 'bg-red-50' : 'bg-neo-bg'
            } border-2 border-slate-900 rounded-xl p-4 shadow-neo flex flex-col justify-between`}
          >
            <div>
              <span className="bg-white border border-slate-900 text-horizon-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                {t(`slide3.${key}.step`)}
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 mt-2 mb-2">
                {t(`slide3.${key}.title`)}
              </h3>
              <ul className={`text-xs ${isHighlight ? 'text-slate-700' : 'text-slate-600'} space-y-2 leading-relaxed`}>
                <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide3.${key}.p1`).replace(/^[•\-\*]\s*/, '')}` }} />
                <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide3.${key}.p2`).replace(/^[•\-\*]\s*/, '')}` }} />
                <li dangerouslySetInnerHTML={{ __html: `• ${t(`slide3.${key}.p3`).replace(/^[•\-\*]\s*/, '')}` }} />
              </ul>
            </div>
            <div className={`mt-3 pt-2 border-t ${isHighlight ? 'border-red-300' : 'border-slate-300'} text-[11px] font-bold text-horizon-700`}>
              <span>{t(`slide3.${key}.flow`)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
