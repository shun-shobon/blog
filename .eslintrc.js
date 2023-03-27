/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  extends: ["@shun-shobon/base", "next/core-web-vitals", "prettier"],
  rules: {
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
