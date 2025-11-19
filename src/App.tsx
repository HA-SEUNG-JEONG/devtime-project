import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import GuestRoute from './components/GuestRoute';
import { ToastProvider } from './contexts/ToastContext';
import Toast from './components/Toast';
import { isLoggedIn, validateToken } from './utils/auth';
import Home from './pages/Home';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // 중복 로그인 감지를 위한 주기적 토큰 검증
  useEffect(() => {
    // 로그인 상태가 아니면 검증 불필요
    if (!isLoggedIn()) {
      return;
    }

    // 5초마다 토큰 유효성 검증 (중복 로그인 감지)
    const intervalId = setInterval(async () => {
      if (isLoggedIn()) {
        const isValid = await validateToken();

        // 토큰이 무효화된 경우 (중복 로그인으로 인한 강제 로그아웃)
        if (!isValid) {
          // 로그인 페이지로 리다이렉트
          navigate('/login', {
            replace: true,
            state: {
              message: '다른 기기에서 로그인되어 현재 세션이 종료되었습니다.',
            },
          });
        }
      }
    }, 5000); // 5초

    return () => clearInterval(intervalId);
  }, [navigate, location.pathname]);

  return (
    <ToastProvider>
      <Toast />
      <Routes>
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NavBar />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
