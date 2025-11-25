import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { api } from '@/utils/api';
import { useToast } from '@/contexts/ToastContext';
import { useDebounce } from '@/hooks/useDebounce';
import Input from '@/components/common/Input';
import type { ProfileFormValues } from '@/types/profile';
import type { TechStackSearchResponse, TechStackCreateResponse } from '@/types';
import ChipList from './ChipList';

const TechStackSection = () => {
  const { setValue, watch, setError, clearErrors } =
    useFormContext<ProfileFormValues>();

  const techStacks = watch('techStacks');

  const [searchKeyword, setSearchKeyword] = useState('');
  const [autoCompleteTechStacks, setAutoCompleteTechStacks] = useState<
    TechStackSearchResponse['results']
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { showToast } = useToast();
  // Debounce the search keyword
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

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

  // Fetch tech stacks when debounced keyword changes
  useEffect(() => {
    if (!debouncedSearchKeyword) {
      setAutoCompleteTechStacks([]);
      setSelectedIndex(-1);
      return;
    }

    const fetchTechStacks = async () => {
      try {
        const res = await api.get(
          `/api/tech-stacks?keyword=${encodeURIComponent(debouncedSearchKeyword)}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch tech stacks');
        }

        const data: TechStackSearchResponse = await res.json();

        setAutoCompleteTechStacks(data.results || []);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Tech stack search failed:', error);
        setAutoCompleteTechStacks([]);
        setSelectedIndex(-1);
      }
    };

    fetchTechStacks();
  }, [debouncedSearchKeyword, showToast]);

  const handleAddTechStack = (techName: string) => {
    if (!techStacks.includes(techName)) {
      const newTechStacks = [...techStacks, techName];
      setValue('techStacks', newTechStacks);
    }
    setAutoCompleteTechStacks([]);
    setSearchKeyword('');
    setSelectedIndex(-1);
  };

  const handleDeleteTechStack = (index: number) => {
    const newTechStacks = techStacks.filter((_, i) => i !== index);
    setValue('techStacks', newTechStacks);
  };

  const handleCreateNewTechStack = async () => {
    if (!searchKeyword.trim()) return;

    setIsCreating(true);
    try {
      const res = await api.post('/api/tech-stacks', {
        name: searchKeyword.trim(),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw {
          statusCode: res.status,
          message: errorData.message || 'Failed to create tech stack',
        };
      }

      const data: TechStackCreateResponse = await res.json();
      handleAddTechStack(data.techStack.name);
      showToast('새로운 기술 스택이 생성되었습니다.', 'success');
    } catch (error) {
      console.error('Tech stack creation failed:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const totalItems = autoCompleteTechStacks.length;
  const showAddButton = searchKeyword && totalItems === 0;
  const showDropdown = totalItems > 0 || showAddButton;

  const handleArrowDown = () => {
    const maxIndex = showAddButton ? 0 : totalItems - 1;
    if (selectedIndex === -1) {
      setSelectedIndex(0);
    } else if (selectedIndex < maxIndex) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleArrowUp = () => {
    if (selectedIndex === 0) {
      setSelectedIndex(-1);
    } else if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleEnter = () => {
    // 자동완성 항목 선택
    if (selectedIndex >= 0 && selectedIndex < totalItems) {
      handleAddTechStack(autoCompleteTechStacks[selectedIndex].name);
      return;
    }

    // Add New Item 선택 또는 검색어만 있을 때 새 항목 생성
    if (searchKeyword && totalItems === 0) {
      handleCreateNewTechStack();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleArrowDown();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleEnter();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="tech-stack-input" className="text-14m text-gray-600">
        공부/사용 중인 기술 스택
      </label>
      <Input
        ref={inputRef}
        id="tech-stack-input"
        onChange={e => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="기술 스택을 검색해 등록해 주세요."
        className="w-full"
        value={searchKeyword}
      />
      {showDropdown && (
        <div className="box-border flex flex-col items-start px-3 py-4 gap-4 w-full bg-white border border-gray-300 rounded-[5px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)]">
          {autoCompleteTechStacks.map((option, index) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleAddTechStack(option.name)}
              className={`w-full min-h-[32px] px-3 py-2 text-16sb flex items-center text-left rounded-md transition-all ${
                selectedIndex === index
                  ? 'bg-blue-50 border-2 border-blue-500 text-blue-700 font-bold shadow-sm'
                  : 'bg-transparent border-2 border-transparent text-gray-800 hover:bg-gray-50'
              }`}
            >
              {option.name}
            </button>
          ))}
          {showAddButton && (
            <button
              type="button"
              onClick={handleCreateNewTechStack}
              disabled={isCreating}
              className={`w-full min-h-[32px] px-3 py-2 text-16sb flex items-center text-left rounded-md transition-all ${
                selectedIndex === 0 && totalItems === 0
                  ? 'bg-blue-50 border-2 border-blue-500 text-blue-700 font-bold shadow-sm'
                  : 'bg-transparent border-2 border-transparent text-blue-600 hover:bg-blue-50'
              } ${isCreating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isCreating ? '생성 중...' : `+ Add New Item "${searchKeyword}"`}
            </button>
          )}
        </div>
      )}

      <ChipList techStacks={techStacks} onDelete={handleDeleteTechStack} />
    </div>
  );
};

export default TechStackSection;
