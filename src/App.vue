<template>
  <div id="app">
    <Header />
    <div class="main">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  .main {
    // 100%  60 * 2 header + footer 40 main 外边距 20 * 2
    // min-height: calc(100% - 60px * 2 - 20px * 2);
    min-height: 100%;
  }
}
</style>
