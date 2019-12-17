<template>
  <header class="header">
    <div class="wrap">
      <div class="nav-container" :class="{ show: isShow }">
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link to="/" exact>
              首页
            </router-link>
          </li>
          <li class="nav-item" v-for="(root, index) in navigation" :key="index">
            <router-link
              :to="{
                name: 'category',
                params: { title: root.name, id: root._id }
              }"
            >
              {{ root.name }}
              <i class="iconfont icon-down" v-if="root.children"></i>
            </router-link>
            <ul class="sub-menu">
              <li
                class="sub-item"
                v-for="child in root.children"
                :key="child._id"
              >
                <router-link
                  :to="{
                    name: 'category',
                    params: { title: child.name, id: child._id }
                  }"
                  exact
                >
                  {{ child.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="search-box" :class="{ show: isShowSearch }">
        <el-input
          v-model="keywords"
          placeholder="请输入关键字"
          @keyup.enter="search"
        ></el-input>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </div>
    </div>
  </header>
</template>

<script>
import { getMenu } from "@/api/nav";
import { arr2tree } from "@/utils/tools";
export default {
  name: "Header",
  data() {
    return {
      keywords: "",
      isShow: false,
      isShowSearch: false,
      navigation: []
    };
  },
  methods: {
    async fetch() {
      // 获取数据
      const res = await getMenu();
      if (res.code === 200) {
        let navigation = res.data.categories;
        this.navigation = arr2tree(navigation);
      }
    },
    search() {
      // 查询
      this.$message.success("查询功能博主正在开发中!");
      // this.$router.push({ name: "search", query: { search: this.keywords } });
    },
    showMenu() {
      // 显示隐藏手机端菜单
      if (this.isShowSearch) {
        this.isShowSearch = !this.isShowSearch;
      }
      this.isShow = !this.isShow;
    },
    showSearch() {
      if (this.isShow) {
        this.isShow = !this.isShow;
      }
      this.isShowSearch = !this.isShowSearch;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 999;
  background-color: #1c2327;
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: inherit;
    .nav-container {
      flex: 1;
      height: inherit;
      .nav-menu {
        display: flex;
        height: inherit;
        .nav-item {
          position: relative;
          height: inherit;
          text-align: center;
          & > a {
            display: block;
            padding: 0 20px;
            height: inherit;
            line-height: 60px;
            &:hover {
              color: #337ab7;
            }
          }
          & > .sub-menu {
            top: 100%;
            left: 0;
            z-index: 9;
            min-width: 100px;
            overflow: hidden;
            background: #1c2327;
            transition: all 0.3s;
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
            transition: all 0.3s;
          }
        }
      }
    }
    .search-box {
      display: flex;
      align-items: center;
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
