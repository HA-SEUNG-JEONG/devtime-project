import { useEffect, type KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useToast } from '../../contexts/ToastContext';
import { useAutoComplete } from '../../hooks/useAutoComplete';
import { techStackService } from '../../services/techStackService';
import SearchableChipInput from '../common/SearchableChipInput';
import type { ProfileFormValues } from '../../types/profile';

const TechStackSection = () => {
  const { setValue, watch, setError, clearErrors } =
    useFormContext<ProfileFormValues>();
  const techStacks = watch('techStacks');
  const { showToast } = useToast();

  // Form validation
  useEffect(() => {
    if (techStacks.length === 0) {
      setError('techStacks', {
        type: 'required',
        message: '최소 하나 이상의 기술 스택을 선택해 주세요.',
      });
    } else {
      clearErrors('techStacks');
    }
  }, [techStacks, setError, clearErrors]);

  // Auto-complete hook
  const {
    searchKeyword,
    setSearchKeyword,
    items: autoCompleteTechStacks,
    selectedIndex,
    isCreating,
    handleArrowDown,
    handleArrowUp,
    handleEnter,
    createNewItem,
    showAddButton,
    showDropdown,
  } = useAutoComplete({
    fetchFn: techStackService.search,
    createFn: techStackService.create,
    onCreateSuccess: item => {
      handleAddTechStack(item.name);
      showToast('새로운 기술 스택이 생성되었습니다.', 'success');
    },
    onCreateError: () => {
      showToast('기술 스택 생성에 실패했습니다.', 'error');
    },
  });

  // 기술 스택 추가
  const handleAddTechStack = (techName: string) => {
    if (!techStacks.includes(techName)) {
      setValue('techStacks', [...techStacks, techName]);
    }
  };

  // 기술 스택 삭제
  const handleDeleteTechStack = (index: number) => {
    setValue(
      'techStacks',
      techStacks.filter((_, i) => i !== index)
    );
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleArrowDown();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // TechStackItem을 string으로 변환하는 래퍼 함수 사용
      handleEnter(item => handleAddTechStack(item.name));
    }
  };

  return (
    <SearchableChipInput
      label="공부/사용 중인 기술 스택"
      inputId="tech-stack-input"
      placeholder="기술 스택을 검색해 등록해 주세요."
      value={searchKeyword}
      onChange={setSearchKeyword}
      items={autoCompleteTechStacks}
      selectedItems={techStacks}
      getItemLabel={item => item.name}
      getItemKey={item => item.id}
      onAddItem={handleAddTechStack}
      onRemoveItem={handleDeleteTechStack}
      selectedIndex={selectedIndex}
      onKeyDown={handleKeyDown}
      onCreateNewItem={createNewItem}
      isCreating={isCreating}
      showAddButton={showAddButton}
      showDropdown={showDropdown}
    />
  );
};

export default TechStackSection;
