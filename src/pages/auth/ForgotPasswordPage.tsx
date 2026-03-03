import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import api from "@/app/api";
import { Button, Input } from "@/components/ui";

const schema = z.object({ email: z.string().email() });

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };
  if (sent)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07080F]">
        <div className="text-center">
          <div className="text-5xl mb-4"> </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Check your email
          </h1>
          <p className="text-[#A0A0B0]">Reset link sent to your inbox.</p>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080F]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4 p-8"
      >
        <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
        <p className="text-[#A0A0B0] text-sm">
          Enter your email to get a reset link.
        </p>
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Button
          type="submit"
          className="w-full justify-center"
          isLoading={isSubmitting}
        >
          Send Reset Link
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
