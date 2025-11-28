import { useState, useEffect, useRef, type KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { api } from '@/utils/api';
import { useToast } from '@/contexts/ToastContext';
import { useDebounce } from '@/hooks/useDebounce';
import Input from '@/components/common/Input';
import { Select, SelectContent, SelectItem } from '@/components/ui/select';
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
  const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);

  const { showToast } = useToast();
  // Debounce the search keyword
  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

  const totalItems = autoCompleteTechStacks.length;
  const showAddButton = searchKeyword && totalItems === 0;
  const showDropdown = totalItems > 0 || showAddButton;

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

  // Update input width when input element is available
  useEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, [showDropdown]);

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
    <div className="flex flex-col gap-2 relative">
      <label htmlFor="tech-stack-input" className="text-14m text-gray-600">
        공부/사용 중인 기술 스택
      </label>
      <div className="relative">
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
          <Select open={true} onOpenChange={() => {}}>
            <SelectContent
              style={{ width: inputWidth }}
              position="popper"
              sideOffset={4}
              onCloseAutoFocus={e => e.preventDefault()}
              onEscapeKeyDown={e => {
                e.preventDefault();
                inputRef.current?.focus();
              }}
            >
              {autoCompleteTechStacks.map((option, index) => (
                <SelectItem
                  key={option.id}
                  value={option.id}
                  onSelect={e => {
                    e.preventDefault();
                    handleAddTechStack(option.name);
                  }}
                  className={
                    selectedIndex === index
                      ? 'bg-accent text-accent-foreground'
                      : ''
                  }
                >
                  {option.name}
                </SelectItem>
              ))}
              {showAddButton && (
                <SelectItem
                  value="__create_new__"
                  onSelect={e => {
                    e.preventDefault();
                    handleCreateNewTechStack();
                  }}
                  disabled={isCreating}
                  className={
                    selectedIndex === 0 && totalItems === 0
                      ? 'bg-accent text-accent-foreground'
                      : 'text-blue-600'
                  }
                >
                  {isCreating
                    ? '생성 중...'
                    : `+ Add New Item "${searchKeyword}"`}
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        )}
      </div>

      <ChipList techStacks={techStacks} onDelete={handleDeleteTechStack} />
    </div>
  );
};

export default TechStackSection;
