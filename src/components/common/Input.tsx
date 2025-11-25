import React from 'react';
import type { InputProps } from '@/types/input';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'ready',
      value,
      placeholder = 'Placeholder',
      className = '',
      onChange,
      onFocus,
      onBlur,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputClasses = `flex flex-row items-center px-4 py-3 gap-[10px] h-11 bg-gray-50 rounded-[5px] text-16m  w-full ${
      variant === 'ready'
        ? 'text-gray-300'
        : variant === 'typing'
          ? 'text-gray-800'
          : 'text-gray-600'
    } ${className}`;

    // value prop이 제공되면 controlled component로 동작, 없으면 uncontrolled
    const inputProps = value !== undefined ? { value } : {};

    return (
      <input
        ref={ref}
        type={type}
        {...inputProps}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className={inputClasses}
        autoFocus={variant === 'typing'}
        readOnly={variant === 'typed'}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
