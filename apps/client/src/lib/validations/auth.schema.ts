import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3),

    email: z
      .string()
      .email("Invalid email"),

    password: z.string().min(6),

    confirmPassword: z.string(),
  })

  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type RegisterFormData =
  z.infer<typeof registerSchema>;

  export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password is required"),
});

export type LoginFormData =
  z.infer<typeof loginSchema>;