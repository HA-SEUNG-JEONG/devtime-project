import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png';
import { useAuthStore } from '../../stores/authStore';
import { api } from '../../utils/api';

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, userInfo, setUserInfo } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (isLoggedIn && !userInfo) {
        try {
          const response = await api.get('/api/profile');
          if (response.ok) {
            const data = await response.json();
            setUserInfo({ nickname: data.nickname });
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
    };

    fetchUserInfo();
  }, [isLoggedIn, userInfo, setUserInfo]);

  // 프로필 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  const handleLogout = async () => {
    // authStore의 logout 함수 호출 (서버 로그아웃 + 상태 업데이트)
    await logout();
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);

    // 로그인 페이지로 이동
    navigate('/login');
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
            <div
              className="relative flex items-center gap-2 "
              ref={profileDropdownRef}
            >
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border-0 transition-all duration-200 hover:bg-gray-300"
                aria-label="프로필 메뉴"
              >
                <img src="/user.png" alt="프로필" className="w-6 h-6" />
              </button>
              {/* 프로필 드롭다운 */}

              {isProfileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-[130px] bg-white border border-[#CCD0D6] rounded-[5px] shadow-[0px_8px_8px_rgba(0,0,0,0.05)] z-50"
                  style={{ boxSizing: 'border-box' }}
                >
                  <div className="flex flex-col p-[16px_12px] gap-4">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-14sb text-primary no-underline transition-colors duration-200 hover:text-[var(--color-primary-2)]"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <img
                        src="/user.png"
                        alt="마이페이지"
                        className="w-5 h-5"
                      />
                      <span>마이페이지</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-14sb text-primary bg-transparent border-0 cursor-pointer p-0 transition-colors duration-200 hover:text-[var(--color-primary-2)] text-left"
                    >
                      <img
                        src="/logout.png"
                        alt="로그아웃"
                        className="w-5 h-5"
                      />
                      <span>로그아웃</span>
                    </button>
                  </div>
                </div>
              )}
              <span className="text-16sb text-indigo">
                {userInfo?.nickname || '사용자'}
              </span>
            </div>
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
                      로그아웃
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
