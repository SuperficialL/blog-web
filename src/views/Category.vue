<template>
  <section class="main">
    <div class="container">
      <div class="content-wrapper">
        <div class="breadcrumb">
          <div class="category-title">
            <h2>当前分类: {{ this.$route.params.title }}</h2>
            <span>共 0 篇</span>
          </div>
          <p class="description"></p>
        </div>
        <article class="article-list" v-for="(article,index) in articles" :key="index">
            <router-link :to="{ name: 'detail',params: {id: article._id} }" :title="article.title" class="thumbnail-wrap"
            >
              <img class="thumbnail" :src="article.img" :alt="article.title"/>
            </router-link>
            <div class="article-inner">
              <h3 class="title">
                <router-link :title="article.title"
                   :to="{ name: 'detail',params: {id: article._id} }">
                  {{ article.title }}
                </router-link>
              </h3>
              <div class="summary">
                {{ article.summary }}
              </div>
              <div class="article-info">
                <div class="meta">
                  <span class="label label-info">
                    <a href="#">
                      {{ article.category.name }}
                    </a>
                  </span>
                  <span>
                    <i class="fa fa-clock-o"></i>
                    {{ article.createdAt|dateformat }}
                  </span>
                  <span>
                    <i class="fa fa-eye"></i>
                    {{ article.views }}
                  </span>
                  <span>
                    <i class="fa fa-heart-o"></i>
                    {{ article.loves }}
                  </span>
                  <span>
                    <i class="fa fa-commenting-o"></i>
                    {{ article.comments }}
                  </span>
                </div>
                <router-link class="label label-info detail-btn"
                   :to="{ name: 'detail',params: {id: article._id} }">
                  阅读详情
                </router-link>
              </div>
            </div>
          </article>
      </div>
      <SideBar></SideBar>
    </div>
  </section>
</template>
<script>
  import SideBar from '@/components/SideBar'
  import {getCateArticles} from '@/api'

  export default {
    name: 'category',
    props:['id'],
    data() {
      return {
        articles: []
      }
    },
    created () {
      this.getCategoryList()
    },
    methods: {
      async getCategoryList () {
        const res = await getCateArticles(this.$route.params.id)
        this.articles = res.data
      }
    },
    watch: {
      '$route' (to) {
        if (to.name === 'category') {
          this.getCategoryList()
        }
      }
    },
    components: {
      SideBar
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
      max-width: 1260px;
      margin: 0 auto;
      .content-wrapper {
        width: 900px;
        .breadcrumb {
          padding: 10px;
          margin-bottom: 20px;
          border: 1px solid #ccc;
          .category-title {
            display: flex;
            justify-content: space-between;
            padding-bottom: 5px;
            border-bottom: 2px solid #f0f0f0;
            h2 {
              position: relative;
              &:before {
                content: '';
                position: absolute;
                bottom: -7px;
                width: 100%;
                border-bottom: 2px solid #00AAEE;
              }
            }
          }
          .description {
            margin-top: 10px;
            text-indent: 2em;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .main {
      margin-top: 0;
      .container {
        .content-wrapper {
          width: 100%;
        }
      }
    }
  }
</style>
