<template>
  <div class="main">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticles } from "@/api/articles";

export default {
  name: "home",
  data () {
    return {
      articleList: [],
      // swiperOption: {
      //   pagination: {
      //     el: ".swiper-pagination"
      //   }
      // },
      page: 1,
      per_page: 10,
      total: 0
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    // 获取导航数据
    async fetch () {
      const params = {
        page: this.page
      };
      const res = await getArticles(params);
      this.articleList = res.data.articles;
      this.total = res.data.total;
    },
    handleCurrentChange (val) {
      this.page = val;
      this.fetch();
    }
  },
  created () {
    // this.fetch();
  }
};
</script>
<style lang="scss">
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // .content {
  //   width: 900px;
  //   .swiper-container img {
  //     width: 100%;
  //     height: 375px;
  //   }
  // }
  // .sidebar {
  //   width: 280px;
  //   border: 1px solid red;
  // }
}
</style>
