<template>
  <div class="wrap">
    <div class="content">
      <section class="article-list">
        <article
          class="article-item"
          v-for="article in articles"
          :key="article._id"
        >
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

    <div class="sidebar"></div>
  </div>
</template>

<script>
import { getArticles } from "@/api/articles";
import { dateFormat } from "@/utils/filters";
export default {
  name: "Category",
  data() {
    return {
      articles: [],
      total: 0,
      category_id: this.$route.params.id,
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
      this.category_id = this.$route.params.id;
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      let params = {
        category: this.category_id
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
