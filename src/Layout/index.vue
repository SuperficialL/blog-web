<template>
  <div class="main">
    <Header />
    <div class="wrap">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Layout",
  components: {
    Header,
    Footer
  }
};
</script>
