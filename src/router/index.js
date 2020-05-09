import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import getPageTitle from '@/utils/getPageTitle';

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("@/pages/Home"),
    meta: {
      title: "首页",
      keepAlive: true
    }
  },
  {
    name: "category",
    path: "/category/:slug",
    component: () => import("@/pages/Category"),
    meta: {
      title: "分类列表",
      keepAlive: true
    }
  },
  {
    name: "tag",
    path: "/tag/:slug",
    component: () => import("@/pages/Tag"),
    meta: {
      title: "标签列表",
      keepAlive: true
    }
  },
  {
    name: "music",
    path: "/music",
    component: () => import("@/pages/Music"),
    meta: {
      title: "Music",
    }
  },
  {
    name: "detail",
    path: "/detail/:id",
    component: () => import("@/pages/Detail"),
    meta: {
      title: "详情"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  // mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  console.log(to);
  NProgress.start();
  const { title="", slug="" } = to.params;
  document.title = getPageTitle(title, slug);
  next();
});

router.afterEach((to, _from) => {
  NProgress.done();
});

export default router;
