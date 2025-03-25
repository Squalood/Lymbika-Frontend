"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  registerUserService,
  loginUserService,
} from "@/app/data/services/auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 semana
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// 📌 Definimos un tipo para `prevState`
interface AuthState {
  zodErrors?: Record<string, string[]>;
  strapiErrors?: string | null;
  message?: string;
}

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "El usuario debe tener entre 3 y 20 caracteres.",
  }),
  password: z.string().min(6).max(100, {
    message: "La contraseña debe tener entre 6 y 100 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, ingrese un correo electrónico válido.",
  }),
});

export async function registerUserAction(
  prevState: AuthState, 
  formData: FormData
): Promise<AuthState> {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Faltan campos. No se pudo registrar.",
    };
  }

  // 📌 Definimos el tipo de `responseData`
  type RegisterResponse = { jwt: string } | { error: string };

  const responseData: RegisterResponse = await registerUserService(validatedFields.data);

  if (!responseData || "error" in responseData) {
    return {
      ...prevState,
      strapiErrors: responseData?.error || "Error desconocido.",
      zodErrors: undefined,
      message: "Error al registrarse.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, config);
  
  redirect("/dashboard");
}

// ---------------- LOGIN -----------------
const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "El identificador debe tener al menos 3 caracteres.",
    })
    .max(50, {
      message: "Ingrese un usuario o correo electrónico válido.",
    }),
  password: z
    .string()
    .min(6, {
      message: "La contraseña debe tener al menos 6 caracteres.",
    })
    .max(100, {
      message: "La contraseña debe tener entre 6 y 100 caracteres.",
    }),
});

export async function loginUserAction(
  prevState: AuthState, 
  formData: FormData
): Promise<AuthState> {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo iniciar sesión.",
    };
  }

  type LoginResponse = { jwt: string } | { error: string };
  const responseData: LoginResponse = await loginUserService(validatedFields.data);

  if (!responseData || "error" in responseData) {
    return {
      ...prevState,
      strapiErrors: responseData?.error || "Error desconocido.",
      zodErrors: undefined,
      message: "Error al iniciar sesión.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", responseData.jwt, config);

  redirect("/dashboard");
}

// ---------------- LOGOUT -----------------
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}
