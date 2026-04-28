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

  // Not authenticated → send to login
  return <Navigate to={redirectPath} replace />;
}
