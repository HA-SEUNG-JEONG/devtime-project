import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

interface NavBarProps {
  initialLoggedIn?: boolean;
}

const NavBar = ({ initialLoggedIn = true }: NavBarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
  // const [userName] = useState('사용자'); // 로그인 상태일 때 표시할 사용자 이름 (향후 사용 예정)

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const linkClassName =
    'text-16sb text-primary no-underline transition-colors duration-200 hover:text-[var(--color-primary-2)]';

  return (
    <nav className="w-full p-0">
      <div className="flex flex-row items-center justify-between p-0 gap-[48px] max-w-[1280px] mx-auto px-8">
        {/* 왼쪽: 로고 + 네비게이션 링크 */}
        <div className="flex items-center gap-[48px] shrink-0">
          <div className="flex items-center gap-2">
            <img src={logo} alt="DevTime logo" />
          </div>
          <Link to="/dashboard" className={linkClassName}>
            대시보드
          </Link>
          <Link to="/ranking" className={linkClassName}>
            랭킹
          </Link>
        </div>

        {/* 오른쪽: 사용자 액션 */}
        <div className="flex items-center gap-[48px] shrink-0">
          {isLoggedIn ? (
            <>
              <span className="text-16sb text-primary">{/* img로 대체 */}</span>
              <button
                onClick={handleLogout}
                className="text-16sb text-primary bg-transparent border-0 cursor-pointer p-0 transition-colors duration-200 hover:text-primary-2"
              >
                DevTime
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={linkClassName}>
                로그인
              </Link>
              <Link to="/signup" className={linkClassName}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
