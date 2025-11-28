import { Controller, useFormContext } from 'react-hook-form';
import Input from '@/components/common/Input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  EXPERIENCE_OPTIONS,
  STUDY_PURPOSE_OPTIONS,
  OTHER_PURPOSE_OPTION,
} from '@/constants/profileOptions';
import type { ProfileFormValues } from '@/types/profile';
import { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const BasicInfoSection = () => {
  const { control, watch, setValue, clearErrors } =
    useFormContext<ProfileFormValues>();
  const purpose = watch('purpose');

  useEffect(() => {
    if (purpose !== OTHER_PURPOSE_OPTION) {
      setValue('customPurpose', '');
      clearErrors('customPurpose');
    }
  }, [purpose, setValue, clearErrors]);

  const inputClassName = 'w-full text-gray-800 text-16sb';

  return (
    <div className="flex flex-col gap-8">
      {/* 개발 경력 */}
      <div className="flex flex-col gap-2">
        <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
          개발 경력
        </label>
        <Controller
          name="career"
          control={control}
          rules={{ required: '개발 경력을 선택해 주세요.' }}
          render={({ field }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-11 bg-gray-50 rounded-[5px] border-none text-16m text-gray-600 justify-between hover:bg-gray-100"
                >
                  <span className={field.value ? 'text-gray-800' : 'text-gray-300'}>
                    {field.value || '개발 경력을 선택해 주세요.'}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {EXPERIENCE_OPTIONS.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => field.onChange(option)}
                    className="cursor-pointer"
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />
      </div>

      {/* 공부 목적 */}
      <div className="flex flex-col gap-2">
        <label className="w-full h-[18px] text-14m text-gray-600 flex items-center">
          공부 목적
        </label>
        <Controller
          name="purpose"
          control={control}
          rules={{ required: '공부 목적을 선택해 주세요.' }}
          render={({ field }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-11 bg-gray-50 rounded-[5px] border-none text-16m text-gray-600 justify-between hover:bg-gray-100"
                >
                  <span className={field.value ? 'text-gray-800' : 'text-gray-300'}>
                    {field.value || '공부의 목적을 선택해 주세요.'}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {STUDY_PURPOSE_OPTIONS.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => field.onChange(option)}
                    className="cursor-pointer"
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />
        {purpose === OTHER_PURPOSE_OPTION && (
          <Controller
            name="customPurpose"
            control={control}
            rules={{ required: '기타 공부 목적을 입력해 주세요.' }}
            render={({ field }) => (
              <Input
                aria-label="공부 목적"
                placeholder="공부 목적을 입력해 주세요."
                className={inputClassName}
                {...field}
              />
            )}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="study-goal">공부 목표</label>
        {/* 공부 목표 */}
        <Controller
          name="goal"
          control={control}
          rules={{ required: '공부 목표를 입력해 주세요.' }}
          render={({ field }) => (
            <Input
              aria-label="공부 목표"
              id="study-goal"
              placeholder="공부 목표를 입력해 주세요."
              className={inputClassName}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
