import React, { useId, useState } from 'react';
import type { TooltipProps, TooltipPosition } from '../types/tooltip';

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && isVisible) {
      setIsVisible(false);
    }
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  const getPositionClasses = (pos: TooltipPosition): string => {
    switch (pos) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = (position: TooltipPosition): string => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 -tran	slate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent';
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent';
      default:
        return 'top-full left-1/2 -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent';
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}
      {isVisible && (
        <div
          id={tooltipId}
          className={`absolute z-50 ${getPositionClasses(position)}`}
          role="tooltip"
        >
          {/* Tooltip Content */}
          <div
            className="flex items-center h-[18px] px-2 bg-gray-800 rounded text-14r text-white whitespace-nowrap"
            style={{ lineHeight: '18px' }}
          >
            {text}
          </div>
          {/* Arrow */}
          <div
            className={`absolute w-0 h-0 border-4 ${getArrowClasses(position)}`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
