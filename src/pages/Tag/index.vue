<template>
  <div class="wrap">
    <div class="content">
      <section class="article-wrapper">
        <div class="category-title">
          <h2>当前标签: {{ title }}</h2>
          <span>共 0 篇</span>
        </div>
        <article class="article" v-for="article in articles" :key="article._id">
          <router-link
            class="article-thumbnail"
            :to="{
              name: 'detail',
              params: { id: article._id, title: article.title }
            }"
          >
            <img
              class="thumbnail"
              :src="article.thumbnail"
              :alt="article.title"
            />
          </router-link>
          <div class="article-content">
            <h3 class="title">
              <span class="classify">{{ article.category.name }}</span>
              <router-link
                :to="{
                  name: 'detail',
                  params: { id: article._id, title: article.title }
                }"
              >
                {{ article.title }}
              </router-link>
            </h3>
            <div class="summary">
              {{ article.content }}
            </div>
            <div class="article-info">
              <div class="article-meta">
                <span>
                  <i class="iconfont icon-msnui-time-detail"></i>
                  {{ article.created_time | dateFormat }}
                </span>
                <span>
                  <i class="iconfont icon-eye"></i>
                  {{ article.views }}
                </span>
                <span>
                  <i class="iconfont icon-pinglun"></i>
                  {{ article.likes }}
                </span>
                <span>
                  <i class="iconfont icon-dianzan"></i>
                  {{ article.likes }}
                </span>
              </div>
              <router-link
                class="detail-btn"
                :to="{
                  name: 'detail',
                  params: { id: article._id, title: article.title }
                }"
              >
                阅读全文
                <i class="iconfont icon-next"></i>
              </router-link>
            </div>
          </div>
        </article>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="query.per_page"
          :current-page="query.page"
          layout="prev, pager, next, jumper"
          :total="total"
          style="text-align:center;margin-top:20px;"
        >
        </el-pagination>
      </section>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from "@/components/SideBar";
import { getArticles } from "@/api/articles";
import { dateFormat } from "@/utils/filters";
export default {
  name: "Tag",
  components: {
    Sidebar
  },
  data() {
    return {
      articles: [],
      total: 0,
      article_id: this.$route.params.id,
      query: {
        page: 1,
        per_page: 10
      }
    };
  },
  props: ["title"],
  filters: {
    dateFormat
  },
  watch: {
    $route() {
      this.article_id = this.$route.params.id;
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      let params = {
        article_id: this.article_id
      };
      const res = await getArticles(params);
      if (res.code === 200) {
        this.articles = res.data.articles;
        this.total = res.data.total;
      }
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {}
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
</style>
