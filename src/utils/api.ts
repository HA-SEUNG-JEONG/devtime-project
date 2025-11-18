import { getAccessToken, refreshAccessToken, clearAuth } from './auth';

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

/**
 * 인증이 필요한 API 호출을 위한 fetch 래퍼
 * 자동으로 Authorization 헤더를 추가하고 토큰 갱신을 처리합니다.
 */
export const authFetch = async (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const accessToken = getAccessToken();

  // 헤더에 Authorization 추가
  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  // 첫 번째 요청
  let response = await fetch(url, {
    ...options,
    headers,
  });

  // 401 Unauthorized 응답 시 토큰 갱신 시도
  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();

    // 토큰 갱신 성공 시 재시도
    if (newAccessToken) {
      headers.set('Authorization', `Bearer ${newAccessToken}`);
      response = await fetch(url, {
        ...options,
        headers,
      });
    } else {
      // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
      clearAuth();
      window.location.href = '/login';
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  return response;
};

// API 기본 URL
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * API 유틸리티 함수들
 */
export const api = {
  // GET 요청
  get: async (endpoint: string, options?: FetchOptions) => {
    return authFetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'GET',
    });
  },

  // POST 요청
  post: async (endpoint: string, data?: unknown, options?: FetchOptions) => {
    return authFetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
  },

  // PUT 요청
  put: async (endpoint: string, data?: unknown, options?: FetchOptions) => {
    return authFetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
  },

  // DELETE 요청
  delete: async (endpoint: string, options?: FetchOptions) => {
    return authFetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'DELETE',
    });
  },

  // PATCH 요청
  patch: async (endpoint: string, data?: unknown, options?: FetchOptions) => {
    return authFetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(data),
    });
  },
};
