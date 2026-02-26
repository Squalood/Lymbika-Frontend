# Lymbika Healthcare - Frontend

Plataforma web de marketplace y servicios de salud que conecta usuarios con productos de bienestar, doctores, clínicas, cirugías y servicios de salud. Construida con Next.js 15 y React 19.

## Tech Stack

| Categoría | Tecnologías |
|-----------|-------------|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **UI** | React 19, TypeScript 5 |
| **Estilos** | Tailwind CSS 3.4, Radix UI, Framer Motion |
| **Pagos** | Stripe |
| **Backend** | API REST (Strapi) alojado en Render |
| **Imágenes** | Cloudinary + Next.js Image Optimization |
| **Analytics** | Google Analytics (GA4), Facebook Pixel |

## Funcionalidades principales

- **E-Commerce** — Catálogo de productos, carrito de compras, pagos con Stripe, precios regulares y de membresía
- **Directorio médico** — Perfiles de doctores con reseñas y calificaciones, asociación doctor-clínica
- **Clínicas** — Listado de clínicas con servicios, galería de imágenes, testimonios
- **Cirugías** — Catálogo de procedimientos quirúrgicos con detalles
- **Hospitales y Health Hubs** — Directorio de centros de salud
- **Búsqueda global** — Búsqueda unificada de productos, doctores, servicios, cirugías y categorías
- **Membresías** — Planes con comparativa de beneficios y precios diferenciados
- **Wishlist** — Lista de productos favoritos con persistencia local
- **Reseñas** — Sistema de calificación por estrellas para doctores y servicios
- **Agendamiento** — Integración con Calendly para citas
- **Autenticación** — Registro, login con JWT, dashboard de usuario, historial de pedidos
- **SEO** — Generación automática de sitemap

## Estructura del proyecto

```
app/
├── (auth)/              # Rutas de autenticación (signin, signup)
├── (routes)/            # Rutas principales de la app
│   ├── cart/            # Carrito de compras
│   ├── shop/            # Tienda de productos
│   ├── clinics/         # Directorio de clínicas
│   ├── doctor-catalog/  # Directorio de doctores
│   ├── surgery/         # Catálogo de cirugías
│   ├── service/         # Servicios de salud
│   ├── hospitals/       # Hospitales
│   ├── membership/      # Planes de membresía
│   ├── dashboard/       # Panel de usuario
│   ├── search/          # Resultados de búsqueda
│   └── ...
├── data/                # Servicios de autenticación y API
│   ├── services/        # Auth service, tokens, loaders
│   └── actions/         # Server actions
api/                     # Hooks de data fetching
components/              # Componentes reutilizables
├── ui/                  # Componentes base (Radix UI)
├── forms/               # Formularios (login, registro, perfil)
├── skeleton/            # Loading skeletons
hooks/                   # Custom hooks (cart, wishlist, mobile)
types/                   # Definiciones de TypeScript
lib/                     # Utilidades (formatPrice, analytics)
```

## Requisitos previos

- **Node.js** >= 20.0.0
- **npm** (o yarn/pnpm/bun)

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_BACKEND_URL=<url_del_backend>
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<stripe_public_key>
NEXT_PUBLIC_GA_ID=<google_analytics_id>
```

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con Turbopack)
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción
npm run start
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con Turbopack |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linting con ESLint |
| `npm run postbuild` | Generación automática de sitemap |

## Despliegue

La app está preparada para desplegarse en [Vercel](https://vercel.com). Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más opciones.