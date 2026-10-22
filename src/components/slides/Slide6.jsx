import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Slide6() {
  const { t } = useTranslation();

  const rows = [
    { key: 'row1', isAlt: false },
    { key: 'row2', isAlt: true },
    { key: 'row3', isAlt: false },
    { key: 'row4', isAlt: true }
  ];

  return (
    <div className="h-full flex flex-col justify-between" id="slide-6-content">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-3 mb-4 flex items-start gap-3">
        <div className="w-2.5 h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
        <div>
          <span className="text-horizon-700 text-xs font-black tracking-wider uppercase font-mono">
            {t('slide6.badge')}
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {t('slide6.title')}
          </h2>
          <p className="text-xs text-slate-600 font-medium mt-0.5">
            {t('slide6.subtitle')}
          </p>
        </div>
      </div>

      {/* Neo Table */}
      <div className="border-2 border-slate-900 rounded-xl overflow-hidden bg-white shadow-neo my-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-horizon-700 text-white font-extrabold border-b-2 border-slate-900 text-[11.5px]">
            <tr>
              <th className="py-3 px-4 w-[22%]">{t('slide6.thProblem')}</th>
              <th className="py-3 px-4 w-[26%] border-l-2 border-slate-900">{t('slide6.thSystem')}</th>
              <th className="py-3 px-4 w-[34%] border-l-2 border-slate-900">{t('slide6.thFunc')}</th>
              <th className="py-3 px-4 w-[18%] border-l-2 border-slate-900">{t('slide6.thBenefit')}</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-slate-900 leading-relaxed text-slate-800">
            {rows.map(({ key, isAlt }) => (
              <tr key={key} className={isAlt ? 'bg-red-50/60 hover:bg-red-50' : 'hover:bg-slate-50'}>
                <td className="py-2.5 px-4 font-extrabold text-horizon-700">
                  {t(`slide6.${key}.problem`)}
                </td>
                <td className="py-2.5 px-4 border-l-2 border-slate-900">
                  <strong>{t(`slide6.${key}.system`)}</strong>
                  <br />
                  <span className="text-[11px] text-slate-500 font-mono">{t(`slide6.${key}.tech`)}</span>
                </td>
                <td className="py-2.5 px-4 border-l-2 border-slate-900">
                  {t(`slide6.${key}.func`)}
                </td>
                <td
                  className="py-2.5 px-4 border-l-2 border-slate-900"
                  dangerouslySetInnerHTML={{ __html: t(`slide6.${key}.benefit`) }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
