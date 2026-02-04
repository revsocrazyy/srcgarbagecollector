import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Info, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export type WasteMaterial = 'plastica' | 'carta' | 'vetro' | 'metallo' | 'umido' | 'secco' | 'sconosciuto';

interface ResultViewProps {
  material: WasteMaterial;
  onReset: () => void;
}

const MATERIAL_INFO = {
  plastica: {
    name: 'Plastica',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-900',
    bin: 'Contenitore Giallo',
    instructions: 'Svuota e sciacqua i contenitori. Schiaccia le bottiglie per ridurre il volume.',
    icon: '♻️'
  },
  carta: {
    name: 'Carta e Cartone',
    color: 'bg-blue-500',
    textColor: 'text-white',
    bin: 'Contenitore Blu',
    instructions: 'Rimuovi nastro adesivo o parti metalliche. Non inserire carta sporca di cibo.',
    icon: '📦'
  },
  vetro: {
    name: 'Vetro',
    color: 'bg-green-600',
    textColor: 'text-white',
    bin: 'Contenitore Verde',
    instructions: 'Togli tappi e coperchi. Non è necessario rimuovere le etichette.',
    icon: '🍾'
  },
  metallo: {
    name: 'Metalli / Alluminio',
    color: 'bg-gray-400',
    textColor: 'text-gray-900',
    bin: 'Contenitore Metalli/Plastica',
    instructions: 'Lattine e fogli di alluminio sono riciclabili al 100%. Svuota bene.',
    icon: '🥫'
  },
  umido: {
    name: 'Organico / Umido',
    color: 'bg-amber-800',
    textColor: 'text-white',
    bin: 'Contenitore Marrone',
    instructions: 'Usa solo sacchetti compostabili. Scarti alimentari e piccole potature.',
    icon: '🍎'
  },
  secco: {
    name: 'Secco Residuo',
    color: 'bg-gray-800',
    textColor: 'text-white',
    bin: 'Contenitore Grigio',
    instructions: 'Tutto ciò che non può essere riciclato. No pile o farmaci.',
    icon: '🗑️'
  },
  sconosciuto: {
    name: 'Non Identificato',
    color: 'bg-red-500',
    textColor: 'text-white',
    bin: 'Verifica Manuale',
    instructions: 'I sensori non hanno riconosciuto il materiale. Riprova o consulta la guida.',
    icon: '❓'
  }
};

export const ResultView: React.FC<ResultViewProps> = ({ material, onReset }) => {
  const info = MATERIAL_INFO[material];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={material}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className="flex flex-col gap-4 p-6"
      >
        <div className={`rounded-3xl ${info.color} p-8 shadow-xl flex flex-col items-center text-center gap-4`}>
          <div className="text-6xl mb-2">{info.icon}</div>
          <h2 className={`text-2xl font-black ${info.textColor} uppercase tracking-tighter`}>
            {info.name}
          </h2>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-sm font-bold text-white">
            Analisi Completata
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Trash2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide leading-none mb-1">Dove buttarlo</p>
              <h3 className="text-lg font-bold text-gray-900">{info.bin}</h3>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-orange-50 p-3 rounded-xl">
              <Info className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wide leading-none mb-1">Istruzioni</p>
              <p className="text-gray-600 text-sm leading-relaxed">{info.instructions}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <button 
            onClick={onReset}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-4 rounded-2xl font-bold text-gray-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Riprova
          </button>
          <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 py-4 rounded-2xl font-bold text-white shadow-lg shadow-green-200 transition-colors"
            onClick={onReset}
            >
            <CheckCircle2 className="w-5 h-5" />
            Fatto
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-center gap-3 mt-2">
          <AlertTriangle className="w-5 h-5 text-blue-500 shrink-0" />
          <p className="text-xs text-blue-700 font-medium leading-tight">
            Ricorda che le regole possono variare in base al tuo comune di residenza.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
