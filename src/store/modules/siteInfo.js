import { getMenu } from "@/api/nav";
import { getTags } from "@/api/tags";
import { getComments } from "@/api/comments";
import { getFriendsLink } from "@/api/friendslink";
import { getSiteInfo } from "@/api/index";
import { getCarousels } from "@/api/carousels";
import { arr2tree } from "@/utils/tools";

const siteInfo = {
  state: {
    isLoading: false,
    navigation: [],
    carousels: [],
    blogInfo: {},
    friendsLink: [],
    tags: [],
    comments: []
  },

  mutations: {
    // 更新菜单
    UPDATE_MENU(state, arr) {
      let navigation = arr2tree(arr);
      state.navigation = navigation;
    },
    // 更新站点信息
    UPDATE_BlogInfo(state, blogInfo) {
      state.blogInfo = blogInfo;
    },
    // 更新轮播图
    UPDATE_BANNER(state, data) {
      state.carousels = data;
    },
    // 更新友链
    UPDATE_lINKS(state, friendsLink) {
      state.friendsLink = friendsLink;
    },
    // 更新标签
    UPDATE_TAGS(state, tags) {
      state.tags = tags;
    },
    // 更新评论
    UPDATE_COMMENTS(state, comments) {
      state.comments = comments;
    }
  },

  actions: {
    // 获取导航数据
    GET_MENU({ commit }, params) {
      return new Promise((resolve, reject) => {
        getMenu(params)
          .then(res => {
            if (res.code) {
              let { data } = res.result;
              data = data.sort((a,b) => {return a.ordering - b.ordering; });
              commit("UPDATE_MENU", data);
              resolve(data);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取站点信息
    GET_BLOGINFO({ commit }, params) {
      return new Promise((resolve, reject) => {
        getSiteInfo(params)
          .then(res => {
            if (res.code) {
              let siteInfo = Object.assign({}, res.data);
              commit("UPDATE_BlogInfo", siteInfo);
              resolve(siteInfo);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取友情链接
    GET_FriendLink({ commit }, params) {
      return new Promise((resolve, reject) => {
        getFriendsLink(params)
          .then(res => {
            if (res.code) {
              let { data } = res.result;
              commit("UPDATE_lINKS", data);
              resolve(data);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取轮播
    GET_Carousels({ commit }, params) {
      return new Promise((resolve, reject) => {
        getCarousels(params)
          .then(res => {
            if (res.code) {
              let carousels = res.data.carousels;
              commit("UPDATE_BANNER", carousels);
              resolve(carousels);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取标签集合
    GET_TAGS({ commit }, params) {
      return new Promise((resolve, reject) => {
        getTags(params)
          .then(res => {
            if (res.code) {
              let { data } = res.result;
              commit("UPDATE_TAGS", data);
              resolve(data);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取首页评论
    GET_COMMENTS({ commit }, params) {
      return new Promise((resolve, reject) => {
        getComments(params)
          .then(res => {
            if (res.code) {
              let { data } = res.result;
              commit("UPDATE_COMMENTS", data);
              resolve(data);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};


export default siteInfo;
