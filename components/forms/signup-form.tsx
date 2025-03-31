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
              <div className="text-center text-sm">
                ¿Ya tienes una cuenta? <Link href="signin" className="underline">Inicia sesión</Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img src="/logo-lymbika.jpg" alt="Image" className="absolute inset-0 dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Al continuar, aceptas nuestros <a href="#">Términos de servicio</a> y nuestra <a href="#">Política de privacidad</a>.
      </div>
    </div>
  );
}
