import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { tokenStorage } from "@/utils/token";
import axios from "axios";

interface AuthContextValue {
  isLoggedIn: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다.");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => tokenStorage.isLoggedIn());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(tokenStorage.isLoggedIn());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    setIsLoggedIn(true);
  };

  const logout = useCallback(async () => {
    try {
      const accessToken = tokenStorage.getAccessToken();
      if (accessToken) {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      }
    } catch (error) {
      console.log(error ?? "로그아웃에 실패했습니다.");
    } finally {
      tokenStorage.clearTokens();
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
