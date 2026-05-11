"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUserAction } from "@/app/data/actions/auth-actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import { ZodErrors } from "@/app/data/actions/zod-errors";
import { StrapiErrors } from "@/app/data/actions/strapi-errors";
import { SubmitButton } from "../submit-button";
import { AuthState } from "@/types/auth";
import Image from "next/image";

const INITIAL_STATE: AuthState = {
  formData: {
    username: '',
    password: '',
    email: ''
  },
  zodErrors: null,
  strapiErrors: null,
  message: null,
};

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [passwordError, setPasswordError] = useState("");
  const [isPending, startTransition] = useTransition();

  // Nueva función de acción que valida antes de ejecutar la acción original
  const handleSubmit = async (formData: FormData) => {
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    setPasswordError("");

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Se usa `action={handleSubmit}` en lugar de `onSubmit` */}
          <form className="p-6 md:p-8" action={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Crear cuenta</h1>
                <p className="text-balance text-muted-foreground">
                  Regístrate para acceder a Lymbika.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Usuario</Label>
                <Input id="username" name="username" type="text" placeholder="username" required />
                <ZodErrors error={formState?.zodErrors?.username || []} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                <ZodErrors error={formState?.zodErrors?.email || []} />
              </div>

              {/* Campo de contraseña */}
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} required />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
                <ZodErrors error={formState?.zodErrors?.password || []} />
              </div>

              {/* Campo de confirmar contraseña */}
              <div className="grid gap-2 relative">
                <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                <div className="relative">
                  <Input id="confirm-password" name="confirm-password" type={showConfirmPassword ? "text" : "password"} required />
                  <Button
                    type="button"
                    className="absolute right-2 top-2 text-gray-500"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </div>

              <SubmitButton className="w-full" text="Registrarse" loadingText="Cargando..." loading={isPending} />
              <StrapiErrors error={formState?.strapiErrors} />
              <div className="relative flex items-center gap-3">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs text-muted-foreground">o</span>
                <div className="flex-1 border-t border-border" />
              </div>
              <a
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/connect/google`}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuar con Google
              </a>
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta? <Link href="signin" className="underline">Inicia sesión</Link>
              </div>
            </div>
          </form>
          <div className="relative hidden md:block bg-slate-800 px-16">
            <div className="relative w-full h-full">
              <Image
                src="/logos/logo-lymbika.svg"
                alt="imagen"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Al continuar, aceptas nuestros <a href="#">Términos de servicio</a> y nuestra <a href="#">Política de privacidad</a>.
      </div>
    </div>
  );
}