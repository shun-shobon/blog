const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const headers = require("./headers");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
    runtime: "edge",
  },
  headers() {
    return Promise.resolve(headers);
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
module.exports = withBundleAnalyzer(config);
