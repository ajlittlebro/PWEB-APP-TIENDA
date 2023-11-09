import { z } from "zod";

export const registerSchema = z.object({
  nombre: z.string({
    required_error: "Username is required",
  }),
  correo: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  contrasena: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
  rol: z.string({
    required_error: "Rol is required",
  }),
});

export const loginSchema = z.object({
  correo: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  contrasena: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});
