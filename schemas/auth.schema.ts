
import { z } from "zod";

export const signupFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be under 100 characters."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254, "Email must be under 254 characters."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be under 100 characters.")
    .regex(/[A-Za-z]/, "Include at least one letter.")
    .regex(/[0-9]/, "Include at least one number."),
});

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  password: z
    .string()
    .min(1, "Enter your password."),
});

export type SignupFormInput = z.infer<typeof signupFormSchema>;

export type LoginFormInput = z.infer<typeof loginFormSchema>;
