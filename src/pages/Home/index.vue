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
      <section class="article-wrapper">
        <transition-group name="list">
          <article
            class="article"
            v-for="article in articles"
            :key="article._id"
          >
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
                    {{ article.comments }}
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
        </transition-group>

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
import { getCarousels } from "@/api/carousels";
import { dateFormat } from "@/utils/filters";

export default {
  name: "Home",
  components: {
    Sidebar
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
      if (res.code === 200) {
        this.articles = res.data.articles;
        this.total = res.data.total;
      }
    },

    async fetchCarousels() {
      const res = await getCarousels();
      if (res.code === 200) {
        this.carousels = res.data.carousels;
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
