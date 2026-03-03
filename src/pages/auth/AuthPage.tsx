import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { login, register } from "@/features/auth/authSlice";
import {
  loginSchema,
  registerSchema,
  type LoginForm,
  type RegisterForm,
} from "./validation/validation.schema";
import { Button, Input } from "@/components/ui";

export default function AuthPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((s) => s.auth);
  const lf = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const rf = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const handleLogin = async (data: LoginForm) => {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error(result.payload as string);
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    const result = await dispatch(register(data));
    if (register.fulfilled.match(result)) {
      toast.success("Account created! Verify your email.");
      navigate("/dashboard");
    } else {
      toast.error(result.payload as string);
    }
  };
  return (
    <div className="min-h-screen flex bg-[#07080F]">
      {/* Left decorative panel */}
      <div
        className="flex-1 hidden lg:flex flex-col justify-center p-16
                   bg-linear-to-br from-[#0D0E1A] to-[#111220] border-r border-white/7"
      >
        <div className="text-3xl font-bold text-[#C9A84C] mb-6">Talksera</div>
        <p className="text-2xl font-semibold text-white leading-relaxed">
          The best time to start
          <br />
          was yesterday.
          <br />
          The second best is <em>now.</em>
        </p>
      </div>
      {/* Right panel – form */}
      <div className="w-full lg:w-115 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Tab switcher */}
          <div className="flex gap-4 mb-8 border-b border-white/7">
            {(["signin", "signup"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm font-medium transition-colors ${
                  tab === t
                    ? "text-[#C9A84C] border-b-2 border-[#C9A84C]"
                    : "text-[#606070] hover:text-[#A0A0B0]"
                }`}
              >
                {t === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>
          {/* Google OAuth */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3 px-4 mb-6
                             rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
          >
            <span></span> Continue with Google
          </button>
          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/7" />
            <span className="text-xs text-[#606070]">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-white/7" />
          </div>
          {tab === "signin" ? (
            <form onSubmit={lf.handleSubmit(handleLogin)} className="space-y-4">
              <Input
                label="Email"
                type="email"
                {...lf.register("email")}
                error={lf.formState.errors.email?.message}
              />
              <Input
                label="Password"
                type="password"
                {...lf.register("password")}
                error={lf.formState.errors.password?.message}
              />
              <Button
                type="submit"
                className="w-full justify-center"
                isLoading={isLoading}
              >
                Sign In →
              </Button>
            </form>
          ) : (
            <form
              onSubmit={rf.handleSubmit(handleRegister)}
              className="space-y-4"
            >
              <Input
                label="Full Name"
                {...rf.register("name")}
                error={rf.formState.errors.name?.message}
              />
              <Input
                label="Email"
                type="email"
                {...rf.register("email")}
                error={rf.formState.errors.email?.message}
              />
              <Input
                label="Password"
                type="password"
                {...rf.register("password")}
                error={rf.formState.errors.password?.message}
              />
              <Button
                type="submit"
                className="w-full justify-center"
                isLoading={isLoading}
              >
                Create Account →
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
