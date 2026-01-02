const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

function getItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export const tokenStorage = {
  getAccessToken: () => getItem(ACCESS_TOKEN_KEY),

  getRefreshToken: () => getItem(REFRESH_TOKEN_KEY),

  setTokens: (accessToken: string, refreshToken: string) => {
    setItem(ACCESS_TOKEN_KEY, accessToken);
    setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  setAccessToken: (accessToken: string) => {
    setItem(ACCESS_TOKEN_KEY, accessToken);
  },

  clearTokens: () => {
    removeItem(ACCESS_TOKEN_KEY);
    removeItem(REFRESH_TOKEN_KEY);
  },

  isLoggedIn: () => !!getItem(ACCESS_TOKEN_KEY),
};
