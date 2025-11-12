import { useFormContext } from 'react-hook-form';
import Input from '../Input';
import type { SignupFormData } from '../../types/signup';

interface PasswordFieldProps {
  label: string;
  fieldName: 'password' | 'confirmPassword';
  placeholder: string;
}

const PasswordField = ({
  label,
  fieldName,
  placeholder,
}: PasswordFieldProps) => {
  const {
    register,
    watch,
    formState: { errors, isSubmitted, touchedFields },
  } = useFormContext<SignupFormData>();

  const fieldValue = watch(fieldName);

  const registerReturn =
    fieldName === 'password'
      ? register('password', {
          required: '비밀번호를 입력해 주세요',
          validate: {
            passwordFormat: (value: string) => {
              if (!value || value.trim() === '') {
                return '비밀번호를 입력해 주세요';
              }
              return (
                (value.length >= 8 &&
                  /[a-zA-Z]/.test(value) &&
                  /[0-9]/.test(value)) ||
                '비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.'
              );
            },
          },
        })
      : register('confirmPassword', {
          required: '비밀번호 확인을 입력해 주세요',
          validate: {
            matchPassword: (value: string, formValues: SignupFormData) => {
              if (!value || value.trim() === '') {
                return '비밀번호 확인을 입력해 주세요';
              }
              // 비밀번호가 비어있으면 불일치 메시지를 표시하지 않음
              if (!formValues.password || formValues.password.trim() === '') {
                return true;
              }
              return (
                value === formValues.password || '비밀번호가 일치하지 않습니다'
              );
            },
          },
        });

  const { onChange, onBlur, name, ref } = registerReturn;

  const shouldShowError = isSubmitted || touchedFields[fieldName];
  const errorMessage = shouldShowError
    ? (errors[fieldName]?.message as string | undefined)
    : undefined;

  const inputClassName = errorMessage ? 'border border-negative' : '';

  return (
    <div className="flex flex-col items-start gap-2 w-[420px]">
      <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
        {label}
      </label>
      <Input
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        variant={fieldValue ? 'typing' : 'ready'}
        type="password"
        placeholder={placeholder}
        className={`w-full ${inputClassName}`}
      />
      {errorMessage && (
        <span className="text-12m text-negative">{errorMessage}</span>
      )}
    </div>
  );
};

export default PasswordField;
