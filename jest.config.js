export default {
  // Test environment for simulating a browser DOM
  testEnvironment: "jsdom",

  // Babel will transform these files
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  // Tells Jest not to transform node_modules except for 'axios'
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)"],

  // Jest will recognize these file extensions
  moduleFileExtensions: ["js", "jsx", "json", "node", "mjs"],
};
