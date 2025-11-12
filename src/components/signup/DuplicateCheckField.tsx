import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import { checkDuplicate } from '../../utils/signupApi';
import {
  validateEmail,
  validateNickname,
  validateEmailFormat,
  validateNicknameFormat,
} from '../../utils/validation';
import type { SignupFormData } from '../../types/signup';

interface DuplicateCheckFieldProps {
  label: string;
  fieldName: 'email' | 'nickname';
  placeholder: string;
}

const DuplicateCheckField = ({
  label,
  fieldName,
  placeholder,
}: DuplicateCheckFieldProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<SignupFormData>();

  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    available: boolean;
    message: string;
  } | null>(null);
  const fieldValue = watch(fieldName);

  const isValid =
    fieldName === 'email'
      ? validateEmail(fieldValue)
      : validateNickname(fieldValue);

  const registerOptions = {
    email: {
      required: '이메일을 입력해 주세요',
      validate: {
        emailFormat: validateEmailFormat,
      },
    },
    nickname: {
      required: '닉네임을 입력해 주세요',
      validate: {
        nicknameFormat: validateNicknameFormat,
      },
    },
  };

  const registerReturn = register(fieldName, registerOptions[fieldName]);

  const { onChange, onBlur, name, ref } = registerReturn;

  // 입력값이 변경되면 중복 확인 상태 초기화
  useEffect(() => {
    if (fieldValue) {
      setCheckResult(null);
    }
  }, [fieldValue]);

  const handleCheckDuplicate = async () => {
    if (!isValid || !fieldValue) {
      return;
    }

    setIsChecking(true);
    setCheckResult(null);

    try {
      const { available, message } = await checkDuplicate(
        fieldName,
        fieldValue
      );
      setCheckResult({ available, message });
    } catch (error) {
      setCheckResult({ available: false, message: (error as Error).message });
    } finally {
      setIsChecking(false);
    }
  };

  const hasError = errors[fieldName] !== undefined;
  const validationError = hasError ? errors[fieldName]?.message : undefined;
  const isAvailable = checkResult?.available ?? false;
  const showDuplicateError = isValid && !isChecking && !checkResult;

  const displayMessage =
    checkResult?.message ||
    validationError ||
    (showDuplicateError ? '중복을 확인해 주세요' : '');

  const inputClassName =
    (hasError || showDuplicateError) && !isAvailable
      ? 'border border-negative'
      : '';

  return (
    <div className="flex flex-col items-start gap-2 w-[420px]">
      <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
        {label}
      </label>
      <div className="flex flex-row items-center gap-3 w-full h-11">
        <div className="flex-1">
          <Input
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            variant={fieldValue ? 'typing' : 'ready'}
            type={fieldName === 'email' ? 'email' : 'text'}
            placeholder={placeholder}
            className={`w-full ${inputClassName}`}
          />
        </div>
        <Button
          type="button"
          priority="secondary"
          onClick={handleCheckDuplicate}
          className="text-14sb"
        >
          {isChecking ? '확인중...' : '중복확인'}
        </Button>
      </div>
      {displayMessage && (
        <span
          className={`text-12m ${
            isAvailable ? 'text-positive' : 'text-negative'
          }`}
        >
          {displayMessage}
        </span>
      )}
    </div>
  );
};

export default DuplicateCheckField;
