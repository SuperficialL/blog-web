<template>
  <header class="header">
    <div class="header-container" :class="{ fixed: isFixed }">
      <div class="wrap">
        <div class="nav-container">
          <div class="logo">
            <router-link to="/" tag="h2">SuperficialL Blog</router-link>
          </div>
          <ul class="nav-menu">
            <li class="nav-item">
              <router-link to="/" exact>
                <i class="el-icon-s-home"></i>
                首页
              </router-link>
            </li>
            <li
              class="nav-item"
              v-for="(root, index) in navigation"
              :key="index"
            >
              <router-link
                :to="{
                  name: 'category',
                  params: { slug: root.slug,title: root.name },
                }"
              >
                <i class="iconfont" :class="root.icon"></i>
                {{ root.name }}
                <i class="iconfont icon-down" v-if="root.children.length"></i>
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
                      params: { slug: child.slug,title: child.name },
                    }"
                    exact
                  >
                    <i class="iconfont" :class="child.icon"></i>
                    {{ child.name }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <player ref="playing" />
      </div>
    </div>
  </header>
</template>

<script>
import Player from "../Player";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    Player
  },
  data() {
    return {
      isFixed: true
    };
  },
  computed: {
    ...mapGetters(["navigation"])
  },
  methods: {
    playing() {
      console.log(1);
    }
  },
  created() {
    let oldTop = 0;
    window.onscroll = () => {
      let top = document.scrollingElement.scrollTop;
      // 触发滚动条，记录数值
      // 旧数据大于当前位置，表示滚动条top向上滚动
      if (oldTop > top) {
        this.isFixed = true;
        // console.log("↑");
      } else {
        // 相反...
        this.isFixed = false;
        // console.log("↓");
      }
      oldTop = top;
      // 更新旧的位置
    };
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 60px;
  z-index: 10;
  .header-container {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    background-color: #fff;
    transition: 0.4s;
    transform: translateY(-100%);
    &.fixed {
      transform: translateY(0);
    }
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: inherit;

    .logo {
      cursor: pointer;
    }
    .nav-container {
      display: flex;
      align-items: center;
      height: inherit;
      &.show {
        transform: translateX(0);
      }
      ul {
        margin: 0;
        padding: 0;
        li {
          list-style-type: none;
        }
      }

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
            font-size: 15px;
            line-height: 60px;
            &:hover {
              color: #0088f5;
            }
            i {
              font-size: 15px;
            }
          }
          & > .sub-menu {
            top: 100%;
            left: 0;
            z-index: 9;
            min-width: 100px;
            overflow: hidden;
            background: $bg-color;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s;
            transform-origin: 0 0;
            transform: rotateX(-90deg);
            a {
              display: block;
              padding: 10px 15px;
            }
            .sub-item {
              text-align: left;
            }
            .sub-item:hover a {
              color: #0088f5;
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
      cursor: pointer;
      & > i {
        display: none;
        font-size: 22px;
        cursor: pointer;
      }
      .search-wrapper {
        display: flex;
        align-items: center;
        border-radius: 4px;
        overflow: hidden;
      }
    }
  }
}
</style>
