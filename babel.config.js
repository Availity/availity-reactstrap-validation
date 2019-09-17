// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", {
      "useBuiltIns": false,
    }],
    "@babel/preset-react"
  ],
  plugins: ["@babel/plugin-transform-runtime", "transform-proto-to-assign", "transform-class-properties"],
};
