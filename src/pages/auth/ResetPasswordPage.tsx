import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/app/api";
import { Button, Input } from "@/components/ui";
import { resetPassword } from "./validation/validation.schema";

const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPassword) });

  const onSubmit = async ({ password }: { password: string }) => {
    try {
      const token = params.get("token");
      await api.post("/auth/reset-password", { token, password });
      toast.success("Password reset! Please sign in.");
      navigate("/auth");
    } catch {
      toast.error("Invalid or expired link.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080F]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 p-8"
      >
        <h1 className="text-2xl font-bold text-white">Reset Password</h1>
        <Input
          label="New Password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          {...register("confirm")}
          error={errors.confirm?.message}
        />
        <Button
          type="submit"
          className="w-full justify-center"
          isLoading={isSubmitting}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
