module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  "collectCoverage": true,
  "collectCoverageFrom": ["src/**/*.{js,vue}", "!**/node_modules/**", "!src/assets/**", "!src/main.js"],
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  setupFilesAfterEnv: ["./jest.setup.js"],
  coverageReporters: ["html", "text-summary"]
}
