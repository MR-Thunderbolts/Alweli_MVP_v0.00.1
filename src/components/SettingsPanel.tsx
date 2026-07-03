import React, { useState } from 'react';
import { Patient, Medication, Caregiver } from '../types';
import { AVATAR_PRESETS } from '../data';

interface SettingsPanelProps {
  patient: Patient;
  medications: Medication[];
  caregivers: Caregiver[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: Patient, medications: Medication[], caregivers: Caregiver[]) => void;
}

export default function SettingsPanel({
  patient,
  medications,
  caregivers,
  isOpen,
  onClose,
  onSave,
}: SettingsPanelProps) {
  const [editedPatient, setEditedPatient] = useState<Patient>({ ...patient });
  const [editedMedications, setEditedMedications] = useState<Medication[]>([...medications]);
  const [editedCaregivers, setEditedCaregivers] = useState<Caregiver[]>([...caregivers]);

  const [activeTab, setActiveTab] = useState<'cuidador' | 'adulto_mayor'>('cuidador');

  const [newMedName, setNewMedName] = useState('');
  const [newMedDosage, setNewMedDosage] = useState('');
  const [newMedDesc, setNewMedDesc] = useState('');
  const [newMedTime, setNewMedTime] = useState('14:00');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editedPatient, editedMedications, editedCaregivers);
    onClose();
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName.trim() || !newMedDosage.trim()) return;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: newMedName,
      dosage: newMedDosage,
      description: newMedDesc || `(1 pastilla)`,
      scheduledTime: newMedTime,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPsp1G4vGHbOiNBQ_KvEp0R1J7X8b_To5NHGXUZwa1ZBCEoo343M7nt38gGi12foWuQOKqcLTIWloIDu2vHUgvUZ1F9rPl_8wVLATwFe-BPQmTU2-MzVhOzEmfsp8zeqJA1PvbNLOV7DrX5DyJB0HA0QfZy_-gVABslmHLWMAKn78o6dCTrcViVBmAjboN0EdySEFdSkkEG2DY6tgNUOlQZFIHAOqP6L5URxQHJN_o4tsh7hfMIkQakQJ8eh7E2upp7BsnXU7j7w',
      icon: 'medication',
    };

    setEditedMedications([...editedMedications, newMed]);
    setNewMedName('');
    setNewMedDosage('');
    setNewMedDesc('');
    setNewMedTime('14:00');
  };

  const handleRemoveMedication = (id: string) => {
    setEditedMedications(editedMedications.filter(m => m.id !== id));
  };

  const handleCaregiverChange = (index: number, field: keyof Caregiver, value: string) => {
    const updated = [...editedCaregivers];
    updated[index] = { ...updated[index], [field]: value };
    setEditedCaregivers(updated);
  };

  const handleCaregiverProfileChange = (field: keyof Caregiver, value: string) => {
    const updated = [...editedCaregivers];
    if (updated.length > 0) {
      updated[0] = { ...updated[0], [field]: value };
      setEditedCaregivers(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-tinta/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6">
      <div className="bg-crema text-tinta max-w-xl w-full rounded-3xl overflow-hidden shadow-xl border border-tinta/10 my-8 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-tinta/10 flex justify-between items-center bg-crema">
          <h2 className="font-serif-title text-2xl font-bold">Configuración de Alweli</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-tinta/5 flex items-center justify-center hover:bg-tinta/10 active:scale-95 transition-all"
            aria-label="Cerrar configuración"
          >
            <span className="material-symbols-outlined text-tinta">close</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 py-4 border-b border-tinta/10 bg-crema/40">
          <div className="bg-hueso/50 p-1 rounded-full flex gap-2 w-full border border-tinta/5">
            <button
              onClick={() => setActiveTab('cuidador')}
              className={`flex-1 py-2.5 px-4 rounded-full font-bold text-xs transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'cuidador'
                  ? 'bg-tinta text-crema shadow-sm'
                  : 'text-tinta/60 hover:text-tinta hover:bg-tinta/5'
              }`}
            >
              <span className="material-symbols-outlined text-base">support_agent</span>
              <span>Cuidador</span>
            </button>
            <button
              onClick={() => setActiveTab('adulto_mayor')}
              className={`flex-1 py-2.5 px-4 rounded-full font-bold text-xs transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'adulto_mayor'
                  ? 'bg-tinta text-crema shadow-sm'
                  : 'text-tinta/60 hover:text-tinta hover:bg-tinta/5'
              }`}
            >
              <span className="material-symbols-outlined text-base">elderly</span>
              <span>Adulto Mayor</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6 bg-crema">
          
          {activeTab === 'cuidador' && (
            <>
              {/* Caregiver Name and Avatar */}
              <section className="space-y-4">
                <h3 className="font-label-mono text-xs uppercase tracking-widest text-taupe font-bold">Perfil del Cuidador Principal</h3>
                {editedCaregivers.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-hueso/20 p-4 rounded-2xl border border-tinta/5">
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        className="w-16 h-16 rounded-full object-cover border-2 border-tinta/20"
                        src={editedCaregivers[0].avatar}
                        alt={editedCaregivers[0].name}
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs text-taupe font-label-mono">Avatar actual</span>
                    </div>
                    <div className="sm:col-span-2 space-y-3">
                      <div>
                        <label className="block text-xs font-label-mono text-taupe mb-1">Nombre</label>
                        <input
                          type="text"
                          value={editedCaregivers[0].name}
                          onChange={(e) => handleCaregiverProfileChange('name', e.target.value)}
                          className="w-full bg-crema border border-tinta/20 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-tinta/20 focus:outline-none font-semibold text-tinta"
                          placeholder="Nombre del cuidador"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-label-mono text-taupe mb-1">Cambiar Avatar (Gradientes)</label>
                        <div className="flex flex-wrap gap-2">
                          {AVATAR_PRESETS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleCaregiverProfileChange('avatar', preset.url)}
                              className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                                editedCaregivers[0].avatar === preset.url ? 'border-tinta scale-110 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                              }`}
                              title={preset.name}
                            >
                              <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Caregivers management */}
              <section className="space-y-4">
                <h3 className="font-label-mono text-xs uppercase tracking-widest text-taupe font-bold">Contactos de Emergencia / Familia</h3>
                <div className="space-y-4">
                  {editedCaregivers.map((cg, idx) => (
                    <div key={cg.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-hueso/20 p-3 rounded-2xl border border-tinta/5">
                      <div>
                        <label className="block text-[10px] font-label-mono text-taupe uppercase">Nombre {idx + 1}</label>
                        <input
                          type="text"
                          value={cg.name}
                          onChange={(e) => handleCaregiverChange(idx, 'name', e.target.value)}
                          className="w-full bg-crema border border-tinta/20 rounded-lg p-2 text-xs focus:outline-none font-semibold text-tinta"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-label-mono text-taupe uppercase">Relación (Parentesco)</label>
                        <input
                          type="text"
                          value={cg.relation}
                          onChange={(e) => handleCaregiverChange(idx, 'relation', e.target.value)}
                          className="w-full bg-crema border border-tinta/20 rounded-lg p-2 text-xs focus:outline-none text-taupe"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'adulto_mayor' && (
            <>
              {/* Adulto Mayor Profile Name and Avatar */}
              <section className="space-y-4">
                <h3 className="font-label-mono text-xs uppercase tracking-widest text-taupe font-bold">Perfil de Adulto Mayor</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-hueso/20 p-4 rounded-2xl border border-tinta/5">
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      className="w-16 h-16 rounded-full object-cover border-2 border-tinta/20"
                      src={editedPatient.avatar}
                      alt={editedPatient.name}
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs text-taupe font-label-mono">Avatar actual</span>
                  </div>
                  <div className="sm:col-span-2 space-y-3">
                    <div>
                      <label className="block text-xs font-label-mono text-taupe mb-1">Nombre</label>
                      <input
                        type="text"
                        value={editedPatient.name}
                        onChange={(e) => setEditedPatient({ ...editedPatient, name: e.target.value })}
                        className="w-full bg-crema border border-tinta/20 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-tinta/20 focus:outline-none font-semibold text-tinta"
                        placeholder="Nombre del adulto mayor"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-label-mono text-taupe mb-1">Cambiar Avatar (Gradientes)</label>
                      <div className="flex flex-wrap gap-2">
                        {AVATAR_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setEditedPatient({ ...editedPatient, avatar: preset.url })}
                            className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                              editedPatient.avatar === preset.url ? 'border-tinta scale-110 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                            title={preset.name}
                          >
                            <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Medications management */}
              <section className="space-y-4">
                <h3 className="font-label-mono text-xs uppercase tracking-widest text-taupe font-bold">Medicamentos y Remedios</h3>
                
                {/* List */}
                <div className="space-y-2">
                  {editedMedications.length === 0 ? (
                    <p className="text-sm text-taupe italic">No hay medicamentos configurados.</p>
                  ) : (
                    editedMedications.map((med) => (
                      <div key={med.id} className="flex justify-between items-center bg-hueso/30 p-3 rounded-xl border border-tinta/5 text-left">
                        <div>
                          <p className="font-semibold text-sm">{med.name} <span className="text-xs font-normal text-taupe">({med.dosage})</span></p>
                          <p className="text-xs text-taupe">{med.description} — {med.scheduledTime} hrs</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveMedication(med.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-full active:scale-95 transition-all"
                          aria-label={`Eliminar ${med.name}`}
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Add form */}
                <form onSubmit={handleAddMedication} className="bg-crema border border-tinta/10 p-4 rounded-2xl space-y-3">
                  <p className="text-xs font-bold text-tinta font-label-mono text-left">Agregar nuevo recordatorio</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-left">
                      <label className="block text-[10px] font-label-mono text-taupe uppercase">Medicamento</label>
                      <input
                        type="text"
                        value={newMedName}
                        onChange={(e) => setNewMedName(e.target.value)}
                        placeholder="Ej. Losartán"
                        className="w-full bg-hueso/10 border border-tinta/20 rounded-lg p-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-label-mono text-taupe uppercase">Dosis</label>
                      <input
                        type="text"
                        value={newMedDosage}
                        onChange={(e) => setNewMedDosage(e.target.value)}
                        placeholder="Ej. 50 mg."
                        className="w-full bg-hueso/10 border border-tinta/20 rounded-lg p-2 text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2 text-left">
                      <label className="block text-[10px] font-label-mono text-taupe uppercase">Indicaciones</label>
                      <input
                        type="text"
                        value={newMedDesc}
                        onChange={(e) => setNewMedDesc(e.target.value)}
                        placeholder="Ej. (1 pastilla blanca)"
                        className="w-full bg-hueso/10 border border-tinta/20 rounded-lg p-2 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-[10px] font-label-mono text-taupe uppercase">Hora</label>
                      <input
                        type="text"
                        value={newMedTime}
                        onChange={(e) => setNewMedTime(e.target.value)}
                        placeholder="14:00"
                        className="w-full bg-hueso/10 border border-tinta/20 rounded-lg p-2 text-xs focus:outline-none text-center font-mono"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-tinta text-crema text-xs font-bold py-2 rounded-xl hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Agregar a la lista
                  </button>
                </form>
              </section>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-tinta/10 bg-crema flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border border-tinta/30 text-tinta font-bold py-3 px-4 rounded-full active:scale-95 transition-all text-sm cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-tinta text-crema font-bold py-3 px-4 rounded-full hover:opacity-95 active:scale-95 transition-all text-sm cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>

      </div>
    </div>
  );
}
