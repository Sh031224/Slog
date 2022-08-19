module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/*.test.(ts|tsx)"],
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
};
