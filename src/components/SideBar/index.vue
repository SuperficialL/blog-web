<template>
<aside class="sidebar">
  <div class="aside">
  <h4 class="title">网站公告</h4>
  <div class="notice">
    <ul>
        <li>
          <time>{{ notice.created_time }}</time>
          <span>{{ notice.text }}</span>
        </li>
    </ul>
  </div>
</div>
<div class="aside">
  <h4 class="title">热门文章排行</h4>
  <ol class="hot-list">
      <li class="" v-for="(article,index) in articleList" :key="index">
        <a href="#" :title="article.title">
          {{ article.title }}
        </a>
      </li>
  </ol>
</div>
<div class="aside">
  <h4 class="title">最近发表</h4>
  <ul class="recent-list">
      <li class="item" v-for="(article,index) in articleList" :key="index">
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
<div class="aside">
  <h4 class="title">最近评论</h4>
  <ul class="recent-comment">
      <li class="item" v-for="(comment,index) in comments" :key="index">
        <a href="#" :title="article.title">
          <img :src="comment.email" :alt="comment.nickname" class="avatar">
        </a>
        <div class="con">
          <a href="#" :title="article.title">
            <p>{{ comment.content }}</p>
          </a>
          <p class="info">{{ comment.nickname }} 评论于: {{ comment.created_time|date:'Y-m-d' }}</p>
        </div>
      </li>
  </ul>
</div>
<div class="aside">
  <h4 class="title">所有标签</h4>
  <ul class="tags">
      <li v-for="(tag,index) in tags" :key="index">
        <a href="#">
          {{ tag.name }}
        </a>
      </li>
  </ul>
</div>

<div class="aside">
  <h4 class="title">站点信息</h4>
  <ul class="site">
    <li>分类:{{ total.category_nums }}个</li>
    <li>标签:{{ total.tag_nums }}个</li>
    <li>文章:{{ total.article_nums }}篇</li>
    <li>评论:{{ total.comment_nums }}条</li>
    <li>访问量:{{ total.visit_nums }}条</li>
  </ul>
</div>
</aside>

</template>

<script>
  // import { mapState } from 'vuex'

  export default {
    name: 'Sidebar',
    // computed: {
    //   ...mapState({
    //     friendLink: state => state.base.friendLink,
    //     tags: state => state.base.tags,
    //     blogInfo: state => state.base.blogInfo,
    //     comments: state => state.base.comments
    //   })
    // }
    data() {
      return {
        notice: {},
        articleList: [],
        friendLink: [],
        tags: [],
        blogInfo:{},
        comments: [],
        total:{}
      }
    }
  }
</script>

<style lang="scss" scoped>
.aside {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
  .title {
    position: relative;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    color: #484848;
    font-weight: normal;

    &:hover:after {
      width: 80px;
    }

    &::after {
      content: "";
      position: absolute;
      width: 60px;
      height: 2px;
      background: #000;
      left: 0;
      bottom: 0;
      -moz-transition: all .5s ease;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
    }
  }
}

/* 侧边栏热门样式 */
.hot-list {
  font-family: Georgia, serif;
  color: #d9534f;
  font-size: 16px;
}

.hot-list li a {
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

/* 侧边栏最近文章 */
.aside .recent-list {
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

.aside .recent-comment {
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

/* 侧边栏标签样式 */
.aside .tags {
  display: flex;
  flex-wrap: wrap;
}

.aside .tags li {
  margin: 0 6px 10px 0;
  padding: 4px 8px;
  background-color: #F1F1F1;
  color: #3498DB;
  border-radius: 4px;
  font-size: 12px;
  transition: border-radius .4s linear;
}

.aside .tags li a {
  display: block;
}

.aside .tags li:hover {
  background-color: #d9534f;
  color: #FFF;
  border-radius: 0;
}

/* 侧边栏站点统计样式 */
.aside .site {
  display: flex;
  flex-wrap: wrap;
}

.aside .site li {
  width: 50%;
  letter-spacing: 3px;
}
</style>
