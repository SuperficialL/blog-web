import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./plugins/element-ui.js";
import "./assets/scss/index.scss";
import "highlight.js/styles/ocean.css";

import * as filters from "@/utils/filters";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
