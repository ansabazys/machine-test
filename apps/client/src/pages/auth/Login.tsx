import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import { loginUser } from "@/services/auth.service";

import { useAuthStore } from "@/store/auth.store";

import { loginSchema } from "@/lib/validations/auth.schema";

import type { LoginFormData } from "@/lib/validations/auth.schema";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Navbar from "@/components/home/navbar";

const Login = () => {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      toast.loading(
        "Signing in...",
        {
          id: "login",
        }
      );

      const response =
        await loginUser(data);

      toast.dismiss("login");

      const message =
        response?.message;

      if (
        message ===
        "Please verify your email"
      ) {
        toast.warning(
          "Please verify your email"
        );

        navigate("/verify-otp", {
          state: {
            email: data.email,
          },
        });

        return;
      }

      if (
        message ===
        "Your account is waiting for admin approval"
      ) {
        toast.info(
          "Waiting for admin approval"
        );

        navigate(
          "/pending-approval"
        );

        return;
      }

      toast.success(
        "Login successful"
      );

      setAuth({
        user: response.user,
        accessToken:
          response.accessToken,
      });

      navigate(
        response.user.role ===
          "ADMIN"
          ? "/admin"
          : "/dashboard"
      );
    } catch (error: any) {
      toast.dismiss("login");

      const message =
        error?.response?.data
          ?.message ||
        "Invalid credentials";

      if (
        message ===
        "Please verify your email"
      ) {
        toast.warning(
          "Email verification required"
        );

        navigate("/verify-otp", {
          state: {
            email: data.email,
          },
        });

        return;
      }

      if (
        message ===
        "Your account is waiting for admin approval"
      ) {
        toast.info(
          "Your account is pending approval"
        );

        navigate(
          "/pending-approval"
        );

        return;
      }

      toast.error(message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="absolute top-0 flex min-h-screen w-full items-center justify-center bg-[#f7f7f8] px-4">
        <div className="w-full max-w-md border border-[#e5e7eb] bg-white p-8">
          {/* HEADER */}
          <div className="mb-8">
            <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#6b7280]">
              Authentication
            </p>

            <h1 className="text-2xl font-medium tracking-tight text-[#09090b]">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-[#6b7280]">
              Login to continue to
              dashboard
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(
              onSubmit
            )}
            className="space-y-5"
          >
            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-[10px] font-mono uppercase tracking-widest text-[#6b7280]">
                Email Address
              </label>

              <Input
                placeholder="john@example.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-2 text-xs text-red-500">
                  {
                    errors.email
                      .message
                  }
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
                {...register(
                  "password"
                )}
              />

              {errors.password && (
                <p className="mt-2 text-xs text-red-500">
                  {
                    errors.password
                      .message
                  }
                </p>
              )}
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />

                  <span>
                    Signing In
                  </span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* FOOTER */}
          <div className="mt-8 border-t border-[#e5e7eb] pt-5">
            <p className="text-xs text-[#6b7280]">
              Don’t have an
              account?{" "}
              <Link
                to="/register"
                className="text-[#09090b] transition-colors hover:text-black"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;