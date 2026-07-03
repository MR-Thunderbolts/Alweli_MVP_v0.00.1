import React, { useState } from 'react';
import { Caregiver, NoteLog } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface InteractionBarProps {
  caregivers: Caregiver[];
  onNavigate: (view: any) => void;
  onAddNote: (text: string) => void;
  currentView: string;
}

export default function InteractionBar({
  caregivers,
  onNavigate,
  onAddNote,
  currentView,
}: InteractionBarProps) {
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  
  // Quick call simulation
  const [callingName, setCallingName] = useState<string | null>(null);

  // Note fields
  const [noteText, setNoteText] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Predefined quick notes for easy senior typing
  const QUICK_NOTES = [
    'Me siento excelente 😊',
    'Ya almorcé sano 🍲',
    'Me dolió un poco la cabeza 🤕',
    'Ya tomé suficiente agua 💧',
    'Hice mis ejercicios hoy 🚶‍♀️',
    'Me siento un poco cansado/a 😴',
  ];

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    onAddNote(noteText);
    setNoteText('');
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsNoteOpen(false);
    }, 1200);
  };

  const startCall = (name: string) => {
    setCallingName(name);
    setIsPhoneOpen(false);
  };

  // Only show in main navigation views
  const allowedViews = ['home', 'assistance', 'medical_center'];
  if (!allowedViews.includes(currentView)) return null;

  return (
    <>
      {/* Floating Interaction Bar Container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
        <div className="bg-white rounded-full py-2.5 px-3 shadow-[0_12px_40px_rgba(28,24,18,0.15)] border border-tinta/10 flex items-center justify-between">
          
          {/* Phone Button */}
          <button
            onClick={() => setIsPhoneOpen(true)}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-hueso/20 hover:bg-hueso/40 active:scale-95 transition-all text-tinta cursor-pointer"
            aria-label="Llamar contacto"
          >
            <span className="material-symbols-outlined text-2xl font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>
              call
            </span>
          </button>

          {/* Chat Button */}
          <button
            onClick={() => onNavigate('chat')}
            className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-95 transition-all cursor-pointer ${
              currentView === 'chat'
                ? 'bg-tinta text-crema'
                : 'bg-hueso/20 hover:bg-hueso/40 text-tinta'
            }`}
            aria-label="Pedir ayuda"
          >
            <span className="material-symbols-outlined text-2xl font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>
              chat_bubble
            </span>
          </button>

          {/* New Note Pill Button (from the reference image) */}
          <button
            onClick={() => setIsNoteOpen(true)}
            className="flex items-center gap-2 bg-tinta text-crema px-5 py-3 rounded-full hover:bg-tinta/90 active:scale-95 transition-all font-semibold text-sm cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              edit
            </span>
            <span>Nueva nota</span>
          </button>

        </div>
      </div>

      <AnimatePresence>
        {/* Quick Call Modal */}
        {isPhoneOpen && (
          <div className="fixed inset-0 bg-tinta/40 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-crema w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-xl border border-tinta/10 text-left"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif-display text-2xl font-bold text-tinta flex items-center gap-2">
                  <span className="material-symbols-outlined text-verde-salvo text-2xl">phone_in_talk</span>
                  Llamada Rápida
                </h3>
                <button
                  onClick={() => setIsPhoneOpen(false)}
                  className="w-8 h-8 rounded-full bg-hueso/30 flex items-center justify-center text-tinta/60 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <p className="text-sm text-taupe font-semibold mb-4">¿A quién deseas llamar ahora?</p>

              <div className="space-y-3">
                {caregivers.map((cg) => (
                  <button
                    key={cg.id}
                    onClick={() => startCall(cg.name)}
                    className="w-full bg-white p-4 rounded-2xl border border-tinta/5 flex items-center gap-4 active:scale-98 hover:border-tinta/20 transition-all text-left cursor-pointer"
                  >
                    <img src={cg.avatar} alt={cg.name} className="w-12 h-12 rounded-full object-cover border border-tinta/10" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold text-lg text-tinta">{cg.name}</p>
                      <p className="text-xs text-taupe font-medium">{cg.relation}</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-verde-salvo bg-green-50 p-2.5 rounded-full">call</span>
                  </button>
                ))}

                <button
                  onClick={() => startCall('CESFAM de Turno')}
                  className="w-full bg-white p-4 rounded-2xl border border-tinta/5 flex items-center gap-4 active:scale-98 hover:border-tinta/20 transition-all text-left cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100 flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl font-bold">local_hospital</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-tinta">Llamar al CESFAM</p>
                    <p className="text-xs text-taupe font-medium">Centro de Salud Familiar</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-sky-600 bg-sky-50 p-2.5 rounded-full">call</span>
                </button>

                <button
                  onClick={() => startCall('Ambulancia 131')}
                  className="w-full bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-4 active:scale-98 transition-all text-left cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl font-bold">medical_services</span>
                  </div>
                  <div>
                    <p className="font-bold text-lg text-red-700">Emergencia 131</p>
                    <p className="text-xs text-red-500 font-semibold">Llamada de urgencia directa</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-white bg-red-600 p-2.5 rounded-full">call</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* New Note Modal (from reference image button) */}
        {isNoteOpen && (
          <div className="fixed inset-0 bg-tinta/40 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-crema w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-xl border border-tinta/10 text-left"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif-display text-2xl font-bold text-tinta flex items-center gap-2">
                  <span className="material-symbols-outlined text-tinta text-2xl">edit_note</span>
                  Escribir Nota de Hoy
                </h3>
                <button
                  onClick={() => setIsNoteOpen(false)}
                  className="w-8 h-8 rounded-full bg-hueso/30 flex items-center justify-center text-tinta/60 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {savedSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <span className="material-symbols-outlined text-6xl text-verde-salvo animate-bounce">check_circle</span>
                  <p className="text-lg font-bold text-tinta">¡Nota guardada con éxito!</p>
                  <p className="text-sm text-taupe">Se ha agregado a tu bitácora de hoy.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-taupe uppercase tracking-wider mb-2 font-label-mono">Presiona para escribir rápido:</label>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_NOTES.map((qNote, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setNoteText(qNote)}
                          className="bg-white border border-tinta/10 hover:border-tinta/30 rounded-xl px-3 py-2 text-xs font-semibold text-tinta active:scale-95 transition-all text-left cursor-pointer"
                        >
                          {qNote}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-taupe uppercase tracking-wider mb-2 font-label-mono">Escribe tu nota aquí:</label>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Ej. Me siento un poco mareado hoy en la tarde..."
                      rows={4}
                      className="w-full bg-white border border-tinta/20 rounded-2xl p-4 text-sm font-semibold text-tinta focus:outline-none focus:ring-2 focus:ring-tinta/20 resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsNoteOpen(false)}
                      className="flex-1 border border-tinta/20 text-tinta font-bold py-3.5 rounded-full text-sm active:scale-95 transition-all cursor-pointer text-center"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveNote}
                      disabled={!noteText.trim()}
                      className="flex-1 bg-tinta text-crema font-bold py-3.5 rounded-full text-sm active:scale-95 disabled:opacity-40 transition-all cursor-pointer text-center flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">save</span>
                      <span>Guardar Nota</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Calling Modal Overlay */}
        {callingName && (
          <div className="fixed inset-0 bg-verde-salvo text-crema z-[60] flex flex-col justify-between p-8 text-center">
            <div className="mt-12 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest bg-crema/20 px-3 py-1.5 rounded-full font-label-mono">Alweli Conecta</span>
              <p className="text-xl text-crema/80 font-medium">Llamando...</p>
            </div>

            <div className="space-y-6">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-crema/10 rounded-full animate-ping"></div>
                <div className="relative w-32 h-32 rounded-full bg-crema/20 border border-crema/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-crema animate-pulse">phone_in_talk</span>
                </div>
              </div>
              <h2 className="font-serif-display text-4xl font-bold">{callingName}</h2>
              <p className="text-sm text-crema/70 max-w-xs mx-auto">Simulando enlace de llamada segura de emergencia.</p>
            </div>

            <div className="mb-12">
              <button
                onClick={() => setCallingName(null)}
                className="bg-red-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg active:scale-90 hover:bg-red-700 transition-all cursor-pointer"
                aria-label="Cortar llamada"
              >
                <span className="material-symbols-outlined text-4xl">call_end</span>
              </button>
              <p className="text-xs text-crema/60 mt-3 font-semibold">CORTAR LLAMADA</p>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
