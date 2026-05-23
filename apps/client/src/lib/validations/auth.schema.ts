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