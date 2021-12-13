module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/**/*.stories.{js,jsx,ts,tsx}",
    "!<rootDir>/**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleNameMapper: {
    "^.+\\.(png|svg|jpeg|gif|webp|avif|ico|bmp)$":
      "<rootDir>/tests/__mocks__/imageMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "@swc/jest",
      {
        sourceMaps: true,
        module: {
          type: "commonjs",
        },
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?!(unified|remark-.*))/"],
};
