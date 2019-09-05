<template>
  <header class="header">
    <div class="wrap">
      <div class="nav-container" :class="{show: isShow}">
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link
              to="/"
              exact
            >
              首页
            </router-link>
          </li>
          <li class="nav-item" v-for="(root,index) in navigationLink" :key="index">
            <router-link :to="{name:'category',params:{title:root.name,id:root._id} }">
              {{root.name}}
              <i class="icon icon-xiangxia" v-if="root.children"></i>
            </router-link>
            <ul class="sub-menu">
              <li class="sub-item"
                  v-for="child in root.children"
                  :key="child._id">
                <router-link
                  :to="{name:'category',params:{title:child.name,id:child._id} }"
                  exact
                >
                  {{ child.name }}
                </router-link>
              </li>
            </ul>
          </li>

        </ul>
      </div>
      <div class="search-box" :class="{show: isShowSearch}">
        <input type="text"
               v-model="keywords"
               @keyup.enter="search"
               placeholder="请输入关键字"
        >
        <i class="anticon icon-search1" @click="search"></i>
      </div>
    </div>
  </header>
</template>

<script>
  import {getMenu} from '@/api'

  export default {
    name: 'Header',
    data () {
      return {
        keywords: '',
        isShow: false,
        isShowSearch: false,
        navigationLink: []
      }
    },
    created () {
      this.fetch()
    },
    methods: {
      async fetch() {
        // 获取数据
        const res = await getMenu()
        this.navigationLink = res.data
      },
      search () {
        // 查询
        this.$router.push({ name: 'search', query: { search: this.keywords } })
      },
      showMenu () {
        // 显示隐藏手机端菜单
        if (this.isShowSearch) {
          this.isShowSearch = !this.isShowSearch
        }
        this.isShow = !this.isShow
      },
      showSearch () {
        if (this.isShow) {
          this.isShow = !this.isShow
        }
        this.isShowSearch = !this.isShowSearch
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_variable.scss";

  .header {
    position: relative;
    width: 100%;
    height: 60px;
    z-index: 999;
    background-color: #1C2327;
    .wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .nav-container {
        flex: 1;
        height: inherit;
        .nav-menu {
          display: flex;
          height: inherit;
          .nav-item {
            position: relative;
            margin-right: 30px;
            text-align: center;
            & > a {
              display: block;
              line-height: 60px;
              &:hover {
                color: #337ab7;
                
              }
            }        
            & > .sub-menu {
              // position: absolute;
              top: 100%;
              left: 0;
              z-index: 9;
              min-width: 100px;
              overflow: hidden;
              background: #1C2327;
              transition: all .3s;
              transform-origin: 0 0;
              transform: rotateX(-90deg);
              a { 
                display: block;
                padding: 10px 15px;
              }
              .sub-item:hover {
                  color: #337ab7;
              }
            }
            &:hover > ul {
              transform: rotateX(0);
              transition: all .3s;
            }
          }
        }
      }
      .search-box {
        display: flex;
        align-items: center;
        // border: 1px solid #ccc;
        border-radius: 4px;
        overflow: hidden;
        input {
          width: 160px;
          height: 30px;
          padding: 0 5px;
        }
        .anticon {
          width: 30px;
          height: 30px;
          background: #e9eaed;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
        }
      }
    }
  }
</style>
