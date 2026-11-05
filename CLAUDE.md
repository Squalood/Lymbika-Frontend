# Lymbika-Frontend — contexto para Claude

Contexto general (máquina, BD, backend, flujo local vs. producción): ver `..\..\CLAUDE.md`. Aquí solo lo propio de este repo.

## Qué es
Sitio público **www.lymbika.com** (Lymbika Healthcare, Juárez): farmacia en línea (carrito + Stripe), directorio de doctores/clínicas/hospitales, cirugías y servicios médicos por especialidad, membresía "HealthPass" (suscripción Stripe), intake de casos ("Coordinar mi caso") y dashboard de usuario/operaciones.
Stack: Next.js 16 (App Router, turbopack) + React 19 + TypeScript, Tailwind 3 + shadcn/Radix, zustand, zod, sonner, framer-motion, embla. Todo el contenido viene de **Strapi 5** (`Lymbika-Backend`).

## Comandos
- `npm run dev` → turbopack en http://localhost:3000
- `npm run build` (corre `postbuild` = `next-sitemap`, que consulta Strapi para los slugs de productos)
- `npm run lint` · `npx tsc --noEmit` para tipos
- Node >= 20. `.npmrc` desactiva `audit`/`fund` a propósito (el audit colgaba los builds).

## Variables de entorno (`.env.local`, no commitear ni copiar valores)
`NEXT_PUBLIC_BACKEND_URL` (base de Strapi, usada en ~70 sitios), `NEXT_PUBLIC_FRONTEND_URL`, `NEXT_PUBLIC_MEDIA_HOST` (host de CloudFront), `NEXT_PUBLIC_DELIVERY_COST`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. El README está desactualizado (dice Next 15, Vercel y `NEXT_PUBLIC_STRIPE_PUBLIC_KEY`): no fiarse de él.

## Deploy / CI
- Producción en **AWS Amplify** (Server Actions corren en Lambda, tope ~6 MB por request → los archivos grandes se suben directo del navegador a Strapi). No es Vercel.
- `.github/workflows/build.yml`: `npm ci` + `npm run build` en push a `main` y en PRs (Node 20, secrets con las `NEXT_PUBLIC_*`).
- Ramas: `main` (prod), `test`, `ci/build-check`.

## Mapa de carpetas
- `app/(routes)/` — páginas: `shop`, `category/[categorySlug]`, `product/[productSlug]`, `cart`, `success`/`successError`, `loved-products`, `search`, `doctor-catalog`, `doctor/[doctorSlug]`, `clinics/[clinicSlug]`, `hospitals`, `healthHubs`, `specialty/[specialtySlug]/[medicalServiceSlug]` (landing de servicio médico en `sections/`), `membership`, `case/start` + `case/[token]`, `schedules` (landing de la sucursal; `config.ts` con horario/zona), `vive-lymbika`, `about`, `privacidad`, `review`, `dashboard` (`account`, `summaries`, `operations` = admin de casos por rol).
  Cada ruta guarda en su `components/` (o `sections/`) solo lo que usa **esa** ruta. **Regla: si dos rutas (o la home) usan algo, va a `components/features/<dominio>/`; nunca se importa desde la carpeta de otra ruta.**
- `app/(auth)/signin|signup`; callbacks de Google en `app/api/auth/google/route.ts`, `app/auth/google`, `app/connect/google/redirect` (tres rutas, mismo handler; ver `docs/autenticacion.md`).
- `app/data/actions/` — Server Actions (`"use server"`): auth, checkout, subscription, case, case-admin, reviews, profile, orders. `app/data/services/` — `mutate-data.ts`, `get-token.ts`, `get-user-me-loader.ts`, `auth-errors.ts` (errores de Strapi traducidos).
- `lib/strapi/` — **todas las lecturas de Strapi desde el servidor**, por dominio: `client.ts` (`strapiGet`/`strapiPrimero`/`strapiLista`), `pages.ts` (home, membership, schedules, site-config, navbar, about, shop, healthHubs, faq, `getPage`), `products.ts`, `doctors.ts`, `clinics.ts`, `medical-services.ts`. Las páginas no escriben `fetch` a mano.
- `components/` — `ui/` (shadcn, no editar a mano salvo necesidad), `features/<dominio>/` (compartidos por varias rutas: `membership`, `hospitals`, `clinics`, `medical-services`, `doctors`; archivos en kebab-case), `forms/`, `auth/`, `skeleton/`, `commerce-ui/`, y componentes de sección sueltos.
- `hooks/` — hooks de datos de cliente (`use-products`, `use-doctors`, `use-clinics`, `use-hospitals`, `use-medical-service-catalog`, `use-service-rates-by-*`…; exportan `useGet*`, todos sobre `useSharedResource`), `use-cart` y `use-loved-products` (zustand + persist en localStorage), `use-search` (única lógica de búsqueda: la usan la barra del hero y `SearchGeneral` del navbar/tienda), `use-subscribe`, `use-is-desktop` (único hook de tamaño de pantalla).
- FAQ: solo dos componentes, uno por diseño: `components/faq.tsx` (simple: título + acordeón; home y /membership) y `components/faq-card.tsx` (tarjeta con encabezado oscuro y preguntas numeradas; landing de servicio y /healthHubs). Ambos son server components; el grupo se pide en el servidor (`getFaqGroup(slug)` en `lib/strapi/pages.ts`). Planes de membresía: un solo diseño, `features/membership/plans.tsx` (el de /membership), también en home y tienda.
- Utilidades de texto en `lib/utils.ts`: `cn`, `clean`, `sinAcentos` (comparar búsquedas sin acentos; no reimplementarla).
- `lib/` — `media.ts` + `media-loader.ts`, `product-fields.ts`, `clinic-fields.ts`, `client-resource.ts`, `site-config.ts`, `constants.ts`, `membership-state.ts`, `financiamiento.ts`, `case/`.
- `types/` — tipos de cada colección; `types/single-types/` para los single types (home, navbar, about, membership-page, schedules-page, site-config).
- `proxy.ts` — el "middleware" de Next 16: protege `/dashboard` y `/review` (solo verifica que exista la cookie `jwt`).
- `docs/autenticacion.md` — referencia detallada del login (local + Google).

## Cómo se consume Strapi (patrones a respetar)
- `fetch` nativo con URL armada a mano: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/...` y query strings literales (`filters[...]`, `fields[n]`, `populate[...]`). No se usa `qs` (axios está instalado pero no se usa).
- **Server components**: siempre vía `lib/strapi/` y su `strapiGet` (caché `revalidate` 3600 por defecto; `false` = sin caché, p. ej. reseñas). Nunca lanza: si Strapi falla registra `[etiqueta]` y devuelve null/[], y la página cae a su fallback o a `notFound()` en vez de dar 500. Los slugs van con `encodeURIComponent`. Excepción a propósito: las consultas de `case/` (token) y las subidas de documentos, que van directo del navegador a Strapi.
- **Preferir servidor**: si el componente padre es server, pedir en el servidor y pasar props (planes en `features/membership/plans-section.tsx`, reseñas del doctor, FAQ). Un hook de cliente solo para lo interactivo o diferido (buscador, filtros).
- **Client components**: hooks de `hooks/` sobre `useSharedResource`/`fetchShared` de `lib/client-resource.ts` (caché en memoria 5 min que deduplica peticiones entre componentes). `parse` y `fallback` deben ser constantes de módulo; para colecciones usar `parseLista<Tipo>`. Opción `enabled` para carga diferida. No escribir hooks con `useEffect` + `fetch` a mano.
- Catálogo de servicios (tarifa más barata por servicio): `agruparCatalogo` de `lib/medical-service-catalog.ts`, compartido por servidor y cliente.
- **No usar `populate=*` en listas.** Productos: `camposDeProducto(extra)` de `lib/product-fields.ts` (única fuente de verdad de campos de tarjeta). Clínicas: `CAMPOS_CLINICA` de `lib/clinic-fields.ts` (con `populate=*` la respuesta pasaba de 2 MB y el Data Cache de Next no la guardaba). Las fichas de un solo registro sí pueden usar `populate=*`. Quedan ~30 usos heredados; no añadir nuevos.
- Dynamic zones: populate explícito por componente con `populate[sections][on][<categoria.componente>]...` (ver `HOME_QUERY` en `lib/strapi/pages.ts`).
- **Productos inactivos**: toda consulta de productos lleva `filters[active][$eq]=true` (incluido el sitemap).
- **Llamadas autenticadas**: la cookie `jwt` es httpOnly, así que salen del servidor vía Server Action + `mutateData()`. Nunca leer el JWT en cliente.
- **Checkout/suscripción**: el cliente solo manda `id`+`quantity` (o id de plan); precios, descuento de miembro y envío los calcula el backend, que devuelve la URL de Stripe (`app/data/actions/checkout-actions.ts`, `subscription-actions.ts`).
- **Media**: `next/image` usa loader custom (`lib/media-loader.ts`). Toda la media está en S3 y la sirve CloudFront con variantes pregeneradas `_w<ancho>.webp` (posters de video: `_poster.webp`). Cloudinary ya no se usa: se quitó su soporte (nov-2026). Los anchos de `next.config.ts` (`deviceSizes`/`imageSizes`) deben coincidir con `ANCHOS` en `lib/media.ts`; añadir uno exige generar las variantes en el bucket. `imgUrl()` para rutas relativas `/uploads/...`.
- **Site config**: teléfono de WhatsApp, dirección, redes, tipo de cambio y nombre de la membresía vienen del single type `site-config`, resuelto campo por campo con respaldo en `lib/constants.ts`. Server: `getSiteConfig()`; client: `useSiteConfig()` (`components/site-config-provider.tsx`, montado en `app/layout.tsx`). No leer `lib/constants.ts` directamente desde componentes.
- Textos editables: la tendencia es mover copys y labels a single types/componentes de Strapi (home dynamic zone, membership-page, schedules-page, navbar-section) con fallback en código.

## SEO / metadata
- Dominio oficial **`https://lymbika.com` (sin www)**, en `SITE_URL` de `lib/seo.ts`; es el `metadataBase` de `app/layout.tsx`. www debe redirigir a él desde Amplify.
- Cada `page.tsx` pone su `title`, `description` y `alternates: { canonical: "/ruta" }` (relativa). **Nunca poner canónica en un `layout.tsx`**: la heredan todas las rutas hijas y Google las toma como copias de la padre (pasó con `specialty/layout.tsx`, que mandaba todas las landings a `/specialty`). En layouts solo va `robots: noindex` para subárboles privados (cart, dashboard…).
- Páginas públicas que deben indexarse son server components (sin `"use client"` en el `page.tsx`); lo interactivo va en componentes hijos. Un componente que crea objetos con funciones (ej. `Autoplay()` de embla) necesita `"use client"` propio aunque hoy lo envuelva un client component.

## Convenciones
- Código, comentarios y UI en **español** (nombres de funciones/variables nuevas también suelen estar en español: `camposDeProducto`, `crearSesionDePago`, `resolverSiteConfig`). Comentarios JSDoc que explican el *por qué* (con cifras cuando aplica).
- Alias `@/` desde la raíz. Componentes shadcn con `cn()` de `lib/utils.ts`; colores por variables CSS en `app/globals.css` (primario azul `hsl(227.6 76% 42.5%)`, `--radius: 1rem`), fuente Urbanist. Dark mode existe en CSS pero el ThemeProvider está comentado.
- Formato de precios: `lib/formatPrice.tsx` (MXN) y `formatPriceUS.tsx`. Validación de formularios/acciones con zod.
- Commits en español, estilo conventional: `feat:`, `fix:`, `perf:`, `refactor:`, `chore:`, `ci:` con scope opcional (`feat(membership): ...`, `perf(media): ...`). Mensaje en presente/3a persona describiendo el efecto ("pide campos explícitos…", "blinda el checkout…").

## Gotchas
- El campo de membresía del usuario en Strapi es `membershipActive` (genérico a propósito; antes `mediClubRegular`). El nombre comercial ("HealthPass", antes "MediClub") solo vive en site-config/constants.
- `proxy.ts` no valida el token, solo su presencia: un JWT rechazado por Strapi aún entra al dashboard (lo maneja `SessionErrorBanner`).
- El destino del login con Google lo fija Strapi (panel → Providers → Google), no este repo.
- El buscador (`hooks/use-search.ts`) no descarga nada hasta el primer foco y solo los catálogos de su `include`; `/search` no pide nada sin término. Mantener esa carga diferida (el catálogo de productos son ~3.000).
- En local, `.env.local` apunta por defecto al backend de **producción** (ver CLAUDE.md raíz): lecturas inocuas, pero checkout, reseñas, casos y perfil escriben datos reales.
