export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // Jest için Node.js current version
        },
        modules: "auto", // Jest için CommonJS, diğerleri için ES modules
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // React 17+ için otomatik JSX transform
      },
    ],
  ],

  // Test ortamına özel ayarlar
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
            modules: "commonjs", // Jest için kesinlikle CommonJS
          },
        ],
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      ],
    },
  },
};
