import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(3, "Name should be at least 3 character  long"),
  lastName: z.string().min(3, "Surname should be at least 3 character long"),
  username: z.string().min(5, "Username should be at least 5 character long "),
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, "Password should be at least  8 character long")
    .max(15, "password should not be more than 15 character long"),
});

export const signinSchema = z.object({
  email: z.string().email("please enter a valid email"),
  password: z
    .string()
    .min(8, "password should be at least 8 character long")
    .max(15, "password should not be more than 15 character long"),
});
