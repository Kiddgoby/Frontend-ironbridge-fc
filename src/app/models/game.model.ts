export interface Game {
  id: number;
  opponentName: string;
  opponentLogoUrl: string;
  isHome: boolean;
  scheduledAt: string; // ISO Date string
  result?: string;     // e.g., "2-1"
  competition: string;
}
