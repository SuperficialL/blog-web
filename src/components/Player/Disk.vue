<template>
  <div class="disk" :class="player:isPlaying">
    <label
      for="file"
      ref="cover"
      :style="{<transition:stopMatrix,backgroundImage:couverUrl?`url(${coverUrl})`:''}"
      class="disk-cover"
    ></label>
    <input
      id="file"
      ref="file"
      type="file"
      accept=".mp3"
      multiple
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: "Disk"
};
</script>

<style lang="scss" scoped>
.disk {
  position: relative;
  padding-top: 100%;
  border-radius: 100%;
  overflow: hidden;
  transform: translateY(-50%) scale(0.88);
  transform-origin: center bottom;
  transition: all 0.6s ease;
  input {
    display: none;
  }
  .disk-cover {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-image: radial-gradient(circle, #444 0%, #333 100%);
    background-size: cover;
    background-position: center;
    &:after {
      content: "";
      position: absolute;
    }
  }
}
</style>
