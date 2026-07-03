import React from 'react';
import { Caregiver } from '../types';
import { motion } from 'motion/react';

interface NotifySuccessViewProps {
  caregiver: Caregiver;
  onConfirm: () => void;
}

export default function NotifySuccessView({
  caregiver,
  onConfirm,
}: NotifySuccessViewProps) {
  return (
    <div className="bg-crema text-tinta flex flex-col min-h-screen">
      
      {/* Top AppBar */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-crema">
        <div className="text-tinta font-bold text-2xl font-headline-md">
          Alweli
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-tinta/10">
          <img
            className="w-full h-full object-cover"
            src={caregiver.avatar}
            alt={`Retrato de ${caregiver.name}`}
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-8 text-center mb-16 max-w-md mx-auto">
        <div className="space-y-6">
          {/* Large Serif Text for confirmation */}
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-tinta leading-tight tracking-tight font-bold"
          >
            Listo. Le hemos enviado un mensaje a {caregiver.name}.
          </motion.h1>
          
          {/* Secondary Descriptive Text */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.3 }}
            className="font-body-lg text-lg text-taupe max-w-[280px] mx-auto font-medium"
          >
            Te avisaremos cuando {caregiver.name === 'María' ? 'ella' : 'él'} responda.
          </motion.p>
        </div>
      </main>

      {/* Bottom Action Area */}
      <footer className="px-8 pb-16 pt-4 max-w-md mx-auto w-full">
        <motion.button 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={onConfirm}
          aria-label="Confirmar y volver"
          className="w-full bg-tinta text-crema font-bold text-lg py-5 rounded-full transition-all duration-300 active:scale-[0.98] hover:opacity-90 shadow-sm"
        >
          Entendido
        </motion.button>
      </footer>

    </div>
  );
}
