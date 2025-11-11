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
    'flex flex-row justify-center items-center p-6 gap-4 w-[568px] h-[72px] rounded-[8px]';

  // 상태별 배경색 및 텍스트 색상 클래스 - 상수 사용으로 Tailwind가 인식 가능
  const getContainerClasses = (status: TodoItemStatus): string => {
    const base = `${baseContainerClasses} shadow-[0px_8px_8px_rgba(0,0,0,0.05)] ${className}`;

    if (status === 'checked') {
      return `${base} ${BG_GRAY_400} ${TEXT_WHITE}`;
    }
    if (status === 'failed') {
      return `${base} ${BG_GRAY_200} ${TEXT_GRAY_400}`;
    }
    // list-adding, typing, checkable, completed
    return `${base} ${BG_PRIMARY} ${TEXT_WHITE}`;
  };

  // 텍스트 색상 클래스 - 상수 사용으로 Tailwind가 인식 가능
  const getTextColorClass = (status: TodoItemStatus): string => {
    return status === 'failed' ? TEXT_GRAY_400 : TEXT_WHITE;
  };

  const containerClasses = getContainerClasses(status);

  return (
    <div className={containerClasses}>
      {/* Symbol 아이콘 */}
      <div className="relative w-[42px] h-5 flex-none">
        <div
          className={`absolute w-[42px] h-5 left-1/2 -translate-x-1/2 top-0 flex items-center justify-center`}
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
            className={`text-16sb ${getTextColorClass(status)} flex items-center bg-transparent border-0 outline-0 flex-1 placeholder-transparent`}
            placeholder=""
            autoFocus
          />
          <div className="w-0 h-[18.5px] border-l border-white ml-1 animate-blink absolute right-0" />
        </div>
      ) : (
        <span
          className={`text-16sb ${getTextColorClass(status)} flex items-center flex-1`}
        >
          {text}
        </span>
      )}

      {/* 액션 버튼들 */}
      {status === 'list-adding' && (
        <>
          <button
            onClick={onEdit}
            className="w-6 h-6 flex-none relative cursor-pointer bg-transparent border-0 p-0 flex items-center justify-center"
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
            className="w-6 h-6 flex-none relative cursor-pointer bg-transparent border-0 p-0 flex items-center justify-center"
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
          className="w-6 h-6 flex-none relative cursor-pointer bg-transparent border-0 p-0 flex items-center justify-center"
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
          onChange={() => {}}
          className="flex-none"
        />
      )}
    </div>
  );
};

export default TodoItem;
