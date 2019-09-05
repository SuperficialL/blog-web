import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import './assets/fonts/iconfont.css'
import router from './router'
// import store from './store/store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

// const Prism = require('./assets/js/prism')
import Prism from 'prismjs'
// import Prism from './assets/js/prism'
import './assets/scss/prism.css'

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
    Prism.highlightElement(block)
  })
})

import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

import {dateFormat} from './utils/dateFormat.js'
Vue.filter('dateformat',dateFormat)

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
