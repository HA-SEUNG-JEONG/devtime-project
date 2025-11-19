import { create } from 'zustand';
import { 
  isLoggedIn as checkIsLoggedIn, 
  logout as authLogout,
  setTokens,
  getLoginData
} from '../utils/auth';

interface LoginData {
  isFirstLogin: boolean;
  isDuplicateLogin: boolean;
}

interface AuthState {
  isLoggedIn: boolean;
  loginData: LoginData | null;
  
  // Actions
  login: (accessToken: string, refreshToken: string, loginData?: LoginData) => void;
  logout: () => Promise<void>;
  checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // storage 이벤트 리스너 (다른 탭에서의 변경 감지)
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      // localStorage의 토큰 변경 감지
      if (e.key === 'accessToken' || e.key === null) {
        set({ 
          isLoggedIn: checkIsLoggedIn(),
          loginData: getLoginData()
        });
      }
    });
  }

  return {
    // 초기 상태
    isLoggedIn: checkIsLoggedIn(),
    loginData: getLoginData(),

    // 로그인
    login: (accessToken: string, refreshToken: string, loginData?: LoginData) => {
      setTokens(accessToken, refreshToken, loginData);
      set({ 
        isLoggedIn: true,
        loginData: loginData || null
      });
    },

    // 로그아웃
    logout: async () => {
      await authLogout();
      set({ 
        isLoggedIn: false,
        loginData: null
      });
    },

    // 인증 상태 확인 (수동으로 동기화가 필요한 경우)
    checkAuthStatus: () => {
      set({ 
        isLoggedIn: checkIsLoggedIn(),
        loginData: getLoginData()
      });
    },
  };
});

