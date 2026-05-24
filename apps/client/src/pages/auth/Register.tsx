import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import { registerUser } from "@/services/auth.service";

import { registerSchema } from "@/lib/validations/auth.schema";

import type { RegisterFormData } from "@/lib/validations/auth.schema";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Navbar from "@/components/home/navbar";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      toast.loading("Creating account...", {
        id: "register",
      });

      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.dismiss("register");

      toast.success(response?.message || "OTP sent successfully");

      navigate("/verify-otp", {
        state: {
          email: data.email,
        },
      });
    } catch (error: any) {
      toast.dismiss("register");

      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  };

  return (
    <>
    <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8] px-4">
        <div className="w-full max-w-md border border-[#e5e7eb] bg-white p-8">
          {/* HEADER */}
          <div className="mb-8">
            <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#6b7280]">
              Authentication
            </p>

            <h1 className="text-2xl font-medium tracking-tight text-[#09090b]">
              Create account
            </h1>

            <p className="mt-2 text-sm text-[#6b7280]">
              Register to continue to dashboard
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#6b7280]">
                Full Name
              </label>

              <Input placeholder="John Doe" {...register("name")} />

              {errors.name && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#6b7280]">
                Email Address
              </label>

              <Input placeholder="john@example.com" {...register("email")} />

              {errors.email && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#6b7280]">
                Password
              </label>

              <Input
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />

              {errors.password && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#6b7280]">
                Confirm Password
              </label>

              <Input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />

              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />

                  <span>Creating Account</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 border-t border-[#e5e7eb] pt-5">
            <p className="text-xs text-[#6b7280]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#09090b] transition-colors hover:text-black"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
