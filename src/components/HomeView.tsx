import React, { useState } from 'react';
import { Patient, Medication, DoseLog, NoteLog } from '../types';
import Header from './Header';
import { motion } from 'motion/react';

interface HomeViewProps {
  patient: Patient;
  medications: Medication[];
  completedDoses: DoseLog[];
  onNavigate: (view: any) => void;
  onOpenSettings: () => void;
  nextMedication?: Medication;
  onSelectMedication: (id: string) => void;
  notes?: NoteLog[];
  onDeleteNote?: (id: string) => void;
}

export default function HomeView({
  patient,
  medications,
  completedDoses,
  onNavigate,
  onOpenSettings,
  nextMedication,
  onSelectMedication,
  notes = [],
  onDeleteNote,
}: HomeViewProps) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'meds'>('tasks');

  // Helper to determine medication status
  const getMedicationStatus = (medId: string): 'taken' | 'snoozed' | 'pending' => {
    // Find logs for this medication
    const logs = completedDoses.filter(log => log.medicationId === medId);
    if (logs.length === 0) return 'pending';
    
    // Sort logs by timestamp descending to find latest status
    const latestLog = [...logs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
    return latestLog.status;
  };

  // Find the next upcoming medication that hasn't been taken yet
  const getNextPendingMedication = () => {
    const pending = medications.filter(med => getMedicationStatus(med.id) !== 'taken');
    if (pending.length === 0) return null;
    
    // Sort by scheduledTime
    return [...pending].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))[0];
  };

  const nextPendingMed = getNextPendingMedication();

  // Progress metrics
  const totalTasks = medications.length;
  const takenTasks = medications.filter(med => getMedicationStatus(med.id) === 'taken').length;
  const isEverythingCompleted = totalTasks > 0 && takenTasks === totalTasks;

  // Sorted medications list (by scheduled time)
  const sortedMedications = [...medications].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  return (
    <div className="min-h-screen font-body-md flex flex-col justify-between overflow-x-hidden bg-crema text-tinta">
      {/* Top Navigation Anchor */}
      <Header patient={patient} onOpenSettings={onOpenSettings} showHomeLogo={true} />

      {/* Main Content Canvas */}
      <main className="w-full px-6 flex-grow max-w-xl mx-auto flex flex-col pt-2 pb-32">
        
        {/* Welcome Header */}
        <section className="mt-4 mb-6">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif-display text-[40px] leading-[1.1] text-tinta font-semibold tracking-tight"
          >
            Hola {patient.name}, <br />
            {isEverythingCompleted 
              ? '¡Todo completado hoy! 🎉' 
              : 'vamos a revisar tus tareas.'}
          </motion.h1>
        </section>

        {/* Tab Selector */}
        <section className="mb-6">
          <div className="bg-hueso/50 p-1.5 rounded-full flex gap-2 w-full max-w-sm mx-auto border border-tinta/5">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'tasks'
                  ? 'bg-tinta text-crema shadow-sm'
                  : 'text-tinta/60 hover:text-tinta hover:bg-tinta/5'
              }`}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: activeTab === 'tasks' ? "'FILL' 1" : undefined }}>
                fact_check
              </span>
              <span>Tareas de Hoy</span>
            </button>
            <button
              onClick={() => setActiveTab('meds')}
              className={`flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'meds'
                  ? 'bg-tinta text-crema shadow-sm'
                  : 'text-tinta/60 hover:text-tinta hover:bg-tinta/5'
              }`}
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: activeTab === 'meds' ? "'FILL' 1" : undefined }}>
                medication
              </span>
              <span>Medicamentos</span>
            </button>
          </div>
        </section>

        {/* Progress Tracker (Only shown under Tareas de Hoy tab) */}
        {activeTab === 'tasks' && totalTasks > 0 && (
          <section className="mb-6 bg-hueso/30 p-4 rounded-2xl border border-tinta/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-taupe uppercase tracking-wider font-label-mono">Progreso Diario</span>
              <span className="text-xs font-bold text-tinta font-mono">{takenTasks} de {totalTasks} listos</span>
            </div>
            <div className="w-full bg-hueso/50 h-3 rounded-full overflow-hidden">
              <motion.div 
                className="bg-verde-salvo h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(takenTasks / totalTasks) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </section>
        )}

        {/* Dynamic Display Area */}
        <section className="mb-8 flex-grow">
          {activeTab === 'tasks' ? (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-taupe font-label-mono mb-2 text-left">Tus Tareas Diarias</h3>
              
              {sortedMedications.length === 0 ? (
                <div className="bg-hueso/20 rounded-3xl p-8 border-2 border-dashed border-tinta/10 text-center">
                  <span className="material-symbols-outlined text-4xl text-taupe mb-2">info</span>
                  <p className="text-sm font-semibold">No hay medicamentos programados.</p>
                  <p className="text-xs text-taupe mt-1">Configúralos en el ícono de tu perfil arriba.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedMedications.map((med) => {
                    const status = getMedicationStatus(med.id);
                    return (
                      <motion.div
                        key={med.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => onSelectMedication(med.id)}
                        className={`p-5 rounded-2xl border transition-all active:scale-[0.98] cursor-pointer flex justify-between items-center shadow-sm ${
                          status === 'taken'
                            ? 'bg-musgo-pastel/40 border-green-200 text-green-900/80'
                            : status === 'snoozed'
                            ? 'bg-durazno-pastel/50 border-amber-200'
                            : 'bg-white border-tinta/5 hover:border-tinta/10'
                        }`}
                      >
                        <div className="flex items-center gap-4 text-left">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm font-mono flex-shrink-0 ${
                            status === 'taken' 
                              ? 'bg-green-100 text-green-700' 
                              : status === 'snoozed'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-sol-pastel text-tinta'
                          }`}>
                            {med.scheduledTime}
                          </div>
                          <div className="text-left">
                            <h4 className="font-semibold text-lg text-tinta leading-tight">{med.name}</h4>
                            <p className="text-xs text-taupe font-medium mt-0.5">{med.dosage} — {med.description}</p>
                          </div>
                        </div>

                        <div>
                          {status === 'taken' ? (
                            <span className="flex items-center gap-1 bg-green-100 text-green-800 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                              <span className="material-symbols-outlined text-sm font-bold">check</span>
                              Tomada
                            </span>
                          ) : status === 'snoozed' ? (
                            <span className="flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap animate-pulse">
                              <span className="material-symbols-outlined text-sm">schedule</span>
                              Pospuesta
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 bg-celeste-pastel text-tinta text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                              <span className="material-symbols-outlined text-sm">alarm</span>
                              Pendiente
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-taupe font-label-mono mb-2 text-left">Tus Medicamentos y Recordatorios</h3>
              
              {sortedMedications.length === 0 ? (
                <div className="bg-hueso/20 rounded-3xl p-8 border-2 border-dashed border-tinta/10 text-center">
                  <span className="material-symbols-outlined text-4xl text-taupe mb-2">info</span>
                  <p className="text-sm font-semibold">No hay medicamentos configurados.</p>
                  <p className="text-xs text-taupe mt-1">Configúralos en el ícono de tu perfil arriba.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {sortedMedications.map((med) => (
                    <motion.div
                      key={med.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => onSelectMedication(med.id)}
                      className="bg-white rounded-2xl p-5 border border-tinta/5 shadow-sm text-left flex gap-4 items-center cursor-pointer active:scale-[0.98] transition-all hover:border-tinta/10"
                    >
                      <div className="w-16 h-16 rounded-full bg-hueso/20 flex-shrink-0 flex items-center justify-center border border-tinta/5 overflow-hidden">
                        <img 
                          src={med.image} 
                          alt={med.name} 
                          className="w-12 h-12 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-lg text-tinta leading-tight">{med.name}</h4>
                          <span className="text-xs font-bold bg-sol-pastel text-amber-800 px-2.5 py-1 rounded-lg flex items-center gap-1 font-mono flex-shrink-0">
                            <span className="material-symbols-outlined text-sm">alarm</span>
                            {med.scheduledTime}
                          </span>
                        </div>
                        <p className="text-sm text-taupe font-semibold mt-0.5">{med.dosage}</p>
                        <p className="text-xs text-taupe/80 mt-1">{med.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Bitácora de Notas */}
        {notes && notes.length > 0 && (
          <section className="mb-8 text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest text-taupe font-label-mono mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base font-semibold">sticky_note_2</span>
              <span>Notas y Bitácora de Hoy</span>
            </h3>
            <div className="space-y-2.5">
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-sol-pastel/30 border border-amber-200/50 p-4 rounded-2xl flex justify-between items-start gap-3 shadow-sm"
                >
                  <div className="flex-grow text-left">
                    <p className="text-sm font-semibold text-tinta leading-relaxed">{note.text}</p>
                    <span className="text-[10px] font-bold text-taupe/80 uppercase font-mono tracking-wider mt-1 block">
                      {note.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hrs
                    </span>
                  </div>
                  {onDeleteNote && (
                    <button
                      onClick={() => onDeleteNote(note.id)}
                      className="text-taupe/60 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full active:scale-90 transition-all cursor-pointer flex-shrink-0"
                      aria-label="Eliminar nota"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Secondary Actions (Ghost Pill Buttons) */}
        <section className="mt-auto space-y-4 pb-4">
          <button 
            onClick={() => onNavigate('assistance')}
            className="w-full border-2 border-tinta/10 text-tinta font-bold text-sm py-5 px-8 rounded-full text-center transition-colors hover:bg-tinta/5 active:bg-tinta/10 cursor-pointer"
          >
            Pedir ayuda a la familia
          </button>
          <button 
            onClick={() => onNavigate('medical_center')}
            className="w-full border-2 border-tinta/10 text-tinta font-bold text-sm py-5 px-8 rounded-full text-center transition-colors hover:bg-tinta/5 active:bg-tinta/10 cursor-pointer"
          >
            Llamar al CESFAM
          </button>
        </section>

      </main>

      {/* Visual Atmosphere Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }}></div>
    </div>
  );
}
