import React, { useState, useRef, useEffect } from 'react';
import type { DropdownProps } from '../types/dropdown';

const ChevronIcon = ({ isUp }: { isUp: boolean }) => (
  <div className="w-6 h-6 flex-none order-1 grow-0 flex items-center justify-center">
    <img
      src={isUp ? '/chevron-up.png' : '/chevron-down.png'}
      alt={isUp ? 'chevron up' : 'chevron down'}
      className="w-6 h-6"
    />
  </div>
);

const isControlledVariant = (variant: string) =>
  variant === 'selecting' ||
  variant === 'scrollSelecting' ||
  variant === 'reselecting';

const Dropdown: React.FC<DropdownProps> = ({
  variant = 'unselected',
  label = 'Dropdown Label',
  value = '',
  placeholder = 'Placeholder',
  options = [],
  selectedIndex = -1,
  className = '',
  onSelect,
  onToggle,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedIndex, setInternalSelectedIndex] =
    useState(selectedIndex);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const onToggleRef = useRef(onToggle);
  const isControlled = isControlledVariant(variant);

  useEffect(() => {
    onToggleRef.current = onToggle;
  }, [onToggle]);

  // selectedIndex prop이 변경되면 내부 state 동기화 (uncontrolled mode에서 prop 초기화 지원)
  useEffect(() => {
    if (selectedIndex >= 0) {
      setInternalSelectedIndex(selectedIndex);
    }
  }, [selectedIndex]);

  // selectedIndex prop이 제공되면 prop 사용, 아니면 내부 state 사용
  const currentSelectedIndex =
    selectedIndex >= 0 ? selectedIndex : internalSelectedIndex;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isControlled) {
          return;
        }
        setIsOpen(false);
        onToggleRef.current?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isControlled]);

  const handleToggle = () => {
    if (!isControlled) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);
      onToggleRef.current?.(newIsOpen);
    }
  };

  const handleSelect = (option: string, index: number) => {
    // selectedIndex prop이 제공되지 않은 경우에만 내부 state 업데이트
    if (selectedIndex < 0) {
      setInternalSelectedIndex(index);
    }
    onSelect?.(option, index);
    if (!isControlled) {
      setIsOpen(false);
      onToggleRef.current?.(false);
    }
  };

  const displayValue =
    value || (currentSelectedIndex >= 0 && options[currentSelectedIndex]) || '';
  const showPlaceholder =
    !displayValue &&
    (variant === 'unselected' ||
      variant === 'selecting' ||
      variant === 'scrollSelecting');
  const isDropdownOpen = isControlled || isOpen;

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col items-start p-0 gap-2 w-[147px] ${className}`}
      {...props}
    >
      <label className="w-[147px] h-[18px] text-14m text-gray-600 flex items-center flex-none order-0 self-stretch grow-0">
        {label}
      </label>

      <div className="flex flex-row items-center p-0 gap-3 w-[147px] h-11 flex-none order-1 self-stretch grow-0">
        <button
          type="button"
          onClick={handleToggle}
          className="flex flex-row items-center justify-between px-3 py-3 pl-4 gap-2 w-full h-11 bg-gray-50 rounded-[5px] flex-none order-0 grow cursor-pointer hover:opacity-90 transition-opacity"
        >
          {showPlaceholder ? (
            <span className="h-5 text-16m text-gray-300 flex items-center flex-none order-0 grow">
              {placeholder}
            </span>
          ) : (
            <span className="h-5 text-16m text-gray-600 flex items-center flex-none order-0 grow">
              {displayValue}
            </span>
          )}
          <ChevronIcon isUp={isDropdownOpen} />
        </button>
      </div>

      {isDropdownOpen && options.length > 0 && (
        <div
          className={`box-border flex flex-col items-start px-3 py-4 gap-4 w-[147px] bg-white border border-gray-300 rounded-[5px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)] flex-none order-2 self-stretch grow-0 ${
            variant === 'scrollSelecting' ? 'max-h-[340px] overflow-y-auto' : ''
          }`}
        >
          {options.map((option, index) => {
            const isSelected = index === currentSelectedIndex;
            const isLast = index === options.length - 1;

            return (
              <div
                key={index}
                className={`flex flex-col items-start p-0 gap-4 w-[123px] ${
                  isLast ? 'h-5' : 'h-9'
                } flex-none self-stretch grow-0`}
              >
                <button
                  type="button"
                  onClick={() => handleSelect(option, index)}
                  className={`w-[123px] h-5 flex items-center flex-none order-0 self-stretch grow-0 text-left bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity ${
                    isSelected
                      ? 'text-16b text-indigo'
                      : 'text-16m text-gray-600'
                  }`}
                >
                  {option}
                </button>
                {!isLast && (
                  <div className="w-[123px] h-0 border border-gray-300 flex-none order-1 self-stretch grow-0" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
