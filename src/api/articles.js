/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:36:45
 * @LastEditTime: 2019-11-28 22:31:30
 * @Description: 文章接口
 */
import request from "@/utils/request";

// 获取文章列表
export function getArticles (params) {
  return request({
    url: "articles",
    params
  });
}
// 获取文章详情页
export function getArticleDetail (params) {
  return request({
    url: `articles/${params.id}`
  });
}

// 获取分类下文章列表
export function getArticlesByCate (id) {
  return request({
    url: `api/categories/${id}`
  });
}
