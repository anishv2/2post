import { string, object } from "zod";

export const registerSchema = object({
  firstName: string({ required_error: "Firstname is required"})
    .min(3, { message: "First name must be of minimum 3 characters" })
    .max(30, { message: "First name must be of maximum 30 characters" }),
  lastName: string({ required_error: "Lastname is required"})
    .min(3, { message: "Last name must be of minimum 3 characters" })
    .max(30, { message: "Last name must be of maximum 30 characters" }),
  gender: string({ required_error: "Gender is required"}),    
  email: string({ required_error: "Email is required"})
    .email({ message: "Invalid email address" }),
  password: string({ required_error: "Password is required"})
    .min(8, { message: "Password should be of minimum 8 characters" })
    .max(16, { message: "Password should be of minimum 16 characters" }),
  repeatPassword: string({ required_error: "Password is required"})
  .min(8, { message: "Repeat password must be atleast 8 characters" })

}).refine((data) => data.password === data.repeatPassword, {
  message: "Password don't match",
  path: ["repeatPassword"],
});

export const loginSchema = object({
  email: string({ required_error: "Email is required"})
    .email({ message: "Enter a valid email" }),
  password: string({ required_error: "Password is required"})
    .min(8, { message: "Password should be of minimum 8 characters" })
    .max(16, { message: "Password should be of minimum 16 characters" }),
});

export const recoverEmailSchema = object({
  email: string({ required_error: "Email is required"})
    .email({ message: "Enter a valid email" })
});

export const OTPSchema = object({
  otp: string({ required_error: "OTP is required"})
  .min(6, { message: "OTP should be of 6 digits" })
  .max(6, { message: "OTP shoudl be of 6 digits" }),
});

export const changePwdSchema = object({
  password: string({ required_error: "Password is required"})
    .min(8, { message: "Password should be of minimum 8 characters" })
    .max(16, { message: "Password should be of minimum 16 characters" }),
  repeatPassword: string({ required_error: "Password is required"})
  .min(8, { message: "Repeat password must be atleast 8 characters" })

}).refine((data) => data.password === data.repeatPassword, {
  message: "Password don't match",
  path: ["repeatPassword"],
});