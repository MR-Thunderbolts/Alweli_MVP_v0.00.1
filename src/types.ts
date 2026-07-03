export type View =
  | 'home'
  | 'reminder'
  | 'detail'
  | 'success'
  | 'assistance'
  | 'notify_contact'
  | 'notify_success'
  | 'medical_center'
  | 'chat';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  description: string;
  scheduledTime: string; // e.g., "14:00"
  image: string;
  icon: string;
}

export interface Caregiver {
  id: string;
  name: string;
  relation: string; // e.g., "Mi hijo", "Mi vecina"
  avatar: string;
}

export interface DoseLog {
  id: string;
  medicationId: string;
  medicationName: string;
  dosage: string;
  timestamp: Date;
  status: 'taken' | 'snoozed';
}

export interface NoteLog {
  id: string;
  text: string;
  timestamp: Date;
}

export interface Patient {
  name: string;
  avatar: string;
}
