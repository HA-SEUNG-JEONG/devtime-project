import type React from 'react';

export interface RankingItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  rank: number;
  nickname: string;
  goal: string;
  profileImageUrl?: string;
  totalHours: number;
  dailyAverage: number;
  experience: string;
  stacks: string[];
}
