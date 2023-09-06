import base from "@shun-shobon/eslint-config-base/flat";
import next from "@shun-shobon/eslint-config-next/flat";
import react from "@shun-shobon/eslint-config-react/flat";

/**
 * @type {import("@shun-shobon/eslint-config-utils").Config[]}
 */
export default [
  ...base,
  ...react,
  ...next,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
  {
    ignores: [".next/"],
  },
];
