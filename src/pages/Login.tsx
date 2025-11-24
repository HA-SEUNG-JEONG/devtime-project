import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '/vertical-logo.png';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import SymbolLogo from '/Symbol-Logo.png';
import { sanitizeEmail } from '../utils/sanitize';
import { api } from '../utils/api';
import { useToast } from '../contexts/ToastContext';
import { useAuthStore } from '../stores/authStore';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const messageShownRef = useRef(false);

  // 중복 로그인으로 인한 강제 로그아웃 메시지 표시
  useEffect(() => {
    const state = location.state as { message?: string } | null;
    if (state?.message && !messageShownRef.current) {
      messageShownRef.current = true;
      showToast(state.message, 'error');
      // 메시지 표시 후 state 제거
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate, showToast]);

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    const cleanEmail = sanitizeEmail(email);
    const cleanPassword = password.trim();

    try {
      const res = await api.post('/api/auth/login', {
        email: cleanEmail,
        password: cleanPassword,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // authStore의 login 함수로 토큰 저장 및 상태 업데이트
        login(data.accessToken, data.refreshToken, {
          isFirstLogin: data.isFirstLogin,
          isDuplicateLogin: data.isDuplicateLogin,
        });

        // 중복 로그인 처리
        if (data.isDuplicateLogin) {
          // 중복 로그인 안내 메시지 표시
          showToast(
            '다른 기기에서 로그인되어 있습니다.\n다른 기기의 로그인이 해제됩니다.',
            'warning'
          );
        }

        navigate('/', { replace: true });
      } else {
        // 로그인 실패
        showToast(data.message || '로그인 정보를 다시 확인해 주세요.', 'error');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      showToast('로그인 정보를 다시 확인해 주세요.', 'error');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Symbol Logo Background */}
      <img
        src={SymbolLogo}
        alt="Symbol Logo"
        className="w-[1080px] h-[530px] absolute top-0 right-[-218px] object-contain z-0"
      />

      {/* Login Form Container */}
      <div className="absolute w-[500px] h-[598px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white/50 shadow-[0px_40px_100px_40px_rgba(3,104,255,0.05)] backdrop-blur-[25px] rounded-[10px] z-10 flex flex-col items-center p-0 max-lg:relative max-lg:left-auto max-lg:top-auto max-lg:translate-x-0 max-lg:translate-y-0 max-lg:mx-auto max-lg:mt-[10vh] max-sm:w-[calc(100%-32px)] max-sm:max-w-[500px] max-sm:h-auto max-sm:min-h-[598px] max-sm:p-6 max-sm:px-4">
        {/* Vertical Logo */}
        <div className="absolute w-[132px] h-[100px] left-1/2 -translate-x-1/2 top-[112px] flex items-center justify-center max-sm:relative max-sm:left-auto max-sm:top-auto max-sm:translate-x-0 max-sm:mb-8">
          <img
            src={Logo}
            alt="DevTime logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="absolute w-[328px] top-[260px] flex flex-col items-start gap-4 max-sm:relative max-sm:top-auto max-sm:w-full max-sm:max-w-[328px]"
        >
          {/* 이메일 입력 필드 */}
          <div className="flex flex-col items-start p-0 gap-2 w-[328px] h-[70px] max-sm:w-full">
            <label
              htmlFor="email"
              className="w-[328px] h-[18px] text-14m leading-[18px] flex items-center text-gray-600 flex-none self-stretch max-sm:w-full"
            >
              아이디
            </label>
            <div className="w-[328px] h-11 flex-none self-stretch max-sm:w-full">
              <Input
                id="email"
                type="email"
                variant={email ? 'typing' : 'ready'}
                value={email}
                placeholder="이메일을 입력하세요"
                onChange={e => setEmail(e.target.value)}
                className="w-full h-11"
              />
            </div>
          </div>

          {/* 비밀번호 입력 필드 */}
          <div className="flex flex-col items-start p-0 gap-2 w-[328px] h-[70px] max-sm:w-full">
            <label
              htmlFor="password"
              className="w-[328px] h-[18px] text-14m leading-[18px] flex items-center text-gray-600 flex-none self-stretch max-sm:w-full"
            >
              비밀번호
            </label>
            <div className="w-[328px] h-11 flex-none self-stretch max-sm:w-full">
              <Input
                id="password"
                type="password"
                variant={password ? 'typing' : 'ready'}
                value={password}
                placeholder="비밀번호를 입력하세요"
                onChange={e => setPassword(e.target.value)}
                className="w-full h-11"
              />
            </div>
          </div>

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            priority="primary"
            disabled={!isFormValid}
            className={`w-[328px] h-12 mt-2 max-sm:w-full ${
              !isFormValid ? 'bg-gray-400 text-gray-300 cursor-not-allowed' : ''
            }`}
          >
            로그인
          </Button>
        </form>

        {/* 회원가입 링크 */}
        <div className="flex flex-row items-center p-0 gap-4 absolute w-[49px] h-[18px] left-1/2 -translate-x-1/2 top-[556px] max-sm:relative max-sm:left-auto max-sm:top-auto max-sm:translate-x-0 max-sm:mt-6">
          <Link
            to="/signup"
            className="w-[49px] h-[18px] text-14m leading-[18px] text-primary flex items-center justify-center no-underline transition-colors hover:text-indigo"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
