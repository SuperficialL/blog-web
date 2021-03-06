import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { Message, Loading } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "/api",
  timeout: 5000,
  // request timeout
});

let loadingInstance;

// request interceptor 请求拦截
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers["authorization"] = `Bearer ${getToken()}`;
    }
    loadingInstance = Loading.service({
      fullscreen: true,
      text: "拼命加载中",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.3)"
    });
    return config;
  },
  error => {
    // Do something with request error
    window.console.log(error);
    // for debug
    return Promise.reject(error);
  }
);

// response interceptor 响应拦截
service.interceptors.response.use(
  response => {
    loadingInstance.close();
    // return response
    const res = response.data;
    const errorCode = res.errorCode;
    if (errorCode === 40003) {
      // 用户不存在
      Message({
        message: res.message,
        type: "error",
        duration: 3 * 1000
      });
    } else if (errorCode === 20003) {
      Message({
        message: res.message,
        type: "error",
        duration: 3 * 1000
      });
    }
    return res;
  },
  error => {
    loadingInstance.close();
    // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 3 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
