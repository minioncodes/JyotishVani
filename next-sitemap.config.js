
module.exports = {
  siteUrl: "https://jyotishwaani.com", 
  generateRobotsTxt: true, 
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/api/*"],

 
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://jyotishwaani.com/sitemap.xml",
    ],
  },

};
