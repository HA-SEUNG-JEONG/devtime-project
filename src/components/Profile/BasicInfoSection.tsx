import { Controller, useFormContext } from 'react-hook-form';
import Dropdown from '../common/Dropdown';
import Input from '../common/Input';
import {
  EXPERIENCE_OPTIONS,
  STUDY_PURPOSE_OPTIONS,
  OTHER_PURPOSE_OPTION,
} from '../../constants/profileOptions';
import type { ProfileFormValues } from '../../types/profile';
import { useEffect } from 'react';

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
      <Controller
        name="career"
        control={control}
        rules={{ required: '개발 경력을 선택해 주세요.' }}
        render={({ field }) => (
          <Dropdown
            label="개발 경력"
            placeholder="개발 경력을 선택해 주세요."
            options={EXPERIENCE_OPTIONS}
            className="w-full"
            onSelect={field.onChange}
            value={field.value}
          />
        )}
      />

      {/* 공부 목적 */}
      <div className="flex flex-col gap-2">
        <Controller
          name="purpose"
          control={control}
          rules={{ required: '공부 목적을 선택해 주세요.' }}
          render={({ field }) => (
            <Dropdown
              label="공부 목적"
              placeholder="공부의 목적을 선택해 주세요."
              options={STUDY_PURPOSE_OPTIONS}
              className="w-full"
              onSelect={field.onChange}
              value={field.value}
            />
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
