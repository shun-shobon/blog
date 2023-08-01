import createBundleAnalyzer from "@next/bundle-analyzer";

import { headers } from "./headers.js";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  headers() {
    return Promise.resolve(headers);
  },
};

export default withBundleAnalyzer(config);
