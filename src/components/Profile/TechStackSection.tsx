import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { api } from '../../utils/api';
import Input from '../Input';
import Chip from '../Chip';
import type { ProfileFormValues } from '../../types/profile';

const TechStackSection = () => {
  const { setValue, watch, setError, clearErrors } =
    useFormContext<ProfileFormValues>();

  const techStacks = watch('techStacks');
  const [autoCompleteTechStacks, setAutoCompleteTechStacks] = useState<
    { id: string; name: string }[]
  >([]);

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

  const handleChangeStudyGoal = async (keyword: string) => {
    if (!keyword) {
      setAutoCompleteTechStacks([]);
      return;
    }
    const res = await api.get(`/api/tech-stacks?keyword=${keyword}`);
    const data = await res.json();
    setAutoCompleteTechStacks(data.results);
  };

  const handleAddTechStack = (techName: string) => {
    if (!techStacks.includes(techName)) {
      const newTechStacks = [...techStacks, techName];
      setValue('techStacks', newTechStacks);
    }
    setAutoCompleteTechStacks([]);
  };

  const handleDeleteTechStack = (index: number) => {
    const newTechStacks = techStacks.filter((_, i) => i !== index);
    setValue('techStacks', newTechStacks);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="study-goal" className="text-14m text-gray-600">
        공부/사용 중인 기술 스택
      </label>
      <Input
        id="study-goal"
        onChange={e => handleChangeStudyGoal(e.target.value)}
        placeholder="기술 스택을 검색해 등록해 주세요."
        className="w-full"
      />
      {autoCompleteTechStacks.length > 0 && (
        <div className="box-border flex flex-col items-start px-3 py-4 gap-4 w-full bg-white border border-gray-300 rounded-[5px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)]">
          {autoCompleteTechStacks.map(option => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleAddTechStack(option.name)}
              className="w-full h-5 text-16sb text-gray-800 flex items-center text-left bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
            >
              {option.name}
            </button>
          ))}
        </div>
      )}

      {/* Chip 목록 영역 */}
      {techStacks.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {techStacks.map((tech, index) => (
            <Chip
              key={tech}
              label={tech}
              deletable={true}
              onDelete={() => handleDeleteTechStack(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TechStackSection;
