// Dominio oficial, igual que SITE_URL en lib/seo.ts (este archivo es CommonJS
// y no puede importarlo). No usar NEXT_PUBLIC_FRONTEND_URL: en local apunta a
// localhost y el sitemap generado saldría con esa URL.
const SITE_URL = 'https://lymbika.com';
const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://lymbika-backend.onrender.com';

// Todas las páginas son dinámicas (el layout lee la sesión), así que
// next-sitemap no descubre ninguna sola: cada ruta se lista aquí o sale de Strapi.
// Fuera a propósito: cart, dashboard, search, success, etc. (noindex o privadas).
const PAGINAS_FIJAS = [
  ['/', 1.0],
  ['/shop', 0.8],
  ['/membership', 0.8],
  ['/specialty', 0.8],
  ['/doctor-catalog', 0.8],
  ['/clinics', 0.8],
  ['/hospitals', 0.6],
  ['/schedules', 0.8],
  ['/vive-lymbika', 0.7],
  ['/for-doctors', 0.6],
  ['/about', 0.5],
  ['/privacidad', 0.3],
];

/**
 * Todos los registros de una colección, página por página. Si Strapi falla
 * devuelve lo que alcanzó a traer: mejor un sitemap incompleto que un build roto.
 */
async function todos(coleccion, query) {
  const registros = [];
  for (let page = 1; ; page++) {
    try {
      const res = await fetch(
        `${BASE}/api/${coleccion}?${query}&pagination[pageSize]=500&pagination[page]=${page}`
      );
      const json = await res.json();
      if (!Array.isArray(json.data)) break;
      registros.push(...json.data);
      if (page >= (json.meta?.pagination?.pageCount ?? 1)) break;
    } catch (err) {
      console.warn(`[sitemap] ${coleccion} página ${page}:`, err.message);
      break;
    }
  }
  return registros.filter((r) => r.slug);
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false,
  exclude: ['/*'],
  sitemapSize: 5000,
  additionalPaths: async () => {
    const [productos, categorias, clinicas, doctores, especialidades, servicios] =
      await Promise.all([
        todos('products', 'filters[active][$eq]=true&fields[0]=slug'),
        todos('categories', 'fields[0]=slug'),
        todos('clinics', 'fields[0]=slug'),
        todos('doctors', 'fields[0]=slug'),
        todos('services', 'fields[0]=slug'),
        todos(
          'medical-services',
          'fields[0]=slug&fields[1]=has_landing_page&populate[specialty][fields][0]=slug'
        ),
      ]);

    const rutas = [
      ...PAGINAS_FIJAS,
      ...especialidades.map((e) => [`/specialty/${e.slug}`, 0.7]),
      // Las landings son las páginas que más interesa posicionar.
      ...servicios
        .filter((s) => s.specialty?.slug)
        .map((s) => [`/specialty/${s.specialty.slug}/${s.slug}`, s.has_landing_page ? 0.9 : 0.5]),
      ...doctores.map((d) => [`/doctor/${d.slug}`, 0.7]),
      ...clinicas.map((c) => [`/clinics/${c.slug}`, 0.7]),
      ...categorias.map((c) => [`/category/${c.slug}`, 0.6]),
      ...productos.map((p) => [`/product/${p.slug}`, 0.5]),
    ];

    const lastmod = new Date().toISOString();
    return rutas.map(([ruta, priority]) => ({
      loc: ruta,
      changefreq: 'weekly',
      priority,
      lastmod,
    }));
  },
};
