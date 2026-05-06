/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://lymbika.com',
  generateRobotsTxt: false,
  exclude: ['/robots.txt'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://lymbika-backend.onrender.com';

    const staticRoutes = [
      '/category/medicamentos',
      '/category/pediatrico',
      '/category/cronicos',
      '/category/cuidado-belleza',
      '/category/especiales',
      '/category/suplementos',
      '/clinics/clinica-de-ginecologia',
      '/clinics/clinica-de-neurologia',
      '/clinics/clinica-de-pediatria',
      '/clinics/clinica-renal',
      '/clinics/clinica-de-cardiologia',
      '/doctor/dr-jose-orlando-guinto-nava',
    ];

    // Fetch slugs de todos los productos
    let productRoutes = [];
    try {
      const res = await fetch(
        `${BASE}/api/products?fields[0]=slug&pagination[pageSize]=2000&pagination[page]=1`
      );
      const json = await res.json();
      if (Array.isArray(json.data)) {
        productRoutes = json.data
          .filter((item) => item.slug)
          .map((item) => `/product/${item.slug}`);
      }
    } catch (err) {
      console.warn('Error fetching product slugs for sitemap:', err.message);
    }

    const allRoutes = [...staticRoutes, ...productRoutes];

    return allRoutes.map((path) => ({
      loc: `${config.siteUrl}${path}`,
      changefreq: 'weekly',
      priority: path.startsWith('/product/') ? 0.6 : 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};
