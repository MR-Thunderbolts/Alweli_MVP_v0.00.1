import React from 'react';
import { Caregiver } from '../types';
import { motion } from 'motion/react';

interface NotifyContactViewProps {
  selectedService: string;
  caregivers: Caregiver[];
  onSelectCaregiver: (caregiver: Caregiver) => void;
  onCancel: () => void;
}

export default function NotifyContactView({
  selectedService,
  caregivers,
  onSelectCaregiver,
  onCancel,
}: NotifyContactViewProps) {
  // Determine text display
  const titleText = selectedService === 'asistencia'
    ? 'Pedir ayuda con otra cosa a...'
    : `Avisar sobre ${selectedService} a...`;

  return (
    <div className="bg-crema text-tinta min-h-screen flex flex-col font-body-lg relative overflow-hidden">
      
      {/* Content Canvas */}
      <main className="flex-grow flex flex-col items-center justify-between px-8 py-16 w-full max-w-md mx-auto z-10">
        
        {/* Top Section: Large Serif Title */}
        <header className="w-full mt-4">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl sm:text-5xl font-bold leading-tight text-tinta tracking-tight text-left"
          >
            {titleText}
          </motion.h1>
        </header>

        {/* Center Section: Giant Pill Buttons */}
        <section className="w-full flex flex-col gap-6 my-10">
          {caregivers.map((cg, idx) => (
            <motion.button 
              key={cg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onSelectCaregiver(cg)}
              className="w-full py-8 px-6 bg-tinta text-crema rounded-full shadow-lg active:scale-95 flex items-center justify-center transition-all duration-200"
            >
              <span className="font-headline-lg-mobile text-[24px] sm:text-[28px] font-bold">
                {cg.relation} {cg.name}
              </span>
            </motion.button>
          ))}
        </section>

        {/* Bottom Section: Cancellation Link */}
        <footer className="w-full flex justify-center pb-4">
          <button 
            onClick={onCancel}
            className="text-tinta font-semibold underline underline-offset-8 decoration-1 opacity-70 hover:opacity-100 transition-opacity p-4"
          >
            Cancelar y volver
          </button>
        </footer>

      </main>

      {/* Subtle Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: "radial-gradient(#1C1812 1px, transparent 1px)", backgroundSize: "32px 32px" }}>
      </div>

    </div>
  );
}
