import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { router } from "./Router";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { getMe } from "@/features/auth/authSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((s) => s.auth);

  // Re-hydrate user on every page load when a token exists
  useEffect(() => {
    if (isAuthenticated) dispatch(getMe());
  }, []);

  return <RouterProvider router={router} />;
}
