import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { verifyOtp } from "@/services/auth.service";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import OtpInput from "@/components/ui/OtpInput";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setLoading(true);

      setError("");

      await verifyOtp({
        email,
        otp,
      });

      navigate("/login");
    } catch (error: any) {
      setError(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-[#e5e7eb] bg-white p-8">
        {/* HEADER */}
        <div className="mb-8">
          <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#6b7280]">
            Verification
          </p>

          <h1 className="text-2xl font-medium tracking-tight text-[#09090b]">
            Verify OTP
          </h1>

          <p className="mt-2 text-sm text-[#6b7280]">
            Enter the verification code sent to
          </p>

          <p className="mt-1 text-sm font-medium text-[#09090b]">{email}</p>
        </div>

        {/* OTP INPUT */}
        <div className="space-y-5">
          <div className="space-y-4">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#666]">
              Verification Code
            </label>

            <OtpInput onComplete={(value) => setOtp(value)} />
          </div>

          {/* ERROR */}
          {error && (
            <div className="border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-500">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <Button onClick={handleVerify} disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />

                <span>Verifying</span>
              </div>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </div>

        {/* FOOTER */}
        <div className="mt-8 border-t border-[#e5e7eb] pt-5">
          <p className="text-xs text-[#6b7280]">
            Didn’t receive the code?{" "}
            <button className="text-[#09090b] hover:text-black">
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
