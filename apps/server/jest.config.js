module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/*.test.(ts|tsx)"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
};
