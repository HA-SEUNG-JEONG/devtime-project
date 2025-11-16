import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '/logo.png';

interface NavBarProps {
  initialLoggedIn?: boolean;
}

const NavBar = ({ initialLoggedIn = false }: NavBarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [userName] = useState('사용자'); // 로그인 상태일 때 표시할 사용자 이름 (향후 사용 예정)

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkClassName =
    'text-14sb sm:text-16sb text-primary no-underline transition-colors duration-200 hover:text-[var(--color-primary-2)]';

  return (
    <nav className="w-full p-0 mt-4">
      <div className="flex flex-row items-center justify-between p-0 gap-2 sm:gap-6 lg:gap-[48px] max-w-[1280px] mx-auto px-2 sm:px-6 lg:px-8 relative">
        {/* 왼쪽: 로고 + 네비게이션 링크 (데스크톱) */}
        <div className="flex items-center gap-2 sm:gap-6 lg:gap-[48px] shrink-0">
          <div className="flex items-center gap-1 sm:gap-2">
            <img src={logo} alt="DevTime logo" />
          </div>
          {/* 데스크톱 네비게이션 링크 */}
          <div className="hidden sm:flex items-center gap-2 sm:gap-6 lg:gap-[48px]">
            <Link to="/dashboard" className={linkClassName}>
              대시보드
            </Link>
            <Link to="/ranking" className={linkClassName}>
              랭킹
            </Link>
          </div>
        </div>

        {/* 오른쪽: 사용자 액션 (데스크톱) */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-6 lg:gap-[48px] shrink-0">
          {isLoggedIn ? (
            <>
              <span className="text-14sb sm:text-16sb text-primary">
                {/* img로 대체 */}
              </span>
              <button
                onClick={handleLogout}
                className="text-14sb sm:text-16sb text-primary bg-transparent border-0 cursor-pointer p-0 transition-colors duration-200 hover:text-primary-2"
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

        {/* 모바일: 햄버거 버튼 */}
        <button
          onClick={toggleMenu}
          className="sm:hidden flex flex-col justify-center items-center w-6 h-6 gap-1 bg-transparent border-0 cursor-pointer p-0"
          aria-label="메뉴 열기"
        >
          <span
            className={`w-5 h-0.5 bg-primary transition-all duration-200 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-primary transition-all duration-200 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-primary transition-all duration-200 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>

        {/* 모바일: 메뉴 드로어 */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="flex flex-col p-4 gap-4">
              <Link
                to="/dashboard"
                className={linkClassName}
                onClick={() => setIsMenuOpen(false)}
              >
                대시보드
              </Link>
              <Link
                to="/ranking"
                className={linkClassName}
                onClick={() => setIsMenuOpen(false)}
              >
                랭킹
              </Link>
              {isLoggedIn ? (
                <>
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <span className="text-14sb text-primary block mb-4">
                      {/* img로 대체 */}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-14sb text-primary bg-transparent border-0 cursor-pointer p-0 transition-colors duration-200 hover:text-primary-2 text-left"
                    >
                      DevTime
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <Link
                    to="/login"
                    className={linkClassName}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    className={`${linkClassName} mt-4 block`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
