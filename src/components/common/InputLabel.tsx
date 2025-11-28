import React from 'react';
import type { InputLabelProps } from '@/types/inputLabel';

const InputLabel: React.FC<InputLabelProps> = ({
  variant = 'placeholder',
  value = '',
  placeholder = 'Placeholder',
  showAddButton = true,
  buttonText = 'Button',
  helperText,
  maxLength,
  className = '',
  onChange,
  onFocus,
  onBlur,
  onButtonClick,
  onHelperTextClick,
  ...props
}) => {
  const containerClasses = `flex flex-row items-center gap-3 h-11 ${className}`;

  if (variant === 'placeholder') {
    return (
      <div className={containerClasses} {...props}>
        {/* Text Field_Input */}
        <div className="flex flex-row items-center px-4 py-3 gap-[10px] flex-1 h-11 bg-gray-50 rounded-[5px]">
          <span className="text-16m text-gray-300 flex items-center flex-1">
            {placeholder}
          </span>
        </div>
        {/* Text Field_button */}
        {/* {showAddButton && (
          <button
            type="button"
            onClick={onButtonClick}
            className="flex flex-row justify-center items-center px-4 py-3 gap-2 w-[76px] h-11 bg-primary-10 rounded-[5px] flex-none"
          >
            <span className="text-14sb text-primary flex items-center text-center">
              {buttonText}
            </span>
          </button>
        )} */}
      </div>
    );
  }

  // Typing 상태 - 실제 입력 가능한 input 필드
  if (variant === 'typing') {
    return (
      <div className={containerClasses} {...props}>
        {/* Text Field_Input */}
        <div className="flex flex-row items-center px-4 py-3 gap-[10px] flex-1 h-11 bg-gray-50 rounded-[5px]">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            autoFocus
            className="text-16m text-gray-800 bg-transparent flex items-center flex-1 w-full h-5 p-0"
          />
          {helperText && (
            <button
              type="button"
              onClick={onHelperTextClick}
              disabled={!value.trim()}
              className={`text-16m flex items-center flex-none bg-transparent border-0 p-0 ${
                !value.trim()
                  ? 'text-[#CCD0D6] cursor-not-allowed opacity-50'
                  : 'text-[#CCD0D6] hover:text-primary active:text-primary cursor-pointer'
              }`}
            >
              {helperText}
            </button>
          )}
        </div>
        {/* Text Field_button */}
      </div>
    );
  }

  // Typed 상태
  return (
    <div className={containerClasses} {...props}>
      {/* Text Field_Input */}
      <div className="flex flex-row items-center px-4 py-3 gap-[10px] flex-1 h-11 bg-gray-50 rounded-[5px]">
        <span className="text-16m text-gray-600 flex items-center flex-1">
          {value || 'Typed'}
        </span>
      </div>
      {/* Text Field_button */}
      {showAddButton && (
        <button
          type="button"
          onClick={onButtonClick}
          className="flex flex-row justify-center items-center px-4 py-3 gap-2 w-[76px] h-11 bg-primary-10 rounded-[5px] flex-none hover:bg-primary-10/90 active:bg-primary-10/90 transition-colors"
        >
          <span className="text-14sb text-primary flex items-center text-center">
            {buttonText}
          </span>
        </button>
      )}
    </div>
  );
};

export default InputLabel;
