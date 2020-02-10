<template>
  <footer class="footer">
    <div class="footer-top-inner">
      <ul class="links-wrap">
        <li class="link" v-for="(link, index) in friendsLink" :key="index">
          <a :href="link.url" target="_blank">{{ link.name }}</a>
        </li>
      </ul>
    </div>
    <div class="footer-bottom-inner">
      CopyRight © Superficial Blog All Rights Reserved.
      <a href="http://beian.miit.gov.cn/" target="_blank">
        鄂ICP备19027646号-1
      </a>
    </div>
    <div class="back-to-top" @click="scrollToTop" :class="{ show: toTopShow }">
      <i class="iconfont icon-back-top"></i>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Footer",
  data() {
    return {
      toTopShow: false
    };
  },
  computed: {
    ...mapGetters(["friendsLink"])
  },
  methods: {
    handleScroll() {
      // 首先修改相对滚动位置
      this.scrollTop = this.scrollTop =
        window.pageYOffset || document.body.scrollTop;
      this.toTopShow = this.scrollTop > 300;
    },
    scrollToTop() {
      let timer = null;
      let _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 100;
          // 然后修改这里实现动画滚动效果
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.toTopShow = false;
        }
      });
    }
  },
  created() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll);
    });
  }
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background-color: #555e67;
  color: #c9c9c9;
  .footer-top-inner {
    width: 1260px;
    margin: 0 auto;
    font-size: 16px;
    .links-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .link {
        a {
          display: block;
          padding: 15px;
          color: #c9c9c9;
        }
      }
    }
  }
  .footer-bottom-inner {
    height: 60px;
    line-height: 60px;
    background-color: #383e44;
    text-align: center;
    text-shadow: 0 -1px 0 #333;
  }
  .back-to-top {
    position: fixed;
    right: 30px;
    bottom: 30px;
    z-index: 999;
    width: 32px;
    color: #fff;
    cursor: pointer;
    transition: 0.7s;
    transform: translateX(100px);

    &.show {
      transform: translateX(0);
    }
    i {
      font-size: 30px;
      color: #1890ff;
    }
    &.active {
      right: 30px;
    }
  }
}
</style>
