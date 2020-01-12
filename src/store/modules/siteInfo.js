import { getMenu } from "@/api/nav";
import { getTags } from "@/api/tags";
import { getComments } from "@/api/comments";
import { getFriendsLink } from "@/api/friendslink";
import { getSiteInfo } from "@/api/index";
import { getCarousels } from "@/api/carousels";

const state = {
  isLoading: false,
  navigation: [],
  carousels: [],
  blogInfo: {},
  friendsLink: [],
  tags: [],
  comments: []
};

const getters = {
  // 请求数据时加载状态
  isLoading: state => state.isLoading
};

const mutations = {
  // 更新菜单
  UPDATE_MENU(state, data) {
    console.log(data, 'data');
    state.navigation = data.results;
  },
  // 更新站点信息
  UPDATE_BlogInfo(state, blogInfo) {
    if (Array.isArray(blogInfo)) {
      state.blogInfo = blogInfo[0];
    }
  },
  // 更新轮播图
  UPDATE_BANNER(state, data) {
    state.carousels = data;
  },
  // 更新友链
  UPDATE_lINKS(state, friendsLink) {
    state.friendsLink = friendsLink.results;
  },
  // 更新标签
  UPDATE_TAGS(state, tags) {
    state.tags = tags.results;
  },
  // 更新评论
  UPDATE_COMMENTS(state, comments) {
    state.comments = comments.results;
  },
  // 更新状态
  UPDATE_LOADING(state, response) {
    state.isLoading = response;
  }
};

const actions = {
  // 获取导航数据
  GET_MENU({ commit, state }, params) {
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
  GET_BLOGINFO({ commit, state }, params) {
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
  GET_FriendLink({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getFriendsLink(params)
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
  GET_BANNER({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      getCarousels(params)
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
  GET_TAGS({ commit, state }, params) {
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
  GET_COMMENTS({ commit, state }, params) {
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

  FETCH_LOADING({ commit }, params) {
    commit("UPDATE_LOADING", params);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
