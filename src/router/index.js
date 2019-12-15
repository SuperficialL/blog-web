import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../Layout";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("../views/Home")
      },
      {
        name: "category",
        path: "/category/:id",
        props: true,
        component: () => import("../views/Category")
      },
      {
        name: "detail",
        path: "detail/:id",
        props: true,
        component: () => import("../views/Detail")
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
