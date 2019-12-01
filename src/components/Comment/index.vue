<template>
  <div class="comment-wrapper">
    <div class="comment-form">
      <div class="content">
        <h3 class="title">发表你的评论 ({{ counts }})</h3>
        <textarea
          v-model="content.value"
          placeholder="这儿交给你了 *^-^*"
          @mousedown="showCommentControl"
        >
        </textarea>
        <span v-show="content.validate" class="comment-tips">{{
          content.msg
        }}</span>
        <div class="comment-control">
          <div class="submit-wrap">
            <input
              type="submit"
              class="submit-btn"
              value="提交评论"
              @click.prevent="addComment"
            />
          </div>
        </div>
        <transition name="slide-fade">
          <div class="comment-author-wrap" v-show="!visible">
            <div class="comment-inp author">
              <label for="author">昵称(必填)</label>
              <input
                type="text"
                id="author"
                name="author"
                v-model="author.value"
                placeholder="昵称"
              />
              <p v-show="author.validate" class="comment-tips">
                {{ author.msg }}
              </p>
            </div>
            <div class="comment-inp email">
              <label for="email">邮箱(必填)</label>
              <input
                type="text"
                id="email"
                name="email"
                v-model="email.value"
                placeholder="邮箱"
              />
              <p v-show="email.validate" class="comment-tips">
                {{ email.msg }}
              </p>
            </div>
            <div class="comment-inp url">
              <label for="url">网址</label>
              <input
                type="text"
                id="url"
                name="url"
                v-model="url.value"
                placeholder="网址"
              />
              <p v-show="url.validate" class="comment-tips">{{ url.msg }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <ul class="comment-list">
      <li class="comment" v-for="(comment, index) in comments" :key="index">
        <img class="avatar" :src="comment.avatar" alt="" />
        <div class="content-wrap">
          <div class="comment-info">
            <div class="meta">
              <a :href="comment.url" v-if="comment.url">{{ comment.name }}</a>
              <span v-else class="author">
                {{ comment.name }}
              </span>
              <span
                class="icon-vip"
                :class="`level-${comment.level}`"
                :title="`level-${comment.level}`"
                :style="
                  `background-image: url(http://127.0.0.1:8000/static/images/icon/vip.png)`
                "
              ></span>
              <span class="time">{{ comment.created_time | dateFormat }}</span>
              <span class="system">{{ comment.system }}</span>
              <span class="browser">{{ comment.browser }}</span>
            </div>
          </div>
          <div class="comment-content">
            {{ comment.content }}
          </div>
        </div>
      </li>
    </ul>
    <div class="load-more-group">
      <span @click="getMore">{{ showNextMore }}</span>
    </div>
  </div>
</template>

<script>
import API from "@/api/index";
import { dateFormat } from "@/utils/dateFormat";

export default {
  name: "Comment",
  inject: ["reload"],
  data () {
    return {
      comments: [],
      counts: Number,
      currentPage: 1,
      totalPage: Number,
      visible: true,
      showNextMore: "查看更多",
      author: {
        value: "",
        validate: false,
        msg: ""
      },
      email: {
        value: "",
        validate: false,
        msg: ""
      },
      url: {
        value: "",
        validate: false,
        msg: ""
      },
      content: {
        value: "",
        validate: false,
        msg: ""
      },
      code: {
        value: "",
        validate: false,
        msg: ""
      }
    };
  },
  created () {
    // 获取评论列表
    API.getComments({
      article: this.$route.params.id,
      page: this.currentPage
    })
      .then(response => {
        this.comments = response.results;
        this.counts = response.count;
        this.totalPage = response.page;
        if (this.totalPage === this.currentPage) {
          this.showNextMore = "已经没有更多了！";
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    contentValidate () {
      // 验证评论内容
      if (this.content.value === "") {
        this.content.validate = true;
        this.content.msg = "来点内容吧!";
      }
    },
    authorValidate () {
      // 验证评论内容
      if (this.author.value === "") {
        this.author.validate = true;
        this.author.msg = "你还没署名呢!";
      }
    },
    emailValidate () {
      // 验证评论内容
      if (this.email.value === "") {
        this.email.validate = true;
        this.email.msg = "不写邮箱收不到回复提示哦!";
      }
    },
    addComment () {
      // 添加评论
      this.contentValidate();
      this.authorValidate();
      this.emailValidate();
      if (
        !this.content.validate &&
        !this.author.validate &&
        !this.email.validate
      ) {
        // 保存评论者信息
        localStorage.setItem(
          "authorInfo",
          JSON.stringify({
            author: this.author.value,
            email: this.email.value,
            url: this.url.value
          })
        );
        let data = {
          name: this.author.value,
          email: this.email.value,
          url: this.url.value,
          content: this.content.value,
          article: this.$route.params.id,
          user_agent: navigator.userAgent
        };
        API.postComment(data)
          .then(response => {
            // 提交评论
            console.log(response);
            this.reload();
            this.content.value = "";
            this.author.value = "";
            this.email.value = "";
            this.url.value = "";
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    getMore () {
      if (this.totalPage > this.currentPage) {
        this.currentPage++;
        API.getComments({
          article: this.$route.params.id,
          page: this.currentPage
        })
          .then(response => {
            this.comments = [...this.comments, ...response.results];
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.showNextMore = "已经没有更多了！";
      }
    },
    showCommentControl () {
      this.visible = !this.visible;
    }
  },
  filters: {
    dateFormat
  }
};
</script>

<style lang="scss" scoped>
.comment-wrapper {
  position: relative;
  background-color: #fff;
  padding-top: 20px;
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter {
    transform: translateY(10px);
    opacity: 0;
  }
  .slide-fade-leave-to {
    transform: translateY(0px);
  }
  .content {
    .title {
      font-size: 18px;
      font-weight: 400;
    }
    textarea {
      margin-top: 10px;
      box-sizing: border-box;
      width: 100%;
      min-height: 100px;
      padding: 6px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      resize: none;
    }
    .comment-control {
      display: flex;
      justify-content: space-between;
      .submit-wrap {
        display: flex;
        margin-left: auto;
        .submit-btn {
          display: inline-block;
          margin-bottom: 0;
          padding: 6px 12px 4px;
          border: 0;
          border-radius: 3px;
          vertical-align: middle;
          text-align: center;
          font-family: "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial,
            sans-serif;
          line-height: 1.25rem;
          background-color: #5c87d9;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .comment-author-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      .comment-inp {
        position: relative;
        width: 51%;
        margin-bottom: 10px;
        input {
          width: 100%;
          height: 30px;
          padding: 0 20px;
          border: 1px solid #ddd;
        }
        label {
          background: #f1f1f1;
          position: absolute;
          color: #555;
          display: inline-block;
          top: 0;
          right: -41px;
          width: 108px;
          padding: 5px 10px;
          border-radius: 2px 0 2px 0;
          z-index: 1;
        }
        img {
          cursor: pointer;
        }
        .comment-tips {
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: red;
        }
      }
    }
  }
  .comment-list {
    margin-top: 20px;
    .comment {
      position: relative;
      margin-bottom: 20px;
      > .avatar {
        position: absolute;
        width: 54px;
        height: 54px;
        z-index: 1;
      }
      > .content-wrap {
        position: relative;
        margin-left: 74px;
        width: 88%;
        padding: 10px;
        border: 1px #eee solid;
        border-radius: 3px;
        background: #fbfdfb;
        word-wrap: break-word;
        font-size: 0.9375rem;
        line-height: 1.5625rem;
        word-break: break-all;

        &:before {
          position: absolute;
          top: 15px;
          left: -9px;
          display: inline-block;
          border-top: 9px solid transparent;
          border-right: 9px solid #eee;
          border-bottom: 9px solid transparent;
          content: "";
        }

        &:after {
          position: absolute;
          top: 17px;
          left: -7px;
          display: inline-block;
          border-top: 7px solid transparent;
          border-right: 7px solid #fbfdfb;
          border-bottom: 7px solid transparent;
          content: "";
        }
        .comment-info {
          display: flex;
          justify-content: space-between;
          font-size: 13px;

          .meta {
            span:not(:first-child) {
              margin-left: 10px;
            }
            .author {
              color: #bbb;
            }
            .icon-vip {
              display: inline-block;
              width: 50px;
              height: 18px;
              @for $i from 0 through 6 {
                &.level-#{$i + 1} {
                  background-position: -70px * $i -23px;
                }
              }
            }
            // .time {
            // }
            // .system {
            // }
            // .browser {
            // }
          }

          .reply {
            padding: 0 15px;
            background-color: deepskyblue;
            cursor: pointer;

            &:hover {
              background-color: rosybrown;
            }
          }
        }
        .comment-content {
        }
      }
    }
  }
}

.load-more-group {
  text-align: center;
  span {
    display: inline-block;
    padding: 10px 30px;
    border-radius: 3px;
    /*background: #9466ff;*/
    background: #d2dcea;
    cursor: pointer;
  }
}
</style>
