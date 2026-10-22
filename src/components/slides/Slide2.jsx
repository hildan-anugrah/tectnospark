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
      <div>
        <div className="flex items-start justify-between gap-2 pb-2">
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-2 sm:w-2.5 h-10 sm:h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
            <div>
              <span className="text-horizon-700 text-[8.5px] sm:text-xs font-black tracking-wider uppercase font-mono block">
                {t('slide2.badge')}
              </span>
              <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                {t('slide2.title')}
              </h2>
              <p className="text-[9px] sm:text-xs text-slate-600 font-medium mt-0.5 leading-normal">
                {t('slide2.subtitle')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="bg-amber-100 border-2 border-slate-900 text-slate-900 text-[9px] sm:text-xs font-extrabold px-2 sm:px-3 py-1 rounded-md shadow-neo-sm font-mono inline-block">
              {t('slide2.badgeCount')}
            </span>
          </div>
        </div>
        <div className="w-full border-b-2 border-slate-900 mb-2 sm:mb-4"></div>
      </div>

      {/* 3 Columns x 2 Rows Grid preserved on all screens */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {members.map((m) => (
            <div
              key={m.id}
              className={`${
                m.isPm ? 'bg-red-50/70' : 'bg-white'
              } border-2 border-slate-900 rounded-xl p-2 sm:p-4 text-center shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex flex-col items-center justify-center`}
            >
              <div className="relative mb-1.5 sm:mb-2.5">
                <img
                  src={teamImages[m.id]}
                  alt={m.defaultName}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-slate-900 object-cover shadow-neo-sm mx-auto"
                />
              </div>

              <span className="bg-horizon-700 text-white font-extrabold text-[8px] sm:text-[10px] md:text-xs px-1.5 sm:px-2.5 py-0.5 rounded-full border border-slate-900 mb-1 max-w-full truncate inline-block">
                {t(m.nameKey)}
              </span>

              <p className="text-[7.5px] sm:text-[9.5px] md:text-[11px] font-bold text-slate-700 max-w-full truncate">
                {t(m.roleKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
