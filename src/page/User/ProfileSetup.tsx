import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import VerticalLogo from "@/components/Icon/VerticalLogo";
import DropDown from "@/components/DropDown/DropDown";
import AutoComplete from "@/components/AutoComplete/AutoComplete";
import TextField from "@/components/Text/TextField";
import { CustomButton } from "@/components/Button/CustomButton";
import { CustomDialog } from "@/components/Dialog/CustomDialog";
import { useErrorModal } from "@/contexts/ErrorModalContext";
import { tokenStorage } from "@/utils/token";
import { Loader2 } from "lucide-react";
import type {
  CareerLevel,
  PurposeType,
  CustomPurpose,
  CreateProfileRequest,
  GetTechStacksResponse,
} from "@/types/types";
import DeleteIcon from "@/components/Icon/DeleteIcon";
import PlusIcon from "@/components/Icon/PlusIcon";

interface ProfileFormData {
  career: CareerLevel;
  purpose: PurposeType;
  purposeDetail: string;
  goal: string;
  techStacks: string[];
}

const CAREER_OPTIONS = [
  { id: 1, label: "경력 없음" },
  { id: 2, label: "0 - 3년" },
  { id: 3, label: "4 - 7년" },
  { id: 4, label: "8 - 10년" },
  { id: 5, label: "11년 이상" },
];

const PURPOSE_OPTIONS = [
  { id: 1, label: "취업 준비" },
  { id: 2, label: "이직 준비" },
  { id: 3, label: "단순 개발 역량 향상" },
  { id: 4, label: "회사 내 프로젝트 원활하게 수행" },
  { id: 5, label: "기타" },
];

const CAREER_LABELS: string[] = CAREER_OPTIONS.map((option) => option.label);
const PURPOSE_TYPE_LABELS: string[] = PURPOSE_OPTIONS.slice(0, -1).map(
  (option) => option.label,
);

function isCareerLevel(value: string): value is CareerLevel {
  return CAREER_LABELS.includes(value);
}

function isPurposeType(value: string): value is PurposeType {
  return PURPOSE_TYPE_LABELS.includes(value);
}

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { showError } = useErrorModal();

  const { watch, setValue } = useForm<ProfileFormData>({
    defaultValues: {
      career: "경력 없음",
      purpose: "취업 준비",
      purposeDetail: "",
      goal: "",
      techStacks: [],
    },
  });

  const career = watch("career");
  const purpose = watch("purpose");
  const purposeDetail = watch("purposeDetail");
  const goal = watch("goal");
  const techStacks = watch("techStacks");

  // 검색 UI 상태 (폼 데이터가 아님)
  const [techStackInput, setTechStackInput] = useState("");
  const [techStackOptions, setTechStackOptions] = useState<
    { id: number; name: string }[]
  >([]);

  // 이미지 업로드 상태
  const [profileImage, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // UI 상태
  const [isLoading, setIsLoading] = useState(false);
  const [showSkipDialog, setShowSkipDialog] = useState(false);

  const isOtherPurpose = purpose === ("기타" as PurposeType);
  const isFormValid =
    career &&
    purpose &&
    techStacks.length > 0 &&
    (!isOtherPurpose || purposeDetail.trim());

  const searchTechStacks = useCallback(async (keyword: string) => {
    if (!keyword.trim()) {
      setTechStackOptions([]);
      return;
    }

    try {
      const response = await axios.get<GetTechStacksResponse>(
        `${import.meta.env.VITE_API_URL}/api/tech-stacks`,
        {
          params: { keyword },
          headers: {
            Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
          },
        },
      );
      setTechStackOptions(response.data.results);
    } catch {
      setTechStackOptions([]);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchTechStacks(techStackInput);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [techStackInput, searchTechStacks]);

  const filteredTechStackOptions = techStackOptions.filter(
    (option) => !techStacks.includes(option.name),
  );

  const handleTechStackSelect = (value: string) => {
    if (!techStacks.includes(value)) {
      setValue("techStacks", [...techStacks, value]);
    }
    setTechStackInput("");
    setTechStackOptions([]);
  };

  const handleAddNewTechStack = async (value: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tech-stacks`,
        { name: value },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
          },
        },
      );
      handleTechStackSelect(value);
    } catch {
      showError({
        title: "기술 스택 추가 실패",
        description: "기술 스택을 추가하는데 실패했습니다.",
      });
    }
  };

  const handleRemoveTechStack = (stack: string) => {
    setValue(
      "techStacks",
      techStacks.filter((s) => s !== stack),
    );
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      showError({
        title: "지원하지 않는 파일 형식",
        description: "PNG 또는 JPG 파일만 업로드할 수 있습니다.",
      });
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showError({
        title: "파일 크기 초과",
        description: "파일 크기는 5MB 미만이어야 합니다.",
      });
      event.target.value = "";
      return;
    }

    setIsImageUploading(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);

    try {
      const presignedResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/file/presigned-url`,
        {
          fileName: file.name,
          contentType: file.type,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
          },
        },
      );

      const { presignedUrl, key } = presignedResponse.data;

      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setProfileImage(key);
    } catch {
      showError({
        title: "이미지 업로드 실패",
        description: "이미지 업로드에 실패했습니다. 다시 시도해주세요.",
      });
      setImagePreview(null);
    } finally {
      setIsImageUploading(false);
    }

    event.target.value = "";
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    setProfileImage("");
  };

  const handlePurposeSelect = (value: string) => {
    if (value === "기타") {
      setValue("purpose", "기타" as PurposeType);
    } else if (isPurposeType(value)) {
      setValue("purpose", value);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid || !isCareerLevel(career)) return;

    setIsLoading(true);

    try {
      let purposeValue: PurposeType | CustomPurpose | null = null;

      if (isOtherPurpose) {
        const customPurpose: CustomPurpose = {
          type: "기타",
          detail: purposeDetail,
        };
        purposeValue = customPurpose;
      } else if (isPurposeType(purpose)) {
        purposeValue = purpose;
      }

      if (!purposeValue) return;

      const requestData: CreateProfileRequest = {
        career,
        purpose: purposeValue,
        techStacks,
        goal,
        profileImage,
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
          },
        },
      );

      navigate("/", { replace: true });
    } catch (error) {
      let errorMessage = "프로필 저장에 실패했습니다.";

      if (axios.isAxiosError(error) && error.response?.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      showError({
        title: "프로필 저장 실패",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    setIsLoading(true);

    try {
      // 기본값으로 프로필 생성
      const requestData: CreateProfileRequest = {
        career: "경력 없음",
        purpose: "단순 개발 역량 향상",
        techStacks: [],
        goal: "",
        profileImage: "",
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/profile`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${tokenStorage.getAccessToken()}`,
          },
        },
      );

      navigate("/", { replace: true });
    } catch (error) {
      let errorMessage = "프로필 생성에 실패했습니다.";

      if (axios.isAxiosError(error) && error.response?.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      showError({
        title: "프로필 생성 실패",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
      setShowSkipDialog(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* 좌측 로고 영역 */}
      <div className="bg-primary-0 hidden min-h-[200px] w-full place-items-center md:grid md:py-6 lg:h-screen lg:w-1/2">
        <div className="flex flex-col items-center gap-4">
          <VerticalLogo />
          <p className="typography-body-m text-white">개발자를 위한 타이머</p>
        </div>
      </div>

      {/* 우측 폼 영역 */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:w-1/2 lg:py-0">
        <div className="w-full max-w-[400px] space-y-5">
          <h1 className="typography-heading-b text-primary-0 text-center">
            프로필 설정
          </h1>

          {/* 개발 경력 */}
          <DropDown
            label="개발 경력"
            placeholder="개발 경력을 선택해 주세요."
            items={CAREER_OPTIONS}
            onSelect={(value) => {
              if (isCareerLevel(value)) setValue("career", value);
            }}
          />

          {/* 공부 목적 */}
          <DropDown
            label="공부 목적"
            placeholder="공부의 목적을 선택해 주세요."
            items={PURPOSE_OPTIONS}
            onSelect={handlePurposeSelect}
          />

          {/* 기타 선택 시 상세 입력 */}
          {isOtherPurpose && (
            <TextField value={purposeDetail}>
              <TextField.Label className="typography-body-small-m text-left">
                기타 목적
              </TextField.Label>
              <TextField.Input
                placeholder="목적을 직접 입력해 주세요."
                value={purposeDetail}
                onChange={(e) => setValue("purposeDetail", e.target.value)}
                className="h-11"
                required
              />
            </TextField>
          )}

          {/* 공부 목표 */}
          <TextField value={goal}>
            <TextField.Label className="typography-body-small-m text-left">
              공부 목표
            </TextField.Label>
            <TextField.Input
              placeholder="공부 목표를 입력해 주세요."
              value={goal}
              onChange={(e) => setValue("goal", e.target.value)}
              className="h-11"
            />
          </TextField>

          {/* 기술 스택 */}
          <div className="flex flex-col gap-2">
            <AutoComplete
              label="공부/사용 중인 기술 스택"
              placeholder="기술 스택을 검색해 등록해 주세요."
              items={filteredTechStackOptions}
              value={techStackInput}
              onChange={setTechStackInput}
              onSelect={handleTechStackSelect}
              handleAddNewItem={handleAddNewTechStack}
              addNewItemLabel="Add New Item"
            />

            {/* 선택된 기술 스택 태그 */}
            {techStacks.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {techStacks.map((stack) => (
                  <span
                    key={stack}
                    className="border-primary-0 text-primary-0 bg-primary-10 typography-body-small-s inline-flex items-center gap-1 rounded-[5px] border p-3"
                  >
                    {stack}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechStack(stack)}
                      aria-label={`${stack} 삭제`}
                    >
                      <DeleteIcon />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 프로필 이미지 */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="image-uploader"
              className="typography-body-small-m text-left"
            >
              프로필 이미지
            </label>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="border-primary-0 relative flex h-20 w-20 items-center justify-center rounded-md border-2 border-dashed">
                  {!imagePreview && (
                    <input
                      id="image-uploader"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                      className="absolute inset-0 cursor-pointer opacity-0"
                      disabled={isImageUploading}
                      aria-label="프로필 이미지 업로드"
                    />
                  )}
                  {isImageUploading ? (
                    <Loader2
                      className="text-primary-0 animate-spin"
                      size={24}
                    />
                  ) : imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="프로필 이미지"
                      className="h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    <PlusIcon size={24} className="text-primary-0" />
                  )}
                </div>
                {imagePreview && !isImageUploading && (
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    aria-label="프로필 이미지 삭제"
                    className="bg-primary-0 hover:bg-opacity-80 absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-white"
                  >
                    {/* <X size={12} aria-hidden="true" /> */}
                    <DeleteIcon size={12} />
                  </button>
                )}
              </div>
              <span className="typography-body-small-m text-gray-500">
                5MB 미만의 .png, jpg 파일
              </span>
            </div>
          </div>

          {/* 저장하기 버튼 */}
          <div aria-live="polite" aria-atomic="true">
            <CustomButton
              label={isLoading ? "저장 중..." : "저장하기"}
              variant="primary"
              className="w-full"
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              aria-busy={isLoading}
            />
          </div>

          {/* 건너뛰기 */}
          <div className="flex items-center justify-center gap-1">
            <span className="typography-body-r text-gray-600">
              다음에 하시겠어요?
            </span>
            <button
              type="button"
              onClick={() => setShowSkipDialog(true)}
              className="typography-body-b text-primary-0 cursor-pointer hover:underline"
            >
              건너뛰기
            </button>
          </div>
        </div>
      </div>

      {/* 건너뛰기 확인 다이얼로그 */}
      <CustomDialog open={showSkipDialog} onOpenChange={setShowSkipDialog}>
        <CustomDialog.Content>
          <CustomDialog.Header>
            <CustomDialog.Title>프로필 설정을 건너뛸까요?</CustomDialog.Title>
            <CustomDialog.Description>
              프로필을 설정하지 않을 경우 일부 기능 사용에 제한이 생길 수
              있습니다. 그래도 프로필 설정을 건너뛰시겠습니까?
            </CustomDialog.Description>
          </CustomDialog.Header>
          <CustomDialog.Footer>
            <CustomDialog.CancelButton
              onClick={() => setShowSkipDialog(false)}
              disabled={isLoading}
            >
              계속 설정하기
            </CustomDialog.CancelButton>
            <CustomDialog.ConfirmButton
              onClick={handleSkip}
              disabled={isLoading}
            >
              {isLoading ? "처리 중..." : "건너뛰기"}
            </CustomDialog.ConfirmButton>
          </CustomDialog.Footer>
        </CustomDialog.Content>
      </CustomDialog>
    </div>
  );
};

export default ProfileSetup;
