import { number, object, string } from "zod";

export const signInSchema = object({
  parsedEmail: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  parsedPassword: string({ required_error: "Password is required" }).min(
    1,
    "Please enter a valid password",
  ),
});

export const signUpSchema = object({
  parsedName: string({ required_error: "Name is required" })
    .min(2, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  parsedEmail: string({ required_error: "Email is required" })
    .min(6, "Email is required")
    .email("Invalid email"),
  parsedPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const magicLinkSignUpSchema = object({
  parsedName: string({ required_error: "Name is required" })
    .min(2, "Name is required")
    .max(32, "Name must be less than 32 characters"),
  parsedEmail: string({ required_error: "Email is required" })
    .min(6, "Email is required")
    .email("Invalid email"),
});

export const emailSchema = object({
  parsedEmail: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
});

export const passwordSchema = object({
  parsedPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const setPasswordSchema = object({
  parsedPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  parsedConfirmPassword: string({ required_error: "Password is required" })
    .min(1, "Confirm password is required")
    .min(8, "Confirm password must be more than 8 characters")
    .max(32, "Confirm password must be less than 32 characters"),
});

export const idSchema = object({
  parsedToken: string({ required_error: "Token is required" }).uuid(),
});

export const numberSchema = object({
  parsedNumber: number({ required_error: "Value required" }),
});

export const positiveNumberSchema = object({
  parsedNumber: number({ required_error: "Value is required" }).gt(
    0,
    "Please enter a valid amount",
  ),
});

export const stringSchema = object({
  parsedString: string({
    required_error: "Value is required",
  }).min(1, "Please select a withdraw condition"),
});
