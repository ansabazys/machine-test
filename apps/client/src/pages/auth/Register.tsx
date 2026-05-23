import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import { registerSchema } from "@/lib/validations/auth.schema";

import type {
  RegisterFormData,
} from "@/lib/validations/auth.schema";

import { registerUser } from "@/services/auth.service";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const Register = () => {
  const navigate = useNavigate();

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });


  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      setServerError("");

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/verify-otp", {
        state: {
          email: data.email,
        },
      });

    } catch (error: any) {
      setServerError(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">

      <Card className="w-full max-w-md rounded-2xl shadow-lg">

        <CardContent className="p-6">

          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              Create Account
            </h1>

            <p className="text-muted-foreground mt-2">
              Register to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* NAME */}
            <div className="space-y-2">
              <Label>Name</Label>

              <Input
                placeholder="John Doe"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>


            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                placeholder="john@example.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>


            {/* PASSWORD */}
            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                placeholder="******"
                {...register("password")}
              />

              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>


            {/* CONFIRM PASSWORD */}
            <div className="space-y-2">
              <Label>Confirm Password</Label>

              <Input
                type="password"
                placeholder="******"
                {...register("confirmPassword")}
              />

              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>


            {/* SERVER ERROR */}
            {serverError && (
              <p className="text-sm text-red-500">
                {serverError}
              </p>
            )}


            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />

                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
};

export default Register;