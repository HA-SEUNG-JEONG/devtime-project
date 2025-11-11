import React, { useRef } from 'react';
import type { ButtonProps, ButtonPriority } from '../types/button';

const Button: React.FC<ButtonProps> = ({
  priority = 'primary',
  children,
  className = '',
  disabled = false,
  onClick,
  onBlur,
  ...props
}) => {
  // 더블 클릭 감지를 위한 ref
  // 두 번째 클릭 시 버튼의 포커스를 제거하여 키보드 접근성 향상
  const clickCountRef = useRef(0);

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
          return `${baseClasses} bg-gray-400 text-white cursor-not-allowed`;
        case 'secondary':
          // Secondary Disabled
          return `${baseClasses} bg-gray-200 text-gray-400 cursor-not-allowed`;
        case 'tertiary':
          // Tertiary Disabled
          return `${baseClasses} bg-gray-200 text-gray-400 cursor-not-allowed`;
        default:
          return `${baseClasses} cursor-not-allowed`;
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
    // 더블 클릭 감지: 두 번째 클릭 시 버튼 포커스 제거
    // 키보드 사용자가 Tab으로 이동한 후 더블 클릭 시 포커스가 남아있는 문제 해결
    clickCountRef.current += 1;

    if (clickCountRef.current === 2) {
      e.currentTarget.blur();
      clickCountRef.current = 0; // 리셋
    }

    if (onClick) {
      onClick(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    // 포커스가 다른 곳으로 이동하면 클릭 카운트 리셋
    // 이렇게 하면 버튼을 떠났다가 다시 돌아왔을 때 카운트가 초기화됨
    clickCountRef.current = 0;
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
