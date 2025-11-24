import React from 'react';
import type { ButtonProps, ButtonPriority } from '../../types/button';

const Button: React.FC<ButtonProps> = ({
  priority = 'primary',
  children,
  className = '',
  disabled = false,
  onClick,
  onBlur,
  ...props
}) => {
  // 공통 스타일 (Figma 디자인 기준)
  const baseClasses =
    'flex flex-row justify-center items-center px-4 py-3 gap-2 rounded-[5px] text-18sb border border-transparent';

  const getButtonClasses = (
    priority: ButtonPriority,
    isDisabled: boolean
  ): string => {
    if (isDisabled) {
      switch (priority) {
        case 'primary':
          // Primary Disabled
          return `${baseClasses} bg-gray-400 text-white`;
        case 'secondary':
          // Secondary Disabled
          return `${baseClasses} bg-gray-200 text-gray-400`;
        case 'tertiary':
          // Tertiary Disabled
          return `${baseClasses} bg-gray-200 text-gray-400`;
        default:
          return `${baseClasses}`;
      }
    }

    switch (priority) {
      case 'primary':
        // Primary button with hover, active, and focus states
        return `${baseClasses} bg-primary hover:bg-primary/90 active:bg-primary/90 focus:border-[1.5px] focus:border-fuchsia text-white transition-colors`;
      case 'secondary':
        // Secondary button with transparent primary background
        return `${baseClasses} bg-primary-10 hover:bg-primary-10/90 active:bg-primary-10/90 focus:border-[1.5px] focus:border-fuchsia text-primary transition-colors`;
      case 'tertiary':
        // Tertiary button with light gray background
        return `${baseClasses} bg-gray-50 hover:bg-gray-200 active:bg-gray-200 focus:border-[1.5px] focus:border-fuchsia text-primary transition-colors`;
      default:
        return baseClasses;
    }
  };

  const buttonClasses = `${getButtonClasses(priority, disabled)} ${className}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 더블 클릭 감지: event.detail을 사용하여 정확한 연속 더블 클릭만 감지
    // 키보드 사용자가 Tab으로 이동한 후 더블 클릭 시 포커스가 남아있는 문제 해결
    // event.detail은 브라우저가 관리하는 연속 클릭 횟수 (1=single, 2=double, 3=triple 등)
    if (e.detail === 2) {
      e.currentTarget.blur();
    }

    if (onClick) {
      onClick(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    // 기존 onBlur 핸들러가 있으면 실행
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      {...props}
      onClick={handleClick}
      onBlur={handleBlur}
    >
      {children}
    </button>
  );
};

export default Button;
