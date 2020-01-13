<template>
  <div id="app">
    <Header />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  methods: {
    getSiteInfo() {
      this.$store.dispatch("GET_MENU");
      this.$store.dispatch("GET_BLOGINFO");
      this.$store.dispatch("GET_FriendLink");
      this.$store.dispatch("GET_Carousels");
      this.$store.dispatch("GET_TAGS");
      this.$store.dispatch("GET_COMMENTS");
    }
  },
  created() {
    this.getSiteInfo();
    // mapActions(["GET_MENU"]);
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
}
</style>
