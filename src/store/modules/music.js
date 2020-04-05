import { playMode } from "@/utils/config";

const music = {
  state: {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
  },

  mutations: {
    UPDATE_SINGER(state, singer) {
      state.singer = singer;
    },

    UPDATE_PLAYING(state, flay) {
      state.playing = flay;
    },

    UPDATE_FULLSCREEN(state, flag) {
      state.fullScreen = flag;
    },

    UPDATE_PLAYLIST(state, playList) {
      state.playList = playList;
    },

    UPDATE_SEQUENCELIST(state, sequenceList) {
      state.sequenceList = sequenceList;
    },

    UPDATE_MODE(state, mode) {
      state.mode = mode;
    },

    UPDATE_CURRNETINDEX(state, index) {
      state.currentIndex = index;
    }
  },

  actions: {
    selectPlay({ commit }, flag) {
      console.log(flag);
      // commit("UPDATE_SEQUENCELIST", list);
      // commit("UPDATE_PLAYLIST", list);
      // commit("UPDATE_CURRNETINDEX", index);
      commit("UPDATE_PLAYING", flag);
    }
  }
};

export default music;
