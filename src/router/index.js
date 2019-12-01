import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../Layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import(/* webpackChunkName: "about" */ "../views/Home")
      }
    ]
  },
  {
    path: "/category/:id",
    name: "category",
    component: Layout,
    children: [
      {
        path: "/home",
        component: () =>
          import(/* webpackChunkName: "category" */ "../views/Category")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
