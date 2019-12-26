<template>
  <div class="slide">
    <el-carousel :interval="5000" height="300px">
      <el-carousel-item
        type="card"
        v-for="(carousel, index) in carousels"
        :key="index"
      >
        <img :src="carousel.image_url" alt="carousel.title" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  methods: {}
};
</script>

<style lang="scss" scoped>
.slide {
  max-width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
