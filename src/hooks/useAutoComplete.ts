import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

export interface UseAutoCompleteOptions<T> {
  /**
   * 검색 함수 - 키워드를 받아서 결과 배열을 반환
   */
  fetchFn: (keyword: string) => Promise<T[]>;
  /**
   * 새 항목 생성 함수 - 이름을 받아서 생성된 항목 정보 반환
   */
  createFn?: (name: string) => Promise<T>;
  /**
   * 디바운스 시간 (ms)
   */
  debounceMs?: number;
  /**
   * 생성 성공 콜백
   */
  onCreateSuccess?: (item: T) => void;
  /**
   * 생성 실패 콜백
   */
  onCreateError?: (error: Error) => void;
}

/**
 * 자동완성 기능을 위한 범용 Custom Hook
 * 검색, 키보드 네비게이션, 새 항목 생성 기능 제공
 *
 * @example
 * const {
 *   searchKeyword,
 *   setSearchKeyword,
 *   items,
 *   selectedIndex,
 *   handleArrowDown,
 *   handleArrowUp,
 *   handleEnter,
 * } = useAutoComplete({
 *   fetchFn: (keyword) => api.search(keyword),
 *   createFn: (name) => api.create(name),
 * });
 */
export const useAutoComplete = <T extends { name: string }>({
  fetchFn,
  createFn,
  debounceMs = 300,
  onCreateSuccess,
  onCreateError,
}: UseAutoCompleteOptions<T>) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [items, setItems] = useState<T[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isCreating, setIsCreating] = useState(false);

  const debouncedKeyword = useDebounce(searchKeyword, debounceMs);

  // 검색 키워드 변경 시 API 호출
  useEffect(() => {
    if (!debouncedKeyword) {
      setItems([]);
      setSelectedIndex(-1);
      return;
    }

    const fetchItems = async () => {
      try {
        const results = await fetchFn(debouncedKeyword);
        setItems(results);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Auto-complete search failed:', error);
        setItems([]);
        setSelectedIndex(-1);
      }
    };

    fetchItems();
  }, [debouncedKeyword, fetchFn]);

  /**
   * ArrowDown 키 핸들러
   */
  const handleArrowDown = () => {
    const totalItems = items.length;
    const showAddButton = searchKeyword && totalItems === 0;
    const maxIndex = showAddButton ? 0 : totalItems - 1;

    if (selectedIndex === -1) {
      setSelectedIndex(0);
    } else if (selectedIndex < maxIndex) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  /**
   * ArrowUp 키 핸들러
   */
  const handleArrowUp = () => {
    if (selectedIndex === 0) {
      setSelectedIndex(-1);
    } else if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  /**
   * 새 항목 생성
   */
  const createNewItem = async () => {
    if (!searchKeyword.trim() || !createFn) return;

    setIsCreating(true);
    try {
      const newItem = await createFn(searchKeyword.trim());
      onCreateSuccess?.(newItem);

      // 입력 필드 초기화
      setSearchKeyword('');
      setItems([]);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Item creation failed:', error);
      onCreateError?.(error as Error);
    } finally {
      setIsCreating(false);
    }
  };

  /**
   * Enter 키 핸들러
   * @param onSelect - 항목 선택 시 호출할 콜백
   */
  const handleEnter = (onSelect: (item: T) => void) => {
    const totalItems = items.length;

    // 자동완성 항목 선택
    if (selectedIndex >= 0 && selectedIndex < totalItems) {
      onSelect(items[selectedIndex]);
      // 입력 필드 초기화
      setSearchKeyword('');
      setItems([]);
      setSelectedIndex(-1);
      return;
    }

    // 검색 결과가 없을 때 새 항목 생성
    if (searchKeyword && totalItems === 0 && createFn) {
      createNewItem();
    }
  };

  /**
   * 수동으로 입력 필드 초기화
   */
  const reset = () => {
    setSearchKeyword('');
    setItems([]);
    setSelectedIndex(-1);
  };

  return {
    // 상태
    searchKeyword,
    setSearchKeyword,
    items,
    selectedIndex,
    isCreating,

    // 핸들러
    handleArrowDown,
    handleArrowUp,
    handleEnter,
    createNewItem,
    reset,

    // 계산된 값
    showAddButton: Boolean(searchKeyword && items.length === 0 && createFn),
    showDropdown: Boolean(
      items.length > 0 || (searchKeyword && items.length === 0 && createFn)
    ),
  };
};
