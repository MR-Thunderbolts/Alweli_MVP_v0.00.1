import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MedicalCenterViewProps {
  onBack: () => void;
}

export default function MedicalCenterView({ onBack }: MedicalCenterViewProps) {
  const [isCalling, setIsCalling] = useState(false);

  const handleCall = () => {
    setIsCalling(true);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([100, 200, 100]);
    }
  };

  return (
    <div className="min-h-screen bg-hueso text-tinta flex flex-col justify-between p-6 md:p-8 relative">
      
      {/* Screen Content Container */}
      <main className="flex-grow flex flex-col items-center justify-center space-y-10 w-full max-w-md mx-auto">
        
        {/* Subtle Back Trigger */}
        <div className="w-full flex justify-start">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-tinta/5 flex items-center justify-center active:scale-90 hover:bg-tinta/10 transition-all"
            aria-label="Volver"
          >
            <span className="material-symbols-outlined text-tinta">arrow_back</span>
          </button>
        </div>

        {/* Giant Serif Title */}
        <header className="w-full text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-display text-[48px] leading-[1.1] text-tinta font-bold tracking-tight"
          >
            Centro Médico CESFAM
          </motion.h1>
        </header>

        {/* Large Cream Card */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full bg-crema rounded-3xl p-8 flex flex-col items-center space-y-6 shadow-sm border border-tinta/5"
        >
          {/* Monospace Horario */}
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-taupe font-bold mb-1">
              Horario
            </p>
            <p className="font-mono text-lg text-tinta font-bold">
              08:00 a 17:00
            </p>
          </div>

          {/* Huge Serif Phone */}
          <div className="text-center pt-6 border-t border-tinta/10 w-full">
            <p className="font-serif-display text-3xl sm:text-[38px] leading-[1.2] text-tinta font-semibold">
              Teléfono:<br />
              <span className="font-bold block mt-1 text-4xl">800 500 123</span>
            </p>
          </div>
        </motion.section>

        {/* Giant Pill-shaped Call Button */}
        <footer className="w-full flex justify-center pt-6">
          <button 
            onClick={handleCall}
            className="w-full py-5 bg-tinta rounded-full flex items-center justify-center gap-3 active:scale-98 transition-transform group shadow-md"
          >
            <span className="text-crema font-bold text-xl tracking-tight">
              Llamar ahora
            </span>
            <span className="material-symbols-outlined text-crema group-hover:translate-x-1 transition-transform text-2xl">
              call
            </span>
          </button>
        </footer>

      </main>

      {/* Interactive Calling Overlay Screen */}
      <AnimatePresence>
        {isCalling && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed inset-0 bg-tinta z-50 text-crema flex flex-col justify-between p-8"
          >
            <div className="text-center pt-12 space-y-4">
              <span className="font-label-mono text-xs uppercase tracking-widest text-crema/60 block">Llamando por teléfono...</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold">CESFAM</h2>
              <p className="text-sm text-crema/80">Línea Gratuita de Salud</p>
            </div>

            {/* Simulated Ringing Indicator */}
            <div className="flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full bg-green-500/10 animate-ping" />
                <div className="absolute w-24 h-24 rounded-full bg-green-500/20 animate-pulse" />
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-3xl animate-bounce">call</span>
                </div>
              </div>
            </div>

            <div className="pb-12 flex flex-col items-center gap-4 max-w-sm mx-auto w-full">
              <p className="text-xs text-crema/60 text-center italic">Esto es una llamada de simulación en Alweli.</p>
              <button 
                onClick={() => setIsCalling(false)}
                className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all text-lg"
              >
                <span className="material-symbols-outlined">call_end</span>
                <span>Colgar llamada</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
