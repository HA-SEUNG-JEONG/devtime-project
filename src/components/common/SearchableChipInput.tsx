import { type KeyboardEvent } from 'react';
import Input from './Input';
import Chip from './Chip';

export interface SearchableChipInputProps<T> {
  /**
   * 현재 검색 키워드
   */
  value: string;
  /**
   * 검색 키워드 변경 핸들러
   */
  onChange: (value: string) => void;
  /**
   * 자동완성 항목 배열
   */
  items: T[];
  /**
   * 선택된 항목 배열 (Chip으로 표시)
   */
  selectedItems: string[];
  /**
   * 항목에서 레이블을 추출하는 함수
   */
  getItemLabel: (item: T) => string;
  /**
   * 항목에서 고유 키를 추출하는 함수
   */
  getItemKey: (item: T) => string;
  /**
   * 항목 추가 핸들러
   */
  onAddItem: (label: string) => void;
  /**
   * 항목 삭제 핸들러
   */
  onRemoveItem: (index: number) => void;
  /**
   * 키보드 네비게이션으로 선택된 인덱스
   */
  selectedIndex: number;
  /**
   * 키보드 이벤트 핸들러
   */
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  /**
   * 새 항목 생성 버튼 클릭 핸들러
   */
  onCreateNewItem?: () => void;
  /**
   * 항목 생성 중 여부
   */
  isCreating?: boolean;
  /**
   * 새 항목 생성 버튼 표시 여부
   */
  showAddButton?: boolean;
  /**
   * 드롭다운 표시 여부
   */
  showDropdown?: boolean;
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Label 텍스트
   */
  label?: string;
  /**
   * Input ID
   */
  inputId?: string;
}

/**
 * 검색 가능한 Chip 입력 컴포넌트
 * 자동완성, 키보드 네비게이션, 새 항목 생성 기능을 포함한 범용 컴포넌트
 *
 * @example
 * <SearchableChipInput
 *   value={searchKeyword}
 *   onChange={setSearchKeyword}
 *   items={techStacks}
 *   selectedItems={selectedTechStacks}
 *   getItemLabel={(item) => item.name}
 *   getItemKey={(item) => item.id}
 *   onAddItem={handleAdd}
 *   onRemoveItem={handleRemove}
 *   selectedIndex={selectedIndex}
 *   onKeyDown={handleKeyDown}
 * />
 */
const SearchableChipInput = <T,>({
  value,
  onChange,
  items,
  selectedItems,
  getItemLabel,
  getItemKey,
  onAddItem,
  onRemoveItem,
  selectedIndex,
  onKeyDown,
  onCreateNewItem,
  isCreating = false,
  showAddButton = false,
  showDropdown = false,
  placeholder = '검색해 주세요.',
  label,
  inputId,
}: SearchableChipInputProps<T>) => {
  const totalItems = items.length;

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className="text-14m text-gray-600">
          {label}
        </label>
      )}

      {/* Input Field */}
      <Input
        id={inputId}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full"
        value={value}
      />

      {/* Autocomplete Dropdown */}
      {showDropdown && (
        <div className="box-border flex flex-col items-start px-3 py-4 gap-4 w-full bg-white border border-gray-300 rounded-[5px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)]">
          {/* 자동완성 항목들 */}
          {items.map((option, index) => (
            <button
              key={getItemKey(option)}
              type="button"
              onClick={() => onAddItem(getItemLabel(option))}
              className={`w-full min-h-[32px] px-3 py-2 text-16sb flex items-center text-left rounded-md transition-all ${
                selectedIndex === index
                  ? 'bg-blue-50 border-2 border-blue-500 text-blue-700 font-bold shadow-sm'
                  : 'bg-transparent border-2 border-transparent text-gray-800 hover:bg-gray-50'
              }`}
            >
              {getItemLabel(option)}
            </button>
          ))}

          {/* Add New Item 버튼 */}
          {showAddButton && onCreateNewItem && (
            <button
              type="button"
              onClick={onCreateNewItem}
              disabled={isCreating}
              className={`w-full min-h-[32px] px-3 py-2 text-16sb flex items-center text-left rounded-md transition-all ${
                selectedIndex === 0 && totalItems === 0
                  ? 'bg-blue-50 border-2 border-blue-500 text-blue-700 font-bold shadow-sm'
                  : 'bg-transparent border-2 border-transparent text-blue-600 hover:bg-blue-50'
              } ${isCreating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isCreating ? '생성 중...' : `+ Add New Item "${value}"`}
            </button>
          )}
        </div>
      )}

      {/* Chip 목록 영역 */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item, index) => (
            <Chip
              key={item}
              label={item}
              deletable={true}
              onDelete={() => onRemoveItem(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableChipInput;
