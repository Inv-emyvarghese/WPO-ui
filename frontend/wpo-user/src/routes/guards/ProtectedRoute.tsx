// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import PageLoadingSpinner from "@/components/common/loaders/PageLoadingSpinner";
import { useMyContext } from "@/context/ContactContext";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { DEFAULT_APP_ROUTE } from "@/constants/stringConstants";

type ProtectedRouteProps = {
  redirectPath?: string;
};

export default function ProtectedRoute({
  redirectPath = DEFAULT_APP_ROUTE,
}: Readonly<ProtectedRouteProps>) {
  const { token, loading } = useMyContext();
  if (loading) {
    return <PageLoadingSpinner />;
  }

  if (token) {
    return (
      <>
        <ScrollToTop />
        <Outlet />
      </>
    );
  }

  // Not authenticated → send to psychosocial dashboard (public); login remains at /login
  return <Navigate to={redirectPath} replace />;
}