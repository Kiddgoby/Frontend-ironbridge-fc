export interface Player {
  id: number;
  name: string;
  surname: string;
  number: number;
  position: PlayerPosition;
  overallRating: number;
  joinedAt: string; // ISO Date string
  leftAt?: string;  // ISO Date string
  isLegend: boolean;
  imageUrl: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
}

export type PlayerPosition = 
  | 'GK'  | 'DF' | 'LWB' | 'RWB' 
  | 'CM'  | 'CDM' | 'CAM' | 'RM' 
  | 'LM'  | 'ST' | 'RW' | 'LW';
