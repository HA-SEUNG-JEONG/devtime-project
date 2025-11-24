import { useState, useRef, type ChangeEvent } from 'react';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Input from '../components/Input';
import { api } from '../utils/api';
import {
  EXPERIENCE_OPTIONS,
  MAX_IMAGE_SIZE,
  STUDY_PURPOSE_OPTIONS,
} from '../constants/profileOptions';

interface ProfileFormValues {
  career: string;
  purpose: string;
  customPurpose: string;
  goal: string;
  techStacks: string[];
  profileImage: string | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, watch } = useForm<ProfileFormValues>(
    {
      defaultValues: {
        career: '',
        purpose: '',
        customPurpose: '',
        goal: '',
        techStacks: [],
        profileImage: null,
      },
    }
  );

  const techStacks = watch('techStacks');
  const purpose = watch('purpose');

  const [autoCompleteTechStacks, setAutoCompleteTechStacks] = useState<
    { id: string; name: string }[]
  >([]);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const handleChangeStudyGoal = async (keyword: string) => {
    const res = await api.get(`/api/tech-stacks?keyword=${keyword}`);
    const data = await res.json();
    setAutoCompleteTechStacks(data.results);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const { name, type, size } = files[0];

    // 파일 크기 검증 (5MB)
    if (size > MAX_IMAGE_SIZE) {
      alert('5MB 이하의 이미지만 업로드 가능합니다.');
      return;
    }

    // 파일 형식 검증
    if (!['image/png', 'image/jpeg'].includes(type)) {
      alert('PNG 또는 JPG 형식의 이미지만 업로드 가능합니다.');
      return;
    }

    // 미리보기 이미지 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const res = await api.post('/api/file/presigned-url', {
        fileName: name,
        contentType: type,
      });
      const { presignedUrl, key } = await res.json();

      const uploadResponse = await api.put(presignedUrl, {
        headers: {
          'Content-Type': type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('S3 upload failed');
      }

      // 3. key 저장 (나중에 프로필 저장 시 사용)
      setValue('profileImage', key);
    } catch (error) {
      console.error('File upload failed:', error);
      alert('이미지 업로드에 실패했습니다. S3 CORS 설정을 확인해주세요.');
      setProfileImagePreview(null);
    }
  };

  const handleImageAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddTechStack = (techName: string) => {
    const newTechStacks = [...techStacks, techName];
    setValue('techStacks', newTechStacks, {
      shouldValidate: true,
    });
    setAutoCompleteTechStacks([]);
  };

  const handleDeleteTechStack = (index: number) => {
    const newTechStacks = techStacks.filter((_, i) => i !== index);
    setValue('techStacks', newTechStacks, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async data => {
    const { career, purpose, customPurpose, goal, techStacks, profileImage } =
      data;

    const finalPurpose =
      purpose === '기타(직접 입력)' ? customPurpose : purpose;

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
        alert('프로필 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Profile save failed:', error);
      alert('프로필 저장 중 오류가 발생했습니다.');
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

          {/* 공부/사용 중인 기술 스택 */}
          <div className="flex flex-col gap-2">
            <label className="text-14m text-gray-600">
              공부/사용 중인 기술 스택
            </label>
            <Input
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
                    key={index}
                    label={tech}
                    deletable={true}
                    onDelete={() => handleDeleteTechStack(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 프로필 이미지 */}
          <div className="flex flex-col gap-2">
            <label className="text-14m text-gray-600">프로필 이미지</label>
            <div
              onClick={handleImageAreaClick}
              className="flex items-center justify-center w-[100px] h-[100px] border-2 border-dashed border-primary rounded-[5px] cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
            >
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="프로필 이미지 미리보기"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="#4C79FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />

            <span className="text-12r text-gray-400">
              5MB 미만의 .png, .jpg 파일
            </span>
          </div>

          {/* 시작하기 버튼 */}
          <Button
            onClick={handleSubmit(onSubmit, errors => {
              if (errors.career) alert(errors.career.message);
              else if (errors.purpose) alert(errors.purpose.message);
              else if (errors.customPurpose)
                alert(errors.customPurpose.message);
              else if (errors.goal) alert(errors.goal.message);
              else if (techStacks.length === 0)
                alert('최소 하나 이상의 기술 스택을 선택해 주세요.');
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
            <Link
              to="/"
              className="text-16b text-primary no-underline hover:text-primary-2 transition-colors"
            >
              건너뛰기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
