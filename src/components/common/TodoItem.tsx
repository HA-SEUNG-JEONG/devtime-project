import React, { useState } from 'react';
import Checkbox from './Checkbox';

const symbolIcon = '/Symbol.png';
const editIcon = '/edit.png';
const checkIcon = '/check.png';
const trashIcon = '/trash.png';

// Tailwind가 인식할 수 있도록 컴포넌트 외부에 클래스 상수 정의
const BG_PRIMARY = 'bg-primary';
const BG_GRAY_400 = 'bg-gray-400';
const BG_GRAY_200 = 'bg-gray-200';
const TEXT_WHITE = 'text-white';
const TEXT_GRAY_400 = 'text-gray-400';

import { cn } from '@/lib/utils';

export type TodoItemStatus =
  | 'list-adding'
  | 'typing'
  | 'checkable'
  | 'checked'
  | 'completed'
  | 'failed';

export interface TodoItemProps {
  status: TodoItemStatus;
  text?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onCheck?: () => void;
  onTextChange?: (text: string) => void;
  className?: string;
}

const TodoItem: React.FC<TodoItemProps> = ({
  status,
  text = 'TODO List Item',
  onEdit,
  onDelete,
  onCheck,
  onTextChange,
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(text);
  const [isChecked, setIsChecked] = useState(false);

  // 공통 스타일
  const baseContainerClasses =
    'flex flex-row justify-center items-center p-4 sm:p-5 lg:p-6 gap-3 sm:gap-4 lg:gap-4 w-full h-auto sm:h-[64px] lg:h-[72px] rounded-[8px]';

  // 상태별 배경색 및 텍스트 색상 클래스 - 상수 사용으로 Tailwind가 인식 가능
  const getContainerClasses = (status: TodoItemStatus): string => {
    let base = cn(
      baseContainerClasses,
      'w-full',
      'shadow-[0px_8px_8px_rgba(0,0,0,0.05)]',
      className
    );

    if (status === 'checked') {
      return cn(base, BG_GRAY_400, TEXT_WHITE);
    }
    if (status === 'failed') {
      return cn(base, BG_GRAY_200, TEXT_GRAY_400);
    }
    // list-adding, typing, checkable, completed
    return cn(base, BG_PRIMARY, TEXT_WHITE);
  };

  // 텍스트 색상 클래스 - 상수 사용으로 Tailwind가 인식 가능
  const getTextColorClass = (status: TodoItemStatus): string => {
    return status === 'failed' ? TEXT_GRAY_400 : TEXT_WHITE;
  };

  const containerClasses = getContainerClasses(status);

  return (
    <div className={containerClasses}>
      {/* Symbol 아이콘 */}
      <div className="relative w-8 h-4 sm:w-9 sm:h-[18px] lg:w-[42px] lg:h-5 flex-none">
        <div
          className={`absolute w-8 h-4 sm:w-9 sm:h-[18px] lg:w-[42px] lg:h-5 left-1/2 -translate-x-1/2 top-0 flex items-center justify-center`}
        >
          <img
            src={symbolIcon}
            alt="Symbol"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* 텍스트 영역 */}
      {status === 'typing' ? (
        <div className="flex flex-row items-center gap-0 flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={e => {
              const newValue = e.target.value;
              setInputValue(newValue);
              onTextChange?.(newValue);
            }}
            className={`text-14sb sm:text-15sb lg:text-16sb ${getTextColorClass(status)} flex items-center bg-transparent border-0 outline-0 flex-1 placeholder-transparent`}
            placeholder=""
            autoFocus
          />
          <div className="w-0 h-4 sm:h-[16px] lg:h-[18.5px] border-l border-white ml-1 animate-blink absolute right-0" />
        </div>
      ) : (
        <span
          className={`text-14sb sm:text-15sb lg:text-16sb ${getTextColorClass(status)} flex items-center flex-1`}
        >
          {text}
        </span>
      )}

      {/* 액션 버튼들 */}
      {status === 'list-adding' && (
        <>
          <button
            onClick={onEdit}
            className="w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 flex-none relative cursor-pointer bg-transparent border-0 p-0 flex items-center justify-center"
            aria-label="Edit"
          >
            <img
              src={editIcon}
              alt="Edit"
              className="w-full h-full object-contain"
            />
          </button>
          <button
            onClick={onDelete}
            className="w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 flex-none relative cursor-pointer bg-transparent border-0 p-0 flex items-center justify-center"
            aria-label="Delete"
          >
            <img
              src={trashIcon}
              alt="Delete"
              className="w-full h-full object-contain"
            />
          </button>
        </>
      )}

      {status === 'typing' && (
        <button
          onClick={onCheck}
          className="w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 flex-none relative cursor-pointer bg-transparent border-0 p-0 flex items-center justify-center"
          aria-label="Check"
        >
          <img
            src={checkIcon}
            alt="Check"
            className="w-full h-full object-contain"
          />
        </button>
      )}

      {status === 'checkable' && (
        <Checkbox
          usage="todo"
          checked={isChecked}
          onChange={checked => {
            setIsChecked(checked);
            if (onCheck) {
              onCheck();
            }
          }}
          className="flex-none"
        />
      )}

      {status === 'checked' && (
        <Checkbox
          usage="todo"
          checked={true}
          onChange={checked => {
            if (onCheck) {
              onCheck();
            }
          }}
          className="flex-none"
        />
      )}
    </div>
  );
};

export default TodoItem;
