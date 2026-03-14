export interface Coach {
  id: number;
  name: string;
  surname: string;
  role: string;
  group: CoachGroup;
  imageUrl: string;
  joinedAt: string; // ISO Date string
  leftAt?: string;  // ISO Date string
  bio?: string;
}

export type CoachGroup = 'GK' | 'DEF' | 'MID' | 'FWD' | 'HEAD';
