import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PrivateRoute, PublicRoute } from "@/components/shared/ProtectedRoute";
import { Spinner } from "./components/ui";
import { AppLayout } from "./components/layout";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const AuthPage = lazy(() => import("@/pages/auth/AuthPage"));
const VerifyEmailPage = lazy(() => import("@/pages/auth/VerifyEmailPage"));
const ForgotPassPage = lazy(() => import("@/pages/auth/ForgotPasswordPage"));
const ResetPassPage = lazy(() => import("@/pages/auth/ResetPasswordPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const wrap = (el: React.ReactNode) => (
  <Suspense fallback={<Spinner fullPage />}>{el}</Suspense>
);
export const router = createBrowserRouter([
  // Public pages (accessible always)
  { path: "/", element: wrap(<LandingPage />) },
  { path: "/verify-email", element: wrap(<VerifyEmailPage />) },
  { path: "/forgot-password", element: wrap(<ForgotPassPage />) },
  { path: "/reset-password", element: wrap(<ResetPassPage />) },
  // Auth page (redirect to /dashboard if already logged in)
  {
    element: <PublicRoute />,
    children: [{ path: "/auth", element: wrap(<AuthPage />) }],
  },
  // Protected pages (require JWT)
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: wrap(<DashboardPage />) },
          // Phase 2+: vocabulary, flashcards, lessons ...
        ],
      },
    ],
  },
]);
