<template>
  <div class="wrap">
    <div class="player">
      <div class="prev-song">
        <i class="iconfont icon-music-prev"></i>
      </div>
      <div class="album-box">
        <div class="song-bg">
          <img src="../../assets/images/1.jpg" />
        </div>
        <div class="play" @click="changePlay">
          <i
            class="iconfont icon-play"
            :class="playing ? 'icon-pause' : 'icon-play'"
          ></i>
        </div>
      </div>
      <div class="next-song">
        <i class="iconfont icon-music-next"></i>
      </div>
    </div>
    <!-- <div class="song-info">我的将军啊</div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Music",
  data() {
    return {
      audio: null
    };
  },
  computed: {
    ...mapGetters(["playing"])
  },
  methods: {
    changePlay() {
      if (this.playing) {
        this.$store.dispatch("selectPlay", false);
        this.audio.pause();
      } else {
        this.$store.dispatch("selectPlay", true);
        this.audio.play();
      }
    }
  },
  // watch: {
  //   currentSong() {
  //     this.$refs.audio.play();
  //   }
  // },
  created() {
    this.$nextTick(() => {
      this.audio = document.getElementById("audio");
    });
  }
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: 0px;
  }
  to {
    transform: 200px;
  }
}
.wrap {
  margin: 10px auto;
  .player {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .album-box {
      position: relative;
      width: 414px;
      height: 414px;
      border-radius: 50%;
      overflow: hidden;
      &.playing {
        animation: rotate 5s infinite;
      }
      &.pause {
      }
      .play {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        margin-left: -20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        background-color: hsla(0, 0%, 100%, 0.6);
        transition: all 0.1s;
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
        }
        i {
          font-size: 40px;
          color: rgba(0, 0, 0, 0.38);
          &:hover {
            color: #333;
          }
        }
      }
    }
    .prev-song,
    .next-song {
      width: 40px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      i {
        font-size: 40px;
        color: rgba(0, 0, 0, 0.38);
        &:hover {
          color: #333;
        }
      }
    }
  }
}
</style>
