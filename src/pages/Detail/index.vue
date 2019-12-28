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
              {{ article.comments }}
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
          共 {{ article.comments }} 条评论关于 “{{ article.title }}”
        </h4>
        <div class="comment-form">
          <div class="comment-form-content">
            <textarea
              id="content"
              cols="100"
              rows="5"
              v-model="content.value"
              @blur="checkContent"
              placeholder="请填写正确QQ邮箱，以便于更好的与您取得联系，否则您的留言可能会被删除!"
            ></textarea>
            <span v-show="content.validate" class="comment-tips">
              {{ content.message }}
            </span>
          </div>
          <div class="comment-info">
            <div class="comment-input comment-form-username">
              <label for="username"></label>
              <input
                type="text"
                id="username"
                v-model="username.value"
                @blur="checkAuthor"
                placeholder="昵称*"
              />
              <span v-show="username.validate" class="comment-tips">
                {{ username.message }}
              </span>
            </div>
            <div class="comment-input comment-form-email">
              <label for="email"></label>
              <input
                type="email"
                id="email"
                v-model="email.value"
                @blur="checkEmail"
                placeholder="邮箱*"
              />
              <span v-show="email.validate" class="comment-tips">
                {{ email.message }}
              </span>
            </div>
            <div class="comment-input comment-form-site">
              <label for="site"></label>
              <input
                type="url"
                id="site"
                v-model="site.value"
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
      id: this.$route.params.id,
      title: this.$route.params.title,
      article: {},
      total: 0,
      comments: [],
      username: {
        validate: false,
        message: "",
        value: ""
      },
      email: {
        validate: false,
        message: "",
        value: ""
      },
      content: {
        validate: false,
        message: "",
        value: ""
      },
      site: {
        validate: false,
        message: "",
        value: ""
      }
    };
  },
  filters: {
    dateFormat
  },
  watch: {
    $route(to, _from) {
      if (to.name === "detail") {
        this.id = to.params.id;
        this.title = to.params.title;
        this.fetchArticle();
      }
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

    checkContent() {
      if (!this.content.value) {
        this.content.validate = true;
        this.content.message = "来点内容吧!";
      } else {
        this.content.validate = false;
      }
    },

    checkAuthor() {
      if (!this.username.value) {
        this.username.validate = true;
        this.username.message = "你还没署名呢!";
      } else {
        this.username.validate = false;
      }
    },

    checkEmail() {
      if (!this.email.value) {
        this.email.validate = true;
        this.email.message = "不写邮箱收不到回复提示哦!";
      } else {
        this.email.validate = false;
      }
    },

    async submit() {
      this.checkContent();
      this.checkAuthor();
      this.checkEmail();
      if (
        !this.content.validate &&
        !this.username.validate &&
        !this.email.validate
      ) {
        localStorage.setItem(
          "authorInfo",
          JSON.stringify({
            username: this.username.value,
            email: this.email.value,
            site: this.site.value
          })
        );
        let data = {
          username: this.username.value,
          email: this.email.value,
          site: this.site.value,
          content: this.content.value,
          article_id: this.id,
          user_agent: navigator.userAgent
        };
        const res = await postComment(data);
        if (res.code === 200 && !res.errorCode) {
          data.created_time = dateFormat(new Date());
          this.comments.unshift(data);
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
        }
      }
    },

    async like() {}
  },
  created() {
    this.fetchArticle();
    this.fetchComments();
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
        position: relative;
        box-sizing: border-box;
        textarea {
          background-color: #f0f2f7;
          width: 100%;
          min-height: 70px;
          resize: none;
          padding: 10px;
          border-radius: 6px;
        }
      }
      .comment-info {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .comment-input {
          position: relative;
          width: 33%;
          padding: 6px 0;
          input {
            width: 100%;
            height: 100%;
            padding: 5px;
            background-color: #f0f2f7;
            border-radius: 3px;
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
      .comment-tips {
        position: absolute;
        left: 0;
        bottom: -14px;
        width: 100%;
        font-size: 12px;
        color: red;
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
