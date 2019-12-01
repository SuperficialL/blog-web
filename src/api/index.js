import request from "@/utils/request";

// 获取站点信息
export function getSiteInfo (params) {
  return request({
    url: "siteinfo",
    params
  });
}

// 获取轮播
export function getIndexBanner (params) {
  return request({
    url: "carousel",
    params
  });
}

// 获取友情链接
export function getFriendLink (params) {
  return request({
    url: "friendLinks",
    params
  });
}

// 搜索
export function getSearch (params) {
  return request({
    url: "articles/",
    params
  });
}

// 刷新验证码
export function refreshImg (params) {
  return request({
    url: "verify_img",
    params
  });
}
