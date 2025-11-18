/**
 * 🔐 인증 관리 유틸리티 (localStorage 기반)
 *
 * 보안 수준: 소규모/개인 프로젝트
 *
 * ⚠️ 보안 권장사항:
 * 1. AccessToken 수명: 15분 이하 권장
 * 2. RefreshToken 수명: 7일 이하 권장
 * 3. HTTPS 필수
 * 4. CSP 헤더 설정 필수 (XSS 방어)
 * 5. 사용자 입력 sanitization 필수
 *
 * 📝 현재 구현의 한계:
 * - localStorage는 XSS 공격에 취약함
 * - 서드파티 스크립트가 토큰 접근 가능
 * - 민감한 데이터 처리 시 httpOnly Cookie 권장
 */

// 토큰 저장 키
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const LOGIN_DATA_KEY = 'loginData';

interface LoginData {
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
}

/**
 * 토큰 저장
 * @param accessToken - 액세스 토큰 (권장 수명: 15분)
 * @param refreshToken - 리프레시 토큰 (권장 수명: 7일)
 * @param loginData - 로그인 관련 메타데이터
 */
export const setTokens = (
  accessToken: string,
  refreshToken: string,
  loginData?: LoginData
) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  if (loginData) {
    localStorage.setItem(LOGIN_DATA_KEY, JSON.stringify(loginData));
  }
  // 로그인 상태 변경 이벤트 발생
  window.dispatchEvent(new Event('loginStatusChanged'));
};

/**
 * AccessToken 가져오기
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * RefreshToken 가져오기
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * 로그인 데이터 가져오기
 */
export const getLoginData = (): LoginData | null => {
  const data = localStorage.getItem(LOGIN_DATA_KEY);
  return data ? JSON.parse(data) : null;
};

/**
 * 로그인 여부 확인
 */
export const isLoggedIn = (): boolean => {
  return !!getAccessToken();
};

/**
 * 로그아웃 - 토큰 및 로그인 정보 삭제
 */
export const clearAuth = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(LOGIN_DATA_KEY);
  // 로그아웃 이벤트 발생
  window.dispatchEvent(new Event('loginStatusChanged'));
};

/**
 * AccessToken 갱신
 * RefreshToken을 사용하여 새로운 AccessToken을 발급받습니다.
 *
 * @returns 새로운 AccessToken 또는 null (갱신 실패 시)
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (data.accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        // 새로운 refreshToken이 있다면 업데이트
        if (data.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        }
        return data.accessToken;
      }
    }

    // 토큰 갱신 실패 시 로그아웃
    clearAuth();
    return null;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    clearAuth();
    return null;
  }
};
