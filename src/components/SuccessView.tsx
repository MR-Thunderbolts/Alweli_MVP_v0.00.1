import React from 'react';
import { motion } from 'motion/react';

interface SuccessViewProps {
  onGoHome: () => void;
}

export default function SuccessView({ onGoHome }: SuccessViewProps) {
  return (
    <div className="min-h-screen bg-crema text-tinta flex flex-col justify-between p-6">
      <div className="w-full h-8" /> {/* Top spacer */}

      {/* Success Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center text-center max-w-sm mx-auto">
        
        {/* Subtle Musgo Pastel Circle */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 80 }}
          className="w-32 h-32 rounded-full bg-musgo-pastel flex items-center justify-center mb-6 shadow-sm border border-green-200"
        >
          <span className="material-symbols-outlined text-tinta text-5xl font-bold">
            check
          </span>
        </motion.div>

        {/* Serif Title Message */}
        <motion.h1 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-[44px] leading-[1.1] text-tinta font-bold max-w-[280px]"
        >
          Anotado. Buen trabajo.
        </motion.h1>

        {/* Optional Subtle Monospace Tag for Context */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-xs uppercase tracking-widest text-taupe mt-8 font-semibold"
        >
          Sesión Completada
        </motion.p>
      </main>

      {/* Fixed Bottom Action Area */}
      <footer className="w-full max-w-md mx-auto pb-8">
        <motion.button 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onGoHome}
          className="w-full bg-tinta text-crema font-bold text-lg h-16 rounded-full flex items-center justify-center transition-transform active:scale-[0.98] duration-200 shadow-md hover:opacity-95"
        >
          Volver al inicio
        </motion.button>
      </footer>
    </div>
  );
}
