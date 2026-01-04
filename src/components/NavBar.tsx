import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HorizontalLogo from "./Icon/HorizontalLogo";
import avatar from "@/assets/avatar.png";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { apiClient } from "@/utils/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import UserIcon from "./Icon/UserIcon";
import LogoutIcon from "./Icon/LogoutIcon";
import { useAuth } from "@/contexts/AuthContext";
import { LoginRequiredModal } from "./LoginRequiredModal";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [nickName, setNickName] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleProtectedNavigation = (path: string) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      setShowLoginModal(true);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const getProfile = async () => {
      try {
        const response = await apiClient.get("/api/profile");
        setNickName(response.data.nickname);
      } catch {
        // 토큰 갱신 실패 시 apiClient 인터셉터에서 자동으로 로그아웃 처리
      }
    };
    getProfile();
  }, [isLoggedIn]);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };
  return (
    <nav className="flex items-center justify-between">
      <HorizontalLogo
        className="mr-12 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex flex-1 items-center gap-9">
        <button
          type="button"
          onClick={() => handleProtectedNavigation("/dashboard")}
          className="typography-body-s text-secondary-indigo cursor-pointer hover:underline hover:underline-offset-8"
        >
          대시보드
        </button>
        <button
          type="button"
          onClick={() => handleProtectedNavigation("/ranking")}
          className="typography-body-s text-secondary-indigo cursor-pointer hover:underline hover:underline-offset-8"
        >
          랭킹
        </button>
      </div>
      <div className="flex items-center gap-9">
        {isLoggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={avatar} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-gray-300">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <UserIcon size={20} className="text-gray-600" />
                  <span className="typography-body-s text-gray-600">
                    마이페이지
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-3" />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogoutIcon size={20} className="text-gray-600" />
                  <span className="typography-body-s text-gray-600">
                    로그아웃
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span>{nickName}</span>
          </>
        ) : (
          <>
            <button
              type="button"
              className="typography-body-s text-secondary-indigo cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              로그인
            </button>
            <button
              type="button"
              className="typography-body-s text-secondary-indigo cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </button>
          </>
        )}
      </div>

      <LoginRequiredModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
      />
    </nav>
  );
};

export default NavBar;
