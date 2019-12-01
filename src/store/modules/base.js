import {
  getMenu,
  getSiteInfo,
  getFriendLink,
  getIndexBanner,
  getTags,
  getComments
} from "@/api";

const state = {
  isLoading: false,
  navigation: [],
  bannerList: [],
  blogInfo: {},
  friendLink: [],
  tags: [],
  comments: []
};

const getters = {
  // 请求数据时加载状态
  isLoading: state => state.isLoading
};

const mutations = {
  UPDATE_MENU (state, data) {
    state.navigation = data.results;
  },
  UPDATE_BlogInfo (state, blogInfo) {
    if (Array.isArray(blogInfo)) {
      state.blogInfo = blogInfo[0];
    }
  },
  UPDATE_BANNER (state, data) {
    state.bannerList = data;
  },
  UPDATE_lINKS (state, friendLink) {
    state.friendLink = friendLink.results;
  },
  UPDATE_TAGS (state, tags) {
    state.tags = tags.results;
  },
  UPDATE_COMMENTS (state, comments) {
    state.comments = comments.results;
  },
  UPDATE_LOADING (state, response) {
    state.isLoading = response;
  }
};

const actions = {
  // 获取导航栏
  GET_MENU ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getMenu(params)
        .then(data => {
          commit("UPDATE_MENU", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取站点信息
  GET_BLOGINFO ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getSiteInfo(params)
        .then(data => {
          commit("UPDATE_BlogInfo", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取友情链接
  GET_FriendLink ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getFriendLink(params)
        .then(data => {
          commit("UPDATE_lINKS", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取轮播
  GET_BANNER ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getIndexBanner(params)
        .then(data => {
          commit("UPDATE_BANNER", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取标签集合
  GET_TAGS ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getTags(params)
        .then(data => {
          commit("UPDATE_TAGS", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 获取首页评论
  GET_COMMENTS ({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getComments(params)
        .then(data => {
          commit("UPDATE_COMMENTS", data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  FETCH_LOADING ({ commit }, params) {
    commit("UPDATE_LOADING", params);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
