import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import DuplicateCheckField from '../components/signup/DuplicateCheckField';
import PasswordField from '../components/signup/PasswordField';
import TermsAgreement from '../components/signup/TermsAgreement';
import Button from '../components/Button';
import { signup } from '../utils/signupApi';
import type { SignupFormData } from '../types/signup';
import { useToast } from '../contexts/ToastContext';

const Signup = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<SignupFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      termsAgreed: false,
    },
  });

  const {
    handleSubmit,
    trigger,
    formState: { isValid },
  } = methods;

  // 회원가입 버튼 활성화 조건
  const isFormReady = isValid;

  const onSubmit = async (data: SignupFormData) => {
    if (!isFormReady || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup(data);

      if (result.success) {
        navigate('/login', { replace: true });
      } else {
        showToast(result.message || '회원가입에 실패했습니다.', 'error');
      }
    } catch (error) {
      console.error('회원가입 에러:', error);
      showToast('회원가입에 실패했습니다.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = () => {
    // 검증 실패 시 에러 메시지가 표시되도록 함 (isSubmitted가 true가 됨)
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await trigger();
    handleSubmit(onSubmit, onError)(e);
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex">
      {/* 왼쪽 파란색 영역 */}
      <div className="w-1/2 h-screen bg-primary relative">
        <div className="flex flex-col items-start gap-9 absolute w-[264px] h-[260px] left-[348px] top-[410px]"></div>
      </div>

      {/* 오른쪽 흰색 영역 */}
      <div className="w-1/2 h-screen bg-white flex items-center justify-center">
        <FormProvider {...methods}>
          <form
            onSubmit={handleFormSubmit}
            className="w-[420px] flex flex-col gap-8"
          >
            {/* 회원가입 제목 */}
            <h1 className="w-full h-[30px] text-24b text-primary flex items-center text-center">
              회원가입
            </h1>

            {/* 이메일 입력 필드 */}
            <DuplicateCheckField
              label="이메일"
              fieldName="email"
              placeholder="이메일을 입력하세요"
            />

            {/* 닉네임 입력 필드 */}
            <DuplicateCheckField
              label="닉네임"
              fieldName="nickname"
              placeholder="닉네임을 입력하세요"
            />

            {/* 비밀번호 입력 필드 */}
            <PasswordField
              label="비밀번호"
              fieldName="password"
              placeholder="비밀번호를 입력하세요"
            />

            {/* 비밀번호 확인 입력 필드 */}
            <PasswordField
              label="비밀번호 확인"
              fieldName="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
            />

            {/* 이용약관 동의 */}
            <TermsAgreement />

            {/* 회원가입 버튼 */}
            <Button
              type="submit"
              priority={!isFormReady ? 'tertiary' : 'primary'}
              className={`w-full h-12 ${!isFormReady ? 'bg-gray-200 text-gray-400' : 'text-white'}`}
            >
              {isSubmitting ? '처리 중...' : '회원가입'}
            </Button>

            {/* 회원이신가요? 로그인 바로가기 */}
            <div className="flex flex-row items-center gap-3 w-[204px] h-5 mx-auto">
              <span className="text-16r text-primary flex items-center">
                회원이신가요?
              </span>
              <Link
                to="/login"
                className="text-16b text-primary flex items-center no-underline hover:text-primary-2 transition-colors"
              >
                로그인 바로가기
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Signup;
