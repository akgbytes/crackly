import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(6, { message: "Name must be at least 6 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),

  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(16, { message: "Password must be at most 16 characters long" })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

const emailSchema = registerSchema.pick({
  email: true,
});

const passwordSchema = registerSchema
  .pick({ password: true })
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match the password",
    path: ["confirmPassword"],
  });

type RegisterData = z.infer<typeof registerSchema>;
type LoginData = z.infer<typeof loginSchema>;
type EmailData = z.infer<typeof emailSchema>;
type PasswordData = z.infer<typeof passwordSchema>;

export const validateRegister = (data: RegisterData) =>
  registerSchema.safeParse(data);

export const validateLogin = (data: LoginData) => loginSchema.safeParse(data);

export const validateEmail = (data: EmailData) => emailSchema.safeParse(data);

export const validatePassword = (data: PasswordData) =>
  passwordSchema.safeParse(data);
