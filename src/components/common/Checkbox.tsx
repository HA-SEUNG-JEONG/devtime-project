import React from 'react';
import { Checkbox as ShadcnCheckbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import checkIcon from '/check.png';

export type CheckboxUsage = 'regular' | 'todo';

export interface CheckboxProps {
  usage: CheckboxUsage;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  usage,
  checked,
  onChange,
  className = '',
}) => {
  // Regular 스타일: 18px x 18px
  if (usage === 'regular') {
    return (
      <ShadcnCheckbox
        checked={checked}
        onCheckedChange={onChange}
        className={cn(
          'w-4 h-4 rounded-[5px] border-primary',
          'data-[state=checked]:bg-primary-10 data-[state=checked]:border-primary',
          'data-[state=unchecked]:bg-white data-[state=unchecked]:border-primary',
          className
        )}
      />
    );
  }

  // TODO 스타일: 반응형 크기
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9',
        'relative flex items-center justify-center cursor-pointer bg-transparent border-0 p-0',
        className
      )}
      aria-label={checked ? 'Checked' : 'Unchecked'}
      aria-checked={checked}
      role="checkbox"
    >
      <div
        className={cn(
          'absolute w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7',
          'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'rounded-lg box-border flex items-center justify-center',
          'border-[1.5px] border-white',
          checked && 'bg-[rgba(255,255,255,0.5)]'
        )}
      >
        {checked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={checkIcon}
              alt="Checked"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </button>
  );
};

export default Checkbox;
