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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onToggleRef = useRef(onToggle);
  const listboxId = useRef(
    `dropdown-listbox-${Math.random().toString(36).slice(2, 11)}`
  );
  const labelId = useRef(
    `dropdown-label-${Math.random().toString(36).slice(2, 11)}`
  );
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
  const isDropdownOpen = isControlled || isOpen;

  // 드롭다운이 열릴 때 포커스 초기화
  useEffect(() => {
    if (isDropdownOpen) {
      setFocusedIndex(currentSelectedIndex >= 0 ? currentSelectedIndex : 0);
    } else {
      setFocusedIndex(-1);
    }
  }, [isDropdownOpen, currentSelectedIndex]);

  // 포커스된 옵션에 포커스 이동
  useEffect(() => {
    if (
      isDropdownOpen &&
      focusedIndex >= 0 &&
      optionRefs.current[focusedIndex]
    ) {
      optionRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isDropdownOpen]);

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
        setFocusedIndex(-1);
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
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!isDropdownOpen) {
      // 드롭다운이 닫혀있을 때 Space나 Enter로 열기
      if (
        event.key === ' ' ||
        event.key === 'Enter' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp'
      ) {
        event.preventDefault();
        if (!isControlled) {
          setIsOpen(true);
          onToggleRef.current?.(true);
        }
      }
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev < options.length - 1 ? prev + 1 : 0;
          return nextIndex;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev > 0 ? prev - 1 : options.length - 1;
          return nextIndex;
        });
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          handleSelect(options[focusedIndex], focusedIndex);
        }
        break;
      case 'Escape':
        event.preventDefault();
        if (!isControlled) {
          setIsOpen(false);
          onToggleRef.current?.(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev < options.length - 1 ? prev + 1 : 0;
          return nextIndex;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => {
          const nextIndex = prev > 0 ? prev - 1 : options.length - 1;
          return nextIndex;
        });
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleSelect(options[index], index);
        break;
      case 'Escape':
        event.preventDefault();
        if (!isControlled) {
          setIsOpen(false);
          onToggleRef.current?.(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
        }
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(options.length - 1);
        break;
    }
  };

  const displayValue =
    value || (currentSelectedIndex >= 0 && options[currentSelectedIndex]) || '';
  const showPlaceholder =
    !displayValue &&
    (variant === 'unselected' ||
      variant === 'selecting' ||
      variant === 'scrollSelecting');

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col items-start p-0 gap-2 w-[147px] ${className}`}
      {...props}
    >
      <label
        id={labelId.current}
        className="w-[147px] h-[18px] text-14m text-gray-600 flex items-center flex-none order-0 self-stretch grow-0"
      >
        {label}
      </label>

      <div className="flex flex-row items-center p-0 gap-3 w-[147px] h-11 flex-none order-1 self-stretch grow-0">
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-labelledby={labelId.current}
          aria-controls={isDropdownOpen ? listboxId.current : undefined}
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
          id={listboxId.current}
          role="listbox"
          aria-labelledby={labelId.current}
          className={`box-border flex flex-col items-start px-3 py-4 gap-4 w-[147px] bg-white border border-gray-300 rounded-[5px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)] flex-none order-2 self-stretch grow-0 ${
            variant === 'scrollSelecting' ? 'max-h-[340px] overflow-y-auto' : ''
          }`}
        >
          {options.map((option, index) => {
            const isSelected = index === currentSelectedIndex;
            const isLast = index === options.length - 1;
            const optionId = `${listboxId.current}-option-${index}`;

            return (
              <div
                key={index}
                className={`flex flex-col items-start p-0 gap-4 w-[123px] ${
                  isLast ? 'h-5' : 'h-9'
                } flex-none self-stretch grow-0`}
              >
                <button
                  ref={el => {
                    optionRefs.current[index] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  id={optionId}
                  onClick={() => handleSelect(option, index)}
                  onKeyDown={e => handleOptionKeyDown(e, index)}
                  tabIndex={focusedIndex === index ? 0 : -1}
                  className={`w-[123px] h-5 flex items-center flex-none order-0 self-stretch grow-0 text-left bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${
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
