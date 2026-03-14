export interface News {
  id: number;
  title: string;
  content: string;
  category: NewsCategory;
  imageUrl?: string;
  publishedAt: string; // ISO Date string
  isFeatured: boolean;
}

export type NewsCategory = 'MATCH' | 'SIGNING' | 'CLUB' | 'EVENT';
