import { CustomButton } from "@/components/Button/CustomButton";
import { ErrorModal } from "@/components/ErrorModal"; // 컴포넌트 import
import SymbolLogo from "@/components/SymbolLogo";
import TextField from "@/components/Text/TextField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface LoginFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const { register, handleSubmit, reset } = useForm<LoginFormData>();
  const navigate = useNavigate();

  // ✅ 모달 상태 관리
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    title: string;
    description: string;
  }>({
    open: false,
    title: "",
    description: "",
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(
          responseData.message ||
            responseData.error?.message ||
            "로그인에 실패했습니다.",
        );
      }
      reset();
      navigate("/");
    } catch (error) {
      setErrorModal({
        open: true,
        title: "로그인 실패",
        description:
          error instanceof Error ? error.message : "로그인에 실패했습니다.",
      });
    }
  };

  const handleCloseModal = () => {
    setErrorModal({ open: false, title: "", description: "" });
  };

  return (
    <div className="relative flex min-h-screen w-full justify-end">
      <SymbolLogo
        className="text-primary-0 absolute -right-[213px] mt-[60px]"
        width={1090}
        height={530}
      />

      {/* 로그인 폼 */}
      <form
        className="absolute left-[50%] mt-[140px] w-[50%] space-y-4 rounded-[10px]"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="flex w-[50%] translate-x-[-50%] flex-col gap-4 rounded-[10px] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.25)] backdrop-blur-[50px]">
          <h1 className="typography-heading-b text-primary-0">로그인</h1>
          <TextField className="">
            <TextField.Label className="text-left">이메일</TextField.Label>
            <TextField.Input
              placeholder="이메일을 입력해주세요."
              className="h-11"
              {...register("email")}
            />
          </TextField>
          <TextField className="">
            <TextField.Label className="text-left">비밀번호</TextField.Label>
            <TextField.Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              className="h-11"
              {...register("password")}
            />
          </TextField>
          <CustomButton
            type="submit"
            label="로그인"
            variant="primary"
            className="mt-12 w-full"
          />
        </div>
      </form>

      <ErrorModal
        open={errorModal.open}
        title={errorModal.title}
        description={errorModal.description}
        onOpenChange={handleCloseModal}
      />
    </div>
  );
};

export default SignIn;
