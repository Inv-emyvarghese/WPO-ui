// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import PageLoadingSpinner from "@/components/common/loaders/PageLoadingSpinner";
import { useMyContext } from "@/context/ContactContext";
import ScrollToTop from "@/components/layout/ScrollToTop";

type ProtectedRouteProps = {
  redirectPath?: string;
};

export default function ProtectedRoute({
  redirectPath = "/login",
}: Readonly<ProtectedRouteProps>) {
  const { token, loading,handleLogout } = useMyContext();
  if (loading) {
    return <PageLoadingSpinner />;
  }
  // Handle token-based routes (SignupToken, ForgotPasswordToken)
  if (
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/forgot-password")
  ) {
    handleLogout();
    return (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    );
  }
  if (token) {
    if (
      location.pathname.startsWith("/login") ||
      location.pathname.startsWith("/signup")
    ) {
      return <Navigate to="/contacts" replace />;
    }

    return (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    );
  }

  // Not authenticated → send to login
  return <Navigate to={redirectPath} replace />;
}
