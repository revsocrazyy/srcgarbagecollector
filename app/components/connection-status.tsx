import React from 'react';
import { motion } from 'motion/react';
import { Bluetooth, BluetoothOff, Radio } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  isScanning: boolean;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected, isScanning }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="bg-green-100 p-2 rounded-lg">
          <Radio className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900 leading-none">MODEL NAME</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">Garbage collector ver 1.0</p>
        </div>
      </div>

      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
        isConnected ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        {isConnected ? (
          <>
            <motion.div 
              animate={{ opacity: isScanning ? [1, 0.4, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2 h-2 rounded-full bg-green-500" 
            />
            <span>{isScanning ? 'Analisi in corso...' : 'Connesso'}</span>
            <Bluetooth className="w-3.5 h-3.5 ml-1" />
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Disconnesso</span>
            <BluetoothOff className="w-3.5 h-3.5 ml-1" />
          </>
        )}
      </div>
    </div>
  );
};
