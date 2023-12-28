/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://tikitaka.chat",
  changefreq: "daily",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  priority: 1,
  exclude: ["/api/*", "/interview/*", "/history/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/interview/*", "/history/*"],
      },
    ],
  },
};
