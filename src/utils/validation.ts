/**
 * 이메일 유효성 검증
 */
export const validateEmail = (email: string): boolean => {
  if (!email || email.trim() === '') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 비밀번호 유효성 검증
 * - 8자 이상
 * - 영문과 숫자 조합
 */
export const validatePassword = (password: string): boolean => {
  if (!password || password.trim() === '') {
    return false;
  }
  if (password.length < 8) {
    return false;
  }
  // 영문과 숫자 조합 확인
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasLetter && hasNumber;
};

/**
 * 닉네임 유효성 검증
 */
export const validateNickname = (nickname: string): boolean => {
  return nickname.trim() !== '';
};

/**
 * react-hook-form용 이메일 validation 함수
 * required 옵션과 함께 사용
 */
export const validateEmailFormat = (value: string): true | string => {
  if (!value || value.trim() === '') {
    return true; // required 옵션이 처리하므로 여기서는 통과
  }
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || '이메일 형식으로 작성해 주세요'
  );
};

/**
 * react-hook-form용 닉네임 validation 함수
 * required 옵션과 함께 사용
 */
export const validateNicknameFormat = (value: string): true | string => {
  if (!value || value.trim() === '') {
    return '닉네임을 입력해 주세요';
  }
  return true;
};
