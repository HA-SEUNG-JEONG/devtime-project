import React from 'react';
import type { TextAreaProps } from '../../types/textArea';

const TextArea: React.FC<TextAreaProps> = ({
  variant = 'ready',
  value = '',
  placeholder = 'Placeholder',
  className = '',
  onChange,
  onFocus,
  onBlur,
  ...props
}) => {
  // TextArea 컨테이너 스타일 - 세 가지 상태에서 동일한 사이즈 유지
  const baseContainerClasses = `flex flex-row items-start px-3 sm:px-4 gap-[10px] w-full sm:w-[400px] lg:w-[568px] h-auto sm:h-[84px] bg-[#F9FAFB] rounded-[5px] ${className}`;

  // Ready 상태 - Placeholder만 표시
  if (variant === 'ready') {
    return (
      <div className={`${baseContainerClasses} py-3`} {...props}>
        <span className="text-16m text-[#CCD0D6] flex items-center w-full h-5 flex-none grow">
          {placeholder}
        </span>
      </div>
    );
  }

  // Typing 상태 - 실제 입력 가능한 textarea
  if (variant === 'typing') {
    return (
      <div className={`${baseContainerClasses} py-3`} {...props}>
        <textarea
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoFocus
          className="text-16m text-[#1F2937] bg-transparent border-none outline-none flex-1 w-full p-0 resize-none overflow-y-auto"
          style={{
            minHeight: '20px',
            maxHeight: '60px',
            lineHeight: '20px',
          }}
        />
      </div>
    );
  }

  // Typed 상태 - 입력 완료된 텍스트 표시 (padding-top만 12px, bottom은 0px)
  return (
    <div className={`${baseContainerClasses} pt-3 pb-0`} {...props}>
      <span className="text-16m text-[#4B5563] block w-full h-auto sm:h-[80px] overflow-y-auto wrap-break-word whitespace-normal">
        {value ||
          'Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed Typed'}
      </span>
    </div>
  );
};

export default TextArea;
