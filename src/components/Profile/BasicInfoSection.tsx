import { Controller, useFormContext } from 'react-hook-form';
import Dropdown from '../Dropdown';
import Input from '../Input';
import {
  EXPERIENCE_OPTIONS,
  STUDY_PURPOSE_OPTIONS,
} from '../../constants/profileOptions';
import type { ProfileFormValues } from '../../types/profile';

const BasicInfoSection = () => {
  const { control, watch } = useFormContext<ProfileFormValues>();
  const purpose = watch('purpose');

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
        {purpose === '기타(직접 입력)' && (
          <Controller
            name="customPurpose"
            control={control}
            rules={{
              required:
                purpose === '기타(직접 입력)'
                  ? '기타 공부 목적을 입력해 주세요.'
                  : false,
            }}
            render={({ field }) => (
              <Input
                placeholder="공부 목적을 입력해 주세요."
                className="w-full"
                {...field}
              />
            )}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="study-goal">공부 목표 </label>
        {/* 공부 목표 */}
        <Controller
          name="goal"
          control={control}
          rules={{ required: '공부 목표를 입력해 주세요.' }}
          render={({ field }) => (
            <Input
              placeholder="공부 목표를 입력해 주세요."
              className="w-full"
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
