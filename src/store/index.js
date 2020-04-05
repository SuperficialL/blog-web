import Vue from "vue";
import Vuex from "vuex";

import siteInfo from "./modules/siteInfo";
import category from "./modules/category";
import music from "./modules/music";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    siteInfo,
    category,
    music
  },
  getters
});

export default store;
