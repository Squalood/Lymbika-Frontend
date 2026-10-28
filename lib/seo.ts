/**
 * Dominio oficial del sitio, sin www. Es la base de `metadataBase` en
 * app/layout.tsx: las canónicas de cada página se escriben relativas
 * ("/shop") y Next las completa con este dominio.
 *
 * www.lymbika.com debe redirigir aquí desde Amplify; si no, Google ve dos
 * copias del sitio.
 */
export const SITE_URL = "https://lymbika.com";
