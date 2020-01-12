/*
 * @Author: Superficial
 * @Date: 2020-01-07 20:40:36
 * @LastEditTime : 2020-01-07 22:33:22
 * @Description: Do not edit
 */

const getters = {
  navigation: (state) => state.siteInfo.navigation,
  carousels: (state) => state.siteInfo.carousels,
  blogInfo: (state) => state.siteInfo.blogInfo,
  friendsLink: (state) => state.siteInfo.friendsLink,
  comments: (state) => state.siteInfo.comments,
  tags: (state) => state.siteInfo.tags
};

export default getters;
