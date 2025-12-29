import TextField from "@/components/Text/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/components/Button/CustomButton";
import { Link, useNavigate } from "react-router";
import VerticalLogo from "@/components/Icon/VerticalLogo";
import { Checkbox } from "@/components/ui/checkbox";
import { ErrorModal } from "@/components/ErrorModal";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./constant";
import axios from "axios";
import type { SignupResponse } from "@/types/api";
import { useDuplicateCheck } from "@/hooks/useDuplicateCheck";

interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

type DuplicateCheckField = "email" | "nickname";

const DUPLICATE_CHECK_CONFIG = {
  fields: ["email", "nickname"] as DuplicateCheckField[],
  endpoints: {
    email: (value: string) =>
      `${import.meta.env.VITE_API_URL}/api/signup/check-email?email=${encodeURIComponent(value)}`,
    nickname: (value: string) =>
      `${import.meta.env.VITE_API_URL}/api/signup/check-nickname?nickname=${encodeURIComponent(value)}`,
  },
  validators: {
    email: (value: string) => Boolean(value && EMAIL_REGEX.test(value)),
    nickname: (value: string) => Boolean(value && value.trim().length > 0),
  },
};

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({ mode: "onChange" });

  const watchedEmail = watch("email");
  const watchedNickname = watch("nickname");

  const {
    fieldStates,
    handleCheck,
    handleFieldChange,
    handleFieldBlur,
    showCheckWarning,
    isAllChecked,
  } = useDuplicateCheck(DUPLICATE_CHECK_CONFIG);

  const [isTermsAgreed, setIsTermsAgreed] = useState(false);

  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const isEmailValid = DUPLICATE_CHECK_CONFIG.validators.email(watchedEmail);
  const isNicknameValid =
    DUPLICATE_CHECK_CONFIG.validators.nickname(watchedNickname);

  const showEmailCheckWarning = showCheckWarning(
    "email",
    watchedEmail,
    !!errors.email,
  );
  const showNicknameCheckWarning = showCheckWarning(
    "nickname",
    watchedNickname,
    !!errors.nickname,
  );

  const onSubmit = async (data: SignUpFormData) => {
    if (!isAllChecked(["email", "nickname"])) {
      setErrorModal({
        open: true,
        title: "회원가입 실패",
        description: "이메일과 닉네임 중복 확인을 완료해 주세요.",
      });
      return;
    }

    if (!isTermsAgreed) {
      setErrorModal({
        open: true,
        title: "회원가입 실패",
        description: "이용약관에 동의해 주세요.",
      });
      return;
    }

    try {
      const res = await axios.post<SignupResponse>(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        data,
      );

      if (!res.data.success) {
        throw new Error(res.data.message || "회원가입에 실패했습니다.");
      }
      reset();
      navigate("/signin", { replace: true });
    } catch (error) {
      let errorMessage = "회원가입에 실패했습니다.";

      if (axios.isAxiosError(error) && error.response?.data) {
        errorMessage =
          error.response.data.message ||
          error.response.data.error?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setErrorModal({
        open: true,
        title: "회원가입 실패",
        description: errorMessage,
      });
    }
  };

  const handleCloseModal = () => {
    setErrorModal({ open: false, title: "", description: "" });
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* 로고 영역 - 태블릿 이상에서만 표시 */}
      <div className="bg-primary-0 hidden min-h-[200px] w-full place-items-center md:grid md:py-6 lg:h-screen lg:w-1/2">
        <VerticalLogo />
      </div>

      {/* 폼 영역 */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 md:px-8 lg:w-1/2 lg:py-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[400px] space-y-4"
        >
          <h1 className="typography-heading-b text-primary-0">회원가입</h1>

          {/* 이메일 필드 */}
          <TextField value={watch("email")} className="relative">
            <TextField.Label className="text-left">이메일</TextField.Label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <TextField.Input
                hasButton
                placeholder="이메일을 입력해주세요."
                className={`h-11 ${errors.email || showEmailCheckWarning ? "border-secondary-negative border" : ""}`}
                {...register("email", {
                  required: "이메일을 입력해 주세요.",
                  pattern: {
                    value: EMAIL_REGEX,
                    message: "이메일 형식으로 작성해 주세요.",
                  },
                  onChange: () => handleFieldChange("email"),
                  onBlur: () => handleFieldBlur("email", watchedEmail),
                })}
              />
              <TextField.Button
                type="external"
                onClick={() =>
                  handleCheck("email", watchedEmail, () => trigger("email"))
                }
                className="h-11 w-full shrink-0 sm:w-auto"
                disabled={!isEmailValid || !!errors.email}
              >
                중복확인
              </TextField.Button>
            </div>
            {errors.email && (
              <TextField.HelperText variant="error" className="text-left">
                {errors.email.message}
              </TextField.HelperText>
            )}
            {!errors.email && fieldStates.email.helperText && (
              <TextField.HelperText
                variant={
                  fieldStates.email.helperText.isAvailable ? "success" : "error"
                }
                className="text-left"
              >
                {fieldStates.email.helperText.message}
              </TextField.HelperText>
            )}
          </TextField>

          {/* 닉네임 필드 */}
          <TextField value={watch("nickname")} className="relative">
            <TextField.Label className="text-left">닉네임</TextField.Label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <TextField.Input
                hasButton
                placeholder="닉네임을 입력해주세요."
                className={`h-11 ${errors.nickname || showNicknameCheckWarning ? "border-secondary-negative border" : ""}`}
                {...register("nickname", {
                  required: "닉네임을 입력해 주세요.",
                  validate: (value) =>
                    value.trim().length > 0 || "닉네임을 입력해 주세요.",
                  onChange: () => handleFieldChange("nickname"),
                  onBlur: () => handleFieldBlur("nickname", watchedNickname),
                })}
              />
              <TextField.Button
                type="external"
                onClick={() =>
                  handleCheck("nickname", watchedNickname, () =>
                    trigger("nickname"),
                  )
                }
                className="h-11 w-full shrink-0 sm:w-auto"
                disabled={!isNicknameValid || !!errors.nickname}
              >
                중복확인
              </TextField.Button>
            </div>
            {errors.nickname && (
              <TextField.HelperText variant="error" className="text-left">
                {errors.nickname.message}
              </TextField.HelperText>
            )}
            {!errors.nickname && fieldStates.nickname.helperText && (
              <TextField.HelperText
                variant={
                  fieldStates.nickname.helperText.isAvailable
                    ? "success"
                    : "error"
                }
                className="text-left"
              >
                {fieldStates.nickname.helperText.message}
              </TextField.HelperText>
            )}
          </TextField>

          {/* 비밀번호 필드 */}
          <TextField value={watch("password")} className="relative">
            <TextField.Label className="text-left">비밀번호</TextField.Label>
            <TextField.Input
              autoComplete="new-password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className={`h-11 ${errors.password ? "border-secondary-negative border" : ""}`}
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
                minLength: {
                  value: 8,
                  message:
                    "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
                },
                pattern: {
                  value: PASSWORD_REGEX,
                  message:
                    "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
                },
              })}
            />
            {errors.password && (
              <TextField.HelperText variant="error" className="text-left">
                {errors.password.message}
              </TextField.HelperText>
            )}
          </TextField>

          {/* 비밀번호 확인 필드 */}
          <TextField value={watch("confirmPassword")} className="relative">
            <TextField.Label className="text-left">
              비밀번호 확인
            </TextField.Label>
            <TextField.Input
              autoComplete="new-password"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
              className={`h-11 ${errors.confirmPassword ? "border-secondary-negative border" : ""}`}
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해 주세요.",
                validate: (value) =>
                  value === watch("password") ||
                  "비밀번호가 일치하지 않습니다.",
                deps: ["password"],
              })}
            />
            {errors.confirmPassword && (
              <TextField.HelperText variant="error" className="text-left">
                {errors.confirmPassword.message}
              </TextField.HelperText>
            )}
          </TextField>

          {/* 이용약관 */}
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-1 text-sm sm:text-base">이용약관</div>
            <span className="typography-body-small-m text-primary-0">
              동의함
            </span>
            <Checkbox
              checked={isTermsAgreed}
              onCheckedChange={(checked) => setIsTermsAgreed(checked === true)}
            />
          </div>

          {/* 약관 내용 */}
          <div className="typography-caption-r sm:typography-body-r h-[100px] w-full overflow-y-auto rounded-[5px] bg-gray-200 px-3 py-3 text-xs sm:h-[110px] sm:py-4 sm:text-sm">
            제1조 (목적) 이 약관은 DevTime(이하 "서비스")의 이용 조건 및 절차,
            사용자와 서비스 제공자(회사) 간의 권리, 의무 및 책임사항을 규정함을
            목적으로 합니다. 제2조 (정의) 서비스: 개발자들이 일상 업무 및 할
            일을 효과적으로 관리할 수 있도록 제공되는 DevTime(데브타임) TODO 앱
            및 관련 기능을 말합니다. 사용자: 이 약관에 따라 서비스를 이용하는
            개인 및 단체를 의미합니다. 계정: 사용자가 서비스를 이용하기 위해
            등록하는 고유 식별 정보를 의미합니다. 제3조 (약관의 효력 및 변경) 본
            약관은 사용자가 서비스에 최초 가입하거나 서비스를 이용하는 시점부터
            효력을 발생합니다. 회사는 필요에 따라 본 약관을 변경할 수 있으며,
            변경된 약관은 앱 내 공지사항 또는 이메일 등으로 사전에 고지합니다.
            제4조 (서비스 제공 및 변경) 회사는 사용자가 할 일을 등록, 수정,
            삭제하고 일정을 관리할 수 있도록 서비스를 제공합니다. 서비스의 일부
            기능 또는 전체 서비스를 사전 예고 없이 변경하거나 중단할 수 있으며,
            이로 인한 책임은 회사가 부담하지 않습니다. 제5조 (사용자의 의무)
            사용자는 서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.
            사용자는 본인의 계정 및 비밀번호를 안전하게 관리하며, 타인에게
            양도하거나 공유할 수 없습니다. 사용자는 서비스 이용 과정에서 다음과
            같은 행위를 해서는 안 됩니다: 타인의 권리를 침해하거나 불법적인
            목적으로 서비스를 이용하는 행위 허위 정보를 기재하거나 부정한
            방법으로 서비스를 이용하는 행위 회사의 정상적인 서비스 운영을
            방해하는 행위 제6조 (개인정보 보호) 회사는 개인정보 보호 관련 법령을
            준수하며, 별도의 개인정보 처리방침에 따라 사용자의 개인정보를
            안전하게 관리합니다. 사용자는 서비스 이용을 위해 필요한 최소한의
            개인정보를 제공하며, 해당 정보는 서비스 제공 목적에 한해서만
            사용됩니다. 제7조 (서비스 이용 제한 및 중지) 회사는 사용자가 본
            약관을 위반한 경우 경고 후 서비스 이용을 제한하거나 중지할 수
            있습니다. 사용자는 본 약관 위반 시 발생하는 모든 결과에 대해 책임을
            지며, 회사는 이에 대해 어떠한 책임도 지지 않습니다. 제8조 (책임의
            제한) 회사는 천재지변, 불가항력적 사유, 또는 통신 장애 등으로 인한
            서비스 제공 중단에 대해 책임을 지지 않습니다. 회사는 사용자가
            서비스를 이용하여 발생한 데이터 손실, 업무상 손해 등에 대해 책임을
            제한합니다. 제9조 (준거법 및 관할법원) 본 약관은 대한민국 법률에
            따라 해석 및 적용됩니다. 서비스 이용과 관련하여 발생한 분쟁은 회사
            본사 소재지를 관할하는 법원을 제1심 관할법원으로 합니다. 제10조
            (부칙) 본 약관은 2024년 2월 1일부터 시행됩니다. 본 약관에 명시되지
            않은 사항은 관련 법령 및 회사의 내부 정책에 따릅니다.
          </div>

          <CustomButton
            label="회원가입"
            variant="primary"
            className="w-full"
            type="submit"
            disabled={
              !isValid || !isAllChecked(["email", "nickname"]) || !isTermsAgreed
            }
          />

          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
            <p className="typography-body-r text-primary-0">회원이신가요?</p>
            <Link to="/signin" className="typography-body-b text-primary-0">
              로그인 바로가기
            </Link>
          </div>
        </form>
      </div>

      <ErrorModal
        open={errorModal.open}
        title={errorModal.title}
        description={errorModal.description}
        onOpenChange={handleCloseModal}
      />
    </div>
  );
};

export default SignUp;
