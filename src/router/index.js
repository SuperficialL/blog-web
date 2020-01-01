import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from 'nprogress';
// progress bar
import 'nprogress/nprogress.css';
import getPageTitle from '@/utils/getPageTitle';

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("../pages/Home"),
    meta: {
      title: "首页",
      keepAlive: true
    }
  },
  {
    name: "category",
    path: "/category/:id",
    props: true,
    component: () => import("../pages/Category"),
    meta: {
      title: "分类列表",
      keepAlive: true
    }
  },
  {
    name: "tag",
    path: "/tag/:id",
    props: true,
    component: () => import("../pages/Tag"),
    meta: {
      title: "标签",
      keepAlive: true
    }
  },
  {
    name: "detail",
    path: "/detail/:id",
    component: () => import("../pages/Detail"),
    meta: {
      title: "详情"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  getPageTitle();
  next();
});

router.afterEach((to, _from) => {
  NProgress.done();
});

export default router;
