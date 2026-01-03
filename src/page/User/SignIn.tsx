import { CustomButton } from "@/components/Button/CustomButton";
import { CustomDialog } from "@/components/Dialog/CustomDialog";
import SymbolLogo from "@/components/SymbolLogo";
import TextField from "@/components/Text/TextField";
import { useAuth } from "@/contexts/AuthContext";
import { useErrorModal } from "@/contexts/ErrorModalContext";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./constant";
import type { LoginResponse } from "@/types/api";

interface LoginFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({ mode: "onChange" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError } = useErrorModal();

  const [duplicateLoginModal, setDuplicateLoginModal] = useState<{
    open: boolean;
    data: LoginResponse | null;
  }>({
    open: false,
    data: null,
  });

  const proceedLogin = (responseData: LoginResponse) => {
    login(responseData.accessToken, responseData.refreshToken);
    reset();

    if (responseData.isFirstLogin) {
      navigate("/profile", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleLogin = async (data: LoginFormData) => {
    try {
      const res = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        data,
      );

      if (!res.data.success) {
        throw new Error(
          res.data.message || "로그인 정보를 다시 확인해 주세요.",
        );
      }

      // 중복 로그인 확인
      if (res.data.isDuplicateLogin) {
        setDuplicateLoginModal({
          open: true,
          data: res.data,
        });
        return;
      }

      proceedLogin(res.data);
    } catch (error) {
      let errorMessage = "로그인 정보를 다시 확인해 주세요.";

      if (axios.isAxiosError(error) && error.response?.data) {
        errorMessage =
          error.response.data.message ||
          error.response.data.error?.message ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      showError({
        title: "로그인 실패",
        description: errorMessage,
      });
    }
  };

  const handleCloseDuplicateLoginModal = () => {
    setDuplicateLoginModal({ open: false, data: null });
  };

  const handleConfirmDuplicateLogin = () => {
    if (duplicateLoginModal.data) {
      proceedLogin(duplicateLoginModal.data);
    }
    setDuplicateLoginModal({ open: false, data: null });
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* 배경 로고 - 태블릿 이상에서만 표시 */}
      <SymbolLogo
        className="text-primary-0 absolute top-[60px] -right-[100px] hidden md:-right-[150px] md:block lg:-right-[213px]"
        width={1090}
        height={530}
      />

      {/* 로그인 폼 */}
      <form
        className="z-10 w-full max-w-[400px] px-4 sm:px-6"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex w-full flex-col gap-4 rounded-[10px] bg-white/80 p-6 shadow-[0_40px_100px_rgba(0,0,0,0.25)] backdrop-blur-[50px]">
          <h1 className="typography-heading-b text-primary-0">로그인</h1>
          <TextField>
            <TextField.Label className="text-left">이메일</TextField.Label>
            <TextField.Input
              placeholder="이메일을 입력해주세요."
              className={`h-11 ${errors.email ? "border-secondary-negative border" : ""}`}
              {...register("email", {
                required: "이메일을 입력해 주세요.",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "이메일 형식으로 작성해 주세요.",
                },
              })}
            />
            {errors.email && (
              <TextField.HelperText variant="error" className="text-left">
                {errors.email.message}
              </TextField.HelperText>
            )}
          </TextField>
          <TextField>
            <TextField.Label className="text-left">비밀번호</TextField.Label>
            <TextField.Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
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
          <CustomButton
            type="submit"
            label="로그인"
            variant="primary"
            className="mt-8 w-full sm:mt-12"
            disabled={!isValid}
          />
          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
            <p className="typography-body-r text-primary-0">
              아직 계정이 없으신가요?
            </p>
            <Link to="/signup" className="typography-body-b text-primary-0">
              회원가입 하러 가기
            </Link>
          </div>
        </div>
      </form>

      <CustomDialog
        open={duplicateLoginModal.open}
        onOpenChange={handleCloseDuplicateLoginModal}
      >
        <CustomDialog.Content>
          <CustomDialog.Header>
            <CustomDialog.Title>중복 로그인 알림</CustomDialog.Title>
            <CustomDialog.Description>
              다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른
              기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동
              삭제됩니다.
            </CustomDialog.Description>
          </CustomDialog.Header>
          <CustomDialog.Footer>
            <CustomDialog.ConfirmButton
              onClick={handleConfirmDuplicateLogin}
              className="typography-subtitle-s"
            >
              확인
            </CustomDialog.ConfirmButton>
          </CustomDialog.Footer>
        </CustomDialog.Content>
      </CustomDialog>
    </div>
  );
};

export default SignIn;
