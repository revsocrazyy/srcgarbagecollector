import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { 
  Scan, 
  History as HistoryIcon, 
  Settings as SettingsIcon, 
  HelpCircle,
  Cpu,
  Zap
} from 'lucide-react';
import { ConnectionStatus } from '@/app/components/connection-status';
import { ResultView, WasteMaterial } from '@/app/components/result-view';
import { HistoryList } from '@/app/components/history-list';

type AppTab = 'scan' | 'history' | 'settings';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('scan');
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<WasteMaterial | null>(null);

  // Simulate auto-connection on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
      toast.success('Dispositivo Arduino rilevato e connesso!', {
        description: 'Pronto per l\'analisi dei materiali.'
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleStartScan = () => {
    if (!isConnected) {
      toast.error('Errore di connessione', {
        description: 'Accendi il dispositivo Arduino o controlla il Bluetooth.'
      });
      return;
    }

    setIsScanning(true);
    setAnalysisResult(null);

    // Simulate analysis time (3 seconds)
    setTimeout(() => {
      const materials: WasteMaterial[] = ['plastica', 'carta', 'vetro', 'metallo', 'umido', 'secco'];
      const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
      
      setIsScanning(false);
      setAnalysisResult(randomMaterial);
      toast.info('Analisi completata con successo!');
    }, 3000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'scan':
        return (
          <div className="flex flex-col flex-1 overflow-y-auto pb-24">
            <AnimatePresence mode="wait">
              {!analysisResult ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center flex-1 p-8 text-center"
                >
                  <div className="relative mb-12">
                    {/* Scanner Animation */}
                    <div className="w-64 h-64 border-4 border-dashed border-green-200 rounded-full flex items-center justify-center p-8">
                      <motion.div
                        animate={isScanning ? {
                          scale: [1, 1.1, 1],
                          rotate: [0, 180, 360],
                          borderColor: ['#d1fae5', '#10b981', '#d1fae5']
                        } : {}}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-full h-full rounded-full border-4 border-green-500 flex items-center justify-center bg-green-50 overflow-hidden"
                      >
                        {isScanning ? (
                          <div className="flex flex-col items-center">
                            <Zap className="w-12 h-12 text-green-600 animate-pulse" />
                            <p className="text-[10px] font-bold text-green-700 uppercase mt-2 tracking-widest">Analisi...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <Cpu className="w-16 h-16 text-green-600" />
                            <p className="text-xs font-bold text-green-700 uppercase mt-2 tracking-widest">In Attesa</p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                    
                    {isScanning && (
                      <motion.div 
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="absolute left-0 right-0 h-1 bg-green-400/50 shadow-[0_0_15px_rgba(34,197,94,0.5)] z-0"
                      />
                    )}
                  </div>

                  <h2 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                    {isScanning ? 'Scansione in corso...' : 'Pronto per l\'analisi'}
                  </h2>
                  <p className="text-gray-500 mb-10 max-w-[280px] text-sm font-medium">
                    Posiziona il rifiuto davanti ai sensori del tuo dispositivo Arduino.
                  </p>

                  <button
                    onClick={handleStartScan}
                    disabled={isScanning}
                    className={`w-full max-w-xs py-5 rounded-3xl font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${
                      isScanning 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'bg-green-600 text-white shadow-green-200 hover:bg-green-700'
                    }`}
                  >
                    <Scan className="w-6 h-6" />
                    {isScanning ? 'ATTENDI...' : 'ANALIZZA ORA'}
                  </button>
                </motion.div>
              ) : (
                <ResultView 
                  material={analysisResult} 
                  onReset={() => setAnalysisResult(null)} 
                />
              )}
            </AnimatePresence>
          </div>
        );
      case 'history':
        return <div className="flex-1 overflow-y-auto pb-24"><HistoryList /></div>;
      case 'settings':
        return (
          <div className="p-6 flex flex-col gap-6">
            <h2 className="text-2xl font-black text-gray-900">Impostazioni</h2>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">Bluetooth Auto-connect</h4>
                  <p className="text-xs text-gray-500">Connetti automaticamente all'avvio</p>
                </div>
                <div className="w-12 h-6 bg-green-500 rounded-full relative">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900">Notifiche Riciclo</h4>
                  <p className="text-xs text-gray-500">Suggerimenti settimanali</p>
                </div>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-2xl flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-orange-500 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-orange-800">Guida Hardware</h4>
                <p className="text-xs text-orange-700 mt-1">
                  Non riesci a connettere l'Arduino? Assicurati che il modulo HC-05 sia alimentato correttamente a 5V.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto shadow-2xl relative">
      <ConnectionStatus isConnected={isConnected} isScanning={isScanning} />
      
      {renderContent()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-between items-center z-20">
        <button 
          onClick={() => setActiveTab('scan')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'scan' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <Scan className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Scanner</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'history' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <HistoryIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Storia</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'settings' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <SettingsIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Impostazioni</span>
        </button>
      </div>

      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
}
