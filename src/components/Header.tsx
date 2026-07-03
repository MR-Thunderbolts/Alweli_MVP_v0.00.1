import React from 'react';
import { Patient } from '../types';

interface HeaderProps {
  patient: Patient;
  onOpenSettings: () => void;
  onGoHome?: () => void;
  showHomeLogo?: boolean;
  onBack?: () => void;
}

export default function Header({
  patient,
  onOpenSettings,
  onGoHome,
  showHomeLogo = true,
  onBack,
}: HeaderProps) {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-crema">
      <div className="flex items-center space-x-2">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-tinta hover:opacity-80 active:scale-95 transition-all mr-2 cursor-pointer py-1.5 px-3 rounded-full bg-hueso/25 border border-tinta/5 shadow-sm text-sm font-semibold"
          >
            <span className="material-symbols-outlined text-lg leading-none font-semibold">arrow_back</span>
            <span>Volver</span>
          </button>
        )}
        <div 
          onClick={onGoHome} 
          className={`flex items-center space-x-2 ${onGoHome ? 'cursor-pointer hover:opacity-80 active:scale-95 transition-all' : ''}`}
        >
          {showHomeLogo ? (
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-tinta font-headline-md">
              Alweli
            </span>
          ) : (
            <div className="w-8" />
          )}
        </div>
      </div>
      
      <button
        onClick={onOpenSettings}
        className="relative group focus:outline-none"
        aria-label="Abrir configuración de Alweli"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-tinta/10 active:scale-90 hover:scale-105 transition-all duration-200">
          <img
            className="w-full h-full object-cover"
            src={patient.avatar}
            alt={`Retrato de ${patient.name}`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-tinta/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">settings</span>
          </div>
        </div>
      </button>
    </header>
  );
}
