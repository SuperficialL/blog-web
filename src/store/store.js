import Vue from "vue";
import Vuex from "vuex";
import single from "./modules/single";
import base from "./modules/base";
import category from "./modules/category";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    base,
    single,
    category
  }
});
