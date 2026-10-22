import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Slide4() {
  const { t } = useTranslation();

  const rows = [
    { key: 'row1', isAlt: false },
    { key: 'row2', isAlt: true },
    { key: 'row3', isAlt: false },
    { key: 'row4', isAlt: true }
  ];

  return (
    <div className="h-full flex flex-col justify-between" id="slide-4-content">
      {/* Header */}
      <div>
        <div className="flex items-start gap-2.5 sm:gap-3 pb-2">
          <div className="w-2 sm:w-2.5 h-10 sm:h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
          <div>
            <span className="text-horizon-700 text-[10px] sm:text-xs font-black tracking-wider uppercase font-mono block">
              {t('slide4.badge')}
            </span>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {t('slide4.title')}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5 leading-normal">
              {t('slide4.subtitle')}
            </p>
          </div>
        </div>
        <div className="w-full border-b-2 border-slate-900 mb-2 sm:mb-4"></div>
      </div>

      {/* Swipe hint on mobile */}
      <div className="md:hidden text-[10px] text-slate-500 font-bold mb-1 flex items-center gap-1.5">
        <i className="fa-solid fa-arrows-left-right text-horizon-700"></i>
        <span>Geser tabel untuk membaca kolom lengkap</span>
      </div>

      {/* Neo Table with horizontal scrolling on mobile */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="border-2 border-slate-900 rounded-xl overflow-x-auto bg-white shadow-neo">
          <table className="w-full text-left text-xs min-w-[620px] md:min-w-full">
            <thead className="bg-horizon-700 text-white font-extrabold border-b-2 border-slate-900 text-[11px] sm:text-[11.5px]">
              <tr>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 w-1/4">{t('slide4.thProblem')}</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 w-[38%] border-l-2 border-slate-900">{t('slide4.thCause')}</th>
                <th className="py-2.5 sm:py-3 px-3 sm:px-4 w-[37%] border-l-2 border-slate-900">{t('slide4.thImpact')}</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-900 leading-relaxed text-slate-800 text-[11px] sm:text-xs">
              {rows.map(({ key, isAlt }) => (
                <tr key={key} className={isAlt ? 'bg-red-50/60 hover:bg-red-50' : 'hover:bg-slate-50'}>
                  <td className="py-2 sm:py-2.5 px-3 sm:px-4 font-extrabold text-horizon-700">
                    {t(`slide4.${key}.problem`)}
                  </td>
                  <td className="py-2 sm:py-2.5 px-3 sm:px-4 border-l-2 border-slate-900">
                    {t(`slide4.${key}.cause`)}
                  </td>
                  <td
                    className="py-2 sm:py-2.5 px-3 sm:px-4 border-l-2 border-slate-900"
                    dangerouslySetInnerHTML={{ __html: t(`slide4.${key}.impact`) }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
