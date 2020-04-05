<template>
  <div class="player">
    <div class="panel">
      <button>
        <i class="iconfont icon-music-prev"></i>
      </button>
      <button @click="changePlay">
        <i class="iconfont" :class="playing ? 'icon-pause' : 'icon-play'"></i>
      </button>
      <button>
        <i class="iconfont icon-music-next"></i>
      </button>
      <button @click="isVolume = !isVolume">
        <i
          class="iconfont icon-volume-off"
          :class="isVolume ? 'icon-volume-on' : 'icon-volume-off'"
        ></i>
      </button>
    </div>
    <div class="song">
      <router-link to="/music">
        满天飞舞
      </router-link>
    </div>
    <audio ref="audio" id="audio" src="../../assets/MP3/1.mp3"></audio>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Player",
  data() {
    return {
      songReady: false,
      isPlayer: false,
      isVolume: true
    };
  },
  computed: {
    ...mapGetters(["playing"]),
    currentSong() {
      return this.playlist[this.currentIndex];
    }
  },
  methods: {
    change() {
      this.isPlayer = !this.isPlayer;
    },
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlayingState(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    changePlay() {
      if (this.playing) {
        this.$store.dispatch("selectPlay", false);
        this.$refs.audio.pause();
      } else {
        this.$store.dispatch("selectPlay", true);
        this.$refs.audio.play();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  width: 168px;
  border-radius: 8px;
  .panel {
    display: flex;
    justify-content: center;
    button {
      margin-right: 18px;
      padding: 0;
      border: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
      i {
        color: rgba(0, 0, 0, 0.38);
      }
      &:hover i {
        color: #222;
      }
    }
  }
  .song {
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    & > a {
      display: inline-block;
      font-size: 12px;
      // animation: 4s wordsLoop linear infinite normal;
    }
  }
}
</style>
