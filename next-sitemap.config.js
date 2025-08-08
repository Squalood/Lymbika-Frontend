/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://lymbika.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  // Aquí defines las rutas manualmente si tienes rutas dinámicas
  transform: async (config, path) => {
    return {
      loc: path, 
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const dynamicRoutes = [
      '/shop',
      '/membership',
      '/about',
      '/category/medicamentos',
      '/category/pediatrico',
      '/category/cronicos',
      '/category/cuidado-belleza',
      '/category/especiales',
      '/category/suplementos',
      '/service/neurocirugia',
      '/service/cirugia-general',
      '/surgery/senos-paranasales'
    ];

    return dynamicRoutes.map((path) => ({
      loc: `${config.siteUrl}${path}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};
