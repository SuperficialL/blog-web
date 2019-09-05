<template>
  <div class="loading-container">
    <div class="loading">
      <i class="icon icon-loading"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading'
  }
</script>

<style lang="scss" scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      animation: rotating 2s linear infinite;
      .icon-loading {
        font-size: 25px;
      }
    }
  }

  @keyframes rotating {
    to {
      transform: rotateZ(360deg);
    }
  }
</style>
