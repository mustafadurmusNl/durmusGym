// jest.config.js

export default {
  // Jest'in testleri nerede bulacağını belirtin.
  // Bu, 'client/src' klasöründeki test dosyalarını hedef alır.
  testMatch: ["<rootDir>/client/src/**/__tests__/**/*.js"],

  // Test ortamı olarak JSDOM kullanın (tarayıcı ortamını simüle eder).
  testEnvironment: "jsdom",

  // Babel'i kullanarak JSX ve ES6+ kodunu dönüştürün.
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest"],
  },

  // Node modüllerinin içindeki bazı paketleri dönüştürmekten kaçının.
  transformIgnorePatterns: ["/node_modules/(?!axios)/"],

  // Testlerden önce çalıştırılacak kurulum dosyasını belirtin.
  setupFilesAfterEnv: ["<rootDir>/client/src/setupTests.js"],

  // Modül uzantılarını belirtin.
  moduleFileExtensions: ["js", "jsx", "json", "node", "mjs"],
};
