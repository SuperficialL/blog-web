<template>
  <div class="wrap">
    <div class="content">
      <div class="breadcrumb">
        <div class="category-title">
          <h4>当前分类: {{ category_slug }}</h4>
          <span>共 {{ total }} 篇</span>
        </div>
        <!-- <p class="description"></p> -->
      </div>
      <article-list :articles="articles" />
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import ArticleList from "@/components/ArticleList";
import Sidebar from "@/components/SideBar";
import { getArticles } from "@/api/articles";
import { dateFormat } from "@/utils/filters";
export default {
  name: "Category",
  components: {
    ArticleList,
    Sidebar
  },
  data() {
    return {
      articles: [],
      total: 0,
      category_slug: this.$route.params.slug,
      query: {
        page: 1,
        per_page: 10
      }
    };
  },
  filters: {
    dateFormat
  },
  watch: {
    $route() {
      this.category_slug = this.$route.params.slug;
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      let params = {
        category: this.category_slug
      };
      const res = await getArticles(params);
      if (res.code === 200) {
        this.articles = res.data.articles;
        this.total = res.data.total;
      }
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
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}
.category-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 6px;
}
</style>
