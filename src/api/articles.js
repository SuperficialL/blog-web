/*
 * @Author: Superficial
 * @Date: 2019-11-19 22:36:45
 * @LastEditTime: 2019-12-15 17:38:10
 * @Description: 文章接口
 */
import request from "@/utils/request";

// 获取文章列表
export function getArticles(params) {
  return request({
    url: "articles",
    method: "get",
    params
  });
}
// 获取文章详情页
export function getArticle(id) {
  return request({
    url: `articles/${id}`,
    method: "get"
  });
}
