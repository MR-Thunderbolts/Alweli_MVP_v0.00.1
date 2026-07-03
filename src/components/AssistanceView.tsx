import React from 'react';
import { Patient } from '../types';
import Header from './Header';
import { motion } from 'motion/react';

interface AssistanceViewProps {
  patient: Patient;
  onSelectService: (serviceName: string) => void;
  onOpenSettings: () => void;
  onBack: () => void;
}

export default function AssistanceView({
  patient,
  onSelectService,
  onOpenSettings,
  onBack,
}: AssistanceViewProps) {
  return (
    <div className="min-h-screen bg-crema text-tinta flex flex-col justify-between overflow-x-hidden">
      
      {/* Header bar */}
      <Header patient={patient} onOpenSettings={onOpenSettings} onGoHome={onBack} showHomeLogo={true} onBack={onBack} />

      {/* Main Content Canvas */}
      <main className="px-6 pb-12 flex-grow max-w-md mx-auto w-full flex flex-col justify-between">
        
        {/* Title Section */}
        <section className="mt-6 mb-8 text-left">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-title text-[42px] leading-[1.1] text-tinta font-bold tracking-tight"
          >
            ¿En qué te podemos ayudar hoy?
          </motion.h1>
        </section>

        {/* Vertical Cards List */}
        <div className="flex flex-col space-y-4 mb-8">
          
          {/* Card 1: Farmacia */}
          <motion.button 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => onSelectService('la farmacia')}
            className="w-full bg-durazno-pastel rounded-[2rem] p-6 text-left flex items-center justify-between group transition-all duration-300 shadow-sm border border-[#E9D9CC] active:scale-[0.97]"
          >
            <div className="flex flex-col space-y-2">
              <span className="material-symbols-outlined text-4xl text-tinta mb-2">medication</span>
              <span className="font-headline-md text-xl sm:text-2xl text-tinta font-bold block">Ir a la farmacia</span>
            </div>
            <div className="bg-crema/40 p-3 rounded-full group-hover:bg-crema/80 transition-all">
              <span className="material-symbols-outlined text-tinta">chevron_right</span>
            </div>
          </motion.button>

          {/* Card 2: Médico */}
          <motion.button 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onSelectService('el médico')}
            className="w-full bg-lila-pastel rounded-[2rem] p-6 text-left flex items-center justify-between group transition-all duration-300 shadow-sm border border-[#DCD3E6] active:scale-[0.97]"
          >
            <div className="flex flex-col space-y-2">
              <span className="material-symbols-outlined text-4xl text-tinta mb-2">medical_services</span>
              <span className="font-headline-md text-xl sm:text-2xl text-tinta font-bold block">Acompañarme al médico</span>
            </div>
            <div className="bg-crema/40 p-3 rounded-full group-hover:bg-crema/80 transition-all">
              <span className="material-symbols-outlined text-tinta">chevron_right</span>
            </div>
          </motion.button>

          {/* Card 3: Otra cosa */}
          <motion.button 
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => onSelectService('asistencia')}
            className="w-full bg-crema rounded-[2rem] p-6 text-left flex items-center justify-between group transition-all duration-300 shadow-sm border-2 border-tinta/10 active:scale-[0.97]"
          >
            <div className="flex flex-col space-y-2">
              <span className="material-symbols-outlined text-4xl text-tinta mb-2">more_horiz</span>
              <span className="font-headline-md text-xl sm:text-2xl text-tinta font-bold block">Otra cosa</span>
            </div>
            <div className="bg-tinta/5 p-3 rounded-full group-hover:bg-tinta/10 transition-all">
              <span className="material-symbols-outlined text-tinta">chevron_right</span>
            </div>
          </motion.button>
        </div>

        {/* Feedback Section (Subtle) */}
        <footer className="mt-auto">
          <div className="bg-hueso/20 rounded-2xl p-4 border border-tinta/5 flex items-center justify-center space-x-2">
            <span className="material-symbols-outlined text-sm text-taupe">shield_with_heart</span>
            <p className="font-body-md text-xs text-taupe font-medium">
              Tu seguridad es nuestra prioridad
            </p>
          </div>
          <button
            onClick={onBack}
            className="w-full text-center text-xs underline mt-4 text-taupe hover:text-tinta transition-all font-semibold"
          >
            Volver atrás
          </button>
        </footer>

      </main>
    </div>
  );
}
