<template>
  <div class="wrap">
    <div class="content">
      <section class="article-wrap">
        <article class="article">
          <h3 class="title">{{ article.title }}</h3>
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
          <div class="article-content" v-html="article.renderContent"></div>
        </article>
      </section>

      <section class="comment-wrap">
        <h4 class="comment-title">
          共 {{ total }} 条评论关于 “{{ article.title }}”
        </h4>
        <div class="comment-form">
          <div class="comment-form-content">
            <textarea
              id=""
              cols="100"
              rows="5"
              v-model="comment.content"
              placeholder="请填写正确QQ邮箱，以便于更好的与您取得联系，否则您的留言可能会被删除!"
            ></textarea>
          </div>
          <div class="comment-info">
            <div class="comment-input comment-form-username">
              <label for="username"></label>
              <input
                type="text"
                id="username"
                v-model="comment.username"
                placeholder="昵称*"
              />
            </div>
            <div class="comment-input comment-form-email">
              <label for="email"></label>
              <input
                type="text"
                id="email"
                v-model="comment.email"
                placeholder="邮箱*"
              />
            </div>
            <div class="comment-input comment-form-site">
              <label for="site"></label>
              <input
                type="text"
                id="site"
                v-model="comment.site"
                placeholder="站点"
              />
            </div>
          </div>
          <div class="comment-btn">
            <input
              type="submit"
              class="submit-btn"
              value="发表评论"
              @click="submit"
            />
          </div>
        </div>
        <div class="comment-list">
          <div
            class="comment-item"
            v-for="comment in comments"
            :key="comment._id"
          >
            <div class="comment-avatar">
              <img src="../../assets/images/python.jpg" alt="" />
            </div>
            <div class="comment-body">
              <div class="comment-header">
                <a :href="comment.site" class="username">
                  {{ comment.username }}
                </a>
                <!-- <span><i></i>系统</span>
                <span><i></i>浏览器</span>
                <span><i></i>地区</span> -->
              </div>
              <div class="comment-content">
                {{ comment.content }}
              </div>
              <div class="comment-footer">
                <span class="created-time">
                  {{ comment.created_time | dateFormat }}
                </span>
                <span class="like" @click="like">
                  <i class="iconfont icon-dianzan"></i> 赞(0)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <sidebar></sidebar>
  </div>
</template>

<script>
import Sidebar from "@/components/SideBar";
import { getArticle } from "@/api/articles";
import { getComments, postComment } from "@/api/comments";
import { dateFormat } from "@/utils/filters";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};

export default {
  name: "Detail",
  components: {
    Sidebar
  },
  data() {
    return {
      article: {},
      total: 0,
      comments: [],
      comment: {
        article_id: this.id
      }
    };
  },
  props: ["id", "title"],
  filters: {
    dateFormat
  },
  watch: {
    $route() {
      this.id = this.$route.params.id;
      this.fetch();
    }
  },
  methods: {
    async fetchArticle() {
      const res = await getArticle(this.id);
      if (res.code === 200) {
        this.article = res.data;
      }
    },

    async fetchComments() {
      const res = await getComments({ article_id: this.id });
      if (res.code === 200) {
        this.comments = res.data.comments;
        this.total = res.data.total;
      }
    },

    async submit() {
      const res = await postComment(this.comment);
      if (res.code === 200 && !res.errorCode) {
        this.comment.created_time = dateFormat(new Date());
        this.comments.unshift(this.comment);
        this.$message.success(res.message);
      } else {
        this.$message.error(res.message);
      }
    },

    async like() {}
  },
  created() {
    this.fetchArticle();
    this.fetchComments();
  },
  mounted() {
    highlightCode();
  },

  updated() {
    highlightCode();
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
}
.content {
  .article-wrap {
    .article {
      padding: 15px;
      background-color: #fff;
      border-radius: 6px;
      .title {
        padding: 10px 0;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
      }
      .article-meta {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 1px solid #e9eaed;
        text-align: center;
        color: #999;
        span {
          margin-right: 8px;
        }
      }
    }
  }
  .comment-wrap {
    margin-top: 20px;
    padding: 15px;
    background-color: #fff;
    border-radius: 6px;
    .comment-title {
      padding: 10px 0;
      text-align: center;
      font-size: 16px;
      background-color: #f0f2f7;
      border-radius: 6px;
    }
    .comment-form {
      margin-top: 20px;
      .comment-form-content {
        box-sizing: border-box;
        padding: 10px;
        background-color: #f0f2f7;
        border-radius: 6px;
        textarea {
          background-color: #f0f2f7;
          width: 100%;
          min-height: 70px;
          resize: none;
          padding: 5px;
        }
      }
      .comment-info {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .comment-input {
          width: 33%;
          padding: 6px 0;
          border-radius: 3px;
          background-color: #f0f2f7;
          input {
            width: 100%;
            height: 100%;
            padding: 5px;
            background-color: #f0f2f7;
          }
        }
      }
      .comment-btn {
        text-align: center;
        .submit-btn {
          background: #1890ff;
          padding: 8px 50px;
          cursor: pointer;
          border-radius: 12px;
        }
      }
    }
    .comment-list {
      background-color: #fff;
      .comment-item {
        position: relative;
        padding-left: 24px;
        margin-top: 20px;
        &:hover .comment-body {
          background-color: hsla(0, 0%, 57.3%, 0.5);
        }
        &:hover img {
          transform: rotate(360deg);
        }
        .comment-avatar {
          position: absolute;
          left: 0;
          top: 25%;
          width: 42px;
          height: 42px;
          border: 3px solid #fff;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            transition: transform 0.5s;
          }
        }
        .comment-body {
          padding: 8px 8px 8px 36px;
          border-radius: 6px;
          background-color: rgba(197, 197, 197, 0.5);
          transition: background-color 0.5s;
          .comment-header {
            .username {
              &:hover {
                color: #1890ff;
              }
            }
          }
          .comment-content {
            margin: 10px 0;
            line-height: 2;
          }
          .comment-footer {
            span {
              margin-right: 10px;
            }
            // .created-time {
            // }
            .like {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
