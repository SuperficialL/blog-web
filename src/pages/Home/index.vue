<template>
  <div class="wrap">
    <div class="content">
      <section class="article-wrapper">
        <article class="article" v-for="article in articles" :key="article._id">
          <router-link
            class="article-thumbnail"
            :to="{ name: 'detail', params: { id: article._id } }"
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
                :to="{ name: 'detail', params: { id: article._id } }"
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
                :to="{ name: 'detail', params: { id: article._id } }"
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
import { getTags } from "@/api/tags";
import { dateFormat } from "@/utils/filters";
export default {
  name: "Home",
  components: {
    Sidebar
  },
  data() {
    return {
      articles: [],
      tags: [],
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
      const res = await getArticles();
      if (res.code === 200) {
        this.articles = res.data.articles;
        this.total = res.data.total;
      }
    },

    async fetchTags() {
      const res = await getTags();
      if (res.code === 200) {
        this.tags = res.data.tags;
      }
    },

    handleSizeChange(val) {},

    handleCurrentChange(val) {}
  },
  created() {
    this.fetch();
    this.fetchTags();
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
