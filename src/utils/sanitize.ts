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
 * HTML 문자를 안전한 엔티티로 변환 (표시용)
 * 사용자가 입력한 텍스트를 화면에 표시할 때 사용
 */
export const escapeHtml = (text: string): string => {
  if (!text) return '';

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, char => map[char] || char);
};

/**
 * URL 검증 및 정제
 */
export const sanitizeUrl = (url: string): string => {
  if (!url) return '';

  // javascript:, data:, vbscript: 등 위험한 프로토콜 차단
  const dangerousProtocols = /^(javascript|data|vbscript|file):/i;

  if (dangerousProtocols.test(url)) {
    console.warn('위험한 URL 프로토콜이 감지되어 차단되었습니다:', url);
    return '';
  }

  return url.trim();
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
