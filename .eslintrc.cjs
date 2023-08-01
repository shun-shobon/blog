/** @type {import("eslint").ESLint.ConfigData} */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  extends: ["@shun-shobon/base", "@shun-shobon/react", "@shun-shobon/next"],
  overrides: [
    {
      files: ["**/*.test.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
      },
    },
  ],
};
