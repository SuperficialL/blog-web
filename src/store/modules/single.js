import { getArticleDetail } from "@/api/index";

const state = {
  article: {}
};

const mutations = {
  UPDATE_ARTICLE_DETAIL(state, data) {
    state.article = data;
  }
};

const actions = {
  // 获取文章详情
  GET_ARTICLE_DETAIL({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getArticleDetail(params)
        .then(data => {
          commit("UPDATE_ARTICLE_DETAIL", data);
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
