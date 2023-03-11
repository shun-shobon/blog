/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: "https://blog.s2n.tech",
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml", "/ogp", "/feed"],
  robotsTxtOptions: {
    additionalSitemaps: ["https://blog.s2n.tech/server-sitemap.xml"],
  },
};
