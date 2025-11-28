import React from 'react';
import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
      rightElement,
      ...props
    },
    ref
  ) => {
    const containerClasses = cn(
      'flex flex-row items-center px-4 py-3 gap-[10px] h-11 bg-gray-50 rounded-[5px] w-full',
      className
    );

    const inputClasses = cn(
      'flex-1 bg-transparent outline-none text-16m w-full border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0',
      variant === 'ready'
        ? 'text-gray-300 placeholder:text-gray-300'
        : variant === 'typing'
          ? 'text-gray-800 placeholder:text-gray-300'
          : 'text-gray-600'
    );

    // value prop이 제공되면 controlled component로 동작, 없으면 uncontrolled
    const inputProps = value !== undefined ? { value } : {};

    return (
      <div className={containerClasses}>
        <ShadcnInput
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
        {rightElement}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
