export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'vaccine' | 'checkup' | 'treatment' | 'emergency' | 'grooming';
  vet: string;
  status: 'completed' | 'upcoming';
}

export const timeline: TimelineEvent[] = [
  {
    id: 't1',
    date: 'Dec 28, 2024',
    title: 'Annual Checkup',
    description: 'Full physical examination. All vitals normal. Weight: 28 kg.',
    type: 'checkup',
    vet: 'Dr. Priya Menon',
    status: 'completed',
  },
  {
    id: 't2',
    date: 'Nov 10, 2024',
    title: 'Dental Cleaning',
    description: 'Professional dental cleaning under sedation. No extractions needed.',
    type: 'treatment',
    vet: 'Dr. Ravi Kumar',
    status: 'completed',
  },
  {
    id: 't3',
    date: 'Sep 5, 2024',
    title: 'Rabies Booster',
    description: 'Annual rabies vaccination administered. Next due: Sep 2025.',
    type: 'vaccine',
    vet: 'Dr. Priya Menon',
    status: 'completed',
  },
  {
    id: 't4',
    date: 'Jul 18, 2024',
    title: 'Allergy Update Logged',
    description: 'Penicillin allergy confirmed via reaction. Updated emergency profile.',
    type: 'emergency',
    vet: 'Emergency Vet Team',
    status: 'completed',
  },
  {
    id: 't5',
    date: 'Apr 2, 2024',
    title: 'Distemper + Parvovirus',
    description: 'Core DHPP combination vaccine administered.',
    type: 'vaccine',
    vet: 'Dr. Priya Menon',
    status: 'completed',
  },
  {
    id: 't6',
    date: 'Jun 28, 2025',
    title: 'Next Annual Checkup',
    description: 'Scheduled comprehensive health check.',
    type: 'checkup',
    vet: 'Dr. Priya Menon',
    status: 'upcoming',
  },
];
