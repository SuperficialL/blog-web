<template>
  <div class="main">
    <div class="wrap">
      <div class="content">
        <!-- 轮播 -->
        <swiper :options="swiperOption">
          <swiper-slide>
            <img src="@/assets/images/django_f2Mgc0o.jpg" alt>
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/images/python.jpg" alt>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 轮播 -->
        <div class="article-list-wrap">
          <ul class="header">
            <li class="list">最新文章</li>
          </ul>
          <!-- 博文 -->
          <article class="article-list" v-for="(article,index) in articleList" :key="index">
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
              <div class="summary" v-html="article.summary">
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
                    {{ article.meta.views }}
                  </span>
                  <span>  
                    <i class="fa fa-heart-o"></i>
                    {{ article.meta.likes }}
                  </span>
                  <span>
                    <i class="fa fa-commenting-o"></i>
                    {{ article.meta.comments }}
                  </span>
                </div>
                <router-link class="label label-info detail-btn"
                   :to="{ name: 'detail',params: {id: article._id} }">
                  阅读详情
                </router-link>
              </div>
            </div>
          </article>
          <!-- 更多 -->
          <el-pagination
            :page-size="per_page"
            layout="total, prev, pager, next, jumper"
            :current-page.sync="page"
            @current-change="handleCurrentChange"
            :total="total">
          </el-pagination>
          <!-- 更多 -->
        </div>
      </div>
      <SideBar></SideBar>
    </div>
  </div>
</template>

<script>
  import SideBar from '@/components/SideBar'
  import {getArticles} from '@/api'

  export default {
    name: 'home',
    data() {
      return {
        articleList: [],
        swiperOption: {
          pagination: {
            el: ".swiper-pagination"
          }
        },
        page: 1,
        per_page: 10,
        total: 0
      }
    },
    components: {
      SideBar
    },
    created() {
      this.fetch()
    },
    methods: {
      async fetch() {
        const params = {
          page: this.page
        }
        const res = await getArticles(params)
        this.articleList = res.data.articles
        this.total = res.data.total
      },
      handleCurrentChange(val) {
        this.page = val
        this.fetch()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .content {
      width: 900px;
      .swiper-container img {
        width: 100%;
        height: 375px;
      }
    }
    .sidebar {
      width: 280px;
      border: 1px solid red;
    }
  }
</style>

