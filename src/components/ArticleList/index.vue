<template>
  <div class="article-list">
    <transition-group name="list" mode="out-in">
      <article class="article-list-item" v-for="article in articles" :key="article.id">
        <div class="item-thumb">
          <router-link
            :to="{
            name: 'detail',
            params: { id: article.id }
          }"
          >
            <img class="thumbnail" :src="article.thumbnail" :alt="article.title" />
          </router-link>
        </div>

        <div class="item-body">
          <h3 class="title">
            <span class="classify">{{ article.category.name }}</span>
            <router-link
              :to="{
                name: 'detail',
                params: { id: article.id }
              }"
            >{{ article.title }}</router-link>
          </h3>
          <div class="summary">{{ article.content }}</div>
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
                    params: { id: article.id }
                  }"
            >
              阅读全文
              <i class="iconfont icon-next"></i>
            </router-link>
          </div>
        </div>
      </article>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    articles: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.article-list {
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;

  .article-list-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #eee;

    &:hover .thumbnail {
      transform: scale(1.075);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -1px;
      width: 0;
      height: 1px;
      transition: width 0.5s;
    }

    &:hover::after {
      width: 100%;
      background-color: #1890ff;
    }

    .item-thumb {
      display: block;
      margin-right: 10px;
      overflow: hidden;
      width: 240px;
      height: 160px;
      border-radius: 6px;
      cursor: pointer;

      .thumbnail {
        width: 240px;
        height: 160px;
        transition: 0.4s ease-in-out;
      }
    }

    .item-body {
      position: relative;
      flex: 1;

      .title {
        // font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
        vertical-align: middle;

        .classify {
          vertical-align: middle;
          position: relative;
          margin-right: 10px;
          padding: 3px 5px;
          font-size: 12px;
          color: #fff;
          border-radius: 6px;
          background-color: #1890ff;

          &::after {
            content: "";
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            border: 5px solid transparent;
            border-left-color: #1890ff;
          }
        }

        a {
          vertical-align: middle;
        }
      }

      .summary {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        margin: 10px auto;
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
        font-size: 12px;

        .article-meta {
          font-size: 12px;
          color: #999;

          span {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>