import { useAppSelector, useAppDispatch } from "@/app/store";
import { logout } from "@/features/auth/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((s) => s.auth);
  return {
    ...auth,
    logout: () => dispatch(logout()),
    isAdmin: auth.user?.role === "admin",
    isPremium: auth.user?.subscription.plan === "premium",
  };
}
