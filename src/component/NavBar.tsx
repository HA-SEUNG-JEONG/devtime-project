import { useState } from "react";
import HorizontalLogo from "./Icon/HorizontalLogo";
import avatar from "@/assets/avatar.png";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import UserIcon from "./Icon/UserIcon";
import LogoutIcon from "./Icon/LogoutIcon";

const NavBar = () => {
  const [isLoggedIn, _] = useState(true);

  return (
    <nav className="flex items-center justify-between">
      <HorizontalLogo className="mr-4 cursor-pointer" />
      <div className="flex flex-1 items-center gap-4">
        <button
          type="button"
          onClick={() => {
            /* 대시보드로 이동 */
          }}
          className="typography-body-s text-secondary-indigo cursor-pointer hover:underline hover:underline-offset-8"
        >
          대시보드
        </button>
        <button
          type="button"
          onClick={() => {
            /* 랭킹으로 이동 */
          }}
          className="typography-body-s text-secondary-indigo cursor-pointer hover:underline hover:underline-offset-8"
        >
          랭킹
        </button>
      </div>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={avatar} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-gray-300">
                <DropdownMenuItem
                  onClick={() => {
                    /* 마이페이지로 이동 */
                  }}
                >
                  <UserIcon size={20} className="text-gray-600" />
                  <span className="typography-body-s text-gray-600">
                    마이페이지
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="mx-3" />
                <DropdownMenuItem
                  onClick={() => {
                    /* 로그아웃 */
                  }}
                >
                  <LogoutIcon size={20} className="text-gray-600" />
                  <span className="typography-body-s text-gray-600">
                    로그아웃
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* TODO : username 표시 */}
            {/* {username} */}
            {/* <span>{username}</span> */}
          </>
        ) : (
          <>
            <button
              type="button"
              className="typography-body-s text-secondary-indigo"
              onClick={() => {
                /* 로그인 */
              }}
            >
              로그인
            </button>
            <button
              type="button"
              className="typography-body-s text-secondary-indigo"
              onClick={() => {
                /* 회원가입 */
              }}
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
