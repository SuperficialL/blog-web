module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    indent: [1, 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": ["error", { args: "none" }]
  },

  parserOptions: {
    parser: "babel-eslint"
  },

  extends: ["plugin:vue/essential", "@vue/prettier"]
};
