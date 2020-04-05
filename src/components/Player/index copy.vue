<template>
  <div class="player">
    <div class="play-disk"></div>
    <div class="play-control"></div>
    <div class="player-progress"></div>
  </div>
</template>

<script>
export default {
  name: "Player"
};
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  display: flex;
  max-width: 300px;
  max-height: 75px;
  width: 60vw;
  height: 15vw;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
    0 20px 20px rgba(95, 23, 101, 0.2);

  .play-disk {
    flex: 1.2;
    padding: 2.4vw;
  }
  .player-control {
    flex: 2;
    padding: 2.4vw 2.4vw 2.4vw 0;
  }
  .player-progress {
    position: absolute;
    left: 1.8vw;
    right: 1.8vw;
    top: 0;
    z-index: -1;
  }
}
</style>
