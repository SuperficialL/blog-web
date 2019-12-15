import { getArticles } from "@/api";

const state = {
  articleList: [],
  page: 1,
  count: 1,
  description: ""
};

const mutations = {
  UPDATE_ARTICLES (state, data) {
    state.articleList = data.results;
    state.count = data.count;
    state.description = data;
  }
};

const actions = {
  // 获取文章列表信息
  GET_ARTICLES ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getArticles(params)
        .then(data => {
          console.log("文章", data);
          commit("UPDATE_ARTICLES", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
