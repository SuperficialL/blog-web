<template>
  <aside class="sidebar-wrapper">
    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">网站公告</h4>
        <router-link to="/">更多</router-link>
      </div>
      <div class="sidebar-content">
        <div class="notice">
          <ul>
            <li>
              <time>{{ notice.created_time }}</time>
              <span>{{ notice.text }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">热门文章排行</h4>
        <router-link to="/">更多</router-link>
      </div>
      <div class="sidebar-content">
        <ol class="hot-list">
          <li class="" v-for="(article, index) in articleList" :key="index">
            <a href="#" :title="article.title">
              {{ article.title }}
            </a>
          </li>
        </ol>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">最近发表</h4>
      </div>
      <div class="sidebar-content">
        <ul class="recent-list">
          <li class="item" v-for="(article, index) in articleList" :key="index">
            <a href="#" :title="article.title">
              <div class="time">
                <span class="day">{{ article.created_time }}</span> /
                <span class="monty">{{ article.created_time }}</span>
              </div>
              <p>{{ article.title }}</p>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">最近评论</h4>
      </div>
      <div class="sidebar-content">
        <ul class="recent-comment">
          <li class="item" v-for="(comment, index) in comments" :key="index">
            <a href="#" :title="comment.title">
              <img
                :src="comment.email"
                :alt="comment.username"
                class="avatar"
              />
            </a>
            <div class="con">
              <a href="#" :title="comment.title">
                <p>{{ comment.content }}</p>
              </a>
              <p class="info">
                {{ comment.username }} 评论于:
                {{ comment.created_time | dateFormat }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">标签云</h4>
        <router-link to="/">更多</router-link>
      </div>
      <div class="sidebar-content">
        <ul class="sidebar-tags">
          <li class="tag" v-for="tag in tags" :key="tag._id">
            <router-link :to="{ name: 'tag', params: { id: tag._id } }">
              {{ tag.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-header">
        <h4 class="sidebar-title">站点信息</h4>
      </div>
      <div class="sidebar-content">
        <ul class="site">
          <li>分类:{{ statistics.category_total }}个</li>
          <li>标签:{{ statistics.tag_total }}个</li>
          <li>文章:{{ statistics.article_total }}篇</li>
          <li>评论:{{ statistics.comment_total }}条</li>
          <!-- <li>访问量:{{ statistics.visit_nums }}条</li> -->
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { getTags } from "@/api/tags";
import { getComments } from "@/api/comments";
import { getStatistics } from "@/api/statistics";
import { dateFormat } from "@/utils/filters";
export default {
  name: "Sidebar",
  data() {
    return {
      notice: {},
      articleList: [],
      friendLink: [],
      tags: [],
      blogInfo: {},
      comments: [],
      total: {},
      statistics: {}
    };
  },
  filters: {
    dateFormat
  },
  methods: {
    async fetchTags() {
      const res = await getTags();
      if (res.code === 200) {
        this.tags = res.data.tags;
      }
    },

    async fetchComments() {
      const res = await getComments();
      if (res.code === 200) {
        this.comments = res.data.comments;
      }
    },

    async fetchStatistics() {
      const res = await getStatistics();
      if (res.code === 200) {
        this.statistics = res.data;
      }
    }
  },
  created() {
    this.fetchTags();
    this.fetchComments();
    this.fetchStatistics();
  }
};
</script>

<style lang="scss" scoped>
/* 侧边栏热门样式 */
.hot-list {
  font-family: Georgia, serif;
  color: #d9534f;
  font-size: 16px;
  li a {
    position: relative;
    display: block;
    padding: 6px 20px 6px 10px;
    line-height: 22px;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: Helvetica, Arial, sans-serif;
    color: #747f8c;
  }
}

// /* 侧边栏最近文章 */
.recent-list {
  .item {
    border-bottom: 1px dotted #ccc;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      display: flex;
      align-items: center;
      padding: 10px 0;

      &:hover {
        margin-left: 5px;
      }

      .time {
        width: 78px;
        height: 36px;
        margin-right: 10px;
        line-height: 36px;
        text-align: center;
        color: #616161;
        font-size: 9pt;
        background: #f2f2f2;

        .day {
          font-size: 22px;
          width: 30px;
          margin-right: 2px;
          text-align: right;
        }
      }

      p {
        flex: 1;
        font-size: 14px;
        color: #3f3f3f;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.recent-comment {
  position: relative;
  width: 100%;
  overflow: hidden;

  .item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px dotted #ccc;

    &:hover .avatar {
      transform: rotate(360deg);
    }

    &:last-child {
      border-bottom: none;
    }

    .avatar {
      border-radius: 50%;
      margin-right: 10px;
      transition: 1s;
    }

    .con {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      a {
        color: #333;
      }

      .info {
        font-size: 12px;
        color: #999;
      }
    }
  }
}

/* 侧边栏站点统计样式 */
.site {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50%;
    letter-spacing: 3px;
  }
}
</style>
