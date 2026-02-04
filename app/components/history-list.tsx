import React from 'react';
import { History, Info, Leaf, ChevronRight, BarChart3 } from 'lucide-react';

export const HistoryList = () => {
  const scans = [
    { id: 1, material: 'Plastica', time: '10:30', date: 'Oggi', icon: '♻️' },
    { id: 2, material: 'Carta', time: '08:45', date: 'Oggi', icon: '📦' },
    { id: 3, material: 'Vetro', time: '19:20', date: 'Ieri', icon: '🍾' },
    { id: 4, material: 'Metallo', time: '14:10', date: '2 Feb', icon: '🥫' },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-gray-900">Le tue analisi</h2>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <BarChart3 className="w-3 h-3" />
          Report Mensile
        </div>
      </div>

      <div className="space-y-3">
        {scans.map((scan) => (
          <div key={scan.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-green-200 transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="text-2xl bg-gray-50 w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform">
                {scan.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{scan.material}</h3>
                <p className="text-xs text-gray-400 font-medium">{scan.date} alle {scan.time}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-black text-gray-900 mb-4">Consigli Eco</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-green-600 rounded-2xl p-5 text-white flex flex-col gap-2 relative overflow-hidden">
            <Leaf className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
            <h4 className="font-bold text-lg">Meno plastica, più futuro</h4>
            <p className="text-sm text-green-50 leading-relaxed">
              Sostituisci le bottiglie in PET con una borraccia. In un anno puoi risparmiare fino a 10kg di plastica!
            </p>
          </div>
          
          <div className="bg-blue-500 rounded-2xl p-5 text-white flex flex-col gap-2 relative overflow-hidden">
            <Info className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 -rotate-12" />
            <h4 className="font-bold text-lg">Scontrini e Carta</h4>
            <p className="text-sm text-blue-50 leading-relaxed">
              Sapevi che gli scontrini non vanno nella carta? Sono fatti di carta termica non riciclabile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
