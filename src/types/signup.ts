export interface SignupFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  termsAgreed: boolean;
}

export interface CheckDuplicateResponse {
  success: boolean;
  available: boolean;
  message: string;
}

export interface SignupResponse {
  success: boolean;
  message?: string;
}
