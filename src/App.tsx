import React, { useState, useEffect } from 'react';
import { View, Patient, Medication, Caregiver, DoseLog, NoteLog } from './types';
import { INITIAL_PATIENT, INITIAL_MEDICATIONS, INITIAL_CAREGIVERS } from './data';

import HomeView from './components/HomeView';
import ReminderView from './components/ReminderView';
import MedicationDetailView from './components/MedicationDetailView';
import SuccessView from './components/SuccessView';
import AssistanceView from './components/AssistanceView';
import NotifyContactView from './components/NotifyContactView';
import NotifySuccessView from './components/NotifySuccessView';
import MedicalCenterView from './components/MedicalCenterView';
import ChatView from './components/ChatView';
import SettingsPanel from './components/SettingsPanel';
import InteractionBar from './components/InteractionBar';

import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  // Navigation & State
  const [view, setView] = useState<View>('home');
  const [patient, setPatient] = useState<Patient>(INITIAL_PATIENT);
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [caregivers, setCaregivers] = useState<Caregiver[]>(INITIAL_CAREGIVERS);
  const [completedDoses, setCompletedDoses] = useState<DoseLog[]>([]);
  const [notes, setNotes] = useState<NoteLog[]>([]);

  // Selection states
  const [selectedService, setSelectedService] = useState<string>('la farmacia');
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);

  // Settings Panel state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedPatient = localStorage.getItem('alweli_patient');
      if (savedPatient) setPatient(JSON.parse(savedPatient));

      const savedMeds = localStorage.getItem('alweli_medications');
      if (savedMeds) setMedications(JSON.parse(savedMeds));

      const savedCaregivers = localStorage.getItem('alweli_caregivers');
      if (savedCaregivers) setCaregivers(JSON.parse(savedCaregivers));

      const savedLogs = localStorage.getItem('alweli_completed_doses');
      if (savedLogs) {
        const parsed = JSON.parse(savedLogs).map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp),
        }));
        setCompletedDoses(parsed);
      }

      const savedNotes = localStorage.getItem('alweli_notes');
      if (savedNotes) {
        const parsed = JSON.parse(savedNotes).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
        setNotes(parsed);
      }
    } catch (e) {
      console.error('Error restoring localStorage state', e);
    }
  }, []);

  const handleAddNote = (text: string) => {
    const newNote: NoteLog = {
      id: `note-${Date.now()}`,
      text,
      timestamp: new Date(),
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('alweli_notes', JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('alweli_notes', JSON.stringify(updatedNotes));
  };

  // Save changes to patient/meds/caregivers
  const handleSaveSettings = (
    newPatient: Patient,
    newMeds: Medication[],
    newCg: Caregiver[]
  ) => {
    setPatient(newPatient);
    setMedications(newMeds);
    setCaregivers(newCg);

    localStorage.setItem('alweli_patient', JSON.stringify(newPatient));
    localStorage.setItem('alweli_medications', JSON.stringify(newMeds));
    localStorage.setItem('alweli_caregivers', JSON.stringify(newCg));
  };

  // Register taken dose
  const handleConfirmDose = () => {
    const activeMed = activeMedication; // Active medication
    if (!activeMed) return;

    const newLog: DoseLog = {
      id: `log-${Date.now()}`,
      medicationId: activeMed.id,
      medicationName: activeMed.name,
      dosage: activeMed.dosage,
      timestamp: new Date(),
      status: 'taken',
    };

    const updatedLogs = [...completedDoses, newLog];
    setCompletedDoses(updatedLogs);
    localStorage.setItem('alweli_completed_doses', JSON.stringify(updatedLogs));

    setView('success');
  };

  // Snooze medication alert
  const handleSnoozeDose = () => {
    const activeMed = activeMedication;
    if (!activeMed) return;

    const newLog: DoseLog = {
      id: `log-${Date.now()}`,
      medicationId: activeMed.id,
      medicationName: activeMed.name,
      dosage: activeMed.dosage,
      timestamp: new Date(),
      status: 'snoozed',
    };

    const updatedLogs = [...completedDoses, newLog];
    setCompletedDoses(updatedLogs);
    localStorage.setItem('alweli_completed_doses', JSON.stringify(updatedLogs));

    // Return to home screen
    setView('home');
  };

  // Service selection flow helper
  const handleSelectService = (service: string) => {
    setSelectedService(service);
    setView('notify_contact');
  };

  // Caregiver selection flow helper
  const handleSelectCaregiver = (cg: Caregiver) => {
    setSelectedCaregiver(cg);
    setView('notify_success');
  };

  const handleSelectMedication = (id: string, targetView: View = 'reminder') => {
    setSelectedMedicationId(id);
    setView(targetView);
  };

  const activeMedication = medications.find(m => m.id === selectedMedicationId) || medications[0] || INITIAL_MEDICATIONS[0];

  return (
    <div className="min-h-screen bg-crema text-tinta font-sans-body antialiased selection:bg-tinta/10 select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.25 }}
          className="min-h-screen flex flex-col justify-between"
        >
          {view === 'home' && (
            <HomeView
              patient={patient}
              medications={medications}
              completedDoses={completedDoses}
              onNavigate={setView}
              onOpenSettings={() => setIsSettingsOpen(true)}
              nextMedication={activeMedication}
              onSelectMedication={(id) => handleSelectMedication(id, 'reminder')}
              notes={notes}
              onDeleteNote={handleDeleteNote}
            />
          )}

          {view === 'reminder' && (
            <ReminderView
              patient={patient}
              activeMedication={activeMedication}
              onNavigate={setView}
              onBack={() => setView('home')}
            />
          )}

          {view === 'detail' && (
            <MedicationDetailView
              medication={activeMedication}
              onConfirm={handleConfirmDose}
              onSnooze={handleSnoozeDose}
              onBack={() => setView('reminder')}
            />
          )}

          {view === 'success' && (
            <SuccessView onGoHome={() => setView('home')} />
          )}

          {view === 'assistance' && (
            <AssistanceView
              patient={patient}
              onSelectService={handleSelectService}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onBack={() => setView('home')}
            />
          )}

          {view === 'notify_contact' && (
            <NotifyContactView
              selectedService={selectedService}
              caregivers={caregivers}
              onSelectCaregiver={handleSelectCaregiver}
              onCancel={() => setView('assistance')}
            />
          )}

          {view === 'notify_success' && selectedCaregiver && (
            <NotifySuccessView
              caregiver={selectedCaregiver}
              onConfirm={() => setView('home')}
            />
          )}

          {view === 'medical_center' && (
            <MedicalCenterView onBack={() => setView('home')} />
          )}

          {view === 'chat' && (
            <ChatView
              patient={patient}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onBack={() => setView('home')}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating Interaction and Navigation Bar */}
      <InteractionBar
        caregivers={caregivers}
        onNavigate={setView}
        onAddNote={handleAddNote}
        currentView={view}
      />

      {/* Settings Drawer Panel */}
      <SettingsPanel
        patient={patient}
        medications={medications}
        caregivers={caregivers}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
