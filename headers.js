/** @type {import("next/dist/lib/load-custom-routes").Header[]} */
module.exports = [
  {
    source: "/(.*)",
    headers: [
      // ref: https://nextjs.org/docs/advanced-features/security-headers
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains; preload",
      },
      {
        key: "X-XSS-Protection",
        value: "1; mode=block",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      process.env["NODE_ENV"] === "production" && {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "connect-src 'self' https://www.google-analytics.com",
          "frame-src 'self' https://www.googletagmanager.com https://platform.twitter.com",
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://platform.twitter.com",
          "style-src 'self' 'unsafe-inline'",
          "font-src * data:",
          "img-src * data:",
        ].join("; "),
      },
    ].filter(Boolean),
  },
];
