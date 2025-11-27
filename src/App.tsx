import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from './components/common/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import GuestRoute from './components/common/GuestRoute';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastProvider } from './contexts/ToastContext';
import Toast from './components/common/Toast';
import { isLoggedIn, validateToken } from './utils/auth';
import Home from './pages/Home';
import TimerPage from './components/timer/TimerPage';

function App() {
  const navigate = useNavigate();

  // 중복 로그인 감지를 위한 주기적 토큰 검증
  useEffect(() => {
    // 로그인 상태가 아니면 검증 불필요
    if (!isLoggedIn()) {
      return;
    }

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
    }, 3600000); // 1시간

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <ToastProvider>
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/timer"
          element={
            <ProtectedRoute>
              <TimerPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NavBar />} />
      </Routes>
    </ToastProvider>
  );
}
export default App;
