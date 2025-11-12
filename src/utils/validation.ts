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
