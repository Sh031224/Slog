module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.tsx"],
  moduleNameMapper: {
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js"
  },
  moduleDirectories: ["node_modules", "src"],
  collectCoverage: true,
  coverageReporters: ["text", "cobertura"],
  coverageThreshold: {
    global: {
      lines: 70
    }
  }
};
