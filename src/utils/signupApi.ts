import type {
  CheckDuplicateResponse,
  SignupResponse,
  SignupFormData,
} from '../types/signup';
import { sanitizeEmail, sanitizeNickname } from './sanitize';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * 중복 확인 API (이메일/닉네임 통합)
 */
export const checkDuplicate = async (
  type: 'email' | 'nickname',
  value: string
): Promise<CheckDuplicateResponse> => {
  try {
    const endpoint =
      type === 'email'
        ? '/api/signup/check-email'
        : '/api/signup/check-nickname';
    const param = type === 'email' ? 'email' : 'nickname';

    const response = await fetch(
      `${API_BASE_URL}${endpoint}?${param}=${encodeURIComponent(value)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      try {
        const errorData: CheckDuplicateResponse = await response.json();
        return {
          success: false,
          available: false,
          message: errorData.message || '중복 확인에 실패했습니다.',
        };
      } catch {
        return {
          success: false,
          available: false,
          message: '중복 확인에 실패했습니다.',
        };
      }
    }

    const data: CheckDuplicateResponse = await response.json();
    return data;
  } catch (error) {
    console.error('중복 확인 에러:', error);
    return {
      success: false,
      available: false,
      message: '중복 확인에 실패했습니다.',
    };
  }
};

/**
 * 회원가입 API
 */
export const signup = async (
  formData: SignupFormData
): Promise<SignupResponse> => {
  try {
    // 사용자 입력 sanitization (XSS 방어)
    const cleanData = {
      email: sanitizeEmail(formData.email),
      nickname: sanitizeNickname(formData.nickname),
      password: formData.password.trim(), // 비밀번호는 특수문자 허용
      confirmPassword: formData.confirmPassword.trim(),
    };

    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cleanData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || '회원가입에 실패했습니다.',
        };
      } catch {
        return {
          success: false,
          message: '회원가입에 실패했습니다.',
        };
      }
    }

    const data: SignupResponse = await response.json();
    return {
      success: true,
      message: data.message || '회원가입이 완료되었습니다.',
    };
  } catch (error) {
    console.error('회원가입 에러:', error);
    return {
      success: false,
      message: '회원가입에 실패했습니다.',
    };
  }
};
