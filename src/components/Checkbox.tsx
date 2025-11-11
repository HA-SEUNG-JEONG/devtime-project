import React from 'react';
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
  const handleClick = () => {
    onChange(!checked);
  };

  // Regular 스타일: 18px x 18px
  if (usage === 'regular') {
    const containerSize = 'w-[18px] h-[18px]';
    const boxSize = 'w-4 h-4'; // 16px
    const borderRadius = 'rounded-[5px]';

    return (
      <button
        type="button"
        onClick={handleClick}
        className={`${containerSize} relative flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 ${className}`}
        aria-label={checked ? 'Checked' : 'Unchecked'}
        aria-checked={checked}
        role="checkbox"
      >
        <div
          className={`absolute ${boxSize} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${borderRadius} box-border flex items-center justify-center ${
            checked
              ? 'bg-primary-10 border border-primary'
              : 'bg-white border border-primary'
          }`}
        >
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={checkIcon}
                alt="Check"
                className="w-full h-full object-contain filter-[brightness(0)_saturate(100%)_invert(40%)_sepia(95%)_saturate(2000%)_hue-rotate(220deg)_brightness(1)_contrast(1)]"
              />
            </div>
          )}
        </div>
      </button>
    );
  }

  // TODO 스타일: 36px x 36px
  const containerSize = 'w-9 h-9'; // 36px
  const boxSize = 'w-7 h-7'; // 28px
  const borderRadius = 'rounded-lg'; // 8px

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${containerSize} relative flex items-center justify-center cursor-pointer bg-transparent border-0 p-0 ${className}`}
      aria-label={checked ? 'Checked' : 'Unchecked'}
      aria-checked={checked}
      role="checkbox"
    >
      <div
        className={`absolute ${boxSize} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${borderRadius} box-border flex items-center justify-center border-[1.5px] border-white ${
          checked ? 'bg-[rgba(255,255,255,0.5)]' : ''
        }`}
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
