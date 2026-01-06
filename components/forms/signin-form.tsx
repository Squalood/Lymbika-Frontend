"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { loginUserAction } from "@/app/data/actions/auth-actions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { ZodErrors } from "@/app/data/actions/zod-errors";
import { StrapiErrors } from "@/app/data/actions/strapi-errors";
import { AuthState } from "@/types/auth";
import { SubmitButton } from "../submit-button";
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

interface SigninFormProps extends React.ComponentProps<"div"> {
  callbackUrl?: string;
}

export function SigninForm({ className, callbackUrl, ...props }: SigninFormProps) {
  const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending] = useTransition();

  return (
    <div className={"flex flex-col gap-6 " + className} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action={formAction}>
            {/* Campo oculto para callback URL */}
            <input type="hidden" name="callbackUrl" value={callbackUrl || "/dashboard"} />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido</h1>
                <p className="text-balance text-muted-foreground">
                  Inicie sesión en su cuenta de Lymbika.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="identifier">Email o usuario</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="username o email"
                />
                <ZodErrors error={formState?.zodErrors?.identifier || []} />
              </div>
              <div className="grid gap-2 relative">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
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
              <SubmitButton className="w-full" text="Inicia sesión" loadingText="Cargando..." loading={isPending}/>
              <StrapiErrors error={formState?.strapiErrors} />
              <div className="text-center text-sm">
                ¿No tienes una cuenta? {" "}
                <Link className="underline" href="/signup">
                  Regístrate
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden md:block bg-slate-800 px-12">
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
      <div className="text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Al continuar, aceptas nuestros <a href="#">Términos de servicio</a> y nuestra <a href="#">Política de privacidad</a>.
      </div>
    </div>
  );
}