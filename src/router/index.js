import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: () => import("../pages/Home"),
    meta: {
      title: "首页"
    }
  },
  {
    name: "category",
    path: "/category/:id",
    props: true,
    component: () => import("../pages/Category"),
    meta: {
      title: "分类列表"
    }
  },
  {
    name: "detail",
    path: "/detail/:id",
    props: true,
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

router.afterEach((to, _from, next) => {
  document.title = to.meta.title;
  // next();
});

export default router;
