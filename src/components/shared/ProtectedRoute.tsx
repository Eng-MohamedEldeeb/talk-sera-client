import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import { Spinner } from "../ui";

// PrivateRoute — redirect to /auth if not authenticated
export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector((s) => s.auth);
  if (isLoading) return <Spinner />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

// PublicRoute — redirect to /dashboard if already logged in
export const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

// AdminRoute — admin only, redirect others to /dashboard
export const AdminRoute = () => {
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return user?.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace />
  );
};
