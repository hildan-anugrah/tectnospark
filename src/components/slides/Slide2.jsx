import React from 'react';
import { useTranslation } from 'react-i18next';
import { teamImages } from '../../utils/images';

export default function Slide2() {
  const { t } = useTranslation();

  const members = [
    { id: 'ferry', nameKey: 'slide2.members.ferry.name', roleKey: 'slide2.members.ferry.role', defaultName: 'Ferry Noer Hendriawan', isPm: false },
    { id: 'fhazar', nameKey: 'slide2.members.fhazar.name', roleKey: 'slide2.members.fhazar.role', defaultName: 'Fhazar Raffiful Aqyla', isPm: true },
    { id: 'hildan', nameKey: 'slide2.members.hildan.name', roleKey: 'slide2.members.hildan.role', defaultName: 'Hildan Anugrah Tamadi Putra', isPm: false },
    { id: 'fadel', nameKey: 'slide2.members.fadel.name', roleKey: 'slide2.members.fadel.role', defaultName: 'Fadel Rahmadhan', isPm: false },
    { id: 'daffa', nameKey: 'slide2.members.daffa.name', roleKey: 'slide2.members.daffa.role', defaultName: 'Daffa Nazriel Zaidan', isPm: false },
    { id: 'acep', nameKey: 'slide2.members.acep.name', roleKey: 'slide2.members.acep.role', defaultName: 'Acep Ugan Saputra', isPm: false }
  ];

  return (
    <div className="h-full flex flex-col justify-between" id="slide-2-content">
      {/* Header */}
      <div className="border-b-2 border-slate-900 pb-2 sm:pb-3 mb-2 sm:mb-4 flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="w-2 sm:w-2.5 h-8 sm:h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
          <div>
            <span className="text-horizon-700 text-[8.5px] sm:text-xs font-black tracking-wider uppercase font-mono">
              {t('slide2.badge')}
            </span>
            <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {t('slide2.title')}
            </h2>
            <p className="text-[9px] sm:text-xs text-slate-600 font-medium mt-0.5 truncate max-w-[220px] sm:max-w-none">
              {t('slide2.subtitle')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="bg-amber-100 border-2 border-slate-900 text-slate-900 text-[9px] sm:text-xs font-extrabold px-2 sm:px-3 py-0.5 sm:py-1 rounded-md shadow-neo-sm font-mono">
            {t('slide2.badgeCount')}
          </span>
        </div>
      </div>

      {/* 3 Columns x 2 Rows Grid preserved on all screens */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 my-auto">
        {members.map((m) => (
          <div
            key={m.id}
            className={`${
              m.isPm ? 'bg-red-50' : 'bg-neo-bg'
            } border-2 border-slate-900 rounded-lg sm:rounded-xl p-2 sm:p-3.5 md:p-5 shadow-neo flex flex-col items-center text-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all`}
          >
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full border-2 border-slate-900 shadow-neo-sm overflow-hidden bg-white mb-1.5 sm:mb-2.5 ${
                m.isPm ? 'ring-2 ring-horizon-700' : ''
              }`}
            >
              <img src={teamImages[m.id]} alt={t(m.nameKey, m.defaultName)} className="w-full h-full object-cover" />
            </div>
            <span className="bg-horizon-700 text-white border sm:border-2 border-slate-900 px-1.5 sm:px-2.5 md:px-3.5 py-0.5 rounded-full text-[7.5px] sm:text-[9.5px] md:text-xs font-black shadow-neo-sm mb-0.5 sm:mb-1 uppercase tracking-wider truncate max-w-full">
              {t(m.nameKey, m.defaultName)}
            </span>
            <span className={`text-[8.5px] sm:text-[10px] md:text-xs font-extrabold ${m.isPm ? 'text-horizon-700' : 'text-slate-800'}`}>
              {t(m.roleKey)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
