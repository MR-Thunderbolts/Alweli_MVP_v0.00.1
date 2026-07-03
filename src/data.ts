import { Medication, Caregiver, Patient } from './types';

export const AVATAR_PRESETS = [
  { name: 'Celeste', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23bae6fd"/><stop offset="100%" stop-color="%230284c7"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Durazno', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23fed7aa"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Lila', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23f3e8ff"/><stop offset="100%" stop-color="%239333ea"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Rosado', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23fbcfe8"/><stop offset="100%" stop-color="%23db2777"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Esmeralda', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23a7f3d0"/><stop offset="100%" stop-color="%23059669"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Oro', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23ca8a04"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Frambuesa', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23fecdd3"/><stop offset="100%" stop-color="%23e11d48"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Menta', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23ccfbf1"/><stop offset="100%" stop-color="%230d9488"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Atardecer', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23fde047"/><stop offset="100%" stop-color="%23db2777"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' },
  { name: 'Océano', url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23a5f3fc"/><stop offset="100%" stop-color="%230f766e"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(%23g)"/></svg>' }
];

export const INITIAL_PATIENT: Patient = {
  name: 'Sofía',
  avatar: AVATAR_PRESETS[3].url, // Rosado
};

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Losartán',
    dosage: '50 mg.',
    description: '(1 pastilla blanca)',
    scheduledTime: '14:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPsp1G4vGHbOiNBQ_KvEp0R1J7X8b_To5NHGXUZwa1ZBCEoo343M7nt38gGi12foWuQOKqcLTIWloIDu2vHUgvUZ1F9rPl_8wVLATwFe-BPQmTU2-MzVhOzEmfsp8zeqJA1PvbNLOV7DrX5DyJB0HA0QfZy_-gVABslmHLWMAKn78o6dCTrcViVBmAjboN0EdySEFdSkkEG2DY6tgNUOlQZFIHAOqP6L5URxQHJN_o4tsh7hfMIkQakQJ8eh7E2upp7BsnXU7j7w',
    icon: 'medication',
  },
  {
    id: 'med-2',
    name: 'Metformina',
    dosage: '850 mg.',
    description: '(1 pastilla grande después de desayunar)',
    scheduledTime: '09:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPsp1G4vGHbOiNBQ_KvEp0R1J7X8b_To5NHGXUZwa1ZBCEoo343M7nt38gGi12foWuQOKqcLTIWloIDu2vHUgvUZ1F9rPl_8wVLATwFe-BPQmTU2-MzVhOzEmfsp8zeqJA1PvbNLOV7DrX5DyJB0HA0QfZy_-gVABslmHLWMAKn78o6dCTrcViVBmAjboN0EdySEFdSkkEG2DY6tgNUOlQZFIHAOqP6L5URxQHJN_o4tsh7hfMIkQakQJ8eh7E2upp7BsnXU7j7w',
    icon: 'pill',
  },
  {
    id: 'med-3',
    name: 'Aspirina Prevent',
    dosage: '100 mg.',
    description: '(1 tableta con la cena)',
    scheduledTime: '21:00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPsp1G4vGHbOiNBQ_KvEp0R1J7X8b_To5NHGXUZwa1ZBCEoo343M7nt38gGi12foWuQOKqcLTIWloIDu2vHUgvUZ1F9rPl_8wVLATwFe-BPQmTU2-MzVhOzEmfsp8zeqJA1PvbNLOV7DrX5DyJB0HA0QfZy_-gVABslmHLWMAKn78o6dCTrcViVBmAjboN0EdySEFdSkkEG2DY6tgNUOlQZFIHAOqP6L5URxQHJN_o4tsh7hfMIkQakQJ8eh7E2upp7BsnXU7j7w',
    icon: 'vaccines',
  }
];

export const INITIAL_CAREGIVERS: Caregiver[] = [
  {
    id: 'care-1',
    name: 'Juan',
    relation: 'Mi hijo',
    avatar: AVATAR_PRESETS[0].url, // Celeste
  },
  {
    id: 'care-2',
    name: 'María',
    relation: 'Mi vecina',
    avatar: AVATAR_PRESETS[2].url, // Lila
  },
];
