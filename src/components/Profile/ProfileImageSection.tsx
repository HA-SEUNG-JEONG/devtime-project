import { useRef, useState, type ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useToast } from '../../contexts/ToastContext';
import { api } from '../../utils/api';
import { MAX_IMAGE_SIZE } from '../../constants/profileOptions';
import type { ProfileFormValues } from '../../types/profile';

const ProfileImageSection = () => {
  const { setValue } = useFormContext<ProfileFormValues>();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const { name, type, size } = files[0];

    // 파일 크기 검증 (5MB)
    if (size > MAX_IMAGE_SIZE) {
      showToast('5MB 이하의 이미지만 업로드 가능합니다.', 'warning');
      return;
    }

    // 파일 형식 검증
    if (!['image/png', 'image/jpeg'].includes(type)) {
      showToast('PNG 또는 JPG 형식의 이미지만 업로드 가능합니다.', 'warning');
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

      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
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
      showToast(
        '이미지 업로드에 실패했습니다. S3 CORS 설정을 확인해주세요.',
        'error'
      );
      setProfileImagePreview(null);
    }
  };

  const handleImageAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
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

      <span className="text-12r text-gray-400">5MB 미만의 .png, .jpg 파일</span>
    </div>
  );
};

export default ProfileImageSection;
