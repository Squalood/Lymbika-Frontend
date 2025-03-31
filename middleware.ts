import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define las rutas protegidas
const protectedRoutes = ["/dashboard"];

// Verifica si la ruta es protegida
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value; // Obtiene el token JWT de las cookies
  const currentPath = request.nextUrl.pathname;

  // Si la ruta es protegida y no hay token, redirigir a /signin
  if (isProtectedRoute(currentPath) && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Configuración del matcher para evitar afectar rutas específicas
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
