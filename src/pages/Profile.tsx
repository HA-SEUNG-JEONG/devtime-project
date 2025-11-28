import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import Dialog from '@/components/common/Dialog';
import { api } from '@/utils/api';
import { useToast } from '@/contexts/ToastContext';
import { OTHER_PURPOSE_OPTION } from '@/constants/profileOptions';
import ProfileImageSection from '@/components/Profile/ProfileImageSection';
import TechStackSection from '@/components/Profile/TechStackSection';
import BasicInfoSection from '@/components/Profile/BasicInfoSection';
import type { ProfileFormValues } from '@/types/profile';

const Profile = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const methods = useForm<ProfileFormValues>({
    defaultValues: {
      career: '',
      purpose: '',
      customPurpose: '',
      goal: '',
      techStacks: [],
      profileImage: null,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<ProfileFormValues> = async data => {
    const { career, purpose, customPurpose, goal, techStacks, profileImage } =
      data;

    const finalPurpose =
      purpose === OTHER_PURPOSE_OPTION ? customPurpose : purpose;

    try {
      const res = await api.post('/api/profile', {
        career,
        purpose: finalPurpose,
        goal,
        techStacks,
        profileImage,
      });

      if (res.ok) {
        navigate('/timer');
      } else {
        showToast('프로필 저장에 실패했습니다.', 'error');
      }
    } catch (error) {
      console.error('Profile save failed:', error);
      showToast('프로필 저장 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex">
      {/* 왼쪽 파란색 영역 */}
      <div className="w-1/2 h-screen bg-primary relative flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/vertical-logo.png"
            alt="DevTime Logo"
            className="w-[264px]"
          />
          <p className="text-white text-18m text-center">
            개발자를 위한 타이머
          </p>
        </div>
      </div>

      {/* 오른쪽 흰색 영역 */}
      <div className="w-1/2 h-screen bg-white flex items-center justify-center overflow-y-auto">
        <div className="w-[420px] flex flex-col gap-8 py-8">
          {/* 프로필 설정 제목 */}
          <h1 className="w-full h-[30px] text-24b text-primary flex items-center">
            프로필 설정
          </h1>

          <FormProvider {...methods}>
            {/* 개발 경력, 공부 목적, 공부 목표 */}
            <BasicInfoSection />

            {/* 공부/사용 중인 기술 스택 */}
            <TechStackSection />

            {/* 프로필 이미지 */}
            <ProfileImageSection />
          </FormProvider>

          {/* 시작하기 버튼 */}
          <Button
            onClick={handleSubmit(onSubmit, errors => {
              const firstError = Object.values(errors)[0];
              if (firstError?.message) {
                showToast(firstError.message, 'warning');
              }
            })}
            type="button"
            priority="primary"
            className="w-full h-12"
          >
            시작하기
          </Button>

          {/* 건너뛰기 링크 */}
          <div className="flex flex-row items-center justify-center gap-2 mx-auto">
            <span className="text-16r text-gray-600">다음에 하시겠어요?</span>
            <span
              onClick={() => setShowSkipDialog(true)}
              className="text-16b text-primary cursor-pointer hover:text-primary-2 transition-colors"
            >
              건너뛰기
            </span>
          </div>
        </div>
      </div>

      {/* 건너뛰기 확인 모달 */}
      <Dialog
        open={showSkipDialog}
        onOpenChange={setShowSkipDialog}
        title="프로필 설정을 건너뛸까요?"
        body="프로필 정보를 입력하지 않으면 학습 기록이 랭킹에 등재될 수 없습니다. 나중에 마이페이지에서 프로필을 설정할 수 있습니다."
        cancelLabel="취소"
        confirmLabel="건너뛰기"
        onCancel={() => setShowSkipDialog(false)}
        onConfirm={() => navigate('/timer')}
      />
    </div>
  );
};

export default Profile;
