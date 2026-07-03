import React from 'react';
import { Patient, Medication } from '../types';
import { motion } from 'motion/react';

interface ReminderViewProps {
  patient: Patient;
  activeMedication: Medication;
  onNavigate: (view: any) => void;
  onBack: () => void;
}

export default function ReminderView({
  patient,
  activeMedication,
  onNavigate,
  onBack,
}: ReminderViewProps) {
  return (
    <div className="min-h-screen bg-crema text-tinta flex flex-col items-center justify-between overflow-hidden">
      
      {/* Top AppBar */}
      <header className="w-full pt-12 px-8 flex justify-between items-center">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-display-lg-mobile text-4xl sm:text-5xl text-tinta font-bold tracking-tight leading-tight"
        >
          Hola.<br />Son las {activeMedication.scheduledTime} hrs.
        </motion.h1>
        
        {/* Subtle Back Button */}
        <button
          onClick={onBack}
          className="w-12 h-12 rounded-full bg-tinta/5 flex items-center justify-center active:scale-90 hover:bg-tinta/10 transition-all"
          aria-label="Volver al inicio"
        >
          <span className="material-symbols-outlined text-tinta">arrow_back</span>
        </button>
      </header>

      {/* Main Content Canvas - The Giant Card */}
      <main className="flex-grow flex flex-col items-center justify-center w-full px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={() => onNavigate('detail')}
          className="w-full bg-celeste-pastel cursor-pointer rounded-3xl p-10 shadow-sm border border-outline-variant/20 animate-subtle transition-transform active:scale-[0.98]"
        >
          <div className="flex flex-col gap-6 text-left">
            {/* Large icon for visual grounding */}
            <span aria-hidden="true" className="material-symbols-outlined text-6xl text-tinta mb-2">
              medication
            </span>
            <p className="font-headline-md text-3xl sm:text-4xl text-tinta leading-tight font-bold">
              Es hora de tu pastilla para la {activeMedication.name.toLowerCase()}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="material-symbols-outlined text-tinta text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                alarm
              </span>
              <span className="font-label-mono text-xs uppercase tracking-widest text-tinta/70 font-semibold">
                Programado ahora
              </span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Bottom Action - Single Primary Pill Button */}
      <footer className="w-full pb-16 px-8 flex flex-col items-center gap-8">
        {/* Visual anchor/spacer to prevent clutter */}
        <div className="w-12 h-1 bg-tinta/10 rounded-full"></div>
        <button 
          onClick={() => onNavigate('detail')}
          className="w-full bg-tinta text-crema font-bold text-lg rounded-full py-6 px-12 shadow-md hover:opacity-95 active:scale-95 transition-all duration-200 flex items-center justify-center gap-4"
        >
          <span>Ver detalle</span>
          <span className="material-symbols-outlined text-xl">arrow_forward_ios</span>
        </button>
      </footer>

    </div>
  );
}
