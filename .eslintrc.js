module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:vue/essential"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    // "quotes": [
    //   "error",
    //   "double"
    // ],
    semi: ["error", "always"],
    "no-unused-vars": ["error", { args: "none" }]
  }
};
