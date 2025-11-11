import React from 'react';
import type { InputProps } from '../types/input';

const Input: React.FC<InputProps> = ({
  variant = 'ready',
  value = '',
  placeholder = 'Placeholder',
  className = '',
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  // Text Field_Input 기본 스타일
  const baseContainerClasses = `flex flex-row items-center px-4 py-3 gap-[10px] h-11 bg-gray-50 rounded-[5px] ${className}`;

  // 공통 컨테이너를 사용하고 variant에 따라 내부 내용만 변경
  return (
    <div className={baseContainerClasses} {...props}>
      {variant === 'ready' && (
        <span className="text-16m text-gray-300 flex items-center flex-1">
          {placeholder}
        </span>
      )}
      {variant === 'typing' && (
        <input
          type="text"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoFocus
          className="text-16m text-gray-800 bg-transparent border-none outline-none flex items-center flex-1 w-full h-5 p-0"
        />
      )}
      {variant === 'typed' && (
        <span className="text-16m text-gray-600 flex items-center flex-1">
          {value || 'Typed'}
        </span>
      )}
    </div>
  );
};

export default Input;
