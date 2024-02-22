const path = require("path");

const overrideWebpackConfig = ({ webpackConfig, context }) => {
  webpackConfig.output.path = path.resolve("dist");
  webpackConfig.output.filename = "main.js";
  webpackConfig.resolve.alias = {
    "@": path.resolve(__dirname, "src"),
  };
  return webpackConfig;
};

module.exports = {
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  eslint: {
    enable: false,
  },
  webpack: {
    configure: {
      entry: "./src/index.tsx",
    },
  },
  plugins: [
    {
      plugin: { overrideWebpackConfig },
    },
  ],
};
