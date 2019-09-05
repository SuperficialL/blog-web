<template>
  <section class="main">
    <div class="container">
      <div class="content-wrapper">
        <article class="article" v-if="article">
          <div class="article-header">
            <h3 class="title">
              {{ article.title }}
            </h3>
            <div class="meta">
              <span>
                <i class="icon icon-fenlei"></i>
                {{ article.category.name }}
              </span>
              <span>
                <i class="icon icon-fenlei"></i>
                {{ article.author.username }}
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
                <i class="icon icon-pinglun"></i>
                {{ article.comment_counts }}
              </span>
            </div>
          </div>
          <div class="article-content">
            <div class="detail" v-html="article.format_content" v-highlight>
            </div>
          </div>
        </article>
        <!-- <Comment></Comment> -->
      </div>
      <SideBar></SideBar>
    </div>
  </section>
</template>

<script>
  import SideBar from '@/components/SideBar'
  // import Comment from '@/components/Comment'
  import { getArticleDetail } from '@/api'
  // import { mapState } from 'vuex'

  export default {
    name: 'detail',
    data() {
      return {
        article: {
          author: {},
          category:{}
        }
      }
    },
    created () {
      this.fetch()
    },
    methods: {
      async fetch() {
        const res = await getArticleDetail({id:this.$route.params.id})
        this.article = res.data
      }
    },
    computed: {
    },
    watch: {
      '$route' () {
        this.fetch()
      }
    },
    components: {
      SideBar,
      // Comment,
      // AuthorArea
    }
  }
</script>
<style lang="scss" scoped>
  .main {
    flex: 1 0 auto;
    margin-top: 20px;
    .container {
      display: flex;
      justify-content: space-between;
      width: 1260px;
      margin: 0 auto;
      .content-wrapper {
        width: 900px;
        padding: 15px;
        background-color: #fff;
        .article {
          .article-header {
            padding: 10px 10px 5px;
            text-align: center;
            border-bottom: 1px solid red;
            .title {
              margin: 5px 0;
            }
            .meta {
              color: #999;
            }
          }
          .article-content {

            .detail {

              p {
                margin-top: 15px !important;

              }
            }
          }
        }
        .pager {
          display: flex;
          margin: 20px 0;
          justify-content: space-between;
          a {
            color: #099;
            &:hover {
              color: red;
            }
          }
        }
      }
    }
  }
</style>
