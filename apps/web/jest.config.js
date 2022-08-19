const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./"
});

const customJestConfig = {
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom"
};

module.exports = createJestConfig(customJestConfig);
