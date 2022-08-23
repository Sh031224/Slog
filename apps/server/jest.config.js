module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/*.test.(ts|tsx)"],
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
};
