import React, { useState } from 'react';
import { Medication } from '../types';
import { motion } from 'motion/react';

interface MedicationDetailViewProps {
  medication: Medication;
  onConfirm: () => void;
  onSnooze: () => void;
  onBack: () => void;
}

export default function MedicationDetailView({
  medication,
  onConfirm,
  onSnooze,
  onBack,
}: MedicationDetailViewProps) {
  const [isSnoozing, setIsSnoozing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    // Vibrate device if supported
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
    setTimeout(() => {
      onConfirm();
    }, 450);
  };

  const handleSnooze = () => {
    setIsSnoozing(true);
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([50, 50, 50]);
    }
    setTimeout(() => {
      setIsSnoozing(false);
      onSnooze();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-crema text-tinta flex flex-col justify-between items-center px-6 py-12">
      
      {/* Header Area */}
      <header className="w-full flex justify-between items-center">
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-tinta/5 flex items-center justify-center active:scale-90 hover:bg-tinta/10 transition-all"
          aria-label="Volver"
        >
          <span className="material-symbols-outlined text-tinta">arrow_back</span>
        </button>
        <span className="font-label-mono text-xs uppercase tracking-widest text-taupe font-bold">Medicamento</span>
        <div className="w-12" /> {/* Spacer */}
      </header>

      {/* Circle / Identification Area */}
      <div className="w-full flex justify-center my-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="h-28 w-28 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border border-tinta/5"
        >
          <img
            className="h-20 w-20 object-contain hover:scale-110 transition-transform duration-300"
            src={medication.image}
            alt="Render 3D de pastilla"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      {/* Main Content Area: Medication Name */}
      <main className="flex-grow flex flex-col items-center justify-center text-center max-w-sm px-4">
        <motion.h1 
          key={medication.name}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-serif text-[42px] leading-[1.1] mb-4 text-tinta font-bold"
        >
          {medication.name} {medication.dosage}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.2 }}
          className="font-body-lg text-xl text-taupe"
        >
          {medication.description}
        </motion.p>
      </main>

      {/* Action Section: Generous Spacing */}
      <footer className="w-full flex flex-col gap-5 mt-8 max-w-md">
        {/* Primary Action */}
        <button
          onClick={handleConfirm}
          disabled={isConfirming || isSnoozing}
          className={`w-full py-6 px-6 rounded-full font-bold text-xl shadow-lg active:scale-95 transition-all duration-200 focus:outline-none flex items-center justify-center gap-2 ${
            isConfirming 
              ? 'bg-green-700 text-white' 
              : 'bg-tinta text-white hover:opacity-95'
          }`}
        >
          {isConfirming ? (
            <>
              <span className="material-symbols-outlined text-white text-2xl">check_circle</span>
              <span>¡Registrado!</span>
            </>
          ) : (
            'Ya me la tomé'
          )}
        </button>

        {/* Secondary Action (Ghost Button) */}
        <button
          onClick={handleSnooze}
          disabled={isConfirming || isSnoozing}
          className={`w-full border-2 border-tinta text-tinta py-5 px-6 rounded-full font-semibold text-lg transition-all duration-200 focus:outline-none flex items-center justify-center gap-2 ${
            isSnoozing ? 'vibration-active bg-tinta text-crema' : 'active:bg-tinta active:text-crema'
          }`}
        >
          {isSnoozing ? (
            <>
              <span className="material-symbols-outlined text-crema text-lg">alarm</span>
              <span>Agendado para después</span>
            </>
          ) : (
            'Recordarme en 10 minutos'
          )}
        </button>
      </footer>

    </div>
  );
}
