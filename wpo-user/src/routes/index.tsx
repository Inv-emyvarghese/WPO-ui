import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicRoute from "./guards/PublicRoute";
import ProtectedRoute from "./guards/ProtectedRoute";
import ErrorFallback from "@/pages/error-boundary/ErrorFallback";

/* eslint-disable react-refresh/only-export-components */
const LoginPage = lazy(() => import("@/pages/auth/login/LoginPage"));
const SignupPage = lazy(() => import("@/pages/auth/sign-up/SignUpPage"));
const SignupTokenPage = lazy(
  () => import("@/pages/auth/sign-up/SignUpTokenPage")
);
const ForgotPasswordPage = lazy(
  () => import("@/pages/auth/forgot-password/ForgotPasswordPage")
);
const ForgotPasswordTokenPage = lazy(
  () => import("@/pages/auth/forgot-password/ForgotPasswordTokenPage")
);
const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));
const AdminPage = lazy(() => import("@/pages/admin/AdminPage"));
const UserPage = lazy(() => import("@/pages/user/UserPage"));

const router = createBrowserRouter([
  // grouped Public routes
  {
    path: "/",
    element: <PublicRoute />,
    errorElement: <ErrorFallback />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            children: [
              {
                index: true,
                element: <SignupPage />,
              },
              {
                path: ":token",
                element: <SignupTokenPage />,
              },
            ],
          },
          {
            path: "forgot-password",
            children: [
              {
                index: true,
                element: <ForgotPasswordPage />,
              },
              {
                path: ":token",
                element: <ForgotPasswordTokenPage />,
              },
            ],
          },
          {
            path: "psychosocial-dashboard",
            element: <UserPage />,
          },
        ],
      },
    ],
  },

  // Grouped protected routes
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorFallback />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: "admin",
            element: <AdminPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*", // This matches any invalid path
    element: <NotFoundPage />, // Display 404 page
  },
]);

export default router;