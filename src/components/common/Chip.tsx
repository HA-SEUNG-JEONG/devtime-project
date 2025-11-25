import React from 'react';
import type { ChipProps } from '@/types/chip';

const Chip: React.FC<ChipProps> = ({
  label,

  onDelete,
  className = '',
}) => {
  const baseClasses =
    'box-border flex flex-row justify-center items-center bg-primary-10 border border-primary rounded-[5px]';
  const chipClasses = `${baseClasses} gap-2 p-3 ${className}`;

  return (
    <div className={chipClasses}>
      <span className="text-14sb text-primary flex items-center whitespace-nowrap">
        {label}
      </span>

      <button
        type="button"
        onClick={onDelete}
        className="w-5 h-5 flex-none flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="삭제"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 5L5 15M5 5L15 15"
            stroke="#4C79FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Chip;
