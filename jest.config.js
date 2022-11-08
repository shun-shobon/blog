const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();
  // FIXME: node_modules直下の依存関係もトランスパイルの対象とする
  // JestがESM未対応なため、ESMを使っているモジュールのみをトランスパイルするべきだが、
  // 列挙が現実的ではないためこれで対応する
  config.transformIgnorePatterns.shift();

  return config;
};
