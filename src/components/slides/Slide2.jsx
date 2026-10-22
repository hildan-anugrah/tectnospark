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
      <div className="border-b-2 border-slate-900 pb-3 mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-2.5 h-12 bg-horizon-700 border-2 border-slate-900 rounded shrink-0 shadow-neo-sm"></div>
          <div>
            <span className="text-horizon-700 text-xs font-black tracking-wider uppercase font-mono">
              {t('slide2.badge')}
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {t('slide2.title')}
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              {t('slide2.subtitle')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-amber-100 border-2 border-slate-900 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-md shadow-neo-sm font-mono">
            {t('slide2.badgeCount')}
          </span>
        </div>
      </div>

      {/* 2 Rows x 3 Cols Grid of Team Members */}
      <div className="grid grid-cols-3 gap-6 my-auto">
        {members.map((m) => (
          <div
            key={m.id}
            className={`${
              m.isPm ? 'bg-red-50' : 'bg-neo-bg'
            } border-2 border-slate-900 rounded-xl p-5 shadow-neo flex flex-col items-center text-center hover:translate-x-0.5 hover:translate-y-0.5 transition-all`}
          >
            <div
              className={`w-24 h-24 rounded-full border-2 border-slate-900 shadow-neo-sm overflow-hidden bg-white mb-3 ${
                m.isPm ? 'ring-2 ring-horizon-700' : ''
              }`}
            >
              <img src={teamImages[m.id]} alt={t(m.nameKey, m.defaultName)} className="w-full h-full object-cover" />
            </div>
            <span className="bg-horizon-700 text-white border-2 border-slate-900 px-3.5 py-0.5 rounded-full text-xs font-black shadow-neo-sm mb-1.5 uppercase tracking-wider">
              {t(m.nameKey, m.defaultName)}
            </span>
            <span className={`text-xs font-extrabold ${m.isPm ? 'text-horizon-700' : 'text-slate-800'}`}>
              {t(m.roleKey)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
