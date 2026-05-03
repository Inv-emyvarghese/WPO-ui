// src/routes/PublicRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PageLoadingSpinner from "@/components/common/loaders/PageLoadingSpinner";
import { useMyContext } from "@/context/ContactContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { DEFAULT_APP_ROUTE } from "@/constants/stringConstants";

type PublicRouteProps = {
  redirectPath?: string;
};

export default function PublicRoute({
  redirectPath = DEFAULT_APP_ROUTE,
}: Readonly<PublicRouteProps>) {
  const { token, loading, handleLogout } = useMyContext();
  const location = useLocation();

  if (loading) {
    return <PageLoadingSpinner />;
  }

  const isPsychosocialDashboard =
    location.pathname === DEFAULT_APP_ROUTE ||
    location.pathname.startsWith(`${DEFAULT_APP_ROUTE}/`);

  if (isPsychosocialDashboard) {
    return (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    );
  }

  // Allow access to token-based routes even if authenticated
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

  // If user is authenticated, redirect to default app (psychosocial dashboard)
  if (token) {
    return <Navigate to={redirectPath} replace />;
  }

  // Not authenticated → allow access
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}