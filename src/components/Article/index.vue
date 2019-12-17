<template>
  <section class="article-list-wrapper">
    <ul class="list-tab">
      <li
        :class="{ active: curIndex === index }"
        v-for="(item, index) in tabs"
        :key="index"
        @click="change(index)"
      >
        <a href="javascript:void (0)">{{ item }}</a>
      </li>
    </ul>
    <article class="article" v-for="article in articles" :key="article.id">
      <router-link
        class="thumbnail"
        :to="{ name: 'detail', params: { id: article._id } }"
      >
        <img class="thumbnail" :src="article.thumbnail" alt="article.title" />
      </router-link>
      <div class="article-inner">
        <h3 class="title">
          <router-link :to="{ name: 'detail', params: { id: article._id } }">
            {{ article.title }}
          </router-link>
        </h3>
        <div class="summary">
          {{ article.desc }}
        </div>
        <div class="article-info">
          <div class="meta">
            <span>
              <i class="icon icon-fenlei"></i>
              {{ article.categories }}
            </span>
            <span>
              <i class="icon icon-shijian"></i>
              {{ article.createdAt | dateformat }}
            </span>
            <span>
              <i class="icon icon-followus"></i>
              {{ article.views }}
            </span>
            <span>
              <i class="icon icon-pinglun3"></i>
              {{ article.comment_counts }}
            </span>
          </div>
          <router-link :to="{ name: 'detail', params: { id: article._id } }">
            阅读全文
          </router-link>
        </div>
      </div>
    </article>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="1"
      :current-page="curPage"
      layout="prev, pager, next, jumper"
      :total="count"
    >
    </el-pagination>
  </section>
</template>

<script>
import { getCateArticles } from "@/api";

export default {
  name: "Article",
  props: ["id"],
  data() {
    return {
      curIndex: 0,
      curPage: 1,
      articles: [],
      count: 1,
      tabs: ["最新资讯", "热点", "深度报道", "干货分享"]
    };
  },
  created() {
    this.fetch();
  },
  watch: {
    $route(to, from) {
      if (to.name === "category") {
        this.fetch();
      }
    }
  },
  methods: {
    async fetch() {
      const res = await getCateArticles(this.id);
      this.articles = res.data;
    },
    handleSizeChange(val) {
      window.console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(page) {
      // API.getArticles({
      //   page: page
      // }).then((response) => {
      //   this.articleList = response.results
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
.article-list-wrapper {
  margin-top: 20px;
  background-color: #fff;
  .list-tab {
    display: flex;
    width: 100%;
    height: 66px;
    align-items: center;
    border: 1px solid #eee;
    border-left: none;
    border-right: none;
    li {
      padding: 0 10px;
      a {
        color: #878787;
      }
      &:first-of-type {
        border-left: 5px solid #5c87d9;
      }
      &.active a {
        color: #212121;
      }
    }
  }
  .article {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    transition: all 0.4s ease;
    border-bottom: 1px solid #eee;
    &:last-child {
      margin-bottom: 20px;
    }
    &:hover {
      box-shadow: 4px 4px 10px #e3d4ff;
      & .thumbnail {
        img {
          transform: scale(1.1);
        }
      }
    }
    .thumbnail {
      display: block;
      overflow: hidden;
      img {
        width: 245px;
        height: 145px;
        transition: all 0.4s linear;
      }
    }
    .article-inner {
      position: relative;
      width: 590px;
      .title {
        margin-bottom: 7px;
        padding-bottom: 5px;
        height: 20px;
        line-height: 20px;
        white-space: nowrap;
      }
      .summary {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        height: 90px;
        overflow: hidden;
        color: #555;
        line-height: 24px;
        font-size: 14px;
        word-break: break-word;
        text-overflow: ellipsis;
      }
      .article-info {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 12px;
        .meta {
          color: #999;
          span {
            margin-right: 12px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .el-pagination {
    padding: 30px 0;
    text-align: center;
  }
}

@media screen and (max-width: 767px) {
  .article-list-wrapper {
    background-color: #eee;
    .article {
      flex-wrap: wrap;
      border: 0;
      background-color: #fff;
      .thumbnail {
        width: 100%;
        text-align: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .article-inner {
        width: 100%;
        .title {
          margin-top: 10px;
          text-align: center;
        }
        .summary {
          height: auto;
          margin: 10px 0;
        }
        .article-info {
          flex-wrap: wrap;
          .meta {
            width: 100%;
            margin-bottom: 10px;
          }
          a {
            display: block;
            width: 100%;
            padding: 10px 0;
            border-radius: 6px;
            text-align: center;
            background-color: #eee;
          }
        }
      }
    }
  }
}
</style>
