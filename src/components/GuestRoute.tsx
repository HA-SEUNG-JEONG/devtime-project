import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * 로그인하지 않은 사용자만 접근할 수 있는 페이지를 위한 컴포넌트
 * 이미 로그인한 사용자는 메인 페이지로 리다이렉트
 * (로그인, 회원가입 페이지 등에 사용)
 */
const GuestRoute = ({ children }: GuestRouteProps) => {
  if (isLoggedIn()) {
    // 이미 로그인한 경우 메인 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;

