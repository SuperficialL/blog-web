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
          共 3 条评论关于 “计算浏览器滚动条在各浏览器的宽度”
        </h4>
        <div class="comment-form">
          <div class="comment-form-content">
            <textarea
              id=""
              cols="100"
              rows="5"
              placeholder="请填写正确QQ邮箱，以便于更好的与您取得联系，否则您的留言可能会被删除!"
            ></textarea>
          </div>
          <div class="comment-info">
            <div class="comment-input comment-form-author">
              <label for="author"></label>
              <input type="text" id="author" placeholder="昵称" />
            </div>
            <div class="comment-input comment-form-email">
              <label for="email"></label>
              <input type="text" id="email" placeholder="邮箱" />
            </div>
            <div class="comment-input comment-form-site">
              <label for="site"></label>
              <input type="text" id="site" placeholder="站点" />
            </div>
          </div>
          <div class="comment-btn">
            <input type="submit" class="submit-btn" value="发表评论" />
          </div>
        </div>
        <div class="comment-list">
          <div class="comment-item">
            <div class="comment-avatar">
              <img src="../../assets/images/python.jpg" alt="" />
            </div>
            <div class="comment-body">
              <div class="comment-header">
                重庆崽儿brand Mac OS 10.14.6 Chrome 78 中国-杭州#1604
              </div>
              <div class="comment-content">
                最后面的图片访问不了咯～🌚
              </div>
              <div class="comment-footer">
                <span class="created-time">1个月前</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="sidebar"></div>
  </div>
</template>

<script>
import { getArticle } from "@/api/articles";
import { dateFormat } from "@/utils/filters";
export default {
  name: "Detail",
  data() {
    return {
      article: {}
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
    async fetch() {
      const res = await getArticle(this.id);
      if (res.code === 200) {
        this.article = res.data;
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
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
    margin: 10px 0;
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
      margin: 10px 0;
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
          }
        }
        .comment-body {
          padding: 8px 8px 8px 36px;
          border-radius: 6px;
          background-color: rgba(197, 197, 197, 0.5);
          // .comment-header {
          //   .username {
          //   }
          // }
          .comment-content {
            margin: 10px 0;
            line-height: 2;
          }
          // .comment-footer {
          // }
        }
      }
    }
  }
}
</style>
