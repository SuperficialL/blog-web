/*
 * @Author: Superficial
 * @Date: 2020-01-07 20:40:36
 * @LastEditTime: 2020-02-28 00:32:31
 * @Description: Do not edit
 */

const getters = {
  navigation: (state) => state.siteInfo.navigation,
  carousels: (state) => state.siteInfo.carousels,
  blogInfo: (state) => state.siteInfo.blogInfo,
  friendsLink: (state) => state.siteInfo.friendsLink,
  comments: (state) => state.siteInfo.comments,
  tags: (state) => state.siteInfo.tags,

  singer: (state) => state.music.singer,
  playing: (state) => state.music.playing,
  fullScreen: (state) => state.music.fullScreen,
  playList: (state) => state.music.playList,
  sequenceList: (state) => state.music.sequenceList,
  mode: (state) => state.music.mode,
  currentIndex: (state) => state.music.currentIndex,
};

export default getters;
