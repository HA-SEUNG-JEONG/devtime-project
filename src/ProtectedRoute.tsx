import { Navigate } from "react-router";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAuth = true,
}: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();

  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (!requireAuth && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
