import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/scss/index.scss";

// 按需导入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// import "./plugins/element.js";

// 代码高亮
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";

Vue.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
