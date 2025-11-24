import React from 'react';
import type { AutocompleteProps } from '../../types/autocomplete';

const Autocomplete: React.FC<AutocompleteProps> = ({
  label = 'Autocomplete Label',
  variant = 'ready',
  value = '',
  options = [],
  onChange,
  onSelectOption,
  onAddNewItem,
  onFocus,
  onBlur,
  className = '',
  ...props
}) => {
  const inputId = `autocomplete-${Math.random().toString(36).substring(2, 15)}`; // 임시 id
  const handleSelectOption = (option: string) => {
    onSelectOption?.(option);
  };

  const handleAddNewItem = () => {
    onAddNewItem?.();
  };

  return (
    <div
      className={`flex flex-col items-start p-0 gap-2 w-[156px] min-w-[156px] ${className}`}
      {...props}
    >
      {/* Label */}
      <label
        htmlFor={inputId}
        className="w-[156px] h-[18px] text-14m text-gray-600 flex items-center flex-none order-0 self-stretch grow-0"
      >
        {label}
      </label>

      {/* Input Field Container */}
      <div className="flex flex-row items-center px-4 py-3 gap-[10px] w-[156px] h-11 bg-gray-50 rounded-[5px] flex-none order-1 self-stretch grow-0">
        {variant === 'ready' ? (
          <span className="w-[124px] h-5 text-16m text-gray-300 flex items-center flex-none order-0 grow">
            Placeholder
          </span>
        ) : (
          <div className="flex flex-row items-center p-0 flex-none order-0 grow">
            <input
              id={inputId}
              type="text"
              value={value}
              onChange={onChange}
              readOnly={!onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              autoFocus
              className={`h-5 text-16m text-gray-800 flex items-center flex-none order-0 grow-0 bg-transparent border-none outline-none p-0 ${
                value
                  ? 'w-auto'
                  : variant === 'typing'
                    ? 'w-[22px]'
                    : 'w-[86px]'
              } ${variant === 'typing' ? 'min-w-[22px]' : 'min-w-[86px]'}`}
            />
          </div>
        )}
      </div>

      {/* Dropdown - Typing 상태일 때 옵션 목록 표시 */}
      {variant === 'typing' && options.length > 0 && (
        <div className="box-border flex flex-col items-start px-3 py-4 gap-4 w-[156px] bg-white border border-gray-300 rounded-[5px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)] flex-none order-2 self-stretch grow-0">
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectOption(option)}
              className="w-[132px] h-5 text-16sb text-gray-800 flex items-center flex-none order-0 self-stretch grow-0 text-left bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* No Result Dropdown - NoResult 상태일 때 "Add New Item" 옵션 표시 */}
      {variant === 'noResult' && onAddNewItem && (
        <div className="box-border flex flex-row items-start px-3 py-4 gap-1 w-[156px] bg-white border border-gray-300 rounded-[5px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)] flex-none order-2 self-stretch grow-0">
          {/* Plus Icon */}
          <div className="w-5 h-5 flex-none order-0 grow-0 flex items-center justify-center text-indigo">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 1V11M1 6H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Add New Item Text */}
          <button
            type="button"
            onClick={handleAddNewItem}
            className="w-[104px] h-5 text-16sb text-indigo flex items-center flex-none order-1 grow-0 text-left bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
          >
            Add New Item
          </button>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
