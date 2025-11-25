import { api } from '@/utils/api';
import type { TechStackSearchResponse } from '@/types';

export interface TechStackItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Tech Stack API Service
 * API 호출 로직을 컴포넌트에서 분리하여 관리
 */
export const techStackService = {
  /**
   * 키워드로 기술 스택 검색
   * @param keyword - 검색 키워드
   * @returns 검색된 기술 스택 배열
   */
  search: async (keyword: string): Promise<TechStackItem[]> => {
    try {
      const res = await api.get(
        `/api/tech-stacks?keyword=${encodeURIComponent(keyword)}`
      );

      if (!res.ok) {
        throw new Error('Failed to fetch tech stacks');
      }

      const data: TechStackSearchResponse = await res.json();
      return data.results || [];
    } catch (error) {
      console.error('Tech stack search failed:', error);
      return [];
    }
  },

  /**
   * 새로운 기술 스택 생성
   * @param name - 생성할 기술 스택 이름
   * @returns 생성된 기술 스택 정보
   */
  create: async (name: string): Promise<TechStackItem> => {
    const res = await api.post('/api/tech-stacks', {
      name: name.trim(),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to create tech stack');
    }

    return res.json();
  },
};
