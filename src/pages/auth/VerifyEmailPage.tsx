import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Spinner } from "@/components/ui";
import api from "@/app/api";

const VerifyEmailPage = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      return;
    }
    api
      .get(`/auth/verify-email?token=${token}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07080F]">
      <div className="text-center max-w-sm">
        {status === "loading" && <Spinner />}
        {status === "success" && (
          <>
            <div className="text-5xl mb-4"> </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Email Verified!
            </h1>
            <p className="text-[#A0A0B0] mb-6">Your account is now active.</p>
            <Link to="/auth" className="text-[#C9A84C] hover:underline">
              Sign In →
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-5xl mb-4"> </div>
            <h1 className="text-2xl font-bold text-white mb-2">Invalid Link</h1>
            <p className="text-[#A0A0B0] mb-6">Link expired or already used.</p>
            <Link to="/auth" className="text-[#C9A84C] hover:underline">
              Back to Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
