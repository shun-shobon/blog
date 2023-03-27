/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  root: true,
  plugins: ["simple-import-sort"],
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  extends: ["@shun-shobon/base", "next/core-web-vitals", "prettier"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@next/next/no-img-element": "off",
  },
  overrides: [
    {
      files: ["**/*.test.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
      },
    },
  ],
};
