# Autenticación: cómo funciona y qué falló

Referencia del flujo de login de Lymbika tras la depuración de septiembre de 2026.
Cubre las dos vías de acceso, el problema que las tuvo caídas, lo que se arregló y
lo que sigue pendiente.

---

## 1. El flujo hoy

### Piezas

La autenticación vive repartida entre este repo y el Strapi hermano
(`backend-ecommerce`). Strapi emite y valida los JWT; el frontend solo los guarda
en una cookie y los reenvía.

| Pieza | Archivo | Qué hace |
|---|---|---|
| Formulario | `components/forms/signin-form.tsx` | Captura `identifier` + `password` |
| Server action | `app/data/actions/auth-actions.ts` | Valida con Zod, guarda la cookie, redirige |
| Llamada a Strapi | `app/data/services/auth-service.ts` | `POST /api/auth/local` |
| Callback de Google | `components/auth/google-callback.tsx` | Handler compartido por tres rutas |
| Canje del token | `app/data/services/google-auth-service.ts` | `GET /api/auth/google/callback` |
| Guardia de rutas | `proxy.ts` | Protege `/dashboard` y `/review` |
| Lectura de sesión | `app/data/services/get-user-me-loader.ts` | `GET /api/users/me` |
| Llamadas autenticadas | `app/data/services/mutate-data.ts` | Adjunta el `Bearer` a POST/PUT |
| Catálogo de errores | `app/data/services/auth-errors.ts` | Traduce Strapi a español |

### Vía 1: correo o usuario + contraseña

```
signin-form  →  loginUserAction  →  POST {BACKEND}/api/auth/local
                                      ↓  { jwt, user }
                              cookie "jwt" (httpOnly, 7 días)
                                      ↓
                              redirect(callbackUrl ?? /dashboard)
```

El campo acepta **usuario o correo**: Strapi resuelve `identifier` contra ambos.

### Vía 2: Google

```
botón  →  {BACKEND}/api/connect/google
              ↓
          Google (consentimiento)
              ↓
          {BACKEND}/api/connect/google/callback
              ↓  redirige al valor fijo del panel de Strapi
          {FRONTEND}/api/auth/google?access_token=...
              ↓  exchangeGoogleToken()
          {BACKEND}/api/auth/google/callback?access_token=...
              ↓  { jwt, user }
          cookie "jwt"  →  /dashboard
```

Dos detalles que no son evidentes:

- **El `redirect_uri` que ve Google es el backend**, no este frontend. Google
  nunca conoce el dominio del sitio.
- **El destino final lo decide Strapi**, no el sitio desde el que saliste. Es un
  string fijo en Settings → Users & Permissions → Providers → Google, campo
  *The redirect URL to your front-end app*. Hoy vale
  `https://lymbika.com/api/auth/google`.

Por eso hay **tres rutas montadas sobre el mismo handler**, para cubrir cualquier
valor que tenga ese campo:

- `app/api/auth/google/route.ts` ← la que está configurada
- `app/auth/google/page.tsx`
- `app/connect/google/redirect/page.tsx`

### Cómo se sostiene la sesión

La cookie `jwt` es `httpOnly`, así que **ningún componente cliente puede leerla**.
Toda llamada autenticada sale del servidor.

`proxy.ts` (el middleware de Next 16) protege `/dashboard` y `/review`, pero
**solo comprueba que la cookie exista**, no que el token sea válido. Esa
distinción importa: se puede entrar al dashboard con un token que Strapi rechaza.

---

## 2. Qué estaba roto

### Causa raíz: permisos del rol en Strapi

La cuenta afectada tenía un **rol personalizado**, no `Authenticated`. En Strapi
los roles no heredan entre sí: uno nuevo nace con todos los permisos
desmarcados. El token se validaba bien, pero cada endpoint devolvía `403`.

El síntoma no se parecía a un problema de permisos:

| Dónde | Qué se veía |
|---|---|
| Navbar | Sin nombre de usuario |
| `/dashboard` | Bienvenida vacía |
| `/dashboard/account` | `TypeError: can't access property "username", e is null` |
| Checkout | Rechazado |

Los cuatro salían de lo mismo: `getUserMeLoader()` devolvía `null`.

**Y era invisible.** Esa llamada corre en el servidor, así que el `403` no
aparece en el Network del navegador.

### Bug independiente: el tope de 20 caracteres

El schema de login copiaba el `max(20)` del schema de registro, donde ese tope
aplica al *username*. Aplicado al `identifier` rechazaba **cualquier correo de
más de 20 caracteres** antes de llegar a Strapi, y el mensaje
(`Please enter a valid username or email address`) sugería que el correo estaba
mal escrito.

### Por qué costó encontrarlo

Los tres callbacks de Google eran copias literales que colapsaban cuatro causas
distintas en un único `?error=google_auth_failed`, descartaban el cuerpo de la
respuesta de Strapi y se tragaban la excepción. La pantalla de signin ni siquiera
leía el parámetro `error`, así que el usuario llegaba a un formulario en blanco.

---

## 3. Qué se solucionó

### En el panel de Strapi (no es código)

Marcar en el rol del usuario — sea `Authenticated` o uno personalizado:

- `Users-permissions → User → me`
- `Order → create`
- `Profile → updateMe` (ruta custom `PUT /api/profile`)
- `Review → create`

Son todas las llamadas autenticadas que hace el frontend.

### En el código

- **`max(20)` → `max(254)`** en el `identifier`, más `.trim()`. Se quitó también
  el `min(6)` de la contraseña al entrar: validar la política de contraseñas en
  el login no aporta nada y dejaba fuera a cuentas viejas.
- **Un solo handler** para los tres callbacks de Google, que loguea la respuesta
  cruda de Strapi y propaga un código específico por causa.
- **Catálogo de errores en español** (`auth-errors.ts`), compartido por el login
  local y el flujo de Google.
- **Banner global** (`components/auth/session-error-banner.tsx`, montado en
  `app/layout.tsx`): si hay sesión pero Strapi rechaza al usuario, avisa en todas
  las páginas. Distingue `403` (permisos del rol) de `401` (sesión expirada). Un
  visitante anónimo no lo ve.
- **Guardas contra `null`** en `/dashboard/account` y `/dashboard/summaries`. El
  crash existía porque `getUserMeLoader()` devolvía `data` sin tipar (`any`), así
  que TypeScript nunca vio que `null` llegaba a componentes que no lo aceptan.
  Ahora está tipado y el compilador lo detecta.
- **Log en `getUserMeLoader`**: sin él, un `403` de esa llamada es invisible.
- **Aviso en signin y signup** de que cada correo entra por una sola vía.

---

## 4. Qué queda abierto

### Un correo pertenece a un solo proveedor

Verificado en el código instalado de `@strapi/plugin-users-permissions`:

- `server/controllers/auth.js` filtra el login local por `provider: 'local'`.
- `server/services/providers.js` busca por email **y** provider; si no coinciden
  y el correo ya existe, lanza `Email is already taken.`

| `provider` | Entra con Google | Entra con contraseña |
|---|---|---|
| `local` | ❌ `Email is already taken.` | ✅ |
| `google` | ✅ | ❌ `Invalid identifier or password` |

No hay configuración que habilite las dos. Y el caso `google` + contraseña
devuelve el mismo error que una contraseña equivocada, así que **no se puede
detectar desde el frontend** para dar un aviso específico. Por eso la solución
fue de producto: decirlo en las pantallas de login y registro.

**Decisión pendiente:** aceptar esa limitación, o quitar el botón de Google.

### El Client Secret de Google quedó expuesto

Se compartió en texto plano durante la depuración. **Hay que rotarlo** en Google
Cloud Console → Credenciales → el cliente OAuth. Google permite dos secretos
activos a la vez: crear el nuevo, ponerlo en Strapi, verificar que el login sigue
vivo y luego borrar el viejo, sin downtime.

### La URL de redirect de Google es un único valor

No es una lista. Hoy apunta a producción, así que **el login con Google no se
puede probar en local**: el flujo siempre termina en `lymbika.com`. Opciones:

1. Cambiarlo a mano para probar en local (prioriza que producción funcione).
2. Levantar un Strapi local aparte con su propio valor.
3. Habilitar el callback dinámico de `grant` en `config/plugins.ts` del backend,
   con lista blanca de dominios. Sin la lista blanca, cualquiera podría redirigir
   el token a un sitio suyo.

### El rol por defecto de los registros nuevos

Revisar Settings → Users & Permissions → Advanced Settings → *Default role for
authenticated users*. Si apunta a un rol sin permisos, **cada usuario que se
registre queda roto igual**, y el síntoma es silencioso: ven el carrito, le dan a
pagar, falla, y se van sin reportar nada.

### El nombre del rol no lo lee ningún código

Ni el frontend ni el backend ramifican por rol. La membresía MediClub es el
booleano `mediClubRegular` del usuario (`src/api/order/controllers/order.ts`). Si
algún rol personalizado se creó pensando que otorgaba beneficios, no lo hace —
solo restringe permisos. Conviene decidir si esos roles deben existir.

---

## 5. Cómo diagnosticar la próxima vez

**Empezar por el código HTTP, antes de teorizar.**

| Código | Significa | Dónde se arregla |
|---|---|---|
| `401 Missing or invalid credentials` | Token inválido o expirado | Volver a iniciar sesión |
| `403 Forbidden` | Token válido, rol sin permiso | Panel de Strapi → Roles |
| `400 Email is already taken.` | El correo existe con otro proveedor | Ver sección 4 |

**Dónde mirar.** `getUserMeLoader` y el flujo de Google escriben en el log del
servidor con los prefijos `[users-me]` y `[google-auth]`. En producción, en
CloudWatch. No aparecen en el navegador: son llamadas server-side.

**Lo que no hay que asumir.** Que entrar a `/dashboard` significa sesión válida:
`proxy.ts` solo mira que la cookie exista. Y que un mensaje identifica su origen:
`"Debes iniciar sesión para completar la compra"` estaba duplicado literal en el
controlador de Strapi y en el `catch` del frontend. Ya se diferenciaron, pero
conviene revisar que no haya otros pares así.
