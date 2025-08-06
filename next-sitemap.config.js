/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || 'https://lymbika.com',
  generateRobotsTxt: true, // también genera robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
};
