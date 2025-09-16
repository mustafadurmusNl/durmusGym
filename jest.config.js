// jest.config.js - Workspace uyumlu
export default {
  // Test dosyalarının konumu
  testMatch: [
    "<rootDir>/client/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/client/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}",
  ],

  // Test ortamı
  testEnvironment: "jsdom",

  // Module name mapping - Workspace'te tek React instance
  moduleNameMapper: {
    // Ana dizindeki React'i kullan (workspace sayesinde)
    "^react$": "<rootDir>/node_modules/react",
    "^react-dom$": "<rootDir>/node_modules/react-dom",
    "^react-dom/test-utils$": "<rootDir>/node_modules/react-dom/test-utils",

    // CSS ve asset mockları
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/jest-mocks/fileMock.js",
  },

  // Transform
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest"],
  },

  // Transform ignore
  transformIgnorePatterns: ["/node_modules/(?!(axios|lucide-react)/)"],

  // Setup dosyası
  setupFilesAfterEnv: ["<rootDir>/client/src/setupTests.js"],

  // Sadece ana dizindeki node_modules'ı kullan
  moduleDirectories: ["<rootDir>/node_modules"],

  // Test path ignore
  testPathIgnorePatterns: ["/node_modules/", "/build/", "/cypress/"],

  // ES modules desteği
  extensionsToTreatAsEsm: [".jsx", ".ts", ".tsx"],

  // Coverage
  collectCoverageFrom: [
    "client/src/**/*.{js,jsx,ts,tsx}",
    "!client/src/index.js",
    "!client/src/setupTests.js",
    "!**/*.d.ts",
  ],

  coverageDirectory: "<rootDir>/coverage",

  verbose: true,
};
