module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/*.test.(ts|tsx)"],
  moduleNameMapper: {
    "@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.ts$": "@swc/jest"
  },
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
};
