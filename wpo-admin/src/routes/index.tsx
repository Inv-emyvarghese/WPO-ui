import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import PublicRoute from "./guards/PublicRoute";
import ProtectedRoute from "./guards/ProtectedRoute";
import ErrorFallback from "@/pages/error-boundary/ErrorFallback";

/* eslint-disable react-refresh/only-export-components */
const LoginPage = lazy(() => import("@/pages/auth/login/LoginPage"));

const NotFoundPage = lazy(() => import("@/pages/not-found/NotFoundPage"));

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
          // {
          //   index: true,
          //   element: <AdminPage />,
          // },
          
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