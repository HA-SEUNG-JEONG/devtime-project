import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/vertical-logo.png';
import Button from '../components/Button';
import Input from '../components/Input';
import SymbolLogo from '/Symbol-Logo.png';
import { setTokens } from '../utils/auth';
import { sanitizeEmail } from '../utils/sanitize';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    // 사용자 입력 sanitization (XSS 방어)
    const cleanEmail = sanitizeEmail(email);
    const cleanPassword = password.trim();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        // 토큰 및 로그인 정보 저장
        setTokens(data.accessToken, data.refreshToken, {
          isFirstLogin: data.isFirstLogin,
          isDuplicateLogin: data.isDuplicateLogin,
        });

        // 로그인 성공 시 메인 페이지(타이머 페이지)로 이동
        navigate('/', { replace: true });
      } else {
        // 로그인 실패
        alert(data.message || '로그인 정보를 다시 확인해 주세요.');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 정보를 다시 확인해 주세요.');
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
