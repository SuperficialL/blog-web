<template>
  <div id="app">
    <Header />
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" /> -->
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  methods: {
    ...mapActions(["GET_MENU"])
  },
  created() {}
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
