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

module.exports = config;
