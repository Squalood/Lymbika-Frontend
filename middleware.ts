import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Definir rutas protegidas
const protectedRoutes = ["/dashboard"];

// Verificar si una ruta es protegida
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export function middleware(request: NextRequest) {
  // Obtener la cookie JWT desde el request
  const token = request.cookies.get("jwt")?.value;
  const currentPath = request.nextUrl.pathname;

  // Si el usuario no tiene token y la ruta es protegida, redirigirlo a /signin
  if (isProtectedRoute(currentPath) && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Configuración para evitar afectar rutas no necesarias
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
