<template>
  <footer class="footer">
    <div class="footer-top-inner">
      <ul class="links-wrap">
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
        <li class="link"><a href="">关于我们</a></li>
      </ul>
    </div>
    <div class="footer-bottom-inner">
      Copyright © Superficial Blog All Rights Reserved.
      <a href="http://www.miibeian.gov.cn/" target="_blank">公安备案号</a>
    </div>
    <div class="back-to-end" @click="scrollToTop" :class="{ show: toTopShow }">
      <i class="icon icon-top"></i>
    </div>
  </footer>
</template>

<script>
  // import { mapState } from 'vuex'

  export default {
    name: 'Footer',
    data () {
      return {
        toTopShow: false
      }
    },
    computed: {
      // ...mapState({
      //   blogInfo: state => state.base.blogInfo
      // })
    },
    methods: {
      handleScroll () {
        // 首先修改相对滚动位置
        this.scrollTop = this.scrollTop = window.pageYOffset || document.body.scrollTop
        this.toTopShow = this.scrollTop > 300
      },
      scrollToTop () {
        let timer = null
        let _that = this
        cancelAnimationFrame(timer)
        timer = requestAnimationFrame(function fn () {
          if (_that.scrollTop > 0) {
            _that.scrollTop -= 50
            // 然后修改这里实现动画滚动效果
            document.body.scrollTop = document.documentElement.scrollTop = _that.scrollTop
            timer = requestAnimationFrame(fn)
          } else {
            cancelAnimationFrame(timer)
            _that.toTopShow = false
          }
        })
      }
    },
    mounted () {
      this.$nextTick(
        function () {
          window.addEventListener('scroll', this.handleScroll)
        }
      )
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_variable.scss';

  // @import "@/style.scss";

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
    .back-to-end {
      position: fixed;
      right: 30px;
      bottom: 30px;
      z-index: 999;
      width: 32px;
      color: #fff;
      background-color: $background-color;
      cursor: pointer;
      transition: .7s;
      transform: translateX(100px);

      &.show {
        transform: translateX(0);
      }
      i {
        font-size: 30px;
      }
      &.active {
        right: 30px;
      }
    }
  }
</style>
