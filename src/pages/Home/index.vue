<template>
  <div class="wrap">
    <div class="content">
      <section class="carousel">
        <ul>
          <li v-for="carousel in carousels" :key="carousel._id">
            <img :src="carousel.url" />
            <p>{{ carousel.title }}</p>
          </li>
        </ul>
      </section>
      <article-list :articles="articles" />
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList";
import Sidebar from "@/components/SideBar";
import { getArticles } from "@/api/articles";
import { getCarousels } from "@/api/carousels";
import { dateFormat } from "@/utils/filters";
export default {
  name: "Home",
  components: {
    Sidebar,
    ArticleList
  },
  data() {
    return {
      articles: [],
      carousels: [],
      total: 0,
      query: {
        page: 1,
        per_page: 10
      }
    };
  },
  filters: {
    dateFormat
  },
  methods: {
    async fetch() {
      const res = await getArticles(this.query);
      if (res.code) {
        const { data, pagination: { total } } = res.result;
        this.articles = data;
        this.total = total;
      }
    },

    async fetchCarousels() {
      // const res = await getCarousels();
      // if (res.code) {
      //   this.carousels = res.data.carousels;
      // }
    },

    handleSizeChange(val) {
      this.query.per_page = val;
      this.fetch();
    },

    handleCurrentChange(val) {
      this.query.page = val;
      this.fetch();
    }
  },
  created() {
    this.fetch();
    this.fetchCarousels();
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
