/**
 * 사용자 입력 Sanitization 유틸리티
 *
 * XSS 공격을 방지하기 위해 사용자 입력에서 위험한 문자를 제거합니다.
 */

/**
 * 기본 입력값 정제 (텍스트 입력에 사용)
 * HTML 태그와 스크립트를 제거합니다.
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';

  return input
    .replace(/[<>]/g, '') // HTML 태그 시작/종료 문자 제거
    .replace(/javascript:/gi, '') // javascript: 프로토콜 제거
    .replace(/on\w+\s*=/gi, '') // 이벤트 핸들러 제거 (onclick=, onload= 등)
    .trim();
};

/**
 * 이메일 입력값 정제
 */
export const sanitizeEmail = (email: string): string => {
  if (!email) return '';

  return email
    .toLowerCase()
    .replace(/[<>"']/g, '') // 위험한 특수문자 제거
    .trim();
};

/**
 * 닉네임 입력값 정제
 * 특수문자를 제한하고 길이를 체크합니다.
 */
export const sanitizeNickname = (nickname: string): string => {
  if (!nickname) return '';

  return nickname
    .replace(/[<>"'&]/g, '') // 위험한 특수문자 제거
    .replace(/\s+/g, ' ') // 연속된 공백을 하나로
    .trim()
    .slice(0, 20); // 최대 20자로 제한
};
