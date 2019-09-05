module.exports = {
  presets: [
    '@vue/app'
  ],
  "plugins": [[
    "prismjs",
    {
      "languages": ["javascript", "css", "markup", "python", "scss", "bash", "django"],
      // 这是语言类型
      "plugins": ["line-numbers", "highlight-keywords", "show-language", "previewers", "autolinker", "autoloader", "command-line","toolbar"],
      // 使用了行号还可以添加其他插件，具体去官网看看吧
      // "theme": "coy", 
      // 主题
      // "css": true
    }
  ]]
}
