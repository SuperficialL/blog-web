const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  // 静态资源目录
  // assetsDir: "./static",

  // 输出位置
  outputDir: "../koa-server/public/web",

  lintOnSave: true,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // css相关配置
  css: {
    extract: true,
    sourceMap: false,
    requireModuleExtension: true,
    loaderOptions: {
      // scss: {
      //   prependData: "@import \"@/assets/scss/_variable.scss\";"
      // }
    }
  },

  devServer: {
    proxy: {
      "/api": {
        // target: "http://127.0.0.1:3000",
        target: "http://www.zhangwurui.net",
        changeOrigin: true,
        ws: true
      },
      "/uploads": {
        // target: "http://127.0.0.1:3000",
        target: "http://www.zhangwurui.net",
        changeOrigin: true,
        ws: true
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },

  chainWebpack: config => {
    /* 添加分析工具 */
    if (process.env.NODE_ENV === "production") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .end();

      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");

      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            //匹配文件名
            threshold: 1024,
            //对超过10k的数据进行压缩
            deleteOriginalAssets: false
            //是否删除原文件
          })
        ]
      };
    }
  }
};
